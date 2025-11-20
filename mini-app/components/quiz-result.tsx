"use client";

import { Share } from "@/components/share";
import { url } from "@/lib/metadata";

export function QuizResult({
  animal,
  onRetake,
}: {
  animal: string;
  onRetake: () => void;
}) {
  const imageMap: Record<string, string> = {
    cat: "/cat.png",
    dog: "/dog.png",
    fox: "/fox.png",
    hamster: "/hamster.png",
    horse: "/horse.png",
  };

  const shareText = `I am a ${animal}! Check out the quiz at ${url}`;

  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-2xl font-bold">You are a {animal}!</h2>
      <img
        src={imageMap[animal]}
        alt={animal}
        width={512}
        height={512}
        className="rounded"
      />
      <Share text={shareText} />
      <button
        className="px-4 py-2 bg-secondary text-secondary-foreground rounded"
        onClick={onRetake}
      >
        Retake Quiz
      </button>
    </div>
  );
}
