import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Signup = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [isPinVisible, setIsPinVisible] = useState(false);

  const pin = watch("pin");

  const handleSignup = (data) => {
    console.log("User Data:", data);

    const createdUser = {
      accountType: data.accountType,
      name: data.name,
      email: data.email,
      mobile: data.mobile,
      nid: data.nid,
      pin: data.pin,
    };
    const { name, email, mobile, pin, accountType, nid } = data;
    fetch("http://localhost:5000/user/register/", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(createdUser),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data) {
          toast.success(data.message);
          reset();
        } else {
          toast.error(data.error || "Signup failed");
        }
      })
      .catch((error) => {
        console.log(error.message);
        setSignUPError(error.message);
      });
  };

  return (
    <div className="card overflow-hidden p-5 md:w-6/12 mx-auto w-full shadow-xl bg-base-100 md:my-5">
      <div>
        <h1 className="text-4xl text-center font-bold">Signup</h1>
        <form className="mt-6" onSubmit={handleSubmit(handleSignup)}>
          {/* Name */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Full Name</span>
            </label>
            <input
              {...register("name", { required: "Name is required" })}
              type="text"
              placeholder="Enter Your Full Name"
              className="input input-bordered w-full"
            />
            {errors.name && <p className="text-error">{errors.name.message}</p>}
          </div>

          {/* Mobile Number */}
          <div className="form-control w-full mt-4">
            <label className="label">
              <span className="label-text">Mobile Number</span>
            </label>
            <input
              {...register("mobile", {
                required: "Mobile number is required",
                pattern: {
                  value: /^[0-9]{11}$/,
                  message: "Enter a valid 10-digit mobile number",
                },
              })}
              type="text"
              placeholder="Enter Your Mobile Number"
              className="input input-bordered w-full"
            />
            {errors.mobile && (
              <p className="text-error">{errors.mobile.message}</p>
            )}
          </div>

          {/* Email */}
          <div className="form-control w-full mt-4">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Enter a valid email address",
                },
              })}
              type="email"
              placeholder="Enter Your Email"
              className="input input-bordered w-full"
            />
            {errors.email && (
              <p className="text-error">{errors.email.message}</p>
            )}
          </div>

          {/* PIN */}
          <div className="form-control w-full mt-4">
            <label className="label">
              <span className="label-text">PIN (5-digit)</span>
            </label>
            <input
              {...register("pin", {
                required: "PIN is required",
                pattern: {
                  value: /^[0-9]{5}$/,
                  message: "PIN must be exactly 5 digits",
                },
              })}
              type={isPinVisible ? "text" : "password"}
              placeholder="Enter your 5-digit PIN"
              className="input input-bordered w-full"
            />
            <div
              onClick={() => setIsPinVisible(!isPinVisible)}
              className="cursor-pointer text-blue-700 text-sm mt-2"
            >
              {isPinVisible ? "Hide PIN" : "Show PIN"}
            </div>
            {errors.pin && <p className="text-error">{errors.pin.message}</p>}
          </div>

          {/* Confirm PIN */}
          <div className="form-control w-full mt-4">
            <label className="label">
              <span className="label-text">Confirm PIN</span>
            </label>
            <input
              {...register("confirmPin", {
                required: "Confirm PIN is required",
                validate: (value) => value === pin || "PINs do not match",
              })}
              type={isPinVisible ? "text" : "password"}
              placeholder="Confirm your 5-digit PIN"
              className="input input-bordered w-full"
            />
            {errors.confirmPin && (
              <p className="text-error">{errors.confirmPin.message}</p>
            )}
          </div>
          {/* Account Type */}
          <div className="form-control w-full mt-4">
            <label className="label">
              <span className="label-text">Account Type</span>
            </label>
            <select
              {...register("accountType", {
                required: "Account type is required",
              })}
              className="select select-bordered w-full"
            >
              <option value="">Select Account Type</option>
              <option value="Agent">Agent</option>
              <option value="User">User</option>
            </select>
            {errors.accountType && (
              <p className="text-error">{errors.accountType.message}</p>
            )}
          </div>

          {/* NID */}
          <div className="form-control w-full mt-4">
            <label className="label">
              <span className="label-text">National ID (NID)</span>
            </label>
            <input
              {...register("nid", {
                required: "NID is required",
                pattern: {
                  value: /^[0-9]{10,17}$/,
                  message: "NID must be 10 to 17 digits",
                },
              })}
              type="text"
              placeholder="Enter Your National ID"
              className="input input-bordered w-full"
            />
            {errors.nid && <p className="text-error">{errors.nid.message}</p>}
          </div>

          {/* Submit Button */}
          <input
            className="btn bg-rose-500 text-white w-full mt-5 text-xl font-bold"
            value="Signup"
            type="submit"
          />
          <p className="mt-3 text-center">
            Already have an account?{" "}
            <Link className="text-blue-700" to="/login">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
