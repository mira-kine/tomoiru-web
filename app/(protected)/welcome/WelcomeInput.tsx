import React from "react";
import WelcomeTextBox from "./WelcomeTextBox";

export default function WelcomeInput() {
  return (
    <div className="bg-white z-10 w-3/4 p-4 font-sans text-2xl shadow-lg rounded-lg shadow-licorice/30">
      <div className="flex flex-col wrap">
        <WelcomeTextBox  />
      </div>
    </div>
  );
}
