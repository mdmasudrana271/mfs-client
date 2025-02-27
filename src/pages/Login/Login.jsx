import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthProviders";

const Login = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const [isPinVisible, setIsPinVisible] = useState(false); // State to toggle PIN visibility
  const { loginUser, token } = useContext(AuthContext);

  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    if (token) {
      navigate(from, { replace: true });
    }
  }, [token, navigate, from]);

  const handleLogin = (data) => {
    const username = data.username;
    const pin = data.passwordOrPin; // The PIN value entered
    loginUser(username, pin);
    // console.log(username, pin);
  };

  return (
    <>
      <div className="card overflow-hidden p-5 md:w-6/12 mx-auto w-full shadow-xl bg-base-100 md:my-5">
        <div>
          <h1 className="text-4xl text-center font-bold">Login</h1>
          <form className="mt-6" onSubmit={handleSubmit(handleLogin)}>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Email or Phone Number</span>
              </label>
              <input
                {...register("username", {
                  required: "Username (email or phone) is required",
                  validate: (value) => {
                    // Check if it's a valid email or phone number
                    const emailRegex =
                      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i;
                    const phoneRegex = /^[0-9]{10,12}$/;
                    if (!emailRegex.test(value) && !phoneRegex.test(value)) {
                      return "Please enter a valid email or phone number";
                    }
                  },
                })}
                type="text"
                placeholder="Enter Your Email or Phone Number"
                className="input input-bordered w-full"
              />
              {errors.username && (
                <p role="alert" className="text-error">
                  {errors.username?.message}
                </p>
              )}
            </div>

            {/* PIN input */}
            <div className="form-control w-full mt-4">
              <label className="label">
                <span className="label-text">PIN</span>
              </label>
              <input
                {...register("passwordOrPin", {
                  required: "PIN is required",
                  pattern: {
                    value: /^[0-9]{5}$/, // 5 digit pin validation
                    message: "PIN must be exactly 5 digits",
                  },
                })}
                type={isPinVisible ? "text" : "password"} // Toggle between text and password input type
                placeholder="Enter your 5-digit PIN"
                className="input input-bordered w-full"
              />
              <div
                onClick={() => setIsPinVisible(!isPinVisible)} // Toggle visibility
                className="cursor-pointer text-blue-700 text-sm mt-2"
              >
                {isPinVisible ? "Hide PIN" : "Show PIN"}
              </div>
              {errors.passwordOrPin && (
                <p className="text-error">{errors.passwordOrPin?.message}</p>
              )}
            </div>

            <input
              className="btn bg-rose-500 text-white w-full mt-5 text-xl font-bold"
              value="Login"
              type="submit"
            />
            <p className="mt-3 text-center">
              New to this site?{" "}
              <Link className="text-blue-700" to="/signup">
                Signup
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
