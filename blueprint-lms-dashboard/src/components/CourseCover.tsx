/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Laptop, Terminal } from "lucide-react";

interface CourseCoverProps {
  size?: "lg" | "md" | "sm" | "xs";
  title?: string;
  subtitle?: string;
}

export default function CourseCover({ size = "md", title = "AI AGENT &", subtitle = "VIBE CODING BOOTCAMP" }: CourseCoverProps) {
  // Determine dimensions based on selected size props
  let containerClass = "w-48 h-48 rounded-2xl p-4";
  let titleFontSize = "text-[15px]";
  let labelFontSize = "text-[9px]";
  let laptopScaleClass = "scale-100";
  let spacingClass = "mt-2";

  if (size === "lg") {
    containerClass = "w-40 h-40 rounded-2xl p-4";
    titleFontSize = "text-[13px]";
    labelFontSize = "text-[8px]";
    laptopScaleClass = "scale-90 origin-bottom";
    spacingClass = "mt-1.5";
  } else if (size === "md") {
    containerClass = "w-32 h-32 rounded-xl p-3";
    titleFontSize = "text-[11px]";
    labelFontSize = "text-[7px]";
    laptopScaleClass = "scale-75 origin-bottom";
    spacingClass = "mt-1";
  } else if (size === "sm") {
    containerClass = "w-24 h-24 rounded-lg p-2.5";
    titleFontSize = "text-[8.5px]";
    labelFontSize = "text-[6px]";
    laptopScaleClass = "scale-55 origin-bottom";
    spacingClass = "mt-0.5";
  } else if (size === "xs") {
    containerClass = "w-11 h-11 rounded-md p-1 flex items-center justify-center";
    titleFontSize = "text-[5px]";
    labelFontSize = "text-[0px]"; // hide
    laptopScaleClass = "scale-35 origin-bottom hidden";
    spacingClass = "mt-0";
  }

  return (
    <div className={`relative ${containerClass} bg-gradient-to-br from-[#0a0f1d] via-[#070b16] to-[#04060b] flex-shrink-0 overflow-hidden flex flex-col justify-between border border-[#16233d] shadow-md shadow-blue-900/5 transition-all duration-300`}>
      {/* Neon mesh glowing background circles */}
      <div className="absolute top-[-20%] left-[-20%] w-[105%] h-[100%] rounded-full bg-blue-500/15 blur-2xl pointer-events-none filter" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[90%] h-[90%] rounded-full bg-indigo-500/15 blur-2xl pointer-events-none filter" />
      
      {/* Dynamic grid overlay lines */}
      <div className="absolute inset-0 z-0 opacity-10" style={{
        backgroundImage: "radial-gradient(#3b82f6 1px, transparent 1px)",
        backgroundSize: "12px 12px"
      }} />

      {/* Typography details */}
      <div className="z-10 text-left">
        {labelFontSize !== "text-[0px]" && (
          <h4 className={`font-mono ${labelFontSize} font-bold text-blue-400 tracking-widest uppercase opacity-80`}>
            BLUEPRINT
          </h4>
        )}
        <h2 className={`font-extrabold ${titleFontSize} text-white leading-tight tracking-wide ${spacingClass} font-mono uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]`}>
          {title}<br />{subtitle}
        </h2>
      </div>

      {/* Glowing Laptops artwork */}
      {size !== "xs" && (
        <div className={`relative z-10 w-full flex justify-center space-x-0.5 mt-auto ${laptopScaleClass}`}>
          {/* Left laptop */}
          <div className="relative w-14 h-10 flex flex-col items-center">
            <div className="w-[85%] h-7 rounded bg-[#111827] border border-blue-500/35 relative flex items-center justify-center overflow-hidden shadow-[0_0_8px_rgba(59,130,246,0.25)]">
              {/* Screen info */}
              <Terminal size={9} className="text-cyan-400 animate-pulse" />
              <div className="absolute bottom-0.5 leading-[3px] text-[2.5px] text-green-400/85 font-mono left-0.5">
                &gt; code...
              </div>
            </div>
            <div className="w-full h-1 bg-gray-600 rounded-b border-t border-gray-500 flex items-center justify-center">
              <div className="w-3 h-0.5 bg-gray-400 rounded-full" />
            </div>
          </div>

          {/* Right laptop */}
          <div className="relative w-14 h-10 flex flex-col items-center mt-1.5">
            <div className="w-[85%] h-7 rounded bg-[#0f172a] border border-indigo-500/35 relative flex items-center justify-center overflow-hidden shadow-[0_0_8px_rgba(99,102,241,0.25)]">
              {/* Screen UI components */}
              <Laptop size={9} className="text-purple-400" />
              <div className="absolute top-0.5 left-0.5 flex space-x-0.5">
                <span className="w-0.5 h-0.5 rounded-full bg-red-500 scale-75"></span>
                <span className="w-0.5 h-0.5 rounded-full bg-yellow-500 scale-75"></span>
              </div>
            </div>
            <div className="w-full h-1 bg-gray-700 rounded-b border-t border-gray-600 flex items-center justify-center">
              <div className="w-3 h-0.5 bg-gray-500 rounded-full" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
