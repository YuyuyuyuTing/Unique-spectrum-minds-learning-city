
import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { motion } from "framer-motion";

// 額外加入鼓勵語句
const praiseOptions = [
  "媽媽說：你好棒喔，真的很努力！",
  "請摸摸自己的手，說一聲謝謝自己 ❤️",
  "你可以稱讚媽媽一句話唷～",
  "媽媽好驕傲，真的是小小勇士",
  "現在請你輕輕抱自己一下，說『我做到了！』"
];

const getRandomPraise = () => {
  const index = Math.floor(Math.random() * praiseOptions.length);
  return praiseOptions[index];
};

const questions = [
  { id: 1, words: [ { id: "1", word: "我" }, { id: "2", word: "吃" }, { id: "3", word: "飯" }, { id: "4", word: "了" } ], answer: "我吃飯了" }
];

export default function LanguageDragTask() {
  const [current, setCurrent] = useState(0);
  const [words, setWords] = useState(questions[0].words);
  const [result, setResult] = useState("");
  const [praise, setPraise] = useState("");

  const handleDragEnd = (resultEvent) => {
    if (!resultEvent.destination) return;

    const reordered = Array.from(words);
    const [moved] = reordered.splice(resultEvent.source.index, 1);
    reordered.splice(resultEvent.destination.index, 0, moved);
    setWords(reordered);

    const sentence = reordered.map((w) => w.word).join("");
    if (sentence === questions[current].answer) {
      setResult("✅ 太棒了，你完成了這一題！");
      setPraise(getRandomPraise());
      setTimeout(() => {
        const next = current + 1;
        if (next < questions.length) {
          setCurrent(next);
          setWords(questions[next].words);
          setResult("");
          setPraise("");
        } else {
          setResult("🎉 你完成了所有挑戰！");
        }
      }, 1800);
    } else {
      setResult("❌ 還沒對喔，再試試看！");
      setPraise("");
    }
  };

  return (
    <motion.div
      className="max-w-md mx-auto p-6 text-center bg-blue-50 rounded-xl shadow space-y-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h1 className="text-2xl font-bold text-blue-800">語文力小挑戰</h1>
      <p className="text-blue-700">請把這些詞語排成一句完整的話</p>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="words" direction="horizontal">
          {(provided) => (
            <div
              className="flex flex-wrap justify-center gap-4"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {words.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided) => (
                    <div
                      className="bg-yellow-200 px-5 py-3 rounded-xl text-xl font-semibold text-gray-800 shadow cursor-move"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      {item.word}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {result && <div className="text-lg font-bold text-green-700">{result}</div>}
      {praise && <div className="text-base text-pink-700 mt-2">{praise}</div>}
    </motion.div>
  );
}
