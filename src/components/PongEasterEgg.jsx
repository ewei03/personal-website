import { useEffect, useRef, useState } from "react";
import { CancelIcon } from "./Icons.jsx";

/*
 * Easter egg: a glowing racket in the top-right corner. Click it (or focus + Enter) and it
 * flies to the centre and becomes the ball of a quiet, endless game of Pong in the background:
 * you (left paddle, follows your mouse up and down) vs. the CPU (right). No score; the ball
 * respawns in the middle after a miss. The play area runs between the header and the footer.
 * While playing, a corner control stops the game; once stopped, the racket stays gone until
 * the page is reloaded. The ball speeds up a little on every paddle hit.
 * Mouse/trackpad only, and off for reduced-motion users.
 */

const PADDLE_W = 8;
const PADDLE_H = 96;
const EDGE = 8;              // paddle distance from the screen edge
const BALL_R = 7;
const START_SPEED = 400;     // px/s
const MAX_SPEED = 950;
const SPEEDUP = 1.06;        // per paddle hit
const MAX_ANGLE = Math.PI * 0.32;
const CPU_SPEED = 640;       // px/s top speed: fast, but still below the ball's max (950)
const CPU_ERROR = 0.2;       // max final aim error, as a fraction of paddle height (small = very accurate)
const CPU_MISJUDGE = 170;    // px: how far off its first guess can be (shrinks as the ball nears)
const CPU_REACTION = [0.25, 0.5]; // s: random hesitation after you hit the ball
const CPU_ACCEL = 3.5;       // how quickly it gets up to speed (lower = slower, smoother approach)
const CPU_HOMING = 4;        // how hard it steers toward its target (lower = eases in instead of snapping)
const SERVE_PAUSE = 0.8;     // s

/** Vertical play area: from the bottom of the header to the top of the footer (if on screen). */
function playBounds() {
  const h = window.innerHeight;
  const header = document.querySelector(".site-header")?.getBoundingClientRect();
  const footer = document.querySelector(".site-footer")?.getBoundingClientRect();
  const top = header ? Math.max(0, header.bottom) : 0;
  const bottom = footer && footer.top < h ? footer.top : h;
  return bottom - top > PADDLE_H + 40 ? { top, bottom } : { top: 0, bottom: h };
}

