import React, { useState } from "react";
import Spinner from "../../../components/Spinner/Spinner";
import { useForm } from "react-hook-form";

const CashOut = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [isProcessing, setIsProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));

  const handleCashIn = async (data) => {
    setIsProcessing(true);
    setError("");
    setSuccess(false);

    console.log(data);
    const payload = {
      senderId: user._id,
      agentNo: data.recipientMobile,
      amount: parseFloat(data.amount),
      pin: data.pin,
    };

    try {
      const response = await fetch(
        "http://localhost:5000/transaction/cash-out",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
          body: JSON.stringify(payload),
        }
      );

      const result = await response.json();
      console.log(result);

      if (response.ok) {
        setSuccess(true);
        // Reset form values
        toast.success(result.message);
        reset();
        setIsProcessing(false);
      } else {
        setError(result.message || "Something went wrong. Please try again.");
        setIsProcessing(false);
      }
      setIsProcessing(false);
    } catch (error) {
      setError("Network error. Please try again later.");
      setIsProcessing(false);
    }
  };

  if (isProcessing) {
    return <Spinner></Spinner>;
  }

  return (
    <div className="max-w-lg mx-auto my-10 p-5 bg-white border border-gray-200 rounded shadow">
      <h2 className="text-2xl font-bold text-center mb-5">
        Cash-Out Transaction
      </h2>

      {/* Success Message */}
      {success && (
        <div className="text-green-600 text-center mb-4">
          <p>Cash-out transaction successful! Your balance has been updated.</p>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="text-red-600 text-center mb-4">
          <p>{error}</p>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit(handleCashIn)}>
        {/* Amount Input */}
        <div className="mb-4">
          <label
            htmlFor="amount"
            className="block text-sm font-medium text-gray-700"
          >
            Amount to Cash-Out:
          </label>
          <input
            {...register("amount", {
              required: "Amount is required",
              min: {
                value: 1,
                message: "Amount must be greater than 0",
              },
            })}
            type="number"
            id="amount"
            placeholder="Enter amount"
            className="mt-1 p-2 w-full border border-gray-300 rounded"
          />
          {errors.amount && (
            <p role="alert" className="text-red-600 text-sm">
              {errors.amount?.message}
            </p>
          )}
        </div>
        {/* Recipient Mobile Number Input */}
        <div className="mb-4">
          <label
            htmlFor="recipientMobile"
            className="block text-sm font-medium text-gray-700"
          >
            Agent Mobile Number:
          </label>
          <input
            {...register("recipientMobile", {
              required: "Recipient mobile number is required",
              pattern: {
                value: /^[0-9]{10,12}$/, // Mobile number validation (adjust as necessary)
                message: "Please enter a valid mobile number",
              },
            })}
            type="text"
            id="recipientMobile"
            placeholder="Enter recipient's mobile number"
            className="mt-1 p-2 w-full border border-gray-300 rounded"
          />
          {errors.recipientMobile && (
            <p role="alert" className="text-red-600 text-sm">
              {errors.recipientMobile?.message}
            </p>
          )}
        </div>

        {/* PIN Input */}
        <div className="mb-4">
          <label
            htmlFor="pin"
            className="block text-sm font-medium text-gray-700"
          >
            PIN:
          </label>
          <input
            {...register("pin", {
              required: "PIN is required",
              pattern: {
                value: /^[0-9]{5}$/,
                message: "PIN must be exactly 5 digits",
              },
            })}
            type="password"
            id="pin"
            placeholder="Enter PIN"
            className="mt-1 p-2 w-full border border-gray-300 rounded"
          />
          {errors.pin && (
            <p role="alert" className="text-red-600 text-sm">
              {errors.pin?.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 bg-rose-600 text-white font-bold rounded hover:bg-rose-700"
          disabled={isProcessing}
        >
          {isProcessing ? "Processing..." : "Complete Cash-In"}
        </button>
      </form>
    </div>
  );
};

export default CashOut;
