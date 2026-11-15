import React, { useState } from 'react';
import { playCalcBeep } from '../utils/audio';

export default function WorstCalculator() {
  const [display, setDisplay] = useState('0');
  const [prevValue, setPrevValue] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [historyExpr, setHistoryExpr] = useState('');
  const [lastCalculation, setLastCalculation] = useState('');

  // Handle digit click
  const inputDigit = (digit) => {
    playCalcBeep();
    if (waitingForOperand) {
      setDisplay(String(digit));
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? String(digit) : display + digit);
    }
  };

  // Handle decimal
  const inputDecimal = () => {
    playCalcBeep();
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
      return;
    }
    if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  // Handle operators (+, -, *, /)
  const performOperation = (nextOperator) => {
    playCalcBeep();
    const inputValue = parseFloat(display);

    if (prevValue === null) {
      setPrevValue(inputValue);
      setHistoryExpr(`${inputValue} ${nextOperator}`);
    } else if (operator) {
      const currentValue = prevValue || 0;
      const result = calculate(currentValue, inputValue, operator);

      setPrevValue(result);
      setDisplay(String(result));
      setHistoryExpr(`${result} ${nextOperator}`);
    }

    setWaitingForOperand(true);
    setOperator(nextOperator);
  };

  // Calculate binary operation
  const calculate = (first, second, op) => {
    switch (op) {
      case '+':
        return first + second;
      case '-':
        return first - second;
      case '*':
        return first * second;
      case '/':
        if (second === 0) return 'ERROR (DIV/0)';
        return Math.round((first / second) * 100000000) / 100000000;
      default:
        return second;
    }
  };

  // Handle Equals (=)
  const handleEquals = () => {
    playCalcBeep();
    const inputValue = parseFloat(display);

    if (operator && prevValue !== null) {
      const result = calculate(prevValue, inputValue, operator);
      const expr = `${prevValue} ${operator} ${inputValue} =`;
      setHistoryExpr(expr);
      setLastCalculation(`${expr} ${result}`);
      setDisplay(String(result));
      setPrevValue(null);
      setOperator(null);
      setWaitingForOperand(true);
    }
  };

  // Clear (C)
  const handleClear = () => {
    playCalcBeep();
    setDisplay('0');
    setPrevValue(null);
    setOperator(null);
    setWaitingForOperand(false);
    setHistoryExpr('');
  };

  return (
    <div className="w-full min-h-screen pt-16 pb-32 px-2 bg-[#d4d4d4] font-comic select-none overflow-x-hidden">
      {/* OBNOXIOUS RETRO TICKER */}
      <div className="w-full bg-black text-[#00ff00] font-mono text-[11px] py-1 px-2 border-y-2 border-yellow-400 overflow-hidden mb-3 shadow">
        <div className="retro-marquee font-bold">
          ⚠️ ARITHMETIC SYSTEM ARMED & READY • ACCURACY RATING: 99.98% • BEWARE OF MICROSCOPIC OPERATORS WEDGED IN CREVICES • GIANT DIGITS ARE HIGH VOLTAGE • NO REFUNDS FOR MATH ERRORS •
        </div>
      </div>

      {/* CLASHING BANNER */}
      <div className="max-w-4xl mx-auto mb-2 text-center">
        <h2 className="text-2xl md:text-3xl font-black text-[#ff00ff] bg-yellow-300 inline-block px-4 py-1 border-4 border-dashed border-[#0000ff] -rotate-1 shadow-[4px_4px_0_#000]">
          📟 THE ULTIMATE USER-HOSTILE CALCULATOR 📟
        </h2>
        <p className="text-[11px] font-papyrus text-stone-800 font-bold mt-1">
          "Engineered by top UX sadists to test your sanity and motor precision"
        </p>
      </div>

      {/* MAIN CALCULATOR CONTAINER WITH SCRAMBLED GIANT DIGITS & MICROSCOPIC OPERATORS */}
      <div className="max-w-4xl mx-auto bg-[#c5a059] p-4 border-8 border-double border-[#5c3a00] shadow-[12px_12px_0_#2b1800] relative">
        <div className="flex justify-between items-center mb-3 border-b-2 border-black pb-1 text-[10px] font-mono text-amber-950 font-bold">
          <span>STATUS: ARITHMETIC UNLOCKED</span>
          <span className="animate-ping text-red-700">● LIVE DEMO MODE</span>
          <span>CALC-CORE 64-BIT</span>
        </div>

        {/* 
          JUMBLED DIGITS LAYOUT:
          Order: 7, 1 (GIANT ~15% on top-right), 9, 4, 0, 8, 2, 6, 3, 5
          Microscopic operators wedged in crevices:
          - '+' wedged right after giant 1 on top-right
          - '-', '*', '/', 'C', '=' scattered awkwardly in crevices
        */}
        <div className="grid grid-cols-12 gap-2 relative min-h-[460px] items-stretch">
          
          {/* GIANT DIGIT: 7 */}
          <div className="col-span-5 md:col-span-4 flex items-center justify-center">
            <button
              type="button"
              onClick={() => inputDigit(7)}
              className="w-full h-32 md:h-36 bg-[#ff0055] hover:bg-[#ff3377] text-yellow-300 font-black text-6xl md:text-7xl rounded-none border-4 border-black shadow-[6px_6px_0_#4a0018] active:translate-y-1 transform -rotate-2 cursor-pointer flex flex-col items-center justify-center"
            >
              <span>7</span>
              <span className="text-[9px] text-white tracking-widest font-mono">SEVEN</span>
            </button>
          </div>

          {/* CREVICE 1: Tiny Minus '-' and Tiny Clear 'C' wedged between 7 and top-right area */}
          <div className="col-span-1 flex flex-col items-center justify-around py-2">
            <button
              type="button"
              onClick={() => performOperation('-')}
              title="Microscopic Minus Operator"
              className="w-[14px] h-[14px] text-[9px] leading-none p-0 bg-yellow-300 hover:bg-white text-black font-mono font-black border border-black cursor-pointer flex items-center justify-center shadow-none active:bg-red-400"
            >
              -
            </button>
            <button
              type="button"
              onClick={handleClear}
              title="Microscopic Clear Button"
              className="w-[14px] h-[14px] text-[9px] leading-none p-0 bg-red-400 hover:bg-white text-black font-mono font-black border border-black cursor-pointer flex items-center justify-center shadow-none active:bg-yellow-400"
            >
              C
            </button>
          </div>

          {/* 
            GIANT DIGIT: 1 (PROMINENTLY TOP-RIGHT, COVERING ~15% OF SCREEN AREA)
            Followed immediately by microscopic '+' wedged right after it!
          */}
          <div className="col-span-6 md:col-span-7 flex items-center justify-start gap-1 pl-2">
            <button
              type="button"
              onClick={() => inputDigit(1)}
              style={{ minHeight: '140px' }}
              className="w-[85%] h-36 md:h-44 bg-[#00e5ff] hover:bg-[#66eeff] text-[#990033] font-black text-7xl md:text-8xl rounded-none border-6 border-black shadow-[8px_8px_0_#004d40] active:translate-y-1 transform rotate-1 cursor-pointer flex flex-col items-center justify-center"
            >
              <div className="flex items-baseline">
                <span>1</span>
                <span className="text-xs text-black font-mono ml-2 uppercase bg-yellow-300 px-1 border border-black">
                  #1 BEST DIGIT
                </span>
              </div>
              <span className="text-[10px] text-black font-bold tracking-widest font-comic">
                COVERING ~15% OF SCREEN
              </span>
            </button>

            {/* MICROSCOPIC '+' OPERATOR WEDGED RIGHT AFTER GIANT 1 */}
            <div className="flex flex-col items-center justify-center self-start mt-2">
              <button
                type="button"
                onClick={() => performOperation('+')}
                title="Microscopic Plus Operator (Wedged beside Giant 1)"
                className="w-[14px] h-[14px] text-[9px] leading-none p-0 bg-white hover:bg-yellow-300 text-black font-mono font-black border border-black cursor-pointer flex items-center justify-center shadow-none active:bg-green-400 animate-pulse"
              >
                +
              </button>
              <span className="text-[7px] font-mono text-red-950 font-black mt-0.5 -rotate-90 origin-top">
                tiny+
              </span>
            </div>
          </div>

          {/* MIDDLE ROW: 9, 4, 0, with microscopic * and / */}
          {/* GIANT DIGIT: 9 */}
          <div className="col-span-4 md:col-span-3 flex items-center justify-center">
            <button
              type="button"
              onClick={() => inputDigit(9)}
              className="w-full h-28 md:h-32 bg-[#a3e635] hover:bg-[#bef264] text-black font-black text-6xl md:text-7xl rounded-none border-4 border-black shadow-[5px_5px_0_#365314] active:translate-y-1 transform rotate-2 cursor-pointer flex flex-col items-center justify-center"
            >
              <span>9</span>
              <span className="text-[8px] font-mono text-gray-800">OR UPSIDE-DOWN 6</span>
            </button>
          </div>

          {/* CREVICE 2: Microscopic Multiply '*' */}
          <div className="col-span-1 flex items-center justify-center">
            <button
              type="button"
              onClick={() => performOperation('*')}
              title="Microscopic Multiply Operator"
              className="w-[14px] h-[14px] text-[9px] leading-none p-0 bg-cyan-200 hover:bg-white text-black font-mono font-black border border-black cursor-pointer flex items-center justify-center shadow-none active:bg-amber-300"
            >
              *
            </button>
          </div>

          {/* GIANT DIGIT: 4 */}
          <div className="col-span-4 md:col-span-4 flex items-center justify-center">
            <button
              type="button"
              onClick={() => inputDigit(4)}
              className="w-full h-28 md:h-32 bg-[#f97316] hover:bg-[#fb923c] text-white font-black text-6xl md:text-7xl rounded-none border-4 border-black shadow-[5px_5px_0_#7c2d12] active:translate-y-1 transform -rotate-1 cursor-pointer flex flex-col items-center justify-center"
            >
              <span>4</span>
              <span className="text-[8px] font-mono text-yellow-200">FOUR / QUATRE</span>
            </button>
          </div>

          {/* CREVICE 3: Microscopic Divide '/' */}
          <div className="col-span-1 flex items-center justify-center">
            <button
              type="button"
              onClick={() => performOperation('/')}
              title="Microscopic Divide Operator"
              className="w-[14px] h-[14px] text-[9px] leading-none p-0 bg-lime-200 hover:bg-white text-black font-mono font-black border border-black cursor-pointer flex items-center justify-center shadow-none active:bg-purple-300"
            >
              /
            </button>
          </div>

          {/* GIANT DIGIT: 0 */}
          <div className="col-span-2 md:col-span-3 flex items-center justify-center">
            <button
              type="button"
              onClick={() => inputDigit(0)}
              className="w-full h-28 md:h-32 bg-[#e879f9] hover:bg-[#f0abfc] text-black font-black text-6xl md:text-7xl rounded-none border-4 border-black shadow-[5px_5px_0_#701a75] active:translate-y-1 transform rotate-3 cursor-pointer flex flex-col items-center justify-center"
            >
              <span>0</span>
              <span className="text-[8px] font-mono text-purple-900">ZERO</span>
            </button>
          </div>

          {/* BOTTOM ROW OF NUMBERS: 8, 2, 6, 3, 5 */}
          {/* GIANT DIGIT: 8 */}
          <div className="col-span-3 md:col-span-2 flex items-center justify-center">
            <button
              type="button"
              onClick={() => inputDigit(8)}
              className="w-full h-28 md:h-32 bg-[#fbbf24] hover:bg-[#fde047] text-[#1e1b4b] font-black text-5xl md:text-6xl rounded-none border-4 border-black shadow-[4px_4px_0_#78350f] active:translate-y-1 transform -rotate-2 cursor-pointer flex flex-col items-center justify-center"
            >
              <span>8</span>
              <span className="text-[7px] font-mono">INFINITY</span>
            </button>
          </div>

          {/* GIANT DIGIT: 2 */}
          <div className="col-span-3 md:col-span-2 flex items-center justify-center">
            <button
              type="button"
              onClick={() => inputDigit(2)}
              className="w-full h-28 md:h-32 bg-[#38bdf8] hover:bg-[#7dd3fc] text-black font-black text-5xl md:text-6xl rounded-none border-4 border-black shadow-[4px_4px_0_#0369a1] active:translate-y-1 transform rotate-1 cursor-pointer flex flex-col items-center justify-center"
            >
              <span>2</span>
              <span className="text-[7px] font-mono">TWO</span>
            </button>
          </div>

          {/* CREVICE 4: Microscopic Equals '=' */}
          <div className="col-span-1 flex flex-col items-center justify-center gap-1">
            <button
              type="button"
              onClick={handleEquals}
              title="Microscopic Equals Operator (=)"
              className="w-[14px] h-[14px] text-[9px] leading-none p-0 bg-[#4ade80] hover:bg-white text-black font-mono font-black border border-black cursor-pointer flex items-center justify-center shadow-none active:bg-orange-400 animate-bounce"
            >
              =
            </button>
            <span className="text-[7px] font-mono text-black font-bold">eq</span>
          </div>

          {/* GIANT DIGIT: 6 */}
          <div className="col-span-2 md:col-span-2 flex items-center justify-center">
            <button
              type="button"
              onClick={() => inputDigit(6)}
              className="w-full h-28 md:h-32 bg-[#ec4899] hover:bg-[#f472b6] text-yellow-200 font-black text-5xl md:text-6xl rounded-none border-4 border-black shadow-[4px_4px_0_#831843] active:translate-y-1 transform -rotate-3 cursor-pointer flex flex-col items-center justify-center"
            >
              <span>6</span>
              <span className="text-[7px] font-mono">SIX</span>
            </button>
          </div>

          {/* GIANT DIGIT: 3 */}
          <div className="col-span-3 md:col-span-2 flex items-center justify-center">
            <button
              type="button"
              onClick={() => inputDigit(3)}
              className="w-full h-28 md:h-32 bg-[#10b981] hover:bg-[#34d399] text-black font-black text-5xl md:text-6xl rounded-none border-4 border-black shadow-[4px_4px_0_#064e3b] active:translate-y-1 transform rotate-2 cursor-pointer flex flex-col items-center justify-center"
            >
              <span>3</span>
              <span className="text-[7px] font-mono">THREE</span>
            </button>
          </div>

          {/* CREVICE 5: Microscopic Decimal '.' */}
          <div className="col-span-1 flex items-center justify-center">
            <button
              type="button"
              onClick={inputDecimal}
              title="Microscopic Decimal Dot"
              className="w-[14px] h-[14px] text-[9px] leading-none p-0 bg-white hover:bg-gray-300 text-black font-mono font-black border border-black cursor-pointer flex items-center justify-center shadow-none"
            >
              .
            </button>
          </div>

          {/* GIANT DIGIT: 5 */}
          <div className="col-span-11 md:col-span-2 flex items-center justify-center">
            <button
              type="button"
              onClick={() => inputDigit(5)}
              className="w-full h-28 md:h-32 bg-[#8b5cf6] hover:bg-[#a78bfa] text-yellow-300 font-black text-5xl md:text-6xl rounded-none border-4 border-black shadow-[4px_4px_0_#4c1d95] active:translate-y-1 transform -rotate-1 cursor-pointer flex flex-col items-center justify-center"
            >
              <span>5</span>
              <span className="text-[7px] font-mono">FIVE</span>
            </button>
          </div>

        </div>

        {/* FUNNY HELPER STICKERS */}
        <div className="mt-4 pt-2 border-t-2 border-dashed border-black flex flex-wrap justify-between items-center text-[10px] text-black font-bold">
          <span className="bg-yellow-200 px-2 py-0.5 border border-black">
            💡 Operator hint: tiny '+' is wedged directly to the right of Giant 1
          </span>
          <span className="bg-white px-2 py-0.5 border border-black">
            Tiny '=', '-', '*', '/', 'C' are wedged in between digits!
          </span>
        </div>
      </div>

      {/* 
        BOTTOM RED-ON-RED RESULT SCREEN:
        - Pinned across the bottom of viewport
        - Display background is solid bright/medium red (#e60000)
        - Current equation and calculated answer rendered in a slightly darker shade of red (#990000)
        - Numbers are barely legible low-contrast red-on-red, while genuinely readable up close!
      */}
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: '#e60000',
          borderTop: '5px solid #660000',
          zIndex: 30,
        }}
        className="h-24 md:h-28 px-4 py-2 flex flex-col justify-between shadow-[0_-5px_15px_rgba(0,0,0,0.5)] select-none"
      >
        {/* TOP STATUS BAR OF SCREEN */}
        <div className="flex justify-between items-center text-[10px] md:text-xs font-mono font-black" style={{ color: '#990000' }}>
          <span>RETINA-BURN RED-ON-RED DISPLAY™ [SQUINT REQUIRED]</span>
          <span>
            {lastCalculation ? `LAST: ${lastCalculation}` : 'READY FOR INPUT'}
          </span>
        </div>

        {/* RED-ON-RED EQUATION AND RESULT */}
        <div className="text-right flex flex-col justify-end pr-2 overflow-hidden">
          {/* Equation history */}
          <div
            className="text-xs md:text-sm font-mono font-bold tracking-wider truncate"
            style={{ color: '#990000' }}
          >
            {historyExpr || '\u00A0'}
          </div>

          {/* Main calculated number / input */}
          <div
            className="text-3xl md:text-5xl font-mono font-black tracking-tight leading-none truncate"
            style={{ color: '#990000' }}
          >
            {display}
          </div>
        </div>
      </div>
    </div>
  );
}
