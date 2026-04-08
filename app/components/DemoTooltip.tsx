'use client'
import React from 'react'

interface DemoTooltipProps {
  step: number;
  onNext: () => void;
  onExit: () => void;
}

const tooltipSteps = [
  {
    title: "Welcome to the Living Room!",
    description: "This is your cozy dashboard where everything begins. Take a look around!",
    position: { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }
  },
  {
    title: "Chat with Tomomi",
    description: "Click on this computer to start chatting with me! I can help you with Japan travel tips, local recommendations, and more.",
    position: { top: '65%', left: '81%', transform: 'translate(-50%, -50%)' },
    highlight: true
  },
  {
    title: "Personalized Experience",
    description: "I remember our conversations and can give you tailored advice based on your preferences. Try asking me about food, places to visit, or cultural tips!",
    position: { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }
  },
  {
    title: "That's it for now!",
    description: "Feel free to explore and chat with me. More features like food diaries and travel journals are coming soon!",
    position: { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }
  }
];

export default function DemoTooltip({ step, onNext, onExit }: DemoTooltipProps) {
  const currentTooltip = tooltipSteps[step];

  if (!currentTooltip) return null;

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50 z-40" />

      {/* Highlight area for computer */}
      {currentTooltip.highlight && (
        <div
          className="absolute z-50 ring-4 ring-purple-400 ring-offset-2 rounded-lg animate-pulse"
          style={{
            top: '64.5%',
            left: '81.2%',
            transform: 'translate(-50%, -50%)',
            width: '15%',
            height: '22.8%',
            pointerEvents: 'none'
          }}
        />
      )}

      {/* Tooltip */}
      <div
        className="fixed z-50 bg-white rounded-lg shadow-2xl p-6 max-w-md"
        style={currentTooltip.position}
      >
        <h3 className="text-2xl font-bold text-licorice mb-3">
          {currentTooltip.title}
        </h3>
        <p className="text-licorice mb-6">
          {currentTooltip.description}
        </p>

        <div className="flex justify-between items-center">
          <button
            onClick={onExit}
            className="btn glass hover:bg-gray-200 text-licorice"
          >
            Exit Demo
          </button>

          <div className="flex gap-2">
            {tooltipSteps.map((_, index) => (
              <div
                key={index}
                className={`h-2 w-2 rounded-full ${
                  index === step ? 'bg-purple-400' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>

          <button
            onClick={onNext}
            className="btn bg-gradient-to-r from-purple-200 via-purple-300 to-pink-200 hover:bg-gradient-to-bl border-2 border-white text-licorice font-bold"
          >
            {step < tooltipSteps.length - 1 ? 'Next' : 'Finish'}
          </button>
        </div>
      </div>
    </>
  );
}
