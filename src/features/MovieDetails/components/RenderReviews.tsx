import React, { useEffect, useState } from "react";
import UNAVAILABLE_IMAGE from "@/assets/UNAVAILABLE_IMAGE.jpg";
import { movieApi } from "@/lib/api/movieApi";
import { getUserIdFromLocalStorage } from "@/utils/UserLocalStorage";
import { formatDateTime } from "@/utils/FormatDateTime";
import { useToast } from "@/hooks/use-toast";

interface Review {
  author: string;
  time: string;
  content: string;
}

interface RenderReviewsProps {
  movieId: number | undefined; // Pass movieId as a prop
}

export const RenderReviews: React.FC<RenderReviewsProps> = ({ movieId }) => {
  const { toast } = useToast();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReview, setNewReview] = useState<string>("");
  const [isPosting, setIsPosting] = useState<boolean>(false);
  const userId = getUserIdFromLocalStorage();

  // Fetch reviews from API
  const fetchReviews = async () => {
    try {
      const response = await movieApi.getReviewByMovieId(movieId!);
      setReviews(response.data.result || []);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  // Post a new review
  const handlePostReview = async () => {
    if (!userId) {
      toast({
        variant: "destructive",
        description: "Please login to post a review"
      });
      return;
    }
    if (!newReview.trim()) return; // Prevent posting empty reviews
    setIsPosting(true);
    try {
      // Mock API request to post a review
      await movieApi.postReviewByMovieId(movieId!, {
        author: `User ${userId}`, // Replace with authenticated user's name
        content: newReview
      });

      setNewReview(""); // Clear the input field
      fetchReviews(); // Refresh reviews
    } catch (error) {
      console.error("Error posting review:", error);
    } finally {
      setIsPosting(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [movieId]);

  // Limit reviews to three
  const limitedReviews = reviews.slice(0, 3);

  return (
    <div className="px-12">
      <h2 className="mb-4 text-2xl font-bold">Social</h2>

      <div className="flex items-center mb-6">
        <button className="mr-4 text-lg font-semibold border-b-2 border-black">Reviews</button>
      </div>

      <div className="p-4 bg-white rounded-lg shadow-md">
        {limitedReviews.map((review, index) => (
          <div key={index} className="flex items-start space-x-4 border-b border-gray5 last:border-b-0">
            {/* Avatar */}
            <div className="flex-shrink-0 w-12 h-12 overflow-hidden rounded-full">
              <img src={UNAVAILABLE_IMAGE} alt={review.author} className="object-cover w-full h-full" />
            </div>

            {/* Review Content */}
            <div className="flex-1">
              <h3 className="text-lg font-bold">{review.author}</h3>
              <p className="text-sm text-gray-500">
                Written by <span className="font-semibold">{review.author}</span> on {formatDateTime(review.time)}
              </p>
              <p className="mt-2 text-sm text-gray2 line-clamp-3">
                {review.content}
                {/* <span className="cursor-pointer text-appSecondary hover:underline"> read the rest</span> */}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 text-lg cursor-pointer text-gray1 hover:text-gray1/80">View all reviews</div>

      {/* Input for Posting Review */}
      <div className="mt-6">
        <h3 className="mb-2 text-lg font-bold">Write a Review</h3>
        <textarea
          value={newReview}
          onChange={(e) => setNewReview(e.target.value)}
          rows={4}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-appPrimary"
          placeholder="Share your thoughts about this movie..."
        ></textarea>
        <button
          onClick={handlePostReview}
          disabled={isPosting}
          className="px-4 py-2 mt-2 text-white rounded-md bg-appPrimary hover:bg-appPrimary/90 disabled:bg-gray-400"
        >
          {isPosting ? "Posting..." : "Post Review"}
        </button>
      </div>
    </div>
  );
};
