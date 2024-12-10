import Link from "next/link";

function CustomerHeader() {
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
            <li className="hover:text-blue-700">
              <Link href="/">Login</Link>
            </li>
                <li className="hover:text-blue-700">
                  <Link href="/">SignUp</Link>
                </li>
                
                <li className="hover:text-blue-700">
                  <Link href="/">Cart(0)</Link>
                </li>
                <li className="hover:text-blue-700">
                  <Link href="/">Add Restaurant</Link>
                </li>
          </ul>
        </div>
        </div>
    </>
  );
}

export default CustomerHeader;
