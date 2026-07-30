import React from "react";
import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  OffthreadVideo,
  Sequence,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import agentGrid from "../../../docs/screenshots/agent-grid.jpg";
import pixelMode from "../../../docs/screenshots/pixel-mode.jpg";
import cinematicScene from "../../../assets/scenes/cotopaxi.webp";
import iconAnimation from "../../../assets/bscode-loading-animation.mp4";
import agentFace0 from "../../../assets/agent-face-0.png";
import agentFace1 from "../../../assets/agent-face-1.png";
import agentFace2 from "../../../assets/agent-face-2.png";
import agentFace3 from "../../../assets/agent-face-3.png";

const blue = "#70b7ff";
const green = "#63d69f";
const violet = "#9b7cff";
const amber = "#f6c45f";
const clamp = {extrapolateLeft: "clamp", extrapolateRight: "clamp"};
const faces = [agentFace0, agentFace1, agentFace2, agentFace3];

const fadeBetween = (frame, enter, full, leave, gone) =>
  interpolate(frame, [enter, full, leave, gone], [0, 1, 1, 0], clamp);

const WindowChrome = ({title, children}) => (
  <div
    style={{
      position: "absolute",
      left: 28,
      top: 28,
      width: 904,
      height: 484,
      overflow: "hidden",
      borderRadius: 18,
      background: "#0d1016",
      border: "1px solid #ffffff20",
      boxShadow: "0 26px 64px #0009",
    }}
  >
    <div
      style={{
        height: 34,
        display: "flex",
        alignItems: "center",
        background: "#171a22",
        borderBottom: "1px solid #ffffff12",
        padding: "0 13px",
        boxSizing: "border-box",
      }}
    >
      <div style={{display: "flex", gap: 7}}>
        {["#ff5f57", "#febc2e", "#28c840"].map((color) => (
          <span key={color} style={{width: 9, height: 9, borderRadius: 20, background: color}} />
        ))}
      </div>
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          textAlign: "center",
          color: "#c9cfda",
          font: "650 11px Inter, ui-sans-serif, system-ui",
          letterSpacing: 0.15,
        }}
      >
        {title}
      </div>
    </div>
    <div style={{position: "absolute", inset: "34px 0 0"}}>{children}</div>
  </div>
);

const SceneLabel = ({frame, start, color, eyebrow, title, align = "left"}) => {
  const show = spring({
    frame: frame - start,
    fps: 60,
    config: {damping: 17, stiffness: 135, mass: 0.72},
  });

  return (
    <div
      style={{
        position: "absolute",
        left: align === "left" ? 50 : "auto",
        right: align === "right" ? 50 : "auto",
        top: 52,
        textAlign: align,
        opacity: show,
        transform: `translateY(${(1 - show) * 18}px)`,
        color: "white",
        fontFamily: "Inter, ui-sans-serif, system-ui",
        textShadow: "0 2px 14px #000",
      }}
    >
      <div style={{color, fontSize: 11, fontWeight: 850, letterSpacing: 2.4}}>{eyebrow}</div>
      <div style={{fontSize: 28, fontWeight: 900, letterSpacing: -1.2, marginTop: 4}}>{title}</div>
    </div>
  );
};

const AgentGridScene = ({frame}) => {
  const opacity = fadeBetween(frame, 0, 8, 74, 92);
  const pan = interpolate(frame, [0, 92], [0, -20], {
    ...clamp,
    easing: Easing.inOut(Easing.cubic),
  });

  return (
    <div style={{position: "absolute", inset: 0, opacity}}>
      <Img
        src={agentGrid}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: `translateY(${pan}px) scale(1.04)`,
          filter: "saturate(.94) contrast(1.04) brightness(.8)",
        }}
      />
      <div style={{position: "absolute", inset: 0, background: "linear-gradient(180deg,#06080c18 44%,#070a10c9)"}} />
      <SceneLabel frame={frame} start={5} color={blue} eyebrow="AGENT WALL" title="Four agents. One live workspace." />
    </div>
  );
};

const PixelScene = ({frame}) => {
  const reveal = interpolate(frame, [76, 96], [0, 100], {
    ...clamp,
    easing: Easing.inOut(Easing.cubic),
  });
  const opacity = fadeBetween(frame, 76, 92, 155, 174);
  const cursorX = interpolate(frame, [97, 120], [340, 665], clamp);
  const cursorY = interpolate(frame, [97, 120], [320, 356], clamp);

  return (
    <div style={{position: "absolute", inset: 0, opacity, clipPath: `inset(0 ${100 - reveal}% 0 0)`}}>
      <Img
        src={pixelMode}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: "scale(1.04)",
          filter: "saturate(.95) brightness(.82)",
        }}
      />
      <div style={{position: "absolute", inset: 0, background: "linear-gradient(90deg,#090b10b8,transparent 50%)"}} />
      <SceneLabel frame={frame} start={88} color={violet} eyebrow="PIXEL MODE" title="Every agent gets a floor." />
      <div
        style={{
          position: "absolute",
          left: cursorX,
          top: cursorY,
          width: 15,
          height: 20,
          background: "white",
          clipPath: "polygon(0 0, 0 100%, 29% 73%, 46% 100%, 59% 93%, 42% 66%, 76% 66%)",
          filter: "drop-shadow(0 2px 3px #000)",
        }}
      />
    </div>
  );
};

