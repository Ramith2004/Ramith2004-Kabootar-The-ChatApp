import React, { useState } from "react";
import GenderCheckbox from "./GenderCheckbox";
import { Link } from "react-router-dom";
import useSignup from "../../hooks/useSignup";

const SignUp = () => {

  const [inputs, setInputs] = useState(
  {
    fullName: "",
    email: "", // Changed from username to email
    password: "",
    confirmPassword: "",
    gender: "",
  }
)
  const { loading, signup } = useSignup();

 const handleCheckboxChange = (gender) => {
  setInputs({ ...inputs, gender: gender });
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(inputs); // Use signup function, not useSignup hook
  };

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-grey-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          Sign Up -
          <span className="text-blue-500"> Kabootar</span>
        </h1>

        <form onSubmit={handleSubmit}>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">FullName</span>
            </label>
            <input
              type="text"
              placeholder="John Doe"
              className="w-full input input-bordered h-10"
              value={inputs.fullName}
              onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
            />
            </div>
            <div>
  <label className="label p-2">
    <span className="text-base label-text">Email</span>
  </label>
  <input
    type="email"
    placeholder="Enter your email"
    className="w-full input input-bordered h-10"
    value={inputs.email}
    onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
  />
</div>
            <div>
              <label className="label p-2">
                <span className="text-base label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full input input-bordered h-10"
                value={inputs.password}
                onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
              />
            </div>
            <div className="mb-2">
              <label className="label p-2">
                <span className="text-base label-text">Confirm Password</span>
              </label>
              <input
                type="password"
                placeholder="Enter your confirm password"
                className="w-full input input-bordered h-10"
                value={inputs.confirmPassword}
                onChange={(e) => setInputs({ ...inputs, confirmPassword: e.target.value })}
              />
            </div>

            <GenderCheckbox onCheckboxChange={handleCheckboxChange} selectedGender={inputs.gender} />

            <Link to="/login" className='text-blue-500 hover:underline text-sm mt-2 inline-block'>Already have an account?</Link>

            <div>
              <button type='submit' className='btn btn-block btn-sm mt-2' disabled={loading}>
                {loading ? "Signing Up..." : "Sign Up"}
              </button>
            </div>
        </form>
      </div>
    </div>
  );
};
export default SignUp;