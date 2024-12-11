"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function RestaurantHeader() {
  const [details, setDetails] = useState();
  const router = useRouter();
  const pathName = usePathname();
  useEffect(() => {
    const data = localStorage.getItem("restaurantUser");
    if (!data && pathName == "/restaurant/dashboard") {
      router.push("/restaurant");
    } else if (data && pathName == "/restaurant") {
      router.push("/restaurant/dashboard");
    } else {
      setDetails(JSON.parse(data));
    }
  },[]);
  return (
    <>
      <div className="bg-red-500 text-[20px] text-white py-[10px]">
        <div className="flex mt-[10px] px-[15px]">
          <div className="ml-[10px]">
            <img
              className="h-[50px] w-[70px]"
              src="https://t3.ftcdn.net/jpg/03/33/90/46/360_F_333904627_tnCepUpc3Uynb6stmEbverr8HeWS2VZl.jpg"
            />
          </div>
          <ul className="flex ml-[auto] gap-9">
            <li className="hover:text-blue-700">
              <Link href="/">Home</Link>
            </li>
            {details && details.name ? (
              <>
                <li className="hover:text-blue-700">
                  <button>logout</button>
                </li>
                <li className="hover:text-blue-700">
                  <Link href="/">Profile</Link>
                </li>
              </>
            ) : (
              <li className="hover:text-blue-700">
                <Link href="/">Login/SignUp</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </>
  );
}
export default RestaurantHeader;
