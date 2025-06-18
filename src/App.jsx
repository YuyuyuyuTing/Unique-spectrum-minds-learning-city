
import React, { useState } from "react";
import LanguageDragTask from "./LanguageDragTask";
import cat from "./cat.png";

function RewardSetup({ onConfirm }) {
  const [reward, setReward] = useState("");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-yellow-100 text-center space-y-6 p-6">
      <img src={cat} alt="cat" className="w-32 h-32" />
      <h1 className="text-3xl font-bold text-yellow-800">挑戰前先約定好喔！</h1>
      <p className="text-yellow-700 text-lg">如果你完成任務，家人可以給你什麼獎勵呢？</p>
      <input
        type="text"
        placeholder="例如：一起去公園、吃冰、玩Switch"
        value={reward}
        onChange={(e) => setReward(e.target.value)}
        className="p-3 rounded-xl w-72 text-center border border-yellow-400"
      />
      <button
        onClick={() => onConfirm(reward)}
        className="bg-yellow-400 text-white font-bold px-6 py-3 rounded-xl hover:bg-yellow-500"
      >
        我們說好了！
      </button>
    </div>
  );
}

export default function App() {
  const [mode, setMode] = useState(null);
  const [rewardReady, setRewardReady] = useState(false);
  const [reward, setReward] = useState("");

  if (mode === "language") {
    if (!rewardReady) {
      return <RewardSetup onConfirm={(r) => { setReward(r); setRewardReady(true); }} />;
    }
    return <LanguageDragTask reward={reward} />;
  }
  if (mode === "math") return <div className="text-center p-10">數學力測驗建構中...</div>;
  if (mode === "life") return <div className="text-center p-10">生活能力挑戰建構中...</div>;
  if (mode === "recognition") return <div className="text-center p-10">認知力任務建構中...</div>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-100 text-center space-y-6 p-6">
      <img src={cat} alt="cat" className="w-40 h-40" />
      <h1 className="text-4xl font-bold text-blue-800">開始挑戰囉！</h1>
      <p className="text-blue-700 text-lg">來看看你現在最厲害的是哪一項</p>

      <div className="grid grid-cols-2 gap-4 mt-6">
        <button
          onClick={() => setMode("language")}
          className="bg-orange-400 hover:bg-orange-500 text-white font-bold px-6 py-3 rounded-xl"
        >
          語文力
        </button>
        <button
          onClick={() => setMode("math")}
          className="bg-green-400 hover:bg-green-500 text-white font-bold px-6 py-3 rounded-xl"
        >
          數學力
        </button>
        <button
          onClick={() => setMode("recognition")}
          className="bg-blue-400 hover:bg-blue-500 text-white font-bold px-6 py-3 rounded-xl"
        >
          認知力
        </button>
        <button
          onClick={() => setMode("life")}
          className="bg-purple-400 hover:bg-purple-500 text-white font-bold px-6 py-3 rounded-xl"
        >
          生活力
        </button>
      </div>
    </div>
  );
}
