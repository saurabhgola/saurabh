"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

function RestaurantSignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [c_passward, setC_password] = useState("");
  const [restaurantName, setRestaurantName] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [contectNo, setContectNo] = useState("");
  const [error, setError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const router = useRouter();

  const handleSignUp = async () => {
    // if (passwordError !== c_passward) {
    //   setPasswordError(true);
    //   return false
    // } else {
    //   setPasswordError(false)
    // }
    // if (
    //   !email ||
    //   !password ||
    //   !c_passward ||
    //   !name ||
    //   !city ||
    //   address ||
    //   !contact ||
    //   !restaurantName
    // ) {
    //   setError(true);
    //   return false;
    // } else {
    //   setError(false);
    // }

    const data = [
      email,
      password,
      c_passward,
      restaurantName,
      city,
      address,
      contectNo,
    ];
    console.log(data);
    const result = await fetch("http://localhost:3000/api/restaurant", {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
        restaurantName,
        city,
        address,
        contectNo,
      }),
    });

    const result1 = await result.json();
    console.log(result1);
    if (result1.success) {
      // alert("Restaurant Sign Up Successfully");
      const { result } = result1;
      delete result.password;
      localStorage.setItem("restaurantUser", JSON.stringify(result));
      router.push("/restaurant/dashboard");
    }
  };

  return (
    <>
      <div className="text-center items-center p-[20px] mt-[20px]">
        <h1 className="text-[25px]">SignUp component</h1>
        <div className="mt-[10px]">
          <input
            className="m-[10px] border-2  w-[350px] pl-[10px] py-[5px] hover:border-red-400 rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Enter Email id"
          />
          <div>
            {error && !email && (
              <span className="text-red-700">please enter the velid email</span>
            )}
          </div>
        </div>
        <div className="mt-[10px]">
          <input
            className="m-[10px] border-2  w-[350px] pl-[10px] py-[5px] hover:border-red-400 rounded-md"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Enter password"
          />
          <div>
            {/* {passwordError && (
              <span className="text-red-700">
                password and Confirm password not match
              </span>
            )} */}
          </div>
        </div>
        <div className="mt-[10px] flex-wrap">
          <input
            className="m-[10px] border-2  w-[350px] pl-[10px] py-[5px] hover:border-red-400 rounded-md"
            value={c_passward}
            onChange={(e) => setC_password(e.target.value)}
            type="password"
            placeholder="Confirm password"
          />
          <div>
            {/* {passwordError && (
              <span className="text-red-700">
                password and Confirm password not match
              </span>
            )} */}
          </div>
        </div>
        <div className="mt-[10px]">
          <input
            className="m-[10px] border-2  w-[350px] pl-[10px] py-[5px] hover:border-red-400 rounded-md"
            value={restaurantName}
            onChange={(e) => setRestaurantName(e.target.value)}
            type="text"
            placeholder="Enter restaurant name"
          />
          <div>
            {error && !restaurantName && (
              <span className="text-red-700">
                please enter the restaurantName
              </span>
            )}
          </div>
        </div>
        <div className="mt-[10px]">
          <input
            className="m-[10px] border-2  w-[350px] pl-[10px] py-[5px] hover:border-red-400 rounded-md"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            type="text"
            placeholder="Enter city"
          />
          <div>
            {error && !city && (
              <span className="text-red-700">please enter the city name</span>
            )}
          </div>
        </div>
        <div className="mt-[10px]">
          <input
            className="m-[10px] border-2 w-[350px] pl-[10px] py-[5px] hover:border-red-400 rounded-md"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            type="text"
            placeholder="Enter full address"
          />
          <div>
            {error && !address && (
              <span className="text-red-700">please enter the address</span>
            )}
          </div>
        </div>
        <div className="mt-[10px]">
          <input
            className="m-[10px] border-2  w-[350px] pl-[10px] py-[5px] hover:border-red-400 rounded-md"
            value={contectNo}
            onChange={(e) => setContectNo(e.target.value)}
            type="number"
            placeholder="Enter contact No."
          />
          <div>
            {error && !contectNo && (
              <span className="text-red-700">
                please enter the contect number
              </span>
            )}
          </div>
        </div>
        <button
          className="bg-blue-800 w-[350] hover:bg-orange-600 rounded-md py-[5px]"
          onClick={handleSignUp}
        >
          SignUp
        </button>
      </div>
    </>
  );
}
export default RestaurantSignUp;
