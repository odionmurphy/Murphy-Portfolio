import React, { useEffect, useState } from "react";

type TypingProps = {
  text: string;
  speed?: number; // ms per character
};

export default function Typing({ text, speed = 32 }: TypingProps) {
  const [idx, setIdx] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    setIdx(0);
    setDone(false);
    let mounted = true;
    let i = 0;
    const t = setInterval(() => {
      if (!mounted) return;
      i += 1;
      setIdx(i);
      if (i >= text.length) {
        setDone(true);
        clearInterval(t);
      }
    }, speed);

    return () => {
      mounted = false;
      clearInterval(t);
    };
  }, [text, speed]);

  return (
    <span>
      {text.slice(0, Math.max(0, Math.min(idx, text.length)))}
      <span className="typing-cursor" aria-hidden>
        {done ? "\u258C" : "|"}
      </span>
    </span>
  );
}
