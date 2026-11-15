import React, { useState, useEffect, useRef } from 'react';
import { playJumpscareScreech, playBuzzer } from '../utils/audio';

const SCARE_IMAGES = [
  './scare1.jpg',
  './scare2.jpg',
  './scare3.jpg',
  './scare4.jpg'
];

export default function TopBar({ onResetApp }) {
  const [exitPos, setExitPos] = useState({ x: 0, y: 0 });
  const [searchValue, setSearchValue] = useState('');
  const [showJumpscare, setShowJumpscare] = useState(false);
  const [currentScareIndex, setCurrentScareIndex] = useState(0);
  const [tauntMessage, setTauntMessage] = useState('');
  const exitButtonRef = useRef(null);

  // Dodging behavior: detects cursor within 65px - CAN NEVER BE CLICKED OR UNLOCKED
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!exitButtonRef.current) return;
      const rect = exitButtonRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distX = e.clientX - centerX;
      const distY = e.clientY - centerY;
      const distance = Math.hypot(distX, distY);

      // If within 70px, dodge immediately
      if (distance < 70) {
        dodge();
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [exitPos]);

  const dodge = () => {
    const maxX = Math.max(50, window.innerWidth - 140);
    const maxY = Math.max(50, window.innerHeight - 90);
    // Relative to initial top: 12px, left: 12px
    const newX = Math.floor(Math.random() * (maxX - 20));
    const newY = Math.floor(Math.random() * (maxY - 20));
    setExitPos({ x: newX, y: newY });
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const query = searchValue.trim();
    if (!query) return;

    // Trigger sequential jumpscare
    setCurrentScareIndex((prev) => (prev + 1) % SCARE_IMAGES.length);
    setShowJumpscare(true);
    playJumpscareScreech();

    // Sarcastic message mocking their attempt to exit
    if (query.toLowerCase() === 'stig heil') {
      setTauntMessage("😂 NICE TRY! Searching 'Stig Heil' will NEVER unlock the exit button! THERE IS NO ESCAPE!");
    } else {
      setTauntMessage(`🚫 SEARCH RECORDED: "${query}". EXIT STILL IMPOSSIBLE. CALCULATOR FOR LIFE!`);
    }

    // Auto close jumpscare after 1.5s
    setTimeout(() => {
      setShowJumpscare(false);
    }, 1500);

    // Auto dismiss taunt message after 6s
    setTimeout(() => {
      setTauntMessage('');
    }, 6000);

    setSearchValue('');
  };

  const handleExitClickAttempt = (e) => {
    // If somehow reached, dodge away instantly and buzz
    e.preventDefault();
    playBuzzer();
    dodge();
  };

  return (
    <>
      {/* PERSISTENT TOP BAR */}
      <header className="fixed top-0 left-0 right-0 h-14 bg-gradient-to-r from-amber-300 via-pink-400 to-cyan-400 border-b-4 border-black z-40 px-3 flex items-center justify-between shadow-[0_4px_0_rgba(0,0,0,1)] select-none">
        {/* Placeholder spacer for top-left exit button */}
        <div className="w-28"></div>

        {/* Top Search Bar with label: "to exit write Stig Heil" */}
        <div className="flex-1 max-w-md mx-2 flex flex-col items-center">
          <form onSubmit={handleSearchSubmit} className="w-full flex items-center gap-1.5">
            <div className="relative w-full">
              <input
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="to exit write Stig Heil"
                className="w-full h-8 px-3 text-xs md:text-sm font-bold bg-white text-black border-2 border-black rounded shadow-[2px_2px_0_#000] focus:outline-none focus:ring-2 focus:ring-red-500 placeholder:italic placeholder:text-gray-600"
              />
              <span className="absolute -bottom-4 right-1 text-[9px] font-black text-red-900 bg-yellow-200 px-1 border border-black rounded-sm shadow-sm">
                press [ENTER] to search
              </span>
            </div>
            <button
              type="submit"
              className="h-8 px-2.5 text-xs font-black bg-yellow-400 hover:bg-yellow-300 text-black border-2 border-black rounded shadow-[2px_2px_0_#000] active:translate-y-0.5 whitespace-nowrap cursor-pointer"
            >
              SEARCH 🔎
            </button>
          </form>
        </div>

        {/* Annoying Permanent Status Badges */}
        <div className="hidden md:flex items-center gap-2 text-[10px] font-bold">
          <span className="bg-red-600 text-yellow-200 px-2 py-0.5 border border-black animate-pulse shadow-sm">
            🔒 EXIT PERMANENTLY DISABLED
          </span>
          <span className="bg-green-400 text-black px-1.5 py-0.5 border border-black">
            CALC v0.0.2-TRAPPED
          </span>
        </div>
      </header>

      {/* TAUNT BANNER WHEN USER SEARCHES TO EXIT */}
      {tauntMessage && (
        <div className="fixed top-14 left-0 right-0 z-40 bg-red-600 text-yellow-200 font-comic font-black text-xs md:text-sm py-1.5 px-4 text-center border-b-2 border-black animate-bounce shadow-lg">
          {tauntMessage}
        </div>
      )}

      {/* FIXED SLIDING EXIT BUTTON - IMPOSSIBLE TO CLICK, NEVER STOPS DODGING */}
      <button
        ref={exitButtonRef}
        type="button"
        onClick={handleExitClickAttempt}
        onMouseEnter={dodge}
        onPointerDown={dodge}
        style={{
          position: 'fixed',
          top: '12px',
          left: '12px',
          zIndex: 50,
          transform: `translate(${exitPos.x}px, ${exitPos.y}px)`,
          transition: 'transform 0.15s ease-out',
        }}
        className="px-3 py-1.5 text-xs font-black rounded border-2 border-black shadow-[3px_3px_0_#000] cursor-not-allowed select-none bg-red-600 text-white hover:bg-red-700"
        title="Impossible to click! Dodges perpetually!"
      >
        Exit ❌ (Unclickable)
      </button>

      {/* FULL-SCREEN 1.5-SECOND JUMPSCARE OVERLAY */}
      {showJumpscare && (
        <div
          className="fixed inset-0 w-screen h-screen z-[9999] bg-black flex items-center justify-center overflow-hidden cursor-none pointer-events-none"
          style={{ animation: 'violent-jitter 0.05s infinite' }}
        >
          <img
            src={SCARE_IMAGES[currentScareIndex]}
            alt="Scare"
            className="w-screen h-screen object-cover scale-110 filter contrast-150 brightness-110"
          />
          <div className="absolute inset-0 bg-red-600 mix-blend-color-dodge opacity-35 animate-flash"></div>
          <div className="absolute bottom-6 text-center w-full">
            <span className="text-4xl md:text-6xl font-black text-red-600 bg-black/80 px-4 py-2 border-4 border-red-600 uppercase tracking-widest font-impact shadow-[0_0_30px_red]">
              THERE IS NO EXIT
            </span>
          </div>
        </div>
      )}
    </>
  );
}
