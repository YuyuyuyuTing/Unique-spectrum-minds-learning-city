
import React from "react";

export default function LanguageDragTask({ reward }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-pink-100 text-center space-y-6 p-6">
      <h2 className="text-3xl font-bold text-pink-800">語文力測驗開始！</h2>
      <p className="text-lg text-pink-700">完成任務後可以得到：{reward}</p>
      <p className="text-sm text-pink-600">（這裡會顯示拖曳題目）</p>
    </div>
  );
}
