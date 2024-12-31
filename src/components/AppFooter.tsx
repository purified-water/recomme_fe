export const AppFooter = () => {
  return (
    <div className="flex flex-col w-full p-8 mt-20 space-y-6 text-white self:end md:h-64 bg-gradient-to-r from-purple-500 via-pink-500 to-appPrimary md:space-y-0 md:flex-row md:space-x-12">
      <div id="app-name" className="flex flex-col">
        <p className="text-2xl font-bold md:text-3xl">RecomMe</p>
        <p className="text-md md:text-base">Explore movies and get the best recommendations!</p>
      </div>

      <div id="app-services" className="flex flex-col">
        <p className="mt-4 mb-2 text-lg font-bold md:mt-0">Services</p>
        <a href="/movies" className="text-sm md:text-base">
          Movies
        </a>
        <a href="/recommendation" className="mt-2 text-sm md:text-base">
          Recommendation
        </a>
      </div>

      <div id="app-about" className="flex flex-col w-48">
        <p className="mt-4 mb-2 text-lg font-bold md:mt-0">About us</p>
        <a href="#" className="text-sm md:text-base">
          Team
        </a>
        <a href="https://github.com/purified-water/recomme_fe" className="mt-2 text-sm md:text-base">
          Contact
        </a>
      </div>

      <div id="copyright" className="flex self-end justify-end w-full mt-4 text-center md:mt-0 md:text-right">
        <p className="text-sm md:text-base">Copyright © RecomMe 2024</p>
      </div>
    </div>
  );
};
