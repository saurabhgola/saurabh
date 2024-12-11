"use client";
import { useEffect, useState } from "react";
import CustomerHeader from "./_components/customerHearder.js";
import RestaurantFooter from "./_components/restaurantFooter.js";
import { useRouter } from "next/navigation.js";

export default function Home() {
  const [locations, setLocations] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState("");
  const [showLocations, setShowLocations] = useState(false);
  const [restaurants, setRestaurants] = useState([]);
  const router = useRouter();

  useEffect(() => {
    loadLocations();
    loadRestaurants();
  }, []);

  const loadLocations = async () => {
    let response = await fetch("http://localhost:3000/api/customer/locations");
    response = await response.json();
    if (response.success) {
      setLocations(response.result);
    }
  };

  const loadRestaurants = async (params) => {
    let url = "http://localhost:3000/api/customer";
    if (params?.location) {
      url = url + "?location=" + params.location;
    } else if (params?.restaurant) {
      url = url + "?restaurant=" + params.restaurant;
    }
    let response = await fetch(url);
    response = await response.json();
    if (response.success) {
      setRestaurants(response.result);
    }
  };

  const handleListItem = (item) => {
    setSelectedLocations(item);
    setShowLocations(false);
    loadRestaurants({ location: item });
  };

  return (
    <div>
      <CustomerHeader />

      {/* Banner Section */}
      <div
        className="relative w-full h-80 sm:h-96 lg:h-112 bg-cover bg-center"
        style={{
          backgroundImage:
            "url(https://img.freepik.com/premium-photo/table-full-food-including-many-dishes-including-food_1034910-49367.jpg)",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 justify-center items-center">
          <h2 className="text-white text-3xl sm:text-4xl mt-20 lg:text-5xl font-semibold text-center">
            Discover Delicious Food Near You!
          </h2>
          <div className="my-8 px-4">
            <div className="max-w-4xl mx-auto flex flex-wrap sm:flex-row justify-center items-center gap-4 relative">
              {/* First search box for place */}
              <input
                type="text"
                onClick={() => setShowLocations(true)}
                value={selectedLocations}
                className="w-full sm:w-auto p-3 text-lg rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Search for a place..."
              />
              <ul className="absolute w-full mt-12 bg-white shadow-lg rounded-md z-10">
                {showLocations &&
                  locations.map((item) => (
                    <li
                      className="hover:bg-gray-200 cursor-pointer p-2"
                      onClick={() => handleListItem(item)}
                      key={item}
                    >
                   {item}
                    </li>
                  ))}
              </ul>

              {/* Second search box for restaurant name */}
              <input
                type="text"
                onChange={(event) =>
                  loadRestaurants({ restaurant: event.target.value })
                }
                className="w-full sm:w-auto p-3 text-lg rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Search for restaurant name..."
              />

              {/* Search Button */}
              <button className="w-full sm:w-auto p-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-200">
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Restaurant Cards Section */}
      <div className="text-center my-8">
        <h1 className="text-3xl font-bold mb-6">Our Popular Restaurants</h1>
        <div className="flex flex-wrap cursor-pointer justify-center gap-6">
          {restaurants.map((item, index) => (
            <div
              onClick={() =>
                router.push(
                  "explore/" + item.restaurantName + "?id=" + item._id
                )
              }
              key={index}
              className="w-full sm:w-80 md:w-96 lg:w-1/4 bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-black mb-2">
                  {item.restaurantName}
                </h3>
                <p className="text-gray-600 mb-2">
                  Contact No: {item.contectNo}
                </p>
                <p className="text-gray-600 mb-2">City: {item.city}</p>
                <p className="text-gray-600 mb-2">Email: {item.email}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Section */}
      <div className="text-center">
        <RestaurantFooter />
      </div>
    </div>
  );
}
