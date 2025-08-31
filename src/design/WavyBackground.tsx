import React from "react";

const WavyBackground: React.FC = () => {
  return (
    <section className="fixed -z-10 w-full h-screen overflow-hidden flex justify-center items-center">
      {/* Waves */}
      <div className="absolute left-0 w-full h-full bg-blue-600 shadow-inner">
        <span className="absolute w-[325vh] h-[325vh] top-0 left-1/2 -translate-x-1/2 -translate-y-[75%] rounded-[45%] bg-[rgba(20,20,20,1)] animate-wave1"></span>
        <span className="absolute w-[325vh] h-[325vh] top-0 left-1/2 -translate-x-1/2 -translate-y-[75%] rounded-[40%] bg-[rgba(20,20,20,0.5)] animate-wave2"></span>
        <span className="absolute w-[325vh] h-[325vh] top-0 left-1/2 -translate-x-1/2 -translate-y-[75%] rounded-[42.5%] bg-[rgba(20,20,20,0.5)] animate-wave3"></span>
      </div>
    </section>
  );
};

export default WavyBackground;


