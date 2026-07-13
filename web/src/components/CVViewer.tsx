import React, { useEffect, useRef, useState } from "react";
import * as pdfjsLib from "pdfjs-dist";
import pdfjsWorkerUrl from "pdfjs-dist/build/pdf.worker.min.mjs?url";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorkerUrl;

type CVViewerProps = {
  src: string;
};

export default function CVViewer({ src }: CVViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const container = containerRef.current;
    if (!container) return;

    container.innerHTML = "";
    setError(null);

    pdfjsLib
      .getDocument({ url: src })
      .promise.then(async (pdf) => {
        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
          if (cancelled) return;
          const page = await pdf.getPage(pageNum);
          const viewport = page.getViewport({ scale: 1.5 });

          const canvas = document.createElement("canvas");
          canvas.className = "block mx-auto mb-3 max-w-full h-auto shadow-md";
          canvas.width = viewport.width;
          canvas.height = viewport.height;
          const context = canvas.getContext("2d");
          if (!context || cancelled) return;

          container.appendChild(canvas);
          await page.render({ canvas, canvasContext: context, viewport }).promise;
        }
      })
      .catch((err) => {
        if (!cancelled) setError(String(err));
      });

    return () => {
      cancelled = true;
    };
  }, [src]);

  if (error) {
    return (
      <div className="p-6 text-sm text-red-600">
        Couldn't load the CV preview. <a href={src} className="underline" target="_blank" rel="noreferrer">Open it directly</a>.
      </div>
    );
  }

  return <div ref={containerRef} className="w-full h-full overflow-auto bg-gray-200 p-4" />;
}
