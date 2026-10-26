"use client";

import { useCallback, useRef } from "react";

/**
 * Extracts the dominant (vibrant, saturated) color from an image element
 * using HTML Canvas API and returns it as an rgba string with given opacity.
 */
export function useImageDominantColor(opacity = 0.45) {
  const colorCacheRef = useRef<Map<string, string>>(new Map());

  const extractColor = useCallback(
    (imgSrc: string): Promise<string | null> => {
      return new Promise((resolve) => {
        // Return cached result immediately if available
        if (colorCacheRef.current.has(imgSrc)) {
          resolve(colorCacheRef.current.get(imgSrc)!);
          return;
        }

        const img = new window.Image();
        img.crossOrigin = "anonymous";
        img.src = imgSrc;

        img.onload = () => {
          try {
            const canvas = document.createElement("canvas");
            const SIZE = 80;
            canvas.width = SIZE;
            canvas.height = SIZE;
            const ctx = canvas.getContext("2d");
            if (!ctx) { resolve(null); return; }

            ctx.drawImage(img, 0, 0, SIZE, SIZE);
            const { data } = ctx.getImageData(0, 0, SIZE, SIZE);

            let rSum = 0, gSum = 0, bSum = 0, count = 0;
            let bestSaturation = -1;
            let bestR = 180, bestG = 160, bestB = 200;

            for (let i = 0; i < data.length; i += 4) {
              const r = data[i], g = data[i + 1], b = data[i + 2], a = data[i + 3];
              if (a < 128) continue;

              const rN = r / 255, gN = g / 255, bN = b / 255;
              const max = Math.max(rN, gN, bN);
              const min = Math.min(rN, gN, bN);
              const l = (max + min) / 2;
              const d = max - min;
              const s = d === 0 ? 0 : d / (1 - Math.abs(2 * l - 1));

              rSum += r; gSum += g; bSum += b; count++;

              if (s > bestSaturation && l > 0.2 && l < 0.85) {
                bestSaturation = s;
                bestR = r; bestG = g; bestB = b;
              }
            }

            const avgR = count > 0 ? rSum / count : 180;
            const avgG = count > 0 ? gSum / count : 160;
            const avgB = count > 0 ? bSum / count : 200;

            const blendFactor = bestSaturation > 0.15 ? 0.65 : 0.3;
            const finalR = Math.round(bestR * blendFactor + avgR * (1 - blendFactor));
            const finalG = Math.round(bestG * blendFactor + avgG * (1 - blendFactor));
            const finalB = Math.round(bestB * blendFactor + avgB * (1 - blendFactor));

            const result = `rgba(${finalR}, ${finalG}, ${finalB}, ${opacity})`;
            colorCacheRef.current.set(imgSrc, result);
            resolve(result);
          } catch {
            resolve(null);
          }
        };

        img.onerror = () => resolve(null);
      });
    },
    [opacity]
  );

  return { extractColor };
}
