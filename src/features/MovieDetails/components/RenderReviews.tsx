import UNAVAILABLE_IMAGE from "@/assets/UNAVAILABLE_IMAGE.jpg";

interface Review {
  author: string;
  date: string;
  title: string;
  content: string;
}

const reviews: Review[] = [
  {
    author: "TheTenth",
    date: "December 26, 2012",
    title: "A review by TheTenth",
    content:
      "Extremely disappointing idea theft. So once there was 'The most dangerous game' (you see 'game' in the title?) where shipwrecked survivors are hunted by Count Zaroff and if they survive they're free. Then on the 'survive or win' we have Cube, Saw, Death race, Hunger games, Battle royale..."
  },
  {
    author: "AnotherAuthor",
    date: "January 10, 2015",
    title: "A review by AnotherAuthor",
    content:
      "This is another review content to test the display functionality. It is a mock review added to demonstrate the three-review limit in this component..."
  },
  {
    author: "SampleAuthor",
    date: "March 14, 2020",
    title: "A review by SampleAuthor",
    content:
      "Yet another review. This one is just a sample to test how the third review displays in the list of reviews..."
  },
  {
    author: "FourthAuthor",
    date: "June 20, 2023",
    title: "A review by FourthAuthor",
    content:
      "This is the fourth review. It should not be displayed as we are limiting the reviews to three in this example..."
  }
  // Add more reviews if necessary
];

export const RenderReviews = () => {
  const handleViewAllReviews = () => {
    console.log("View all reviews");
  };

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
          <div key={index} className="flex items-start pb-4 mb-6 space-x-4 border-b border-gray5 last:border-b-0">
            {/* Avatar */}
            <div className="flex-shrink-0 w-12 h-12 overflow-hidden rounded-full">
              <img src={UNAVAILABLE_IMAGE} alt={review.author} className="object-cover w-full h-full" />
            </div>

            {/* Review Content */}
            <div className="flex-1">
              <h3 className="text-lg font-bold">{review.title}</h3>
              <p className="text-sm text-gray-500">
                Written by <span className="font-semibold">{review.author}</span> on {review.date}
              </p>
              <p className="mt-2 text-sm text-gray2">
                {review.content}
                <span className="cursor-pointer text-appSecondary hover:underline"> read the rest</span>
              </p>
            </div>
          </div>
        ))}
      </div>
      <div onClick={handleViewAllReviews} className="mt-4 text-lg cursor-pointer text-gray1 hover:text-gray1/80">
        View all reviews
      </div>
    </div>
  );
};
