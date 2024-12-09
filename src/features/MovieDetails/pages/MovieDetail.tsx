import default_poster from "@/assets/Homepage/poster.jpg";
import default_backdrop from "@/assets/Homepage/backdrop.jpeg";

export const MovieDetail = () => {
  return (
    <div className="min-h-screen">
      <div className="relative">
        {/* Backdrop Image */}
        <div className="h-[400px]">
          <img src={default_backdrop} alt="Backdrop" className="object-cover w-full h-full" />
        </div>

        {/* Content Overlay */}
        <div className="absolute top-0 flex flex-col items-center gap-8 p-8 mx-auto bg-gradient-to-t from-slate-100 via-slate-100/90 to-slate-50/50 lg:flex-row lg:items-start">
          <div className="w-64 overflow-hidden rounded-lg shadow-lg h-96">
            <img src={default_poster} alt="The Boy and the Heron" className="object-cover w-full h-full" />
          </div>

          {/* Movie Info */}
          <div className="flex-1 text-gray-800">
            <h1 className="text-3xl font-bold">
              The Boy and the Heron <span className="text-2xl font-normal">(2023)</span>
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              G • 12/15/2023 (VN) • Animation, Adventure, Fantasy, Family, Drama • 2h 4m
            </p>

            {/* User Score and Actions */}
            <div className="flex items-center gap-4 mt-4">
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-12 h-12 text-sm font-bold text-white rounded-full bg-gradient-to-tr from-appPrimary to-purple-400">
                  75%
                </div>
                <span className="text-sm font-medium">User Score</span>
              </div>
            </div>

            {/* Action Icons */}
            <div className="flex items-center gap-4 mt-6">
              <button className="flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full">
                <span className="text-lg">☰</span>
              </button>
              <button className="flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full">
                <span className="text-lg">❤</span>
              </button>
              <button className="flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full">
                <span className="text-lg">🔖</span>
              </button>
              <button className="px-4 py-2 text-sm text-white rounded-lg bg-gray1">▶ Play Trailer</button>
            </div>

            {/* Tagline */}
            <p className="mt-6 italic text-gray-500">Where death comes to an end, life finds a new beginning.</p>

            {/* Overview */}
            <div className="mt-4">
              <h2 className="text-xl font-semibold">Overview</h2>
              <p className="mt-2 text-sm line-clamp-3">
                While the Second World War rages, the teenage Mahito, haunted by his mother's tragic death, is relocated
                from Tokyo to the serene rural home of his new stepmother Natsuko, a woman who bears a striking
                resemblance to the boy's mother. As he tries to adjust, this strange new world grows even stranger
                following the appearance of a persistent gray heron, who perplexes and bedevils Mahito, dubbing him the
                "long-awaited one."
              </p>
            </div>

            {/* Director Info */}
            <div className="mt-4">
              <h3 className="font-bold">Hayao Miyazaki</h3>
              <p className="text-sm text-gray-600">Director, Writer</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
