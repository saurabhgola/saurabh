"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

function RestaurantLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const router = useRouter();
  const handleLogin = async () => {
    if (!email || !password) {
      setError(true);
      return false;
    } else {
      setError(false);
    }
    let response = await fetch("http://localhost:3000/api/restaurant", {
      method: "POST",
      body: JSON.stringify({ email, password, login: true }),
    });
    response = await response.json();
    if (response.success) {
      const { result } = response;
      delete result.password;
      localStorage.setItem("restaurantUser", JSON.stringify(result));
      router.push("/restaurant/dashboard");
      alert("login success")
    } else alert("login failed");
  };

  return (
    <>
      <div className="mt-[10px]">
        <h1 className="text-[25px]">Login component</h1>
        <div className="mt-[10px]">
          <input
            className="m-[10px] border-2 w-[350px] pl-[10px] py-[5px] hover:border-red-400 rounded-md"
            placeholder="Enter Email id"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div>
            {error && !email && (
              <span className="text-red-700">please enter the email</span>
            )}
          </div>
        </div>
        <div className="mt-[10px]">
          <input
            className="m-[10px] border-2 w-[350px] pl-[10px]  py-[5px] hover:border-red-400 rounded-md"
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div>
            {error && !password && (
              <span className="text-red-600">please enter the password</span>
            )}
          </div>
        </div>
        <button
          onClick={() => handleLogin()}
          className="mt-[10px] bg-blue-800 w-[350px] hover:bg-orange-600 rounded-md py-[5px]"
        >
          Login
        </button>
      </div>
    </>
  );
}
export default RestaurantLogin;
