import { useEffect, useState } from "react";

// Wide enough, and the device has *some* mouse/trackpad (so touchscreen laptops still qualify)
const SUPPORTED = "(any-pointer: fine) and (any-hover: hover) and (min-width: 901px)";
const CALM = "(prefers-reduced-motion: reduce)";

const read = () => ({
  supported: window.matchMedia(SUPPORTED).matches,
  calm: window.matchMedia(CALM).matches,
});

/**
 * Whether the easter-egg games can be shown, and whether the user prefers reduced motion
 * (in which case the games still appear, but launch without the flying animation).
 * Re-evaluated live, so resizing / zooming / plugging in a mouse updates it without a reload.
 */
export default function useEggSupport() {
  const [state, setState] = useState({ supported: false, calm: false });

  useEffect(() => {
    const update = () => setState(read());
    update();
    const queries = [SUPPORTED, CALM].map((q) => window.matchMedia(q));
    queries.forEach((mq) => mq.addEventListener?.("change", update));
    return () => queries.forEach((mq) => mq.removeEventListener?.("change", update));
  }, []);

  return state;
}
