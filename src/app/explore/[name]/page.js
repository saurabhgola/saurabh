"use client";
import { useEffect, useState } from "react";

function Pages(props) {
  const [restaurantDetails, setRestaurantDetails] = useState(null);
  const [foodItems, setFoodItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [showPayment, setShowPayment] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [newFood, setNewFood] = useState({ name: "", price: "", description: "", img_path: "" });
  const restaurantName = props.params.restaurantName;

  useEffect(() => {
    loadRestaurantDetails();
  }, []);

  const loadRestaurantDetails = async () => {
    const id = props.searchParams.id;
    const apiurl = process.env.NEXT_PUBLIC_API_URL;

    let response = await fetch(`${apiurl}/api/customer/${id}`);
    response = await response.json();
    if (response.success) {
      setRestaurantDetails(response.details);
      setFoodItems(response.foodItems);
    }
  };

  const addToCart = (foodItem) => {
    setCartItems((prevCart) => [...prevCart, foodItem]);
  };

  const removeFromCart = (index) => {
    setCartItems((prevCart) => prevCart.filter((_, i) => i !== index));
  };

  const initiatePayment = async () => {
    setShowPayment(true);
    // Simulate payment process
    setTimeout(() => {
      setPaymentStatus("success");
      // After payment is successful, proceed to add food to the restaurant menu (optional)
      handleAddFoodAfterPayment();
    }, 3000); // Simulate payment delay
  };

  const handleAddFoodAfterPayment = async () => {
    const apiurl = process.env.NEXT_PUBLIC_API_URL;

    const response = await fetch(`${apiurl}/api/food`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartItems),
    });
    const result = await response.json();
    if (result.success) {
      alert("Food items successfully added!");
      setCartItems([]);
      setPaymentStatus(null);
      setShowPayment(false);
    } else {
      alert("Failed to add food items.");
    }
  };

  return (
    <>
      <div>
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
            <h1 className="text-white text-center">{decodeURI(restaurantName)}</h1>
          </div>
        </div>
      </div>

      <div className="text-black m-10">
        {/* Restaurant Details */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h3 className="text-xl font-semibold">Restaurant Details</h3>
          <p className="mt-2">City: {restaurantDetails?.city}</p>
          <p>Address: {restaurantDetails?.address}</p>
          <p>Contact No: {restaurantDetails?.contectNo}</p>
          <p>Email: {restaurantDetails?.email}</p>
        </div>

        {/* Food Items */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Available Food Items</h3>
          {foodItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {foodItems.map((item, index) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow-md">
                  <img
                    src={item.img_path}
                    alt={item.name}
                    className="w-full h-40 object-cover rounded-lg"
                  />
                  <div className="mt-2">
                    <h4 className="text-lg font-semibold">{item.name}</h4>
                    <p className="text-sm text-gray-600">Price: ${item.price}</p>
                    <p className="text-sm">{item.description}</p>
                    <button
                      onClick={() => addToCart(item)}
                      className="mt-2 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No food items available.</p>
          )}
        </div>

        {/* Cart Section */}
        {cartItems.length > 0 && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h3 className="text-xl font-semibold mb-4">Your Cart</h3>
            <ul>
              {cartItems.map((item, index) => (
                <li key={index} className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={item.img_path}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div>
                      <h4 className="text-lg font-semibold">{item.name}</h4>
                      <p className="text-sm text-gray-600">Price: ${item.price}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(index)}
                    className="bg-red-500 text-white py-1 px-4 rounded-lg hover:bg-red-700"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
            <button
              onClick={initiatePayment}
              className="bg-green-500 text-white py-2 px-6 rounded-lg mt-4 hover:bg-green-700"
            >
              Proceed to Payment
            </button>
          </div>
        )}

        {/* Payment Section */}
        {showPayment && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-8 text-center">
            <h3 className="text-xl font-semibold mb-4">Processing Payment...</h3>
            <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full border-t-transparent border-blue-600" />
            {paymentStatus && (
              <div className="mt-4">
                {paymentStatus === "success" ? (
                  <p className="text-green-600 font-semibold">Payment Successful!</p>
                ) : (
                  <p className="text-red-600 font-semibold">Payment Failed. Try again.</p>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default Pages;
