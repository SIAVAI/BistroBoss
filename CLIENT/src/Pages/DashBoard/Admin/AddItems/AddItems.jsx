/* eslint-disable no-unused-vars */
import { useForm } from "react-hook-form";
import { FaUtensils } from "react-icons/fa";
import SectionTitle from "../../../../Components/SectionTitle/SectionTitle";
import { motion } from "framer-motion";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { toast } from "react-toastify";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_API_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?expiration=600&key=${image_hosting_key}`;

const AddItems = () => {
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("image", data.image[0]);

      // Upload image
      const imgRes = await axiosPublic.post(image_hosting_api, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (imgRes.data.success) {
        const food = {
          name: data.recipeName,
          recipe: data.details,
          image: imgRes.data.data.display_url,
          category: data.category,
          price: parseFloat(data.price),
        };

        // Post food item to  menu API
        const menuRes = await axiosSecure.post("/menu", food);

        if (menuRes.status === 200) {
          toast.success("Congrats!! New Food Item Added To The Menu!!!");
        } else {
          toast.error("There was an error adding the food item.");
        }
      } else {
        toast.error("Image upload failed.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <>
      <SectionTitle subheading="What's new?" heading="Add Items"></SectionTitle>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto bg-gray-100 p-8 rounded shadow-md"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Recipe name*
            </label>
            <input
              type="text"
              {...register("recipeName", { required: true })}
              placeholder="Recipe name"
              className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
            />
            {errors.recipeName && (
              <span className="text-red-500 text-sm">
                This field is required
              </span>
            )}
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">
                Category*
              </label>
              <select
                {...register("category", { required: true })}
                className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
              >
                <option value="salad">Salad</option>
                <option value="soup">Soup</option>
                <option value="pizza">Pizza</option>
                <option value="dessert">Dessert</option>
                <option value="drinks">Drinks</option>
              </select>
              {errors.category && (
                <span className="text-red-500 text-sm">
                  This field is required
                </span>
              )}
            </div>

            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">
                Price*
              </label>
              <input
                type="number"
                step="0.01"
                {...register("price", { required: true })}
                placeholder="Price"
                className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
              />
              {errors.price && (
                <span className="text-red-500 text-sm">
                  This field is required
                </span>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Recipe Details*
            </label>
            <textarea
              {...register("details", { required: true })}
              placeholder="Recipe Details"
              rows="5"
              className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
            ></textarea>
            {errors.details && (
              <span className="text-red-500 text-sm">
                This field is required
              </span>
            )}
          </div>

          <div className="">
            <label className="block text-sm font-medium text-gray-700">
              Upload Image
            </label>
            <input
              type="file"
              {...register("image")}
              className="mt-1 block w-full font-semibold"
            />
          </div>

          <button
            type="submit"
            className="bg-yellow-700 text-white px-6 py-2 rounded flex items-center gap-2 hover:bg-yellow-800"
          >
            Add Item <FaUtensils />
          </button>
        </form>
      </motion.div>
    </>
  );
};

export default AddItems;
