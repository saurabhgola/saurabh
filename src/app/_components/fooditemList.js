"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function FoodItemList() {
  const [fooditem, setFoodItem] = useState([]);
 const router=useRouter();
  const loadFoodItems = async () => {
    const restaurantData = JSON.parse(localStorage.getItem("restaurantUser"));
    const resto_id = restaurantData._id;
    let response = await fetch(
      `http://localhost:3000/api/restaurant/foods/${resto_id}`
    );
    response = await response.json();
    if (response.success) {
      setFoodItem(response.result);
    } else {
      console.log("error");
    }
  };

  useEffect(() => {
    loadFoodItems();
  }, []); // Loading food items on component mount
  const deleteFoodItem = async (id) => {
    let response = await fetch(
      `http://localhost:3000/api/restaurant/foods/${id}`,
      {
        method: "DELETE",
      }
    );
    response = await response.json();
    if (response.success) {
      loadFoodItems();
    } else {
      alert("food item not deleted");
    }
  };

  return (
    <div className="ml-10 mt-5">
      <h1 className="text-3xl font-bold mb-4">Food Items</h1>
      <div className="overflow-x-auto">
        <table className="bg-white border border-gray-200 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="px-4 py-2 border-b text-sm font-semibold text-gray-700">
                #
              </th>
              <th className="px-4 py-2 border-b text-sm font-semibold text-gray-700">
                Name
              </th>
              <th className="px-4 py-2 border-b text-sm font-semibold text-gray-700">
                Price
              </th>
              <th className="px-4 py-2 border-b text-sm font-semibold text-gray-700">
                Image Path
              </th>
              <th className="px-4 py-2 border-b text-sm font-semibold text-gray-700">
                Description
              </th>
              <th className="px-4 py-2 border-b text-sm font-semibold text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {fooditem.map((item, index) => (
              <tr key={item._id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border-b text-sm text-gray-600">
                  {index + 1}
                </td>
                <td className="px-4 py-2 border-b text-sm text-gray-600">
                  {item.name}
                </td>
                <td className="px-4 py-2 border-b text-sm text-gray-600">
                  ${item.price}
                </td>
                <td className="px-4 py-2 border-b text-sm text-gray-600">
                  <img className="h-[45px] w-[60px]" src={item.img_path} />
                </td>
                <td className="px-4 py-2 border-b text-sm text-gray-600">
                  {item.description}
                </td>
                <td className="px-4 py-2 border-b text-sm text-gray-600">
                  <button
                    onClick={() => deleteFoodItem(item._id)}
                    className="px-3 py-1 mr-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
                  >
                    Delete
                  </button>
                  <button onClick={()=>router.push('/restaurant/dashboard/'+item._id)} className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default FoodItemList;
