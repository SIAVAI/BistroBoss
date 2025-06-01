import { useForm } from "react-hook-form";
import { FaStar } from "react-icons/fa";
import { useState } from "react";
import SectionTitle from "../../../../Components/SectionTitle/SectionTitle";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";
import useAuth from "../../../../Hooks/useAuth";
import { toast } from "react-toastify";

const GiveReview = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);

  const onSubmit = async (data) => {
    const formData = { ...data, rating };
    console.log("Review Submitted:", formData);

    const reviewData = {
      name: user?.name || user?.displayName || "Anonymous",
      details: formData.reviewDetail,
      rating: formData.rating,
      suggestions: formData.suggestion,
      email: user?.email || "anonymous@guest.com",
      createdAt: new Date(),
    };

    try {
      const response = await axiosPublic.post("/reviews", reviewData);
      if (response.data.insertedId) {
        toast.success("Review submitted successfully!");
        reset();
        setRating(0);
      } else {
        toast.error("Review submission failed. Try again.");
      }
    } catch (error) {
      console.error("Review submission error:", error);
      toast.error("Something went wrong.");
    }
  };

  return (
    <>
      <SectionTitle
        subheading="Sharing is Caring!!!"
        heading="GIVE A REVIEW..."
      ></SectionTitle>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-xl w-full">
          <h2 className="text-2xl font-bold text-center mb-4">RATE US!</h2>

          <div className="flex justify-center mb-6">
            {[...Array(5)].map((_, i) => {
              const currentRating = i + 1;
              return (
                <label key={i}>
                  <input
                    type="radio"
                    name="rating"
                    value={currentRating}
                    onClick={() => setRating(currentRating)}
                    className="hidden"
                  />
                  <FaStar
                    size={30}
                    className="cursor-pointer transition"
                    color={
                      currentRating <= (hover || rating) ? "#ffc107" : "#e4e5e9"
                    }
                    onMouseEnter={() => setHover(currentRating)}
                    onMouseLeave={() => setHover(null)}
                  />
                </label>
              );
            })}
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block font-medium mb-1">
                Which recipe you liked most?
              </label>
              <input
                {...register("recipe", { required: "This field is required" })}
                placeholder="Recipe you liked most"
                className="input input-bordered w-full bg-white"
              />
              {errors.recipe && (
                <p className="text-red-500 text-sm">{errors.recipe.message}</p>
              )}
            </div>

            <div>
              <label className="block font-medium mb-1">
                Do you have any suggestion for us?
              </label>
              <input
                {...register("suggestion")}
                placeholder="Suggestion"
                className="input input-bordered w-full bg-white"
              />
            </div>

            <div>
              <label className="block font-medium mb-1">
                Kindly express your care in a short way.
              </label>
              <textarea
                {...register("reviewDetail")}
                placeholder="Review in detail"
                className="textarea textarea-bordered w-full bg-white"
                rows={4}
              ></textarea>
            </div>

            <button
              type="submit"
              className="btn bg-yellow-700 text-white hover:bg-yellow-800 flex items-center gap-2"
            >
              Send Review 🚀
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default GiveReview;
