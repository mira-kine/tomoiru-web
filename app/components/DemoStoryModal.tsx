'use client'
import React, { useState, useEffect } from 'react'
import Image from "next/legacy/image";

interface DemoStoryModalProps {
  onComplete: () => void;
  onSkip: () => void;
}

const storyDialogs = [
  "Hi there! I'm Tomomi, your travel companion for Japan.",
  "You might be wondering... why does this app exist?",
  "Well, people kept asking me about Japan recommendations and tips that are hard to find on the web.",
  "As a local, I have insider knowledge that guidebooks just don't cover.",
  "I wanted to create something that could be your companion while I'm not available.",
  "Right now, I can chat with you about travel tips, local spots, and answer your questions!",
  "In the future, I'll help you organize food recommendations, keep a travel journal, and even connect with friends.",
  "But for now, let me show you around this cozy living room...",
];

export default function DemoStoryModal({ onComplete, onSkip }: DemoStoryModalProps) {
  const [currentDialog, setCurrentDialog] = useState(0);
  const [isTalking, setIsTalking] = useState(true);

  useEffect(() => {
    // Alternate between talking and closed mouth every 500ms
    const interval = setInterval(() => {
      setIsTalking(prev => !prev);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const handleNext = () => {
    if (currentDialog < storyDialogs.length - 1) {
      setCurrentDialog(prev => prev + 1);
    } else {
      onComplete();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.code === 'Space' || e.key === 'Enter') {
      e.preventDefault();
      handleNext();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <div className="relative w-full h-full">
        <div className="absolute inset-0">
          <Image
            src="/assets/welcome-bg.png"
            alt="Welcome background"
            layout="fill"
            objectFit="cover"
            priority={true}
          />
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center h-full px-4">
          {/* Tomomi Character */}
          <div className="mb-8">
            <Image
              src={isTalking ? "/assets/tomomi_open.png" : "/assets/tomomi_closed.png"}
              alt="Tomomi character"
              width={300}
              height={300}
              priority={true}
            />
          </div>

          <div className="bg-white/90 rounded-lg shadow-2xl p-8 max-w-2xl w-full">
            <p className="text-licorice text-xl tablet:text-2xl font-sans text-center mb-6">
              {storyDialogs[currentDialog]}
            </p>

            <div className="flex justify-center gap-2 mb-4">
              {storyDialogs.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 w-2 rounded-full ${
                    index === currentDialog ? 'bg-purple-400' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>

            {/* Controls */}
            <div className="flex justify-between items-center">
              <button
                onClick={onSkip}
                className="btn glass hover:bg-gray-200 text-licorice"
              >
                Skip Story
              </button>

              <span className="text-sm text-gray-600">
                Press Space or click to continue
              </span>

              <button
                onClick={handleNext}
                className="btn glass hover:bg-gray-200 text-licorice"
              >
                {currentDialog < storyDialogs.length - 1 ? 'Next' : 'Start Demo'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
