"use client";
import { useState } from "react";
import RestaurantLogin from "../_components/restaurantLogin";
import RestaurantSignUp from "../_components/restaurantSignUp";
import RestaurantHeader from "../_components/restaurantHeader";
import RestaurantFooter from "../_components/restaurantFooter";

function Restaurant() {
  const [login, setLogin] = useState(true);

  return (
    <>
      <div>
        <RestaurantHeader />
      </div>
      <div className="text-center mt-[40px] sm:mt-[60px] lg:mt-[100px]">
        <h1 className="text-[24px] sm:text-[30px] mb-[10px]">
          Restaurant Login/Signup Page
        </h1>
        <div className="border-2 border-indigo-600 mx-auto px-4 py-6 sm:max-w-md md:max-w-lg lg:max-w-xl rounded-md">
          {login ? <RestaurantLogin /> : <RestaurantSignUp />}

          <div className="mb-[10px] text-blue-700">
            <button
              className="text-sm sm:text-base hover:text-blue-500"
              onClick={() => setLogin(!login)}
            >
              {login
                ? "Do not have an account? SignUp"
                : "Already have an account? Login"}
            </button>
          </div>
        </div>
      </div>
      <div className="text-center">
        <RestaurantFooter />
      </div>
    </>
  );
}

export default Restaurant;
