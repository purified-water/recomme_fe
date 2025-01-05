import UNAVAILABLE_IMAGE from "@/assets/unavailable_image.jpg";

interface CastMember {
  name: string;
  role: string;
  image: string;
  episodes: number;
}

const castData: CastMember[] = [
  {
    name: "Genta Nakamura",
    role: "Kenta Morobishi (voice)",
    image: "/path-to-image1.jpg",
    episodes: 14
  },
  {
    name: "Haruna Mikawa",
    role: "Aoi Mizushino (voice)",
    image: "/path-to-image2.jpg",
    episodes: 14
  },
  {
    name: "Reina Ueda",
    role: "Shizuku Kousaka (voice)",
    image: "/path-to-image3.jpg",
    episodes: 14
  },
  {
    name: "Daisuke Hirakawa",
    role: "Shin Mogami (voice)",
    image: "/path-to-image4.jpg",
    episodes: 14
  },
  {
    name: "Hiroki Touchi",
    role: "Taiga Shirakawa (voice)",
    image: "/path-to-image5.jpg",
    episodes: 14
  },
  {
    name: "Banjo Ginga",
    role: "Kiyoomi Goto (voice)",
    image: "/path-to-image6.jpg",
    episodes: 14
  }
  // Add more cast members as needed
];

export const RenderCast = () => {
  const handleViewAllCast = () => {
    console.log("View all cast members");
  };

  return (
    <div className="px-12 py-6 mt-6 mb-2">
      <h2 className="mb-4 text-2xl font-bold">Series Cast</h2>
      <div className="flex pb-4 space-x-4 overflow-x-auto scrollbar-hide">
        {castData.map((cast, index) => (
          <div key={index} className="min-w-[150px] max-w-[150px] rounded-lg shadow-md bg-white">
            <img src={UNAVAILABLE_IMAGE} alt={cast.name} className="w-full h-[200px] object-cover rounded-t-lg" />
            <div className="p-4">
              <h3 className="text-sm font-semibold line-clamp-2">{cast.name}</h3>
              <p className="text-xs text-gray4 line-clamp-2">{cast.role}</p>
              <p className="mt-1 text-xs text-gray1">{cast.episodes} Episodes</p>
            </div>
          </div>
        ))}
      </div>
      <div onClick={handleViewAllCast} className="mt-4 text-lg cursor-pointer hover:text-gray3 w-fit">
        Full cast and crew
      </div>
    </div>
  );
};
