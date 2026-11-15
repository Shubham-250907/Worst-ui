import React, { useState } from 'react';
import { playBuzzer, playSuccessChime } from '../utils/audio';

export default function Stage1Register({ onComplete }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [reason, setReason] = useState('taxes');
  const [errorMsg, setErrorMsg] = useState('');
  const [jitterField, setJitterField] = useState(null);

  const triggerJitter = (fieldName) => {
    setJitterField(fieldName);
    setTimeout(() => setJitterField(null), 180);
  };

  const handleInputChange = (field, setter, val) => {
    setter(val);
    triggerJitter(field);
    // Sarcastic low buzzer on keypress occasionally or on click
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    playBuzzer();

    if (!username.trim()) {
      setErrorMsg('⚠️ Username cannot be blank! The Bureau of Mathematics demands your identity.');
      return;
    }
    if (!password) {
      setErrorMsg('⚠️ Password cannot be blank!');
      return;
    }
    // Must contain at least 1 number
    if (!/\d/.test(password)) {
      setErrorMsg('❌ INVALID PASSWORD: Must contain at least ONE number (0-9) to prove you know what numbers are.');
      return;
    }
    if (password.length < 3) {
      setErrorMsg('❌ Password too short (minimum 3 characters).');
      return;
    }

    // Success!
    playSuccessChime();
    setErrorMsg('');
    onComplete({ username: username.trim(), password, reason });
  };

  return (
    <div className="w-full max-w-md mx-auto my-6 p-6 bg-[#ffe6f2] border-4 border-[#ff0066] shadow-[8px_8px_0_#990033] rounded-none font-comic select-none">
      <div className="bg-[#cc0052] text-white p-2 mb-4 -mx-6 -mt-6 border-b-4 border-black text-center">
        <span className="text-xs uppercase tracking-widest font-mono bg-yellow-300 text-black px-2 py-0.5 rounded font-black">
          STEP 1 OF 3: PERMIT REQUIRED
        </span>
        <h1 className="text-xl md:text-2xl font-black mt-1 font-comic">
          📋 ARITHMETIC REGISTRATION
        </h1>
        <p className="text-[11px] text-pink-200 italic">
          Authorized by Department of Unnecessary Obstacles
        </p>
      </div>

      <div className="bg-yellow-100 border-2 border-yellow-500 p-2 text-[11px] text-amber-900 mb-4 rounded">
        ⚠️ <strong>Notice:</strong> Due to unprecedented computational inflation, you must register before adding or subtracting any digits.
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* USERNAME */}
        <div>
          <label className="block text-xs font-black text-gray-800 mb-1">
            Applicant Username: <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => handleInputChange('username', setUsername, e.target.value)}
            onClick={() => playBuzzer()}
            placeholder="e.g., EinsteinJunior42"
            className={`w-full p-2.5 text-sm font-bold border-2 border-black bg-white rounded-none shadow-[3px_3px_0_#000] focus:bg-yellow-50 focus:outline-none ${
              jitterField === 'username' ? 'jitter-active border-red-500' : ''
            }`}
          />
          <span className="text-[10px] text-gray-600 block mt-1">
            (Will be tested later. Do not forget it.)
          </span>
        </div>

        {/* PASSWORD */}
        <div>
          <label className="block text-xs font-black text-gray-800 mb-1">
            Secret Password: <span className="text-red-500">*</span>
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => handleInputChange('password', setPassword, e.target.value)}
            onClick={() => playBuzzer()}
            placeholder="Enter password..."
            className={`w-full p-2.5 text-sm font-bold border-2 border-black bg-white rounded-none shadow-[3px_3px_0_#000] focus:bg-yellow-50 focus:outline-none ${
              jitterField === 'password' ? 'jitter-active border-red-500' : ''
            }`}
          />
          <span className="text-[10px] font-bold text-red-600 block mt-1">
            * Mandatory Rule: Must contain at least 1 number!
          </span>
        </div>

        {/* REASON FOR DOING MATH */}
        <div>
          <label className="block text-xs font-black text-gray-800 mb-1">
            Confirm Reason for Doing Math: <span className="text-red-500">*</span>
          </label>
          <select
            value={reason}
            onChange={(e) => {
              playBuzzer();
              setReason(e.target.value);
            }}
            className="w-full p-2 text-xs font-bold border-2 border-black bg-white shadow-[3px_3px_0_#000] rounded-none focus:outline-none"
          >
            <option value="taxes">Filing suspiciously high taxes</option>
            <option value="groceries">Dividing the pizza bill among 3 people</option>
            <option value="curiosity">Just testing if 2 + 2 is still 4 in 2026</option>
            <option value="punishment">Self-inflicted mathematical punishment</option>
            <option value="boss">My boss said I can't use ChatGPT for simple math</option>
          </select>
        </div>

        {/* ERROR DISPLAY */}
        {errorMsg && (
          <div className="p-2 bg-red-100 border-2 border-red-600 text-red-800 text-xs font-bold animate-wiggle">
            {errorMsg}
          </div>
        )}

        {/* SUBMIT BUTTON */}
        <button
          type="submit"
          className="w-full py-3 px-4 bg-gradient-to-r from-green-400 to-lime-400 hover:from-green-500 hover:to-lime-500 text-black font-black text-sm uppercase tracking-wider border-3 border-black shadow-[4px_4px_0_#000] active:translate-x-1 active:translate-y-1 cursor-pointer transition-all"
        >
          SUBMIT PERMIT APPLICATION 🚀
        </button>
      </form>
    </div>
  );
}