export default function PongEasterEgg() {
  const [enabled, setEnabled] = useState(false);
  const [phase, setPhase] = useState("idle"); // idle | leaving | playing | stopping | stopped
  const [flight, setFlight] = useState(null);
  const [handoff, setHandoff] = useState(false); // icon lingers & fades while the game fades in
  const [otherActive, setOtherActive] = useState(false); // the other easter-egg game is running

  // Only one game at a time: announce when this one is running, and listen for the other
  useEffect(() => {
    const running = phase === "leaving" || phase === "playing" || phase === "stopping";
    window.dispatchEvent(new CustomEvent("egg-game", { detail: { id: "pong", running } }));
  }, [phase]);
  useEffect(() => {
    const onGame = (e) => { if (e.detail.id !== "pong") setOtherActive(e.detail.running); };
    window.addEventListener("egg-game", onGame);
    return () => window.removeEventListener("egg-game", onGame);
  }, []);
  const canvasRef = useRef(null);
  const racketRef = useRef(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setEnabled(fine && !calm);
  }, []);

  const launch = () => {
    if (phase !== "idle" || otherActive) return;
    // fly from the icon's centre to the centre of the play area, where the ball serves from
    // Use the icon's resting position (from its CSS), not its live box, which is offset by the float bob
    const el = racketRef.current;
    const { top, bottom } = playBounds();
    if (el) {
      const cs = getComputedStyle(el);
      const cx = window.innerWidth - parseFloat(cs.right) - el.offsetWidth / 2;
      const cy = parseFloat(cs.top) + el.offsetHeight / 2;
      setFlight({
        "--tx": `${window.innerWidth / 2 - cx}px`,
        "--ty": `${(top + bottom) / 2 - cy}px`,
      });
    }
    setPhase("leaving");
    setTimeout(() => {
      setHandoff(true);
      setPhase("playing");
      setTimeout(() => setHandoff(false), 550); // crossfade: icon fades out as the game fades in
    }, 950);
  };

  const stop = () => {
    setPhase("stopping");
    setTimeout(() => setPhase("stopped"), 1000); // let everything fade out first
  };

  // While the game runs, make the cards see-through so the ball shows behind them
  useEffect(() => {
    document.documentElement.classList.toggle("pong-on", phase === "playing");
    return () => document.documentElement.classList.remove("pong-on");
  }, [phase]);

  // The game loop runs while playing and keeps running during the stop fade-out
  const active = phase === "playing" || phase === "stopping";
  useEffect(() => {
    if (!active) return;
    const cv = canvasRef.current;
    const ctx = cv.getContext("2d");
    let w = 0, h = 0;
    let top = 0, bottom = 0;

    const measure = () => { ({ top, bottom } = playBounds()); };
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      w = window.innerWidth;
      h = window.innerHeight;
      cv.width = Math.round(w * dpr);
      cv.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      measure();
    };
    resize();

    const mid = () => (top + bottom) / 2;
    const clampY = (y) => Math.max(top + PADDLE_H / 2, Math.min(bottom - PADDLE_H / 2, y));
    const cpu = { y: mid(), vy: 0, aimError: 0, misjudge: 0, react: 0, fidget: 0, fidgetTarget: 0, fidgetTimer: 0, t: 0 };
    const you = { y: mid() };
    const ball = { x: w / 2, y: mid(), vx: 0, vy: 0, wait: SERVE_PAUSE };

    let firstServe = true;
    const serve = () => {
      ball.x = w / 2;
      ball.y = mid();
      const dir = Math.random() < 0.5 ? -1 : 1;
      const angle = (Math.random() * 2 - 1) * 0.4;
      ball.vx = Math.cos(angle) * START_SPEED * dir;
      ball.vy = Math.sin(angle) * START_SPEED;
      ball.wait = SERVE_PAUSE;
      cpu.aimError = 0;
      cpu.misjudge = 0;
      cpu.react = 0;
    };
    serve();
    ball.wait = 0.6; // brief beat after the racket lands

    // Where will the ball be (y) when it reaches x? Accounts for bounces off the bounds.
    const predictY = (targetX) => {
      if (ball.vx === 0) return ball.y;
      const t = (targetX - ball.x) / ball.vx;
      if (t < 0) return ball.y;
      const span = bottom - top - 2 * BALL_R;
      let y = ball.y - top - BALL_R + ball.vy * t;
      y = ((y % (2 * span)) + 2 * span) % (2 * span);
      if (y > span) y = 2 * span - y;
      return y + top + BALL_R;
    };

    const bounce = (paddle, dir) => {
      const offset = Math.max(-1, Math.min(1, (ball.y - paddle.y) / (PADDLE_H / 2)));
      const angle = offset * MAX_ANGLE;
      const speed = Math.min(Math.hypot(ball.vx, ball.vy) * SPEEDUP, MAX_SPEED);
      ball.vx = Math.cos(angle) * speed * dir;
      ball.vy = Math.sin(angle) * speed;
      ball.x = dir > 0 ? EDGE + PADDLE_W + BALL_R : w - EDGE - PADDLE_W - BALL_R;
      if (paddle === you) {
        // you just returned it: the CPU hesitates, then makes an imperfect first guess
        cpu.aimError = (Math.random() * 2 - 1) * CPU_ERROR * PADDLE_H;
        cpu.misjudge = (Math.random() * 2 - 1) * CPU_MISJUDGE;
        cpu.react = CPU_REACTION[0] + Math.random() * (CPU_REACTION[1] - CPU_REACTION[0]);
      }
    };

    // your paddle follows the mouse's vertical position
    const onMove = (e) => { if (!document.querySelector("dialog[open]")) you.y = clampY(e.clientY); };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("resize", resize);

    // colours follow the palette (--hue); bounds follow the header/footer. Re-read occasionally.
    let hue = 176, tickCount = 0;
    const readHue = () => {
      const v = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--hue"));
      if (!Number.isNaN(v)) hue = v;
    };
    readHue();

    let last = performance.now();
    let frame = 0;
    const tick = (now) => {
      // freeze while any popup (hobby details, résumé) is open
      const paused = !!document.querySelector("dialog[open]");
      const dt = paused ? 0 : Math.min((now - last) / 1000, 0.05);
      last = now;
      if (++tickCount % 30 === 0) {
        readHue();
        measure();
        you.y = clampY(you.y);
      }

      // CPU: track the predicted landing spot when the ball is coming, else drift to centre
      // CPU: human-ish. Hesitates after your hit, misjudges at first and refines its guess as
      // the ball approaches, moves with momentum, and fidgets a little.
      cpu.t += dt;
      cpu.fidgetTimer -= dt;
      if (cpu.fidgetTimer <= 0) {
        cpu.fidgetTarget = (Math.random() * 2 - 1) * 14;
        cpu.fidgetTimer = 0.25 + Math.random() * 0.45;
      }
      cpu.fidget += (cpu.fidgetTarget - cpu.fidget) * Math.min(1, 6 * dt);

      let cpuTarget;
      if (ball.vx > 0 && ball.wait <= 0) {
        if (cpu.react > 0) {
          cpu.react -= dt;
          cpuTarget = cpu.y; // still reacting: hold position
        } else {
          const faceX = w - EDGE - PADDLE_W - BALL_R;
          const remaining = Math.max(0, Math.min(1, (faceX - ball.x) / (w * 0.85))); // 1 = far, 0 = arrived
          cpuTarget = predictY(faceX) + cpu.aimError + cpu.misjudge * remaining + cpu.fidget;
        }
      } else {
        // ball heading away: drift loosely back toward the middle with a lazy sway
        cpuTarget = mid() + Math.sin(cpu.t * 1.3) * 30 + cpu.fidget * 2;
      }
      const desired = Math.max(-CPU_SPEED, Math.min(CPU_SPEED, (cpuTarget - cpu.y) * CPU_HOMING));
      cpu.vy += (desired - cpu.vy) * Math.min(1, CPU_ACCEL * dt);
      cpu.y = clampY(cpu.y + cpu.vy * dt);
      if (cpu.y === top + PADDLE_H / 2 || cpu.y === bottom - PADDLE_H / 2) cpu.vy = 0;

      // Ball
      if (ball.wait > 0) {
        ball.wait -= dt;
      } else {
        ball.x += ball.vx * dt;
        ball.y += ball.vy * dt;
        if (ball.y < top + BALL_R) { ball.y = top + BALL_R; ball.vy = Math.abs(ball.vy); }
        if (ball.y > bottom - BALL_R) { ball.y = bottom - BALL_R; ball.vy = -Math.abs(ball.vy); }

        const leftFace = EDGE + PADDLE_W;
        if (ball.vx < 0 && ball.x - BALL_R <= leftFace && ball.x > EDGE - BALL_R &&
            Math.abs(ball.y - you.y) <= PADDLE_H / 2 + BALL_R) bounce(you, 1);

        const rightFace = w - EDGE - PADDLE_W;
        if (ball.vx > 0 && ball.x + BALL_R >= rightFace && ball.x < w - EDGE + BALL_R &&
            Math.abs(ball.y - cpu.y) <= PADDLE_H / 2 + BALL_R) bounce(cpu, -1);

        if (ball.x < -BALL_R * 3 || ball.x > w + BALL_R * 3) { firstServe = false; serve(); }
      }

      // Draw
      ctx.clearRect(0, 0, w, h);
      const paddle = `hsla(${hue + 11}, 48%, 61%, 0.38)`;
      const ballCol = `hsla(${hue + 30}, 70%, 66%, ${ball.wait > 0 && !firstServe ? 0.25 : 0.6})`;
      ctx.fillStyle = paddle;
      roundRect(ctx, EDGE, you.y - PADDLE_H / 2, PADDLE_W, PADDLE_H, 4);
      roundRect(ctx, w - EDGE - PADDLE_W, cpu.y - PADDLE_H / 2, PADDLE_W, PADDLE_H, 4);
      ctx.save();
      ctx.fillStyle = ballCol;
      ctx.shadowColor = ballCol;
      ctx.shadowBlur = 14;
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, BALL_R, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    requestAnimationFrame(() => cv.classList.add("on"));

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", resize);
    };
  }, [active]);

  if (!enabled || phase === "stopped") return null;

  return (
    <>
      {(phase === "idle" || phase === "leaving" || handoff) && (
        <button
          type="button"
          ref={racketRef}
          className={`pong-racket${phase === "leaving" || handoff ? " leaving" : ""}${handoff ? " handoff" : ""}${otherActive ? " blocked" : ""}`}
          tabIndex={otherActive ? -1 : undefined}
          aria-hidden={otherActive || undefined}
          style={phase === "leaving" || handoff ? flight : undefined}
          onClick={handoff ? undefined : launch}
          aria-label="Play Pong"
          title="Pong?"
        >
          <span className="egg-float">
          <svg className="pong-racket-art" viewBox="0 0 48 48" aria-hidden="true">
            {/* table-tennis paddle (tilted) + ball */}
            <g transform="rotate(38 24 24)">
              {/* solid rubber blade */}
              <ellipse cx="24" cy="16" rx="14" ry="15" fill="currentColor" />
              {/* flared neck + chunky handle in a lighter shade */}
              <path d="M18 29.5h12l-2 5h-8z" fill="currentColor" fillOpacity="0.6" />
              <rect x="19.5" y="33.5" width="9" height="13" rx="3" fill="currentColor" fillOpacity="0.6" />
            </g>
            <circle cx="8" cy="8" r="3.8" fill="currentColor" />
          </svg>
          {/* the paddle turns into this ball as it reaches the centre */}
          <span className="pong-morph-ball" aria-hidden="true" />
          </span>
        </button>
      )}

      {(phase === "playing" || phase === "stopping") && (
        // React replaces the class on "stopping", dropping "on" so the canvas fades out
        <canvas ref={canvasRef} className={`pong-canvas${phase === "stopping" ? " stopping" : ""}`} aria-hidden="true" />
      )}

      {(phase === "playing" || phase === "stopping") && (
        <div className={`pong-controls${phase === "stopping" ? " leaving" : ""}`}>
          <button type="button" className="pong-ctl" onClick={stop} aria-label="Stop Pong" title="Stop">
            <CancelIcon />
          </button>
        </div>
      )}
    </>
  );
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
  ctx.fill();
}
