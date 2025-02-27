import { useState } from "react";
import { useForm } from "react-hook-form";
import Spinner from "../../../components/Spinner/Spinner";
import toast from "react-hot-toast";

const Withdraw = () => {
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

  const handleWithdraw = async (data) => {
    setIsProcessing(true);
    setError("");
    setSuccess(false);

    console.log(data);
    const payload = {
      agentId: user._id,
      amount: parseFloat(data.amount),
    };

    try {
      const response = await fetch(
        "https://mfs-server-gamma.vercel.app/transaction/withdraw-request",
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
        toast.success(result.message);
        reset();
      } else {
        setError(result.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      setError("Network error. Please try again later.");
    } finally {
      setIsProcessing(false);
    }
    setIsProcessing(false);
  };

  if (isProcessing) {
    return <Spinner></Spinner>;
  }
  return (
    <>
      <div className="max-w-lg mx-auto my-10 p-5 bg-white border border-gray-200 rounded shadow">
        <h2 className="text-2xl font-bold text-center mb-5">
          Withdraw Request
        </h2>

        {success && (
          <div className="text-green-600 text-center mb-4">
            <p>Withdrawal request successful!</p>
          </div>
        )}

        {error && (
          <div className="text-red-600 text-center mb-4">
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit(handleWithdraw)}>
          <div className="mb-4">
            <label
              htmlFor="amount"
              className="block text-sm font-medium text-gray-700"
            >
              Amount to Withdraw:
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

          <button
            type="submit"
            className="w-full py-2 bg-rose-600 text-white font-bold rounded hover:bg-rose-700"
            disabled={isProcessing}
          >
            {isProcessing ? "Processing..." : "Request Withdraw"}
          </button>
        </form>
      </div>
    </>
  );
};

export default Withdraw;