const TerminalPane = ({index, frame}) => {
  const colors = [blue, violet, green, amber];
  const lines = [
    ["Analyzing renderer state…", "✓ task metadata normalized", "Writing workspace handoff"],
    ["Reviewing changed files…", "✓ visual checks complete", "Preparing final summary"],
    ["$ npm test", "46 checks passed", "$ npm run package:mac"],
    ["Inspecting SSH workspace…", "✓ outputs synchronized", "Waiting for next task"],
  ][index];
  const show = spring({
    frame: frame - 171 - index * 3,
    fps: 60,
    config: {damping: 16, stiffness: 140},
  });

  return (
    <div
      style={{
        borderRadius: 10,
        background: "rgba(7,9,14,.82)",
        border: `1px solid ${colors[index]}65`,
        padding: 11,
        boxSizing: "border-box",
        backdropFilter: "blur(8px)",
        opacity: show,
        transform: `scale(${0.92 + show * 0.08})`,
        color: "#d7dce8",
        fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
      }}
    >
      <div style={{display: "flex", alignItems: "center", gap: 7, marginBottom: 9}}>
        <Img src={faces[index]} style={{width: 19, height: 19, imageRendering: "pixelated"}} />
        <span style={{font: "750 8px Inter, ui-sans-serif, system-ui", color: colors[index]}}>
          AGENT {index + 1}
        </span>
      </div>
      {lines.map((line, lineIndex) => (
        <div key={line} style={{fontSize: 7.5, lineHeight: 1.75, opacity: lineIndex === 2 ? 1 : 0.68}}>
          {line}
        </div>
      ))}
    </div>
  );
};

const CinematicScene = ({frame}) => {
  const reveal = interpolate(frame, [157, 178], [0, 100], {
    ...clamp,
    easing: Easing.inOut(Easing.cubic),
  });
  const dock = spring({
    frame: frame - 193,
    fps: 60,
    config: {damping: 15, stiffness: 130},
  });

  return (
    <div style={{position: "absolute", inset: 0, clipPath: `circle(${reveal}% at 50% 50%)`}}>
      <Img src={cinematicScene} style={{width: "100%", height: "100%", objectFit: "cover", filter: "brightness(.54) saturate(.9)"}} />
      <div style={{position: "absolute", inset: 0, background: "linear-gradient(180deg,#0b0d1440,#0b0d14a6)"}} />
      <div
        style={{
          position: "absolute",
          inset: "54px 42px 77px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gridTemplateRows: "1fr 1fr",
          gap: 9,
        }}
      >
        {faces.map((_, index) => <TerminalPane key={index} index={index} frame={frame} />)}
      </div>
      <div
        style={{
          position: "absolute",
          left: 228,
          right: 228,
          bottom: 22,
          height: 39,
          borderRadius: 12,
          background: "rgba(9,11,17,.92)",
          border: "1px solid #ffffff2c",
          display: "flex",
          alignItems: "center",
          padding: "0 13px",
          boxSizing: "border-box",
          color: "#d4d9e5",
          font: "600 9px Inter, ui-sans-serif, system-ui",
          opacity: dock,
          transform: `translateY(${(1 - dock) * 20}px)`,
        }}
      >
        <span style={{color: violet, fontWeight: 850, marginRight: 6}}>@all</span>
        Ship the release and report blockers
        <span style={{marginLeft: "auto", color: "#737b8f"}}>⌘ ↵</span>
      </div>
      <SceneLabel frame={frame} start={165} color={amber} eyebrow="CINEMATIC MODE" title="Direct the whole studio." align="right" />
    </div>
  );
};

export const BsCodeDemo = () => {
  const frame = useCurrentFrame() * (240 / 360);
  const {fps} = useVideoConfig();
  const intro = spring({
    frame,
    fps,
    config: {damping: 18, stiffness: 110, mass: 0.8},
  });
  const close = interpolate(frame, [192, 209], [0, 1], clamp);

  return (
    <AbsoluteFill style={{overflow: "hidden", background: "#111318"}}>
      <div
        style={{
          opacity: intro,
          transform: `translateY(${(1 - intro) * 24}px) scale(${0.97 + intro * 0.03})`,
        }}
      >
        <WindowChrome title="BsCode — four agents, one workspace">
          <AgentGridScene frame={frame} />
          <PixelScene frame={frame} />
          <CinematicScene frame={frame} />
        </WindowChrome>
      </div>

      <Sequence from={288} layout="none">
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "grid",
            placeItems: "center",
            background: "#111318",
            opacity: close,
            color: "white",
            fontFamily: "Inter, ui-sans-serif, system-ui",
            textAlign: "center",
          }}
        >
          <div style={{transform: `scale(${0.92 + close * 0.08})`}}>
            <OffthreadVideo
              src={iconAnimation}
              startFrom={36}
              playbackRate={5}
              muted
              style={{
                width: 320,
                height: 180,
                objectFit: "cover",
                borderRadius: 24,
                boxShadow: "0 22px 55px #000a",
                marginBottom: 8,
              }}
            />
            <div style={{fontSize: 52, fontWeight: 930, letterSpacing: -3}}>BsCode</div>
            <div style={{color: blue, fontSize: 14, fontWeight: 800, letterSpacing: 2.8, marginTop: 5}}>
              COORDINATE · OBSERVE · SHIP
            </div>
          </div>
        </div>
      </Sequence>
    </AbsoluteFill>
  );
};
