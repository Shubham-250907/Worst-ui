import React, { useState } from 'react';
import { playBuzzer, playSuccessChime } from '../utils/audio';

// 10 SUSPICIOUSLY HAPPY TRIANGLES + 10 DECOYS (20 Crisp inline SVG illustrations)
const ALL_TILES = [
  // TARGET 1: Creepy grinning yellow triangle
  {
    id: 'happy-tri-1',
    isTarget: true,
    title: 'Specimen #847',
    svg: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <polygon points="50,12 88,88 12,88" fill="#facc15" stroke="#000" strokeWidth="3.5" />
        <circle cx="40" cy="50" r="7" fill="#fff" stroke="#000" strokeWidth="2" />
        <circle cx="40" cy="50" r="3" fill="#000" />
        <circle cx="60" cy="50" r="7" fill="#fff" stroke="#000" strokeWidth="2" />
        <circle cx="60" cy="50" r="3" fill="#000" />
        <path d="M 32 68 Q 50 86 68 68 Z" fill="#fff" stroke="#000" strokeWidth="2" />
        <line x1="42" y1="70" x2="42" y2="76" stroke="#000" strokeWidth="1.5" />
        <line x1="50" y1="70" x2="50" y2="78" stroke="#000" strokeWidth="1.5" />
        <line x1="58" y1="70" x2="58" y2="76" stroke="#000" strokeWidth="1.5" />
      </svg>
    ),
  },
  // TARGET 2: Party hat laughing green triangle
  {
    id: 'happy-tri-2',
    isTarget: true,
    title: 'Specimen #109',
    svg: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <polygon points="50,22 90,90 10,90" fill="#4ade80" stroke="#000" strokeWidth="3.5" />
        <polygon points="50,2 42,22 58,22" fill="#ec4899" stroke="#000" strokeWidth="2" />
        <circle cx="50" cy="2" r="3" fill="#fbbf24" />
        <ellipse cx="32" cy="66" rx="5" ry="3" fill="#f43f5e" opacity="0.8" />
        <ellipse cx="68" cy="66" rx="5" ry="3" fill="#f43f5e" opacity="0.8" />
        <path d="M 36 52 Q 43 45 47 52" fill="none" stroke="#000" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M 53 52 Q 57 45 64 52" fill="none" stroke="#000" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M 36 63 Q 50 84 64 63 Z" fill="#b91c1c" stroke="#000" strokeWidth="2" />
      </svg>
    ),
  },
  // TARGET 3: Starry-eyed ecstatic cyan triangle
  {
    id: 'happy-tri-3',
    isTarget: true,
    title: 'Specimen #331',
    svg: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <polygon points="50,15 86,85 14,85" fill="#22d3ee" stroke="#000" strokeWidth="3.5" />
        <path d="M 38 48 L 40 43 L 42 48 L 47 49 L 43 53 L 45 58 L 40 55 L 35 58 L 37 53 L 33 49 Z" fill="#fbbf24" stroke="#000" strokeWidth="1" />
        <path d="M 62 48 L 64 43 L 66 48 L 71 49 L 67 53 L 69 58 L 64 55 L 59 58 L 61 53 L 57 49 Z" fill="#fbbf24" stroke="#000" strokeWidth="1" />
        <path d="M 33 66 Q 50 80 67 66" fill="none" stroke="#000" strokeWidth="3" strokeLinecap="round" />
      </svg>
    ),
  },
  // TARGET 4: Hot pink smug grinning triangle
  {
    id: 'happy-tri-4',
    isTarget: true,
    title: 'Specimen #612',
    svg: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <polygon points="50,14 88,86 12,86" fill="#f472b6" stroke="#000" strokeWidth="3.5" />
        <path d="M 33 42 Q 40 37 46 41" fill="none" stroke="#000" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M 54 39 Q 60 34 67 40" fill="none" stroke="#000" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="40" cy="49" r="6" fill="#fff" stroke="#000" strokeWidth="2" />
        <circle cx="43" cy="49" r="3" fill="#000" />
        <circle cx="60" cy="49" r="6" fill="#fff" stroke="#000" strokeWidth="2" />
        <circle cx="63" cy="49" r="3" fill="#000" />
        <path d="M 33 64 Q 50 80 67 62" fill="none" stroke="#000" strokeWidth="3" strokeLinecap="round" />
      </svg>
    ),
  },
  // TARGET 5: Cool sunglasses golden triangle
  {
    id: 'happy-tri-5',
    isTarget: true,
    title: 'Specimen #505',
    svg: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <polygon points="50,15 88,85 12,85" fill="#eab308" stroke="#000" strokeWidth="3.5" />
        {/* Cool black shades */}
        <polygon points="30,46 48,46 45,58 32,58" fill="#000" />
        <polygon points="52,46 70,46 68,58 55,58" fill="#000" />
        <line x1="48" y1="48" x2="52" y2="48" stroke="#000" strokeWidth="3" />
        <line x1="30" y1="48" x2="22" y2="52" stroke="#000" strokeWidth="2" />
        <line x1="70" y1="48" x2="78" y2="52" stroke="#000" strokeWidth="2" />
        {/* Wide happy grin */}
        <path d="M 35 68 Q 50 84 65 68 Z" fill="#fff" stroke="#000" strokeWidth="2" />
      </svg>
    ),
  },
  // TARGET 6: Mustache gentleman orange triangle
  {
    id: 'happy-tri-6',
    isTarget: true,
    title: 'Specimen #720',
    svg: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <polygon points="50,14 88,86 12,86" fill="#fb923c" stroke="#000" strokeWidth="3.5" />
        <circle cx="40" cy="46" r="4" fill="#000" />
        <circle cx="60" cy="46" r="4" fill="#000" />
        {/* Curled mustache */}
        <path d="M 36 58 C 42 54 48 60 50 62 C 52 60 58 54 64 58 C 66 61 63 64 59 62 C 55 60 52 64 50 65 C 48 64 45 60 41 62 C 37 64 34 61 36 58 Z" fill="#000" />
        {/* Happy open mouth under mustache */}
        <path d="M 42 66 Q 50 78 58 66 Z" fill="#991b1b" stroke="#000" strokeWidth="1.5" />
      </svg>
    ),
  },
  // TARGET 7: Playful winking purple triangle with tongue
  {
    id: 'happy-tri-7',
    isTarget: true,
    title: 'Specimen #904',
    svg: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <polygon points="50,14 88,86 12,86" fill="#c084fc" stroke="#000" strokeWidth="3.5" />
        {/* Left eye open */}
        <circle cx="39" cy="48" r="6" fill="#fff" stroke="#000" strokeWidth="2" />
        <circle cx="39" cy="48" r="3" fill="#000" />
        {/* Right eye wink */}
        <path d="M 57 48 Q 63 42 69 48" fill="none" stroke="#000" strokeWidth="3" strokeLinecap="round" />
        {/* Smile with playful tongue sticking out */}
        <path d="M 36 64 Q 50 76 64 64" fill="none" stroke="#000" strokeWidth="3" strokeLinecap="round" />
        <path d="M 48 69 C 48 76 56 76 56 69 Z" fill="#f43f5e" stroke="#000" strokeWidth="1.5" />
      </svg>
    ),
  },
  // TARGET 8: Tears of joy sky blue triangle
  {
    id: 'happy-tri-8',
    isTarget: true,
    title: 'Specimen #215',
    svg: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <polygon points="50,15 86,85 14,85" fill="#38bdf8" stroke="#000" strokeWidth="3.5" />
        {/* Ecstatic laugh eyes ^^ */}
        <path d="M 33 50 Q 40 42 47 50" fill="none" stroke="#000" strokeWidth="3" strokeLinecap="round" />
        <path d="M 53 50 Q 60 42 67 50" fill="none" stroke="#000" strokeWidth="3" strokeLinecap="round" />
        {/* Tears of joy streaming sideways */}
        <path d="M 30 52 C 25 56 22 62 26 65 C 30 62 28 56 30 52" fill="#0284c7" />
        <path d="M 70 52 C 75 56 78 62 74 65 C 70 62 72 56 70 52" fill="#0284c7" />
        {/* Ecstatic open smile */}
        <path d="M 36 63 Q 50 82 64 63 Z" fill="#b91c1c" stroke="#000" strokeWidth="2" />
        <ellipse cx="50" cy="74" rx="6" ry="3" fill="#f87171" />
      </svg>
    ),
  },
  // TARGET 9: Cherubic lime green triangle with golden angel halo
  {
    id: 'happy-tri-9',
    isTarget: true,
    title: 'Specimen #448',
    svg: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Halo */}
        <ellipse cx="50" cy="10" rx="20" ry="5" fill="none" stroke="#fbbf24" strokeWidth="3" />
        <polygon points="50,20 88,88 12,88" fill="#84cc16" stroke="#000" strokeWidth="3.5" />
        {/* Happy closed curve eyes */}
        <path d="M 35 52 Q 42 46 48 52" fill="none" stroke="#000" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M 52 52 Q 58 46 65 52" fill="none" stroke="#000" strokeWidth="2.5" strokeLinecap="round" />
        {/* Sweet big beam */}
        <path d="M 36 65 Q 50 80 64 65" fill="none" stroke="#000" strokeWidth="3" strokeLinecap="round" />
        <circle cx="33" cy="65" r="4" fill="#f43f5e" opacity="0.7" />
        <circle cx="67" cy="65" r="4" fill="#f43f5e" opacity="0.7" />
      </svg>
    ),
  },
  // TARGET 10: Aristocrat magenta triangle with monocle & tiny top hat
  {
    id: 'happy-tri-10',
    isTarget: true,
    title: 'Specimen #999',
    svg: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Tiny top hat */}
        <rect x="42" y="4" width="16" height="14" fill="#18181b" />
        <line x1="36" y1="18" x2="64" y2="18" stroke="#18181b" strokeWidth="3" />
        <polygon points="50,18 88,88 12,88" fill="#d946ef" stroke="#000" strokeWidth="3.5" />
        {/* Left eye with monocle */}
        <circle cx="39" cy="48" r="8" fill="none" stroke="#fbbf24" strokeWidth="2.5" />
        <circle cx="39" cy="48" r="3" fill="#000" />
        <line x1="47" y1="48" x2="52" y2="70" stroke="#fbbf24" strokeWidth="1" />
        {/* Right eye */}
        <circle cx="61" cy="48" r="4" fill="#000" />
        {/* Cheerful wide aristocratic smirk */}
        <path d="M 36 66 Q 50 82 64 66" fill="none" stroke="#000" strokeWidth="3" strokeLinecap="round" />
      </svg>
    ),
  },

  // 10 DECOYS (Not happy triangles: sad, crying, angry, or wrong shapes)
  // DECOY 1: Sad weeping blue square
  {
    id: 'decoy-sq-sad',
    isTarget: false,
    title: 'Decoy #01',
    svg: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <rect x="18" y="18" width="64" height="64" fill="#60a5fa" stroke="#000" strokeWidth="3.5" />
        <circle cx="36" cy="42" r="5" fill="#000" />
        <circle cx="64" cy="42" r="5" fill="#000" />
        <path d="M 36 50 C 34 56 32 60 36 63 C 40 60 38 56 36 50" fill="#38bdf8" />
        <path d="M 34 68 Q 50 56 66 68" fill="none" stroke="#000" strokeWidth="3" strokeLinecap="round" />
      </svg>
    ),
  },
  // DECOY 2: Melancholy purple circle
  {
    id: 'decoy-cir-crying',
    isTarget: false,
    title: 'Decoy #02',
    svg: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <circle cx="50" cy="50" r="38" fill="#a855f7" stroke="#000" strokeWidth="3.5" />
        <line x1="32" y1="42" x2="44" y2="46" stroke="#000" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="68" y1="42" x2="56" y2="46" stroke="#000" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="38" cy="48" r="4" fill="#000" />
        <circle cx="62" cy="48" r="4" fill="#000" />
        <path d="M 35 70 Q 50 60 65 70" fill="none" stroke="#000" strokeWidth="3" strokeLinecap="round" />
      </svg>
    ),
  },
  // DECOY 3: Grumpy orange pentagon
  {
    id: 'decoy-penta-grump',
    isTarget: false,
    title: 'Decoy #03',
    svg: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <polygon points="50,14 86,40 72,82 28,82 14,40" fill="#f97316" stroke="#000" strokeWidth="3.5" />
        <line x1="32" y1="42" x2="44" y2="48" stroke="#000" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="68" y1="42" x2="56" y2="48" stroke="#000" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="39" cy="52" r="4" fill="#000" />
        <circle cx="61" cy="52" r="4" fill="#000" />
        <path d="M 36 70 Q 50 62 64 70" fill="none" stroke="#000" strokeWidth="3" strokeLinecap="round" />
      </svg>
    ),
  },
  // DECOY 4: Indifferent grey diamond
  {
    id: 'decoy-diam-bored',
    isTarget: false,
    title: 'Decoy #04',
    svg: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <polygon points="50,12 86,50 50,88 14,50" fill="#9ca3af" stroke="#000" strokeWidth="3.5" />
        <line x1="34" y1="46" x2="44" y2="46" stroke="#000" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="56" y1="46" x2="66" y2="46" stroke="#000" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="38" y1="62" x2="62" y2="62" stroke="#000" strokeWidth="3" strokeLinecap="round" />
      </svg>
    ),
  },
  // DECOY 5: Terrified red hexagon
  {
    id: 'decoy-hexa-scared',
    isTarget: false,
    title: 'Decoy #05',
    svg: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <polygon points="50,12 84,30 84,70 50,88 16,70 16,30" fill="#ef4444" stroke="#000" strokeWidth="3.5" />
        <circle cx="38" cy="45" r="7" fill="#fff" stroke="#000" strokeWidth="2" />
        <circle cx="38" cy="45" r="2" fill="#000" />
        <circle cx="62" cy="45" r="7" fill="#fff" stroke="#000" strokeWidth="2" />
        <circle cx="62" cy="45" r="2" fill="#000" />
        <ellipse cx="50" cy="65" rx="8" ry="10" fill="#7f1d1d" stroke="#000" strokeWidth="2" />
      </svg>
    ),
  },
  // DECOY 6: Sleepy teal star
  {
    id: 'decoy-star-sleepy',
    isTarget: false,
    title: 'Decoy #06',
    svg: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <polygon
          points="50,10 61,35 88,38 68,57 73,84 50,70 27,84 32,57 12,38 39,35"
          fill="#14b8a6"
          stroke="#000"
          strokeWidth="3"
        />
        <path d="M 38 46 Q 43 50 48 46" fill="none" stroke="#000" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M 52 46 Q 57 50 62 46" fill="none" stroke="#000" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="50" cy="56" r="4" fill="#000" />
      </svg>
    ),
  },
  // DECOY 7: Anxious pink oval sweating
  {
    id: 'decoy-oval-nervous',
    isTarget: false,
    title: 'Decoy #07',
    svg: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <ellipse cx="50" cy="50" rx="40" ry="32" fill="#fb7185" stroke="#000" strokeWidth="3.5" />
        <circle cx="38" cy="46" r="4" fill="#000" />
        <circle cx="62" cy="46" r="4" fill="#000" />
        {/* Nervous wavy mouth */}
        <path d="M 36 64 Q 43 60 50 64 Q 57 68 64 64" fill="none" stroke="#000" strokeWidth="2.5" strokeLinecap="round" />
        {/* Sweat drop */}
        <path d="M 72 36 C 70 40 68 43 72 45 C 75 43 74 40 72 36" fill="#38bdf8" />
      </svg>
    ),
  },
  // DECOY 8: Scowling brown trapezoid
  {
    id: 'decoy-trap-frown',
    isTarget: false,
    title: 'Decoy #08',
    svg: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <polygon points="28,20 72,20 88,80 12,80" fill="#a16207" stroke="#000" strokeWidth="3.5" />
        <line x1="34" y1="42" x2="44" y2="46" stroke="#000" strokeWidth="2.5" />
        <line x1="66" y1="42" x2="56" y2="46" stroke="#000" strokeWidth="2.5" />
        <circle cx="39" cy="50" r="4" fill="#000" />
        <circle cx="61" cy="50" r="4" fill="#000" />
        <path d="M 36 68 Q 50 56 64 68" fill="none" stroke="#000" strokeWidth="3" strokeLinecap="round" />
      </svg>
    ),
  },
  // DECOY 9: Skeptical green cross
  {
    id: 'decoy-cross-skeptical',
    isTarget: false,
    title: 'Decoy #09',
    svg: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <polygon points="36,12 64,12 64,36 88,36 88,64 64,64 64,88 36,88 36,64 12,64 12,36 36,36" fill="#16a34a" stroke="#000" strokeWidth="3.5" />
        {/* Raised eyebrow */}
        <line x1="38" y1="40" x2="46" y2="36" stroke="#000" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="42" cy="46" r="3.5" fill="#000" />
        <circle cx="58" cy="46" r="3.5" fill="#000" />
        <line x1="42" y1="58" x2="58" y2="54" stroke="#000" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    ),
  },
  // DECOY 10: Exhausted indigo cloud
  {
    id: 'decoy-cloud-tired',
    isTarget: false,
    title: 'Decoy #10',
    svg: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <path d="M 25 65 A 15 15 0 0 1 30 38 A 20 20 0 0 1 70 38 A 15 15 0 0 1 75 65 Z" fill="#6366f1" stroke="#000" strokeWidth="3.5" />
        <line x1="34" y1="48" x2="42" y2="48" stroke="#000" strokeWidth="2" />
        <line x1="58" y1="48" x2="66" y2="48" stroke="#000" strokeWidth="2" />
        {/* Eye bags */}
        <path d="M 33 52 Q 38 56 43 52" fill="none" stroke="#312e81" strokeWidth="1.5" />
        <path d="M 57 52 Q 62 56 67 52" fill="none" stroke="#312e81" strokeWidth="1.5" />
        <ellipse cx="50" cy="58" rx="3" ry="5" fill="#1e1b4b" />
      </svg>
    ),
  },
];

