"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Play, RotateCcw, Settings2 } from "lucide-react";

export default function ExperimentsPage() {
  const [gravity, setGravity] = useState(9.8);
  const [isDropping, setIsDropping] = useState(false);
  const [dropPosition, setDropPosition] = useState(0);

  // Simplified physics simulation
  useEffect(() => {
    let animationFrame: number;
    let startTime: number | null = null;
    
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = (timestamp - startTime) / 1000; // in seconds
      
      if (isDropping) {
        // d = 0.5 * g * t^2 (scaled for UI)
        const displacement = 0.5 * gravity * Math.pow(progress, 2) * 50; 
        
        if (displacement < 300) { // Max drop height in pixels
          setDropPosition(displacement);
          animationFrame = requestAnimationFrame(animate);
        } else {
          setDropPosition(300);
          setIsDropping(false);
        }
      }
    };

    if (isDropping) {
      animationFrame = requestAnimationFrame(animate);
    }

    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, [isDropping, gravity]);

  const resetDrop = () => {
    setIsDropping(false);
    setDropPosition(0);
  };

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
          Interactive Labs
        </h1>
        <p className="text-xl text-slate-400 max-w-2xl mx-auto">
          Play with the fundamental forces of nature right in your browser.
        </p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl max-w-4xl mx-auto">
        <div className="grid md:grid-cols-3 border-b border-slate-800">
          <div className="p-6 md:col-span-1 border-r border-slate-800 bg-slate-900/50">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Settings2 className="w-5 h-5 text-blue-400" /> Controls
            </h3>
            
            <div className="mb-8">
              <label className="block text-sm font-medium text-slate-400 mb-2">
                Gravity (g): <span className="text-white font-mono">{gravity} m/s²</span>
              </label>
              <input 
                type="range" 
                min="1.6" 
                max="25" 
                step="0.1" 
                value={gravity}
                onChange={(e) => {
                  setGravity(Number(e.target.value));
                  resetDrop();
                }}
                className="w-full accent-blue-500"
              />
              <div className="flex justify-between text-xs text-slate-500 mt-2">
                <span>Moon (1.6)</span>
                <span>Earth (9.8)</span>
                <span>Jupiter (24.7)</span>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => {
                  if (dropPosition >= 300) resetDrop();
                  setTimeout(() => setIsDropping(true), 50);
                }}
                disabled={isDropping}
                className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
              >
                <Play className="w-4 h-4" /> Drop
              </button>
              <button
                onClick={resetDrop}
                className="flex-1 flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white py-2 rounded-lg font-medium transition-colors"
              >
                <RotateCcw className="w-4 h-4" /> Reset
              </button>
            </div>
          </div>
          
          <div className="p-8 md:col-span-2 relative h-[450px] bg-gradient-to-b from-slate-900 to-slate-950 flex flex-col items-center">
            {/* The Drop Object */}
            <motion.div 
              className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-500 rounded-full shadow-[0_0_15px_rgba(239,68,68,0.5)] z-10 relative"
              style={{ top: `${dropPosition}px` }}
            />
            
            {/* Ruler/Scale */}
            <div className="absolute right-12 top-8 bottom-8 w-px bg-slate-700 flex flex-col justify-between items-end">
              {[0, 10, 20, 30, 40, 50].map(mark => (
                <div key={mark} className="flex items-center gap-2 w-8">
                  <span className="text-xs text-slate-500 font-mono">{mark}m</span>
                  <div className="h-px w-2 bg-slate-600" />
                </div>
              ))}
            </div>
            
            {/* Ground */}
            <div className="absolute bottom-0 left-0 w-full h-8 bg-slate-800 border-t border-slate-700 flex items-center justify-center text-xs text-slate-500 tracking-widest uppercase">
              Ground Level
            </div>
          </div>
        </div>
        
        <div className="p-6 bg-slate-950 text-sm text-slate-400">
          <p><strong>Experiment: Free Fall.</strong> This interactive lab demonstrates Newtonian gravity. Notice how increasing the gravitational constant ($g$) causes the object to accelerate faster towards the ground. The displacement follows the kinematic equation: $d = \frac{1}{2}gt^2$.</p>
        </div>
      </div>
    </div>
  );
}
