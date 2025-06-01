/* eslint-disable no-unused-vars */
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { FaUtensils } from "react-icons/fa";
import { useLoaderData } from "react-router-dom";
import { useEffect } from "react";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";

const UpdateItem = () => {
  const food = useLoaderData();
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    defaultValues: {
      name: food?.name || "",
      category: food?.category || "",
      price: food?.price || "",
      recipe: food?.recipe || "",
    },
  });

  useEffect(() => {
    reset({
      name: food?.name || "",
      category: food?.category || "",
      price: food?.price || "",
      recipe: food?.recipe || "",
    });
  }, [food, reset]);

  const onSubmit = async (data) => {
    try {
      console.log("Updating item with data:", data);

      if (!food?._id) {
        toast.error("Invalid item ID");
        return;
      }

      const result = await axiosSecure.put(`/menu/${food._id}`, data);

      if (result.status === 200) {
        toast.success("Item updated successfully!");
        console.log("Update response:", result.data);
      } else {
        throw new Error("Update failed with status " + result.status);
      }
    } catch (error) {
      console.error("Update failed:", error);
      toast.error("Failed to update item.");
    }
  };

  return (
    <div>
      <h2 className="text-3xl md:text-4xl lg:text-6xl font-semibold mt-10 mb-20 text-center">
        UPDATE
      </h2>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto bg-gray-100 p-8 rounded shadow-md"
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
          noValidate
        >
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Recipe name*
            </label>
            <input
              id="name"
              type="text"
              {...register("name", {
                required: "Recipe name is required",
              })}
              placeholder="Recipe name"
              className={`mt-1 block w-full border rounded px-3 py-2 ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
              aria-invalid={errors.name ? "true" : "false"}
            />
            {errors.name && (
              <p role="alert" className="text-red-500 text-sm mt-1">
                {errors.name.message}
              </p>
            )}
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700"
              >
                Category*
              </label>
              <select
                id="category"
                {...register("category", { required: "Category is required" })}
                className={`mt-1 block w-full border rounded px-3 py-2 ${
                  errors.category ? "border-red-500" : "border-gray-300"
                }`}
                aria-invalid={errors.category ? "true" : "false"}
              >
                <option value="">Select a category</option>
                <option value="salad">Salad</option>
                <option value="soup">Soup</option>
                <option value="pizza">Pizza</option>
                <option value="dessert">Dessert</option>
                <option value="drinks">Drinks</option>
              </select>
              {errors.category && (
                <p role="alert" className="text-red-500 text-sm mt-1">
                  {errors.category.message}
                </p>
              )}
            </div>

            <div className="flex-1">
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700"
              >
                Price*
              </label>
              <input
                id="price"
                type="number"
                step="0.01"
                {...register("price", {
                  required: "Price is required",
                  min: { value: 0, message: "Price must be positive" },
                })}
                placeholder="Price"
                className={`mt-1 block w-full border rounded px-3 py-2 ${
                  errors.price ? "border-red-500" : "border-gray-300"
                }`}
                aria-invalid={errors.price ? "true" : "false"}
              />
              {errors.price && (
                <p role="alert" className="text-red-500 text-sm mt-1">
                  {errors.price.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="recipe"
              className="block text-sm font-medium text-gray-700"
            >
              Recipe recipe*
            </label>
            <textarea
              id="recipe"
              {...register("recipe", {
                required: "Recipe recipe are required",
              })}
              placeholder="Recipe"
              rows="5"
              className={`mt-1 block w-full border rounded px-3 py-2 ${
                errors.recipe ? "border-red-500" : "border-gray-300"
              }`}
              aria-invalid={errors.recipe ? "true" : "false"}
            ></textarea>
            {errors.recipe && (
              <p role="alert" className="text-red-500 text-sm mt-1">
                {errors.recipe.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-yellow-700 text-white px-6 py-2 rounded flex items-center gap-2 hover:bg-yellow-800 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            Update Item <FaUtensils />
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default UpdateItem;
