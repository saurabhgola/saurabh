"use client";
import { useState } from "react";
import AddFooditems from "../../_components/AddFooditem";
import RestaurantHeader from "../../_components/restaurantHeader";
import FoodItemList from "../../_components/fooditemList";

function Dashoard() {
  const [additem, setItem] = useState(false);
  return (
    <>
      <div>
        <RestaurantHeader />
        <div className="gap-10">
          <button
            onClick={() => setItem(true)}
            className="m-5 bg-black p-[10px] hover:bg-red-300 rounded-md text-white"
          >
            Add Food
          </button>
          <button
            onClick={() => setItem(false)}
            className=" bg-black p-[10px]  hover:bg-red-300  rounded text-white"
          >
            Dashoard
          </button>
        </div>
        {additem ? <AddFooditems addlist={setItem} /> : <FoodItemList />}
      </div>
    </>
  );
}

export default Dashoard;
