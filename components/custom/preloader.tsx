import React from "react";

const Preloader = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/80">
      <div className="w-16 h-16 border-4 border-[#cb0c9f] border-t-transparent rounded-full animate-spin" />
    </div>
  );
};

export default Preloader; 