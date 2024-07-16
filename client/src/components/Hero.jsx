import Footer from "./Footer";
import SearchBar from "./SearchBar";

const Hero = () => {
  return (
    <>
      <section className="bg-white dark:bg-[#031108]">
        <div className="grid min-h-screen max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
          <div className="mr-auto place-self-center lg:col-span-7">
            <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
              Search a song, get its BPMs and recommendations.
            </h1>
            <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
              Get the track's info and tempo while browsing new songs with the same BPMs. 
            </p>
            <SearchBar />
          </div>
          <div className="lg:mt-0 lg:col-span-5 lg:flex">
            <img
              src="https://www.pioneerdj.com/-/media/pioneerdj/images/products/player/cdj-2000nxs2/black/cdj-2000nxs2-angle.png?h=1316&w=1792&hash=1395ACF8C3AE41DE4301D6F45F2DF2D7"
              alt="mockup"
              className="w-full h-full object-cover"
            />
          </div>
          
        </div>
        <Footer />
      </section>
    </>
  );
};

export default Hero;
