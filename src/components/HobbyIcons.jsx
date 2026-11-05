// Line-art "clip art" for the hobby cards. Drawn with currentColor so they follow the palette.
const svg = { viewBox: "0 0 64 64", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true };

const Violin = () => (
  <svg {...svg}>
    {/* bow: stick, hooked tip, hair, and frog */}
    <path d="M12 52L51 13" />
    <path d="M51 13l4 2-1 3" />
    <path d="M17 55L54 18" strokeWidth="1" />
    <path d="M12 52l3.5 4.5 3-2-3.5-4.5z" fill="currentColor" />
    <path d="M9.5 54.5L12 52" />
    {/* scroll + neck */}
    <circle cx="32" cy="6" r="2.5" />
    <path d="M30 22V9h4v13" />
    {/* body */}
    <path d="M32 22c-6 0-9 3-9 7 0 3 2 4 2 6 0 2-4 3-4 9 0 7 5 11 11 11s11-4 11-11c0-6-4-7-4-9 0-2 2-3 2-6 0-4-3-7-9-7z" />
    {/* f-holes, bridge, strings, tailpiece */}
    <path d="M27 37c-1 2 1 4 0 6M37 37c1 2-1 4 0 6" strokeWidth="1.5" />
    <path d="M28 44h8" />
    <path d="M31 9v39M33 9v39" strokeWidth="0.8" />
    <path d="M30 48l2 5 2-5" />
  </svg>
);

// Small piano keyboard: seven white keys with the black-key pattern (2 + 3)
const PianoKeys = () => (
  <svg {...svg}>
    <rect x="6" y="18" width="52" height="28" rx="3" />
    <path d="M13.43 18V46M20.86 18V46M28.29 18V46M35.71 18V46M43.14 18V46M50.57 18V46" strokeWidth="1.5" />
    <rect x="11.03" y="18" width="4.8" height="16" rx="1" fill="currentColor" stroke="none" />
    <rect x="18.46" y="18" width="4.8" height="16" rx="1" fill="currentColor" stroke="none" />
    <rect x="33.31" y="18" width="4.8" height="16" rx="1" fill="currentColor" stroke="none" />
    <rect x="40.74" y="18" width="4.8" height="16" rx="1" fill="currentColor" stroke="none" />
    <rect x="48.17" y="18" width="4.8" height="16" rx="1" fill="currentColor" stroke="none" />
  </svg>
);

// osu!mania mode icon: a ring with three vertical bars, the middle one longer
const RhythmNote = () => (
  <svg {...svg}>
    <circle cx="32" cy="32" r="22" />
    <path d="M24 25v14M32 20v24M40 25v14" strokeWidth="3.5" />
  </svg>
);

// Filled stickers (no outlines): 3x3 per face with small gaps; faces shaded for depth.
function faceStickers(px, py, ux, uy, vx, vy, gap = 0.1) {
  const quads = [];
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const a0 = (i + gap) / 3, a1 = (i + 1 - gap) / 3;
      const b0 = (j + gap) / 3, b1 = (j + 1 - gap) / 3;
      const pt = (a, b) => `${(px + a * ux + b * vx).toFixed(2)},${(py + a * uy + b * vy).toFixed(2)}`;
      quads.push(`${pt(a0, b0)} ${pt(a1, b0)} ${pt(a1, b1)} ${pt(a0, b1)}`);
    }
  }
  return quads;
}
const CUBE_FACES = [
  { quads: faceStickers(32, 8, 20, 11, -20, 11), opacity: 1 },    // top
  { quads: faceStickers(12, 19, 20, 11, 0, 24), opacity: 0.7 },   // left
  { quads: faceStickers(32, 30, 20, -11, 0, 24), opacity: 0.45 }, // right
];
const RubiksCube = () => (
  <svg viewBox="0 0 64 64" aria-hidden="true">
    {CUBE_FACES.map((f, fi) => (
      <g key={fi} fill="currentColor" fillOpacity={f.opacity}>
        {f.quads.map((q, qi) => <polygon key={qi} points={q} />)}
      </g>
    ))}
  </svg>
);

const QuestionMark = () => (
  <svg {...svg} strokeWidth="3">
    <path d="M23 22a9 9 0 1 1 13 8c-3 2-4 4-4 8v2" />
    <circle cx="32" cy="49" r="1.5" fill="currentColor" />
  </svg>
);

export const hobbyIcons = {
  piano: PianoKeys,
  violin: Violin,
  rhythm: RhythmNote,
  cube: RubiksCube,
  question: QuestionMark,
};
