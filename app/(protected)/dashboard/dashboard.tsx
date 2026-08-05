'use client'
import React, { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import DashboardCarousel from '../../components/DashboardCarousel';
import Help from '../../components/Help';
import DemoStoryModal from '../../components/DemoStoryModal';
import DemoTooltip from '../../components/DemoTooltip';

export default function DashboardClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [helpView, setHelpView] = useState(false);
  const [showStory, setShowStory] = useState(true);
  const [tooltipStep, setTooltipStep] = useState<number | null>(null);

  const isDemoMode = searchParams.get('demo') === 'true';

  const handleStoryComplete = () => {
    setShowStory(false);
    setTooltipStep(0);
  };

  const handleStorySkip = () => {
    setShowStory(false);
    setTooltipStep(0);
  };

  const handleTooltipNext = () => {
    if (tooltipStep !== null) {
      const nextStep = tooltipStep + 1;
      if (nextStep >= 4) {
        setTooltipStep(null);
      } else {
        setTooltipStep(nextStep);
      }
    }
  };

  const handleExitDemo = () => {
    router.push('/');
  };

  return (
    <>
    {
      helpView ? (
        <div className="w-11/12 max-w-6xl rounded-2xl p-4 z-20 flex justify-center">
            <Help />
        </div>
      ) : (
        <div className="w-11/12 max-w-6xl rounded-2xl p-4 z-20 flex justify-center">
          <DashboardCarousel />
        </div>
     )
    }

    {isDemoMode ? (
      <button
        onClick={handleExitDemo}
        className="btn glass shadow-xl bg-white hover:bg-peach text-licorice flex justify-center z-50 absolute top-0 right-0 mr-4 mt-4"
      >
        Exit Demo
      </button>
    ) : (
      <button
        onClick={() => {setHelpView(!helpView)}}
        className="btn glass shadow-xl bg-white hover:bg-peach text-licorice flex justify-center z-50 absolute bottom-0 right-0 mr-12 mb-12 tablet:mb-4"
      >
        Help
      </button>
    )}

    {isDemoMode && showStory && (
      <DemoStoryModal
        onComplete={handleStoryComplete}
        onSkip={handleStorySkip}
      />
    )}

    {isDemoMode && tooltipStep !== null && !showStory && (
      <DemoTooltip
        step={tooltipStep}
        onNext={handleTooltipNext}
        onExit={handleExitDemo}
      />
    )}
    </>
  )
}