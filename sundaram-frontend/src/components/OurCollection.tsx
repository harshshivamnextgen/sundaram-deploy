import { useNavigate } from "react-router-dom";

export default function OurCollection() {
  const navigate = useNavigate();
  return (
    <section
      className="w-full py-16 px-4 md:px-10"
      style={{ backgroundColor: "#fffef0" }}
    >
      {/* Section heading */}
      <p
        className="font-['Cormorant Garamond',serif] text-2xl md:text-3xl lg:text-[2rem] font-medium"
        style={{
          color: "#8c2635",
          letterSpacing: "0.04em",
        }}
      >
        Browse Latest Jewellery Collections
      </p>

      {/* Cards row */}
      <div className="flex flex-col md:flex-row items-start gap-8 md:gap-4 w-full px-4 md:px-0 pt-10 md:pt-20">

        {/* Column 1 */}
        <div className="relative flex-1 transition-all duration-700 hover:scale-[1.02]">
          <a href="/collections" className="block">
            <div className="relative w-full md:mt-11 lg:mt-3">
              <img
                src="./collection_1.jpg"
                alt="Collection 1"
                className="w-full h-auto object-cover rounded-lg shadow-lg"
              />
            </div>
          </a>
        </div>

        {/* Column 2 - Staggered Middle */}
        <div className="relative flex-1 md:-mt-12 lg:-mt-16 transition-all duration-700 hover:scale-[1.02]">
          <a href="/collections" className="block group">
            <div className="relative w-full">
              <img
                src="./collection_2.jpg"
                alt="Collection 2"
                className="w-full h-auto object-cover rounded-lg shadow-lg group-hover:opacity-90 transition-opacity"
              />
            </div>
          </a>
          <div className="flex justify-center mt-8">
            <button className="rounded-full px-8 py-3 text-[0.7rem] font-semibold uppercase tracking-widest border border-[#B8862A]/50 text-[#4a3f35] transition-all hover:border-[#8c2635] hover:text-[#8c2635] hover:-translate-y-1 cursor-pointer"
            onClick={() => navigate("/collections")}
           
            >
              Browse all Collections
            </button>
          </div>
        </div>

        {/* Column 3 */}
        <div className="relative flex-1 transition-all duration-700 hover:scale-[1.02]">
          <a href="/collections" className="block">
            <div className="relative w-full md:mt-11 lg:mt-3">
              <img
                src="./collection_3.jpg"
                alt="Collection 3"
                className="w-full h-auto object-cover rounded-lg shadow-lg"
              />
            </div>
          </a>
        </div>
      </div>

      {/* Browse all Collections button */}

    </section>
  );
}