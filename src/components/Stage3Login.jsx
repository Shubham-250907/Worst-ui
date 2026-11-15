import React, { useState } from 'react';
import { playBuzzer, playSuccessChime } from '../utils/audio';

export default function Stage3Login({ savedCredentials, onComplete }) {
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [shake, setShake] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    if (
      usernameInput.trim() === savedCredentials.username &&
      passwordInput === savedCredentials.password
    ) {
      playSuccessChime();
      setErrorMsg('');
      onComplete();
    } else {
      playBuzzer();
      setShake(true);
      setTimeout(() => setShake(false), 300);
      setErrorMsg(
        '❌ ACCESS DENIED! Credentials do not match Stage 1. Did you already forget the username and password you invented 15 seconds ago?'
      );
    }
  };

  return (
    <div
      className={`w-full max-w-md mx-auto my-6 p-6 bg-[#fef08a] border-4 border-[#ca8a04] shadow-[8px_8px_0_#854d0e] font-comic select-none ${
        shake ? 'animate-wiggle' : ''
      }`}
    >
      <div className="bg-[#a16207] text-white p-2.5 mb-4 -mx-6 -mt-6 border-b-4 border-black text-center">
        <span className="text-xs uppercase tracking-widest font-mono bg-red-500 text-white px-2 py-0.5 rounded font-black">
          FINAL STEP: PROVE YOUR MEMORY
        </span>
        <h1 className="text-xl md:text-2xl font-black mt-1 font-comic">
          🔐 MANDATORY RE-LOGIN
        </h1>
        <p className="text-[11px] text-yellow-200">
          The ultimate verification of short-term carbon retention
        </p>
      </div>

      {/* PROMPT BANNER */}
      <div className="bg-white border-2 border-black p-3 mb-4 rounded-none shadow-[2px_2px_0_#000]">
        <p className="text-xs md:text-sm font-bold text-gray-900 leading-snug">
          🎉 <em>"Registration and Robot Check Complete! Now log in again with the exact credentials you just created to prove you remember them."</em>
        </p>
      </div>

      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block text-xs font-black text-gray-800 mb-1">
            Confirmed Username:
          </label>
          <input
            type="text"
            value={usernameInput}
            onChange={(e) => setUsernameInput(e.target.value)}
            placeholder="Enter the username from Stage 1..."
            className="w-full p-2.5 text-sm font-bold border-2 border-black bg-white rounded-none shadow-[3px_3px_0_#000] focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>

        <div>
          <label className="block text-xs font-black text-gray-800 mb-1">
            Confirmed Password:
          </label>
          <input
            type="password"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            placeholder="Enter the password from Stage 1..."
            className="w-full p-2.5 text-sm font-bold border-2 border-black bg-white rounded-none shadow-[3px_3px_0_#000] focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>

        {errorMsg && (
          <div className="p-2.5 bg-red-100 border-2 border-red-600 text-red-800 text-xs font-bold leading-tight">
            {errorMsg}
          </div>
        )}

        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-orange-400 to-amber-500 hover:from-orange-500 hover:to-amber-600 text-black font-black text-sm uppercase tracking-wider border-3 border-black shadow-[4px_4px_0_#000] active:translate-x-1 active:translate-y-1 cursor-pointer transition-all"
        >
          AUTHENTICATE & UNLOCK CALCULATOR 🔓
        </button>
      </form>
    </div>
  );
}
