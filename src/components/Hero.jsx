import React, { useRef, useEffect } from "react";
import { FaCircle } from "react-icons/fa";

function Hero({ heroData, heroCount, setHeroCount }) {
  const heroRef = useRef(null);

  // 🔁 Swipe Gesture Logic (for small devices)
  useEffect(() => {
    const hero = heroRef.current;
    let startX = 0;
    let endX = 0;

    const handleTouchStart = (e) => {
      startX = e.touches[0].clientX;
    };

    const handleTouchEnd = (e) => {
      endX = e.changedTouches[0].clientX;
      const diff = startX - endX;

      // Only trigger swipe if difference is significant
      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          // swipe left → next slide
          setHeroCount((prev) => (prev + 1) % 4);
        } else {
          // swipe right → previous slide
          setHeroCount((prev) => (prev - 1 + 4) % 4);
        }
      }
    };

    // Attach only on small devices
    if (window.innerWidth <= 768) {
      hero.addEventListener("touchstart", handleTouchStart);
      hero.addEventListener("touchend", handleTouchEnd);
    }

    return () => {
      hero.removeEventListener("touchstart", handleTouchStart);
      hero.removeEventListener("touchend", handleTouchEnd);
    };
  }, [setHeroCount]);

  return (
    <div ref={heroRef} className="w-[40%] h-[100%] relative overflow-hidden">
      <div className="absolute text-gray-300 text-[20px] md:text-[40px] lg:text-[55px] left-[10%] top-[10px] md:top-[90px] lg:top-[130px] select-none">
        <p>{heroData.text1}</p>
        <p>{heroData.text2}</p>
      </div>

      <div className="absolute top-[160px] md:top-[400px] lg:top-[500px] left-[10%] flex justify-center items-center gap-[10px]">
        {[0, 1, 2, 3].map((i) => (
          <FaCircle
            key={i}
            className={`w-[14px] cursor-pointer ${
              heroCount === i ? "fill-orange-400" : "fill-white"
            }`}
            onClick={() => setHeroCount(i)}
          />
        ))}
      </div>
    </div>
  );
}

export default Hero;