// Fisher-Yates shuffle
function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function Stage2Captcha({ onComplete }) {
  const [tiles, setTiles] = useState(() => shuffle(ALL_TILES));
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [errorMsg, setErrorMsg] = useState('');
  const [attempts, setAttempts] = useState(0);

  const toggleTile = (id) => {
    playBuzzer();
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleVerify = () => {
    const targetTiles = tiles.filter((t) => t.isTarget);
    const targetIds = new Set(targetTiles.map((t) => t.id));

    // Check how many correct targets user selected
    let correctCount = 0;
    let wrongCount = 0;

    selectedIds.forEach((id) => {
      if (targetIds.has(id)) {
        correctCount += 1;
      } else {
        wrongCount += 1;
      }
    });

    // Enforce STRICT requirement: Minimum 10 correct images right, zero wrong
    if (correctCount < 10) {
      playBuzzer();
      setAttempts((a) => a + 1);
      setErrorMsg(
        `🚨 INSUFFICIENT TARGETS: You must get a MINIMUM OF 10 IMAGES RIGHT to proceed! You currently have ${correctCount} / 10 correct. Reshuffling specimens...`
      );
      setTiles(shuffle(tiles));
      setSelectedIds(new Set());
      return;
    }

    if (wrongCount > 0) {
      playBuzzer();
      setAttempts((a) => a + 1);
      setErrorMsg(
        `🚨 DECOY CONTAMINATION: You selected ${wrongCount} decoy(s)! You must get all 10 happy triangles right without clicking any decoys. Reshuffling specimens...`
      );
      setTiles(shuffle(tiles));
      setSelectedIds(new Set());
      return;
    }

    // Success: Exactly all 10 targets right!
    playSuccessChime();
    setErrorMsg('');
    onComplete();
  };

  return (
    <div className="w-full max-w-2xl mx-auto my-3 p-4 md:p-5 bg-[#e0f2fe] border-4 border-[#0284c7] shadow-[8px_8px_0_#0369a1] font-comic select-none">
      <div className="bg-[#0369a1] text-white p-2.5 mb-3 -mx-4 md:-mx-5 -mt-4 md:-mt-5 border-b-4 border-black text-center">
        <span className="text-xs uppercase tracking-widest font-mono bg-yellow-300 text-black px-2 py-0.5 rounded font-black">
          STEP 2 OF 3: ENHANCED ROBOT CONTAINMENT TEST
        </span>
        <h1 className="text-lg md:text-2xl font-black mt-1 font-comic">
          🤖 PROVE YOU ARE NOT A ROBOT (10 IMAGES REQUIRED)
        </h1>
        <p className="text-[11px] text-cyan-200">
          Strict security protocol: You MUST correctly identify a minimum of 10 images
        </p>
      </div>

      {/* INSTRUCTIONS */}
      <div className="bg-yellow-200 border-2 border-black p-2.5 mb-3 rounded-none shadow-[2px_2px_0_#000]">
        <p className="text-xs md:text-sm font-black text-gray-900 leading-snug">
          🎯 Prompt:{' '}
          <span className="underline decoration-red-600 decoration-2 text-red-700">
            "Select all 10 tiles containing a suspiciously happy triangle"
          </span>
        </p>
        <p className="text-[11px] text-gray-800 mt-1 font-bold">
          Mandatory Requirement: You must get a <span className="bg-red-500 text-white px-1">MINIMUM OF 10 IMAGES RIGHT</span> to unlock arithmetic privileges.
        </p>
      </div>

      {/* 20-IMAGE GRID (5 columns x 4 rows) */}
      <div className="grid grid-cols-5 gap-1.5 md:gap-2 my-3">
        {tiles.map((tile, idx) => {
          const isSelected = selectedIds.has(tile.id);
          return (
            <div
              key={tile.id}
              onClick={() => toggleTile(tile.id)}
              className={`relative aspect-square p-1 border-2 md:border-3 cursor-pointer transition-transform active:scale-95 bg-white rounded-none flex items-center justify-center ${
                isSelected
                  ? 'border-red-600 bg-yellow-100 ring-2 md:ring-4 ring-yellow-400 scale-102 shadow-[3px_3px_0_#b91c1c]'
                  : 'border-black hover:border-blue-500 shadow-[2px_2px_0_#000]'
              }`}
            >
              {tile.svg}

              {/* Selection Checkmark Badge */}
              {isSelected && (
                <div className="absolute top-0.5 right-0.5 bg-red-600 text-white text-[9px] md:text-[10px] w-4 h-4 md:w-5 md:h-5 font-black rounded-full flex items-center justify-center border border-white shadow">
                  ✓
                </div>
              )}

              <span className="absolute bottom-0 left-0.5 text-[7px] md:text-[8px] font-mono text-gray-400">
                #{idx + 1}
              </span>
            </div>
          );
        })}
      </div>

      {/* LIVE PROGRESS STATUS */}
      <div className="bg-white border-2 border-black p-2 mb-3 flex items-center justify-between text-xs font-bold text-gray-800">
        <div>
          Images Selected:{' '}
          <span className={`text-sm font-black ${selectedIds.size >= 10 ? 'text-green-600' : 'text-red-600'}`}>
            {selectedIds.size} / 10 required
          </span>
        </div>
        <div className="text-[10px] text-gray-500 font-mono">
          Shuffles: {attempts}
        </div>
      </div>

      {/* ERROR MESSAGE */}
      {errorMsg && (
        <div className="p-2 mb-3 bg-red-200 border-2 border-red-700 text-red-900 text-xs font-bold animate-wiggle leading-snug">
          {errorMsg}
        </div>
      )}

      {/* VERIFY BUTTON */}
      <button
        type="button"
        onClick={handleVerify}
        className="w-full py-3 bg-[#facc15] hover:bg-[#fde047] text-black font-black text-sm uppercase tracking-wider border-3 border-black shadow-[4px_4px_0_#000] active:translate-x-1 active:translate-y-1 cursor-pointer transition-all"
      >
        VERIFY MINIMUM 10 IMAGES & PROCEED 🧐
      </button>
    </div>
  );
}
