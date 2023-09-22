import React, { useState } from "react";
import { Button, message } from "antd";
import { useNavigate, Link } from "react-router-dom";
import useUsersApi from "../../../service/users";

const SignIn = () => {
  const { signIn } = useUsersApi();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const signInFunc = async () => {
    try {
      setIsLoading(true);
      const res = await signIn(values);
      const data = await res.data;
      console.log(data);
      localStorage.setItem("token", data?.token);
      localStorage.setItem("username", data?.user.username);
      localStorage.setItem("my_id", data?.user.id);
      localStorage.setItem("full_name", data?.user.full_name);
      data && message.success("Successfully logged in");
      data.length && setIsLoading(false);
      return navigate("/");
    } catch (error) {
      if (error.response.status === 400) {
        setIsLoading(false);
        return message.error("Username or Password wrong");
      } else {
        error && message.error(error.message);
      }
    }
  };

  return (
    <div className="w-full h-screen flex items-center">
      <div className="max-w-[600px] w-full mx-auto">
        <div className="relative flex items-center justify-center mb-[50px]">
          <button
            onClick={() => navigate("/")}
            className="absolute left-0 border-[1px] border-black w-[35px] h-[35px] flex items-center justify-center rounded-[100px]"
          >
            ←
          </button>
          <h1 className=" text-[25px] text-center font-bold ">Sign In</h1>
        </div>

        <div className="mb-6">
          <label
            htmlFor="text"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your username
          </label>
          <input
            onChange={(e) =>
              setValues((prevState) => ({
                ...prevState,
                username: e.target.value,
              }))
            }
            type="text"
            id="text"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="@example"
            required
          />
        </div>
        <div className="mb-8">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your password
          </label>
          <input
            onChange={(e) =>
              setValues((prevState) => ({
                ...prevState,
                password: e.target.value,
              }))
            }
            type="password"
            id="password"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            required
          />
        </div>

        <div>
          <p className="text-[18px] my-5">
            If you haven't an account?
            <Link
              to="/sign-up"
              className="text-blue-500 underline font-semibold p-3"
            >
              Register new account
            </Link>
          </p>
        </div>

        <Button
          className="w-full p-5 flex items-center justify-center text-[18px]"
          type="primary"
          onClick={() => signInFunc()}
          loading={isLoading}
          disabled={isLoading}
        >
          Sign in
        </Button>
      </div>
    </div>
  );
};

export default SignIn;
