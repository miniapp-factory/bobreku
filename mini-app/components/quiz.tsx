"use client";

import { useState, useMemo } from "react";
import { QuizResult } from "./quiz-result";
import { url } from "@/lib/metadata";

const questions = [
  {
    question: "What is your favorite activity?",
    options: [
      { text: "Chasing mice", animal: "cat" },
      { text: "Playing fetch", animal: "dog" },
      { text: "Hunting in the woods", animal: "fox" },
      { text: "Nibbling on seeds", animal: "hamster" },
      { text: "Galloping in fields", animal: "horse" },
    ],
  },
  {
    question: "Which environment do you prefer?",
    options: [
      { text: "Quiet indoor rooms", animal: "cat" },
      { text: "Open parks", animal: "dog" },
      { text: "Dense forests", animal: "fox" },
      { text: "Small cages", animal: "hamster" },
      { text: "Wide open pastures", animal: "horse" },
    ],
  },
  {
    question: "How do you handle social situations?",
    options: [
      { text: "Independent and aloof", animal: "cat" },
      { text: "Friendly and loyal", animal: "dog" },
      { text: "Cautious but curious", animal: "fox" },
      { text: "Quiet and observant", animal: "hamster" },
      { text: "Graceful and confident", animal: "horse" },
    ],
  },
  {
    question: "What’s your favorite snack?",
    options: [
      { text: "Fish and kibble", animal: "dog" },
      { text: "Fresh leaves", animal: "fox" },
      { text: "Seeds and nuts", animal: "hamster" },
      { text: "Milk and treats", animal: "cat" },
      { text: "Grass and hay", animal: "horse" },
    ],
  },
  {
    question: "How do you like to spend your free time?",
    options: [
      { text: "Stalking and pouncing", animal: "cat" },
      { text: "Running and playing", animal: "dog" },
      { text: "Exploring new paths", animal: "fox" },
      { text: "Nibbling and sleeping", animal: "hamster" },
      { text: "Galloping and grazing", animal: "horse" },
    ],
  },
];

export function Quiz() {
  const [current, setCurrent] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({
    cat: 0,
    dog: 0,
    fox: 0,
    hamster: 0,
    horse: 0,
  });
  const [result, setResult] = useState<string | null>(null);

  const shuffledOptions = useMemo(() => {
    const opts = [...questions[current].options];
    for (let i = opts.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [opts[i], opts[j]] = [opts[j], opts[i]];
    }
    return opts;
  }, [current]);

  const handleAnswer = (animal: string) => {
    setScores((prev) => ({ ...prev, [animal]: prev[animal] + 1 }));
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      const maxAnimal = Object.entries(scores).reduce((a, b) =>
        b[1] > a[1] ? b : a
      )[0];
      setResult(maxAnimal);
    }
  };

  const handleRetake = () => {
    setCurrent(0);
    setScores({
      cat: 0,
      dog: 0,
      fox: 0,
      hamster: 0,
      horse: 0,
    });
    setResult(null);
  };

  if (result) {
    return <QuizResult animal={result} onRetake={handleRetake} />;
  }

  return (
    <div className="w-full max-w-md">
      <h2 className="text-xl font-semibold mb-4">
        {questions[current].question}
      </h2>
      <div className="flex flex-col gap-2">
        {shuffledOptions.map((opt) => (
          <button
            key={opt.text}
            className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90"
            onClick={() => handleAnswer(opt.animal)}
          >
            {opt.text}
          </button>
        ))}
      </div>
    </div>
  );
}
