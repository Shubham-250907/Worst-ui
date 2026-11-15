import React, { useState } from 'react';
import TopBar from './components/TopBar';
import Stage1Register from './components/Stage1Register';
import Stage2Captcha from './components/Stage2Captcha';
import Stage3Login from './components/Stage3Login';
import WorstCalculator from './components/WorstCalculator';

export default function App() {
  // Current stage: 1 = Register, 2 = Captcha, 3 = Re-Login, 4 = Calculator
  const [stage, setStage] = useState(1);
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
    reason: '',
  });

  const handleStage1Complete = (creds) => {
    setCredentials(creds);
    setStage(2);
  };

  const handleStage2Complete = () => {
    setStage(3);
  };

  const handleStage3Complete = () => {
    setStage(4);
  };

  const handleResetApp = () => {
    setStage(1);
    setCredentials({ username: '', password: '', reason: '' });
  };

  return (
    <div className="min-h-screen bg-[#fffbeb] text-black flex flex-col font-comic selection:bg-pink-400 selection:text-black">
      {/* PERSISTENT TOP BAR (Always Visible Across All Screens) */}
      <TopBar onResetApp={handleResetApp} />

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 pt-16 pb-8 px-3 flex flex-col items-center justify-center">
        {/* STAGE 1: REGISTRATION */}
        {stage === 1 && (
          <div className="w-full flex flex-col items-center">
            <Stage1Register onComplete={handleStage1Complete} />
          </div>
        )}

        {/* STAGE 2: 10-IMAGE ROBOT CAPTCHA */}
        {stage === 2 && (
          <div className="w-full flex flex-col items-center">
            <Stage2Captcha onComplete={handleStage2Complete} />
          </div>
        )}

        {/* STAGE 3: MANDATORY RE-LOGIN */}
        {stage === 3 && (
          <div className="w-full flex flex-col items-center">
            <Stage3Login
              savedCredentials={credentials}
              onComplete={handleStage3Complete}
            />
          </div>
        )}

        {/* STAGE 4: THE WORST FUNCTIONAL CALCULATOR */}
        {stage === 4 && (
          <div className="w-full">
            <WorstCalculator />
          </div>
        )}
      </main>
    </div>
  );
}
