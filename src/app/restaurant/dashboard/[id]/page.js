"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function EditeFooditems(props) {
  console.log(props.params.id);
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [path, setPath] = useState("");
  const [description, setDescription] = useState();
  const [error, setError] = useState(false);
  const router = useRouter();

  const handleEditeFoodItem = async () => {
    console.log({ name, price, path, description });
    if (!name || !path || !description || !price) {
      setError(true);
      return false;
    } else {
      setError(false);
    }
    let resto_id;
    const restaurantdata = JSON.parse(localStorage.getItem("restaurantUser"));
    if (restaurantdata) {
      resto_id = restaurantdata._id;
    }
    let response = await fetch(
      "http://localhost:3000/api/restaurant/foods/edit/" + props.params.id,
      {
        method: "PUT",
        body: JSON.stringify({
          name,
          price,
          img_path: path,
          description,
          resto_id,
        }),
      }
    );
    response = await response.json();
    if (response.success) {
      // setName("");
      // setPrice("");
      // setPath("");
      // setDescription("");
      // setError(false); // Clear any error messages
      router.push("/restaurant/dashboard/");
    } else {
      alert("data not added please try again updated");
    }
  };

  const handleloadFoodItem = async () => {
    let response = await fetch(
      "http://localhost:3000/api/restaurant/foods/edit/" + props.params.id
    );
    response = await response.json();
    if (response.success) {
      console.log(response.result);
      setName(response.result.name);
      setPrice(response.result.price);
      setPath(response.result.img_path);
      setDescription(response.result.description);
    }
  };
  useEffect(() => {
    handleloadFoodItem();
  }, []);

  return (
    <>
      <div className="text-center mt-[200px]">
        <h1 className="ml-[13px] text-[20px]">Update Food Item</h1>
        <div>
          <input
            className="m-[10px] border-2 w-[350px] pl-[10px] py-[5px] hover:border-red-400 rounded-md"
            type="text"
            placeholder="enter fooditem name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <div className="ml-[10px]">
            {error && !name && (
              <span className="text-red-700">please enter valid name</span>
            )}
          </div>
        </div>
        <div>
          <input
            className="m-[10px] border-2 w-[350px] pl-[10px] py-[5px] hover:border-red-400 rounded-md"
            type="text"
            placeholder="enter price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <div className="ml-[10px]">
            {error && !price && (
              <span className="text-red-700">please enter valid price</span>
            )}
          </div>
        </div>
        <div>
          <input
            className="m-[10px] border-2 w-[350px] pl-[10px] py-[5px] hover:border-red-400 rounded-md"
            type="text"
            placeholder="enter path"
            value={path}
            onChange={(e) => setPath(e.target.value)}
          />
          <div className="ml-[10px]">
            {error && !path && (
              <span className="text-red-700">please enter valid path</span>
            )}
          </div>
        </div>
        <div>
          <input
            className="m-[10px] border-2 w-[350px] pl-[10px] py-[5px] hover:border-red-400 rounded-md"
            type="text"
            placeholder="enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="ml-[10px]">
            {error && !description && (
              <span className="text-red-700">
                please enter valid description
              </span>
            )}
          </div>
        </div>
        <div>
          <button
            onClick={() => handleEditeFoodItem()}
            className="ml-[10px] mt-[10px] bg-black px-[20px]  hover:bg-red-300  rounded text-white"
          >
            Update Food Item
          </button>
        </div>
        <div>
          <button
            onClick={() => router.push("/restaurant/dashboard/")}
            className="ml-[10px] mt-[10px] bg-black px-[20px]  hover:bg-red-300  rounded text-white"
          >
            Back to Food Item list
          </button>
        </div>
      </div>
    </>
  );
}
export default EditeFooditems;
