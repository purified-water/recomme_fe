import { useState } from "react";
import { MdClose } from "rocketicons/md";
import { ratingHintsEnum } from "../constants/RatingHintsEnum";
import { Separator } from "@/components/ui/separator";

interface RatingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RateMovieModal = ({ isOpen, onClose }: RatingModalProps) => {
  const [rating, setRating] = useState(50);

  if (!isOpen) return null;

  const handleSubmitRating = () => {
    console.log("Rating submitted:", rating);
    onClose();
  };

  const handleClearRating = () => {
    setRating(0);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
        {/* Modal Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold">Rating</h2>
          <button className="text-gray-500 hover:text-gray-800" onClick={onClose}>
            <MdClose className="w-6 h-6" />
          </button>
        </div>
        <Separator className="mt-2" />

        {/* Modal Content */}
        <div className="mt-4">
          <p className="text-base text-gray-700">
            What did you think of <span className="font-semibold">Solo Leveling</span>?
          </p>
          <div className="flex items-center mt-6">
            <input
              type="range"
              min="10"
              max="100"
              step="10"
              value={rating}
              onChange={(e) => setRating(parseInt(e.target.value))}
              className="w-full accent-appSecondary"
            />
            <span className="ml-4 text-lg font-bold">{rating}%</span>
          </div>
          {/* Hint */}
          <p className="mt-2 text-sm text-gray-500">{ratingHintsEnum[rating] || "Select a rating"}</p>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between mt-6">
          <button className="text-appSecondary hover:underline" onClick={handleClearRating}>
            Clear my rating
          </button>
          <button
            className="px-4 py-2 text-white rounded bg-appSecondary hover:bg-appSecondary/80"
            onClick={handleSubmitRating}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};
