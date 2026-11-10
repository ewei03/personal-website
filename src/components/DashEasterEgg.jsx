import { useEffect, useRef, useState } from "react";
import { CancelIcon } from "./Icons.jsx";
import { useI18n } from "../i18n.jsx";
import useEggSupport from "./useEggSupport.js";

/*
 * Easter egg #2: a glowing square in the bottom-left corner. Click it (or focus + Enter) and it
 * drops onto the "floor" (the top edge of the footer) and becomes the player in an endless
 * runner: jump over groups of spikes (Space, ↑, or mouse click; hold to keep jumping). It speeds up over time; hitting a spike just respawns you at the start speed.
 * No score. The cancel icon in the bottom-left corner stops it; the square stays gone until reload.
 * Needs a mouse/trackpad and a wide window; with reduced motion it launches without the flight.
 */

const SIZE = 26;              // player square (px)
const PLAYER_X = 120;         // player's distance from the left edge
const GRAVITY = 3800;         // px/s²
const JUMP_V = 626;           // px/s (≈52px high, ≈0.33s airtime: 3-spike groups need good timing)
const START_SPEED = 340;      // px/s, how fast spikes approach
const MAX_SPEED = 720;
const ACCEL = 10;             // px/s gained per second alive
const SPIKE_W = 24;
const SPIKE_H = 24;
const GROUP_SIZES = [1, 1, 2, 2, 3]; // spikes per group (1–3); 3s are deliberately tight
const RESPAWN_PAUSE = 0.7;    // s

/** Floor = top of the footer if it's on screen, otherwise the bottom of the window. */
function floorY() {
  const h = window.innerHeight;
  const footer = document.querySelector(".site-footer")?.getBoundingClientRect();
  return footer && footer.top < h && footer.top > h * 0.4 ? footer.top : h;
}

export default function DashEasterEgg() {
  const { t } = useI18n();
  const { supported, calm } = useEggSupport();
  const [phase, setPhase] = useState("idle"); // idle | leaving | playing | stopping | stopped
  const [flight, setFlight] = useState(null);
  const [handoff, setHandoff] = useState(false); // icon lingers & fades while the game fades in
  const [otherActive, setOtherActive] = useState(false); // the other easter-egg game is running

  // Only one game at a time: announce when this one is running, and listen for the other
  useEffect(() => {
    const running = phase === "leaving" || phase === "playing" || phase === "stopping";
    window.dispatchEvent(new CustomEvent("egg-game", { detail: { id: "dash", running } }));
  }, [phase]);
  useEffect(() => {
    const onGame = (e) => { if (e.detail.id !== "dash") setOtherActive(e.detail.running); };
    window.addEventListener("egg-game", onGame);
    return () => window.removeEventListener("egg-game", onGame);
  }, []);
  const iconRef = useRef(null);
  const canvasRef = useRef(null);

  const launch = () => {
    if (phase !== "idle" || otherActive) return;
    // reduced motion: skip the flight and just swap the icon for the game
    if (calm) { setPhase("playing"); return; }
    // drop from the icon to the player's starting spot on the floor
    // Use the icon's resting position (from its CSS), not its live box, which is offset by the float bob
    const el = iconRef.current;
    if (el) {
      const cs = getComputedStyle(el);
      const cx = parseFloat(cs.left) + el.offsetWidth / 2;
      const cy = window.innerHeight - parseFloat(cs.bottom) - el.offsetHeight / 2;
      setFlight({
        "--tx": `${PLAYER_X + SIZE / 2 - cx}px`,
        "--ty": `${floorY() - SIZE / 2 - cy}px`,
        "--s": `${SIZE / el.offsetWidth}`,
      });
    }
    setPhase("leaving");
    setTimeout(() => {
      setHandoff(true);
      setPhase("playing");
      setTimeout(() => setHandoff(false), 550); // crossfade: icon fades out as the game fades in
    }, 800);
  };

  const stop = () => {
    setPhase("stopping");
    setTimeout(() => setPhase("stopped"), 1000);
  };

  // Cards go translucent while the game runs
  useEffect(() => {
    document.documentElement.classList.toggle("dash-on", phase === "playing");
    return () => document.documentElement.classList.remove("dash-on");
  }, [phase]);

  const active = phase === "playing" || phase === "stopping";
  useEffect(() => {
    if (!active) return;
    const cv = canvasRef.current;
    const ctx = cv.getContext("2d");
    let w = 0, h = 0, floor = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      w = window.innerWidth;
      h = window.innerHeight;
      cv.width = Math.round(w * dpr);
      cv.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      floor = floorY();
    };
    resize();

    const player = { y: 0, vy: 0, angle: 0, grounded: true };
    let spikes = [];          // { x } — left edge of each spike
    let nextGroupIn = 0;      // px of travel until the next group spawns
    let speed = START_SPEED;
    let dead = 0;             // > 0 while respawning
    let flash = 0;

    const reset = () => {
      player.y = 0; player.vy = 0; player.angle = 0; player.grounded = true;
      spikes = [];
      speed = START_SPEED;
      nextGroupIn = w * 0.35;
    };
    reset();

    const spawnGroup = () => {
      const n = GROUP_SIZES[Math.floor(Math.random() * GROUP_SIZES.length)];
      for (let i = 0; i < n; i++) spikes.push({ x: w + 10 + i * SPIKE_W });
      // gap before the next group grows with speed so it's always clearable
      const airtime = (2 * JUMP_V) / GRAVITY;
      const minGap = speed * airtime + SPIKE_W * n + 80;
      nextGroupIn = n * SPIKE_W + minGap + Math.random() * speed * 0.9;
    };

    // --- input: Space, ↑, or any mouse click (like Geometry Dash); hold to keep jumping ---
    let held = false;
    const jump = () => {
      if (dead > 0 || !player.grounded) return;
      player.vy = -JUMP_V;
      player.grounded = false;
    };
    const isJumpKey = (e) => e.code === "Space" || e.key === "ArrowUp";
    const typing = (t) => t.closest?.("input, textarea, select, [contenteditable]");
    const onKeyDown = (e) => {
      if (!isJumpKey(e) || typing(e.target) || document.querySelector("dialog[open]")) return;
      e.preventDefault(); // don't scroll the page
      held = true;
      jump();
    };
    const onKeyUp = (e) => { if (isJumpKey(e)) held = false; };
    const onDown = (e) => {
      if (e.button !== 0) return;
      if (e.target.closest?.(".egg-controls, dialog")) return; // not the stop button or popups
      held = true;
      jump();
    };
    const onUp = () => { held = false; };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("resize", resize);

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
      if (++tickCount % 30 === 0) { readHue(); floor = floorY(); }

      if (dead > 0) {
        dead -= dt;
        flash += dt;
        if (dead <= 0) reset();
      } else {
        speed = Math.min(MAX_SPEED, speed + ACCEL * dt);

        // player physics (y is height above the floor, negative = up)
        if (!player.grounded) {
          player.vy += GRAVITY * dt;
          player.y += player.vy * dt;
          player.angle += (180 / ((2 * JUMP_V) / GRAVITY)) * dt; // half-flip per jump
          if (player.y >= 0) {
            player.y = 0; player.vy = 0; player.grounded = true;
            player.angle = Math.round(player.angle / 90) * 90;  // land flat
          }
        }
        if (player.grounded && held) jump();

        // spikes
        for (const s of spikes) s.x -= speed * dt;
        spikes = spikes.filter((s) => s.x > -SPIKE_W * 2);
        nextGroupIn -= speed * dt;
        if (nextGroupIn <= 0) spawnGroup();

        // collision (a slightly forgiving box inside each spike)
        const px0 = PLAYER_X + 3, px1 = PLAYER_X + SIZE - 3;
        const pBottom = floor + player.y - 2;
        for (const s of spikes) {
          const sx0 = s.x + SPIKE_W * 0.28, sx1 = s.x + SPIKE_W * 0.72;
          const sTop = floor - SPIKE_H * 0.6;
          if (px1 > sx0 && px0 < sx1 && pBottom > sTop) { dead = RESPAWN_PAUSE; flash = 0; break; }
        }
      }

      // draw
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = `hsla(${hue + 11}, 48%, 61%, 0.45)`;
      for (const s of spikes) {
        ctx.beginPath();
        ctx.moveTo(s.x, floor);
        ctx.lineTo(s.x + SPIKE_W / 2, floor - SPIKE_H);
        ctx.lineTo(s.x + SPIKE_W, floor);
        ctx.closePath();
        ctx.fill();
      }
      const visible = dead <= 0 || Math.floor(flash * 12) % 2 === 0; // blink while respawning
      if (visible) {
        const col = `hsla(${hue + 30}, 70%, 66%, 0.75)`;
        ctx.save();
        ctx.translate(PLAYER_X + SIZE / 2, floor + player.y - SIZE / 2);
        ctx.rotate((player.angle * Math.PI) / 180);
        ctx.fillStyle = col;
        ctx.shadowColor = col;
        ctx.shadowBlur = 14;
        roundRect(ctx, -SIZE / 2, -SIZE / 2, SIZE, SIZE, 4);
        ctx.restore();
      }

      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    requestAnimationFrame(() => cv.classList.add("on"));

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("resize", resize);
    };
  }, [active]);

  // hide when unsupported (e.g. window shrunk), but never yank away a game already running
  if (phase === "stopped" || (!supported && phase === "idle")) return null;

  return (
    <>
      {(phase === "idle" || phase === "leaving" || handoff) && (
        <button
          type="button"
          ref={iconRef}
          className={`dash-icon${phase === "leaving" || handoff ? " leaving" : ""}${handoff ? " handoff" : ""}${otherActive ? " blocked" : ""}`}
          tabIndex={otherActive ? -1 : undefined}
          aria-hidden={otherActive || undefined}
          style={phase === "leaving" || handoff ? flight : undefined}
          onClick={handoff ? undefined : launch}
          aria-label={t("Play a runner game")}
          title={t("Jump?")}
        >
          <span className="egg-float"><span className="dash-icon-square" /></span>
        </button>
      )}

      {active && (
        <canvas ref={canvasRef} className={`egg-canvas${phase === "stopping" ? " stopping" : ""}`} aria-hidden="true" />
      )}

      {active && (
        <div className={`egg-controls egg-controls--bl${phase === "stopping" ? " leaving" : ""}`}>
          <button type="button" className="egg-stop" onClick={stop} aria-label={t("Stop the runner game")} title={t("Stop")}>
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
