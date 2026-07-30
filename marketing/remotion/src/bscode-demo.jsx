import React from "react";
import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import face0 from "../../../assets/agent-face-0.png";
import face1 from "../../../assets/agent-face-1.png";
import face2 from "../../../assets/agent-face-2.png";
import face3 from "../../../assets/agent-face-3.png";
import appIcon from "../../../assets/app-icon.png";
import cinematicBackground from "../../../assets/scenes/cotopaxi.webp";
import floor1 from "../../../assets/tower-previews/floor-01.png";
import floor4 from "../../../assets/tower-previews/floor-04.png";
import floor7 from "../../../assets/tower-previews/floor-07.png";
import floor12 from "../../../assets/tower-previews/floor-12.png";

const APP_WIDTH = 1600;
const APP_HEIGHT = 900;
const FPS = 30;
const clamp = {extrapolateLeft: "clamp", extrapolateRight: "clamp"};
const ease = Easing.bezier(0.22, 1, 0.36, 1);
const colors = ["#75b7ff", "#e59b67", "#ad91ff", "#72d1aa"];
const faces = [face0, face1, face2, face3];
const names = ["Jesse", "Maeve", "Grayson", "Julianna"];

const progress = (frame, from, to) =>
  interpolate(frame, [from, to], [0, 1], {...clamp, easing: ease});

const fadeWindow = (frame, enter, full, leave, gone) =>
  interpolate(frame, [enter, full, leave, gone], [0, 1, 1, 0], clamp);

const pulse = (frame, center, radius = 9) =>
  1 - Math.min(1, Math.abs(frame - center) / radius);

const tinyButton = {
  width: 28,
  height: 28,
  borderRadius: 8,
  display: "grid",
  placeItems: "center",
  color: "#aab1bd",
  fontSize: 14,
};

const Glyph = ({children, active = false, color = "#aab1bd", style}) => (
  <div
    style={{
      ...tinyButton,
      color: active ? "#eaf4ff" : color,
      background: active ? "#78baff28" : "transparent",
      boxShadow: active ? "inset 0 0 0 1px #78baff48" : "none",
      ...style,
    }}
  >
    {children}
  </div>
);

const BrandMark = ({size = 24}) => (
  <Img
    src={appIcon}
    style={{
      width: size,
      height: size,
      borderRadius: size * 0.22,
      objectFit: "cover",
      boxShadow: "0 0 0 1px #9cc9ff50, 0 4px 12px #0008",
    }}
  />
);

const MacChrome = () => (
  <div
    style={{
      height: 42,
      display: "flex",
      alignItems: "center",
      padding: "0 17px",
      boxSizing: "border-box",
      background: "linear-gradient(180deg,#20242c,#191d24)",
      borderBottom: "1px solid #ffffff10",
      color: "#b7bdc7",
      position: "relative",
      zIndex: 10,
    }}
  >
    <div style={{display: "flex", gap: 9}}>
      {["#ff605c", "#ffbd44", "#00ca4e"].map((color) => (
        <span
          key={color}
          style={{
            width: 12,
            height: 12,
            borderRadius: 20,
            background: color,
            boxShadow: `inset 0 0 0 1px #0004, 0 1px 2px #0005`,
          }}
        />
      ))}
    </div>
    <div
      style={{
        position: "absolute",
        left: 70,
        display: "flex",
        alignItems: "center",
        gap: 9,
        font: "600 12px Inter, ui-sans-serif, system-ui",
      }}
    >
      <div
        style={{
          width: 23,
          height: 23,
          display: "grid",
          placeItems: "center",
          borderRadius: 6,
          background: "#64c27d",
          color: "#08180e",
          fontSize: 14,
        }}
      >
        ♪
      </div>
      <div>
        <div style={{color: "#e0e4eb", lineHeight: 1}}>Groove District</div>
        <div style={{fontSize: 8, color: "#7f8795", marginTop: 3}}>Starjunk 95 · playing</div>
      </div>
    </div>
    <div
      style={{
        position: "absolute",
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        gap: 6,
        color: "#7e8795",
        font: "700 10px ui-monospace, SFMono-Regular, Menlo, monospace",
      }}
    >
      <span>‹</span>
      <span style={{color: "#d5dae2"}}>local</span>
      <span>·</span>
      <span>/Projects/bscode</span>
      <span>·</span>
      <span style={{color: "#75d8af"}}>4 agents active</span>
    </div>
    <div
      style={{
        marginLeft: "auto",
        display: "flex",
        alignItems: "center",
        gap: 9,
        font: "600 10px Inter, ui-sans-serif, system-ui",
      }}
    >
      <span style={{color: "#6f7784"}}>⌂</span>
      <span>◐</span>
      <span>⚙</span>
      <span style={{color: "#e1e5eb"}}>9:41</span>
      <span style={{color: "#75d8af"}}>▰ 84%</span>
    </div>
  </div>
);

const FileSidebar = () => {
  const files = [
    ["▾", ".bscode", true],
    ["▸", "src", true],
    ["", "renderer.js", false],
    ["", "styles.css", false],
    ["", "main.js", false],
    ["▸", "assets", true],
    ["", "package.json", false],
    ["", "README.md", false],
    ["", "bscode-notes.md", false],
  ];

  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 92,
        bottom: 26,
        width: 238,
        background: "#11151b",
        borderRight: "1px solid #ffffff12",
        color: "#9da4b0",
      }}
    >
      <div
        style={{
          height: 42,
          padding: "0 15px",
          display: "flex",
          alignItems: "center",
          gap: 14,
          borderBottom: "1px solid #ffffff10",
          font: "650 12px Inter, ui-sans-serif, system-ui",
        }}
      >
        <span style={{color: "#f0f2f5"}}>Files</span>
        <span>Workspaces</span>
        <span style={{marginLeft: "auto", fontSize: 16}}>⊞</span>
      </div>
      <div style={{padding: "12px 10px", font: "500 11px ui-monospace, SFMono-Regular, Menlo, monospace"}}>
        {files.map(([marker, name, folder], index) => (
          <div
            key={name}
            style={{
              height: 28,
              display: "flex",
              alignItems: "center",
              gap: 7,
              paddingLeft: folder ? 2 : 26,
              borderRadius: 6,
              color: index === 2 ? "#e5e8ee" : "#9ca3af",
              background: index === 2 ? "#ffffff0c" : "transparent",
            }}
          >
            <span style={{width: 10, color: "#6c7481"}}>{marker}</span>
            <span style={{color: folder ? "#77b8ff" : "#8f97a4"}}>{folder ? "▰" : "·"}</span>
            <span>{name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const WorkspaceTabs = () => (
  <div
    style={{
      position: "absolute",
      left: 238,
      right: 0,
      top: 42,
      height: 50,
      display: "flex",
      alignItems: "flex-end",
      background: "#141920",
      borderBottom: "1px solid #ffffff13",
      paddingLeft: 12,
      boxSizing: "border-box",
    }}
  >
    {[
      ["gondor", null],
      ["local", "working"],
    ].map(([name, state], index) => (
      <div
        key={name}
        style={{
          height: index === 1 ? 43 : 39,
          minWidth: index === 1 ? 210 : 185,
          padding: "0 18px",
          boxSizing: "border-box",
          display: "flex",
          alignItems: "center",
          gap: 10,
          color: index === 1 ? "#edf1f6" : "#9da5b1",
          background: index === 1 ? "#1c222b" : "#151a21",
          border: index === 1 ? "1px solid #6fb9ff80" : "1px solid #ffffff0d",
          borderBottom: 0,
          borderRadius: "15px 15px 0 0",
          font: "650 12px Inter, ui-sans-serif, system-ui",
          marginRight: 5,
        }}
      >
        {name}
        {state && (
          <>
            <Img src={face0} style={{width: 21, height: 21, imageRendering: "pixelated", marginLeft: 8}} />
            <span style={{fontSize: 8, color: "#72d1aa"}}>working</span>
          </>
        )}
        <span style={{marginLeft: "auto", color: "#727b88"}}>×</span>
      </div>
    ))}
    <div style={{padding: "0 14px 12px", color: "#9ca5b3", fontSize: 19}}>+</div>
  </div>
);

const StatusBar = () => (
  <div
    style={{
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 0,
      height: 26,
      display: "flex",
      alignItems: "center",
      padding: "0 12px",
      background: "#10141a",
      borderTop: "1px solid #ffffff12",
      color: "#7f8896",
      font: "600 9px ui-monospace, SFMono-Regular, Menlo, monospace",
      boxSizing: "border-box",
    }}
  >
    <span style={{color: "#6fd5a8"}}>◇ Connected to gondor</span>
    <span style={{marginLeft: 18}}>CPU 22%</span>
    <span style={{marginLeft: 12}}>Memory 11 GB / 16 GB</span>
    <span style={{marginLeft: 12}}>Storage 459 GB / 460 GB</span>
    <span style={{marginLeft: "auto"}}>arm64 · main</span>
  </div>
);

const OutputPanel = ({open = false, frame}) => {
  const slide = progress(frame, 635, 662);
  const width = open ? 292 : 0;
  return (
    <div
      style={{
        position: "absolute",
        right: 0,
        top: 92,
        bottom: 26,
        width,
        opacity: open ? slide : 0,
        transform: `translateX(${(1 - slide) * 80}px)`,
        background: "#12171e",
        borderLeft: "1px solid #ffffff14",
        color: "#a5adba",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          height: 45,
          padding: "0 14px",
          display: "flex",
          alignItems: "center",
          borderBottom: "1px solid #ffffff10",
          font: "750 12px Inter, ui-sans-serif, system-ui",
          color: "#edf0f5",
        }}
      >
        Outputs
        <span style={{marginLeft: "auto", color: "#747d8a"}}>↻ &nbsp; ×</span>
      </div>
      <div
        style={{
          margin: 14,
          border: "1px solid #ffffff18",
          borderRadius: 8,
          padding: 10,
          font: "500 9px ui-monospace, SFMono-Regular, Menlo, monospace",
          color: "#747d8a",
        }}
      >
        Paste a local or remote file path…
      </div>
      <div style={{padding: "8px 15px"}}>
        <div style={{font: "800 9px Inter, ui-sans-serif, system-ui", color: "#758090", letterSpacing: 1.2}}>
          SESSION FILES
        </div>
        <div
          style={{
            marginTop: 13,
            border: "1px solid #77b8ff32",
            background: "linear-gradient(135deg,#77b8ff12,#72d1aa08)",
            borderRadius: 11,
            padding: 12,
            boxShadow: "0 10px 28px #0005",
          }}
        >
          <div style={{color: "#e4e9f0", font: "700 11px Inter, ui-sans-serif, system-ui"}}>
            release-summary.md
          </div>
          <div style={{marginTop: 6, color: "#7d8796", font: "500 9px Inter, ui-sans-serif, system-ui"}}>
            Generated by Jesse · just now
          </div>
          <div
            style={{
              marginTop: 12,
              height: 84,
              borderRadius: 7,
              background: "#0b0f14",
              padding: 10,
              boxSizing: "border-box",
              color: "#b8c0cc",
              font: "500 8px/1.65 ui-monospace, SFMono-Regular, Menlo, monospace",
            }}
          >
            <div style={{color: "#72d1aa"}}>✓ 53 tests passed</div>
            <div>✓ arm64 package signed</div>
            <div>✓ release notes written</div>
            <div style={{color: "#77b8ff"}}>Ready to ship.</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const terminalLines = [
  ["Analyzing workspace state…", "Found 4 active sessions", "Reading renderer.js", "Planning visual update"],
  ["Reviewing changed files…", "Running interaction tests", "42 checks passed", "Preparing handoff"],
  ["$ npm test", "53 checks passed", "$ npm run package:mac", "Signing arm64 build"],
  ["Inspecting SSH workspace…", "Outputs synchronized", "ETA 2m", "Working on release notes"],
];

const AgentHeader = ({index, detail = false}) => (
  <div
    style={{
      height: 47,
      display: "flex",
      alignItems: "center",
      padding: "0 12px",
      borderBottom: "1px solid #ffffff12",
      background: `linear-gradient(90deg,${colors[index]}12,transparent 35%)`,
      boxSizing: "border-box",
    }}
  >
    <span style={{color: colors[index], fontSize: 13, marginRight: 10}}>⌬</span>
    <Img
      src={faces[index]}
      style={{
        width: 31,
        height: 31,
        imageRendering: "pixelated",
        borderRadius: 7,
        boxShadow: `0 0 0 1px ${colors[index]}80`,
      }}
    />
    <span
      style={{
        color: "#edf1f6",
        font: "700 12px Inter, ui-sans-serif, system-ui",
        marginLeft: 10,
      }}
    >
      {names[index]}
    </span>
    <span
      style={{
        marginLeft: "auto",
        display: "flex",
        alignItems: "center",
        gap: 7,
        color: "#848d9a",
        font: "650 9px Inter, ui-sans-serif, system-ui",
      }}
    >
      <span style={{width: 6, height: 6, borderRadius: 6, background: index === 0 && detail ? "#72d1aa" : colors[index]}} />
      {index === 0 && detail ? "Done" : "Working"}
      <span style={{fontSize: 14}}>⋯</span>
      <span style={{color: detail ? colors[index] : "#7d8693"}}>☷</span>
      <span>↗</span>
      <span>⇄</span>
      <span>×</span>
    </span>
  </div>
);

const TerminalContent = ({index, frame}) => {
  const typed = Math.floor(progress(frame, 46, 122) * 4);
  return (
    <div
      style={{
        position: "absolute",
        inset: "47px 0 0",
        padding: "15px 18px",
        color: "#b8c0ca",
        font: "500 10px/1.62 ui-monospace, SFMono-Regular, Menlo, monospace",
        background: "#0c1015",
        boxSizing: "border-box",
      }}
    >
      <div style={{color: "#6fd7aa"}}>fish</div>
      <div style={{color: "#677181"}}>/Users/alexdils/Downloads/test</div>
      <div style={{marginTop: 8, color: "#919aa7"}}>Welcome to fish, the friendly interactive shell</div>
      <div style={{marginTop: 14, color: "#7e8794"}}>
        CPU <span style={{color: "#72d1aa"}}>▰▰▰▱▱ 46%</span>&nbsp;&nbsp; MEM{" "}
        <span style={{color: "#efbf6f"}}>▰▰▰▰▱ 71%</span>
      </div>
      <div style={{marginTop: 12, color: colors[index]}}>
        {terminalLines[index].slice(0, Math.max(1, typed)).map((line, i) => (
          <div key={line} style={{color: i === typed - 1 ? "#dce3eb" : "#727c89"}}>
            <span style={{color: colors[index]}}>› </span>
            {line}
          </div>
        ))}
      </div>
      <div style={{position: "absolute", left: 18, bottom: 15, color: "#697482"}}>
        gpt-5.6-sol xhigh · weekly 94% left
      </div>
    </div>
  );
};

const ChecklistContent = ({frame}) => {
  const line1 = progress(frame, 168, 186);
  const line2 = progress(frame, 190, 210);
  const done = frame >= 225;
  const send = progress(frame, 240, 264);
  return (
    <div
      style={{
        position: "absolute",
        inset: "47px 0 0",
        padding: "24px 27px",
        background: "linear-gradient(135deg,#111820,#0c1117)",
        color: "#dfe4eb",
        boxSizing: "border-box",
        fontFamily: "Inter, ui-sans-serif, system-ui",
      }}
    >
      <div style={{fontSize: 13, fontWeight: 800, letterSpacing: 0.2}}>Checklist</div>
      {[
        ["Inspect responsive window state", line1],
        ["Polish cinematic prompt flow", line2],
        ["Publish signed Apple-silicon build", done ? 1 : 0],
      ].map(([label, complete], index) => (
        <div
          key={label}
          style={{
            marginTop: 15,
            height: 41,
            display: "flex",
            alignItems: "center",
            borderBottom: "1px solid #ffffff0c",
            color: complete > 0.9 ? "#8c95a2" : "#d9dee6",
            fontSize: 11,
          }}
        >
          <span
            style={{
              width: 17,
              height: 17,
              borderRadius: 5,
              marginRight: 11,
              display: "grid",
              placeItems: "center",
              background: complete > 0.9 ? "#72d1aa" : "#ffffff08",
              boxShadow: `inset 0 0 0 1px ${complete > 0.9 ? "#a7efd0" : "#6e7886"}`,
              color: "#0b1510",
              fontSize: 10,
            }}
          >
            {complete > 0.9 ? "✓" : ""}
          </span>
          <span style={{textDecoration: complete > 0.9 ? "line-through" : "none"}}>{label}</span>
          <span style={{marginLeft: "auto", color: index < 2 ? "#72d1aa" : "#78828f", fontSize: 9}}>
            {complete > 0.9 ? "done" : "working"}
          </span>
        </div>
      ))}
      <div
        style={{
          position: "absolute",
          left: 26,
          right: 26,
          bottom: 23,
          height: 62,
          borderRadius: 10,
          border: "1px solid #75b7ff70",
          background: "#10161d",
          display: "flex",
          alignItems: "center",
          padding: "0 15px",
          color: "#a5afbc",
          fontSize: 11,
          boxShadow: `0 0 ${18 * send}px #75b7ff20`,
        }}
      >
        Send another instruction…
        <span
          style={{
            marginLeft: "auto",
            width: 33,
            height: 33,
            borderRadius: 9,
            display: "grid",
            placeItems: "center",
            background: "#75b7ff18",
            color: "#9fcfff",
          }}
        >
          ↵
        </span>
      </div>
    </div>
  );
};

const AgentCard = ({index, frame, focus = false}) => {
  const detailed = index === 0 && frame >= 145 && frame < 300;
  const detailMix = progress(frame, 145, 163);
  return (
    <div
      style={{
        position: "relative",
        minWidth: 0,
        minHeight: 0,
        borderRadius: 13,
        overflow: "hidden",
        background: "#0c1015",
        boxShadow: `inset 0 0 0 1px ${colors[index]}85, 0 8px 24px #0005`,
        transform: focus && index === 0 ? `scale(${1 + detailMix * 0.015})` : "none",
      }}
    >
      <AgentHeader index={index} detail={detailed} />
      <div style={{opacity: 1 - detailMix}}>
        <TerminalContent index={index} frame={frame} />
      </div>
      {index === 0 && (
        <div style={{opacity: detailMix}}>
          <ChecklistContent frame={frame} />
        </div>
      )}
    </div>
  );
};

const Workspace = ({frame, outputOpen = false}) => {
  const detailFocus = frame >= 125 && frame < 292;
  const outputWidth = outputOpen ? 292 : 0;
  return (
    <>
      <FileSidebar />
      <div
        style={{
          position: "absolute",
          left: 238,
          right: outputWidth,
          top: 92,
          bottom: 26,
          background: "#161b22",
          transition: "none",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: 39,
            display: "flex",
            alignItems: "center",
            padding: "0 12px",
            color: "#7e8793",
            borderBottom: "1px solid #ffffff0e",
            font: "600 9px ui-monospace, SFMono-Regular, Menlo, monospace",
          }}
        >
          local · ~/Projects/bscode
          <span style={{marginLeft: "auto"}}>4/4 agents · working</span>
        </div>
        <div
          style={{
            position: "absolute",
            left: 13,
            right: 13,
            top: 52,
            bottom: 13,
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gridTemplateRows: "1fr 1fr",
            gap: 10,
          }}
        >
          {[0, 1, 2, 3].map((index) => (
            <AgentCard key={index} index={index} frame={frame} focus={detailFocus} />
          ))}
        </div>
      </div>
      <OutputPanel open={outputOpen} frame={frame} />
    </>
  );
};

const CinematicCard = ({index, frame}) => {
  const show = spring({
    frame: frame - 318 - index * 4,
    fps: FPS,
    config: {damping: 19, stiffness: 130, mass: 0.8},
  });
  return (
    <div
      style={{
        position: "relative",
        borderRadius: 18,
        background: "rgba(13,18,24,.64)",
        backdropFilter: "blur(22px) saturate(.8)",
        boxShadow: `0 0 0 1px ${colors[index]}45, 0 18px 42px #0006`,
        overflow: "hidden",
        opacity: show,
        transform: `translateY(${(1 - show) * 26}px) scale(${0.94 + show * 0.06})`,
      }}
    >
      <AgentHeader index={index} detail={index === 0} />
      <div
        style={{
          padding: "18px 20px",
          color: "#dbe2ea",
          font: "500 10px/1.65 ui-monospace, SFMono-Regular, Menlo, monospace",
        }}
      >
        <div style={{color: colors[index], fontWeight: 700}}>
          {["Shipping the release", "Reviewing responsive states", "Running visual checks", "Writing documentation"][index]}
        </div>
        <div style={{color: "#a4aeba", marginTop: 8}}>
          {["✓ 53 tests passed", "Viewport 1280 → 2560", "Cinematic scenes verified", "Feature guide updated"][index]}
        </div>
        <div style={{color: "#747f8d", marginTop: 12}}>ETA {index + 1}m · working</div>
      </div>
    </div>
  );
};

const CinematicMode = ({frame}) => {
  const appear = progress(frame, 292, 320);
  const mentionLength = Math.floor(progress(frame, 394, 424) * 16);
  const prompt = "@Maeve review UI";
  const menuOpacity = fadeWindow(frame, 382, 394, 416, 428);
  const sent = progress(frame, 438, 454);
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        opacity: appear,
        background: "#0b1114",
        overflow: "hidden",
      }}
    >
      <Img
        src={cinematicBackground}
        style={{
          position: "absolute",
          inset: -20,
          width: APP_WIDTH + 40,
          height: APP_HEIGHT + 40,
          objectFit: "cover",
          filter: "brightness(.72) saturate(.86)",
          transform: `scale(${1.035 + progress(frame, 300, 476) * 0.015}) translateX(${progress(frame, 300, 476) * -8}px)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(circle at 50% 35%,transparent,#07101468 76%), linear-gradient(180deg,#07101725,#07101752)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 42,
          right: 42,
          top: 72,
          bottom: 113,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gridTemplateRows: "1fr 1fr",
          gap: 18,
        }}
      >
        {[0, 1, 2, 3].map((index) => (
          <CinematicCard key={index} index={index} frame={frame} />
        ))}
      </div>
      <div
        style={{
          position: "absolute",
          left: 318,
          right: 318,
          bottom: 28,
          height: 58,
          borderRadius: 19,
          background: "rgba(8,12,16,.82)",
          backdropFilter: "blur(18px)",
          boxShadow: "0 18px 45px #0008, inset 0 0 0 1px #ffffff20",
          display: "flex",
          alignItems: "center",
          padding: "0 20px",
          color: "#d6dde6",
          font: "600 12px Inter, ui-sans-serif, system-ui",
          transform: `translateY(${(1 - progress(frame, 362, 384)) * 25}px) scale(${1 - sent * 0.012})`,
        }}
      >
        {mentionLength > 0 ? (
          <>
            <span style={{color: colors[1], fontWeight: 850}}>{prompt.slice(0, Math.min(6, mentionLength))}</span>
            <span>{prompt.slice(6, mentionLength)}</span>
          </>
        ) : (
          <span style={{color: "#77818e"}}>What should we work on?</span>
        )}
        <span style={{marginLeft: "auto", color: "#697482"}}>⌘K</span>
        <span style={{marginLeft: 14, color: "#9ecfff", fontSize: 18}}>↵</span>
      </div>
      <div
        style={{
          position: "absolute",
          left: 318,
          bottom: 92,
          width: 340,
          borderRadius: 13,
          background: "rgba(9,13,18,.94)",
          border: "1px solid #ffffff1c",
          boxShadow: "0 18px 38px #0008",
          padding: 7,
          opacity: menuOpacity,
          transform: `translateY(${(1 - menuOpacity) * 10}px)`,
        }}
      >
        {[0, 1, 2, 3].map((index) => (
          <div
            key={names[index]}
            style={{
              height: 42,
              display: "flex",
              alignItems: "center",
              padding: "0 10px",
              borderRadius: 8,
              background: index === 1 ? "#ffffff0d" : "transparent",
              color: "#dfe4eb",
              font: "650 11px Inter, ui-sans-serif, system-ui",
            }}
          >
            <Img src={faces[index]} style={{width: 27, height: 27, imageRendering: "pixelated", marginRight: 10}} />
            {names[index]}
            <span style={{marginLeft: "auto", color: colors[index], fontSize: 9}}>Agent {index + 1}</span>
          </div>
        ))}
      </div>
      <div style={{position: "absolute", right: 26, top: 21, color: "#c9d1db", font: "500 13px Inter, system-ui"}}>
        Exit&nbsp;&nbsp; ×
      </div>
    </div>
  );
};

const TowerFloor = ({src, label, accent, style}) => (
  <div
    style={{
      height: 152,
      position: "relative",
      overflow: "hidden",
      border: `2px solid ${accent}`,
      borderRadius: 8,
      background: "#101720",
      boxShadow: "0 10px 26px #0007",
      ...style,
    }}
  >
    <Img
      src={src}
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
        imageRendering: "pixelated",
      }}
    />
    <div
      style={{
        position: "absolute",
        right: 8,
        bottom: 7,
        padding: "4px 7px",
        borderRadius: 4,
        background: "#0b1018dd",
        color: "#eef2f7",
        font: "700 8px ui-monospace, SFMono-Regular, Menlo, monospace",
      }}
    >
      {label}
    </div>
  </div>
);

const PixelMode = ({frame}) => {
  const appear = progress(frame, 480, 506);
  const lift = progress(frame, 512, 600);
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        opacity: appear,
        background: "linear-gradient(180deg,#07142c,#0c203b)",
        color: "#e4ecf6",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 18% 18%,#3a65a330,transparent 32%), radial-gradient(circle at 80% 80%,#4ac3a01f,transparent 31%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 62,
          top: 45,
          bottom: 47,
          width: 515,
          borderRadius: 20,
          background: "#0b121ddd",
          boxShadow: "inset 0 0 0 1px #7fa8d53c, 0 30px 70px #0008",
          padding: 22,
          boxSizing: "border-box",
        }}
      >
        <div style={{display: "flex", alignItems: "center", marginBottom: 16}}>
          <span style={{font: "800 15px Inter, ui-sans-serif, system-ui"}}>Agent tower</span>
          <span style={{marginLeft: "auto", color: "#8d9bad", font: "650 10px Inter, system-ui"}}>4 active floors</span>
        </div>
        <div
          style={{
            position: "relative",
            height: 716,
            padding: "10px 20px 0",
            overflow: "hidden",
            borderRadius: 14,
            background: "linear-gradient(180deg,#050914,#0a1826)",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: 18,
              right: 18,
              top: 8 - lift * 88,
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}
          >
            <div
              style={{
                height: 48,
                width: 220,
                margin: "0 auto -3px",
                background: "#1b2735",
                clipPath: "polygon(14% 100%,21% 48%,36% 48%,43% 0,57% 0,64% 48%,79% 48%,86% 100%)",
              }}
            />
            <TowerFloor src={floor12} label="4 agents · Sky lab" accent="#74b7ff" />
            <TowerFloor src={floor7} label="3 agents · Library" accent="#ad91ff" />
            <TowerFloor src={floor4} label="2 agents · Garden" accent="#72d1aa" />
            <TowerFloor src={floor1} label="1 agent · Workshop" accent="#e59b67" />
            <div
              style={{
                width: 430,
                height: 38,
                margin: "-2px auto 0",
                background: "#1d2a37",
                clipPath: "polygon(4% 0,96% 0,100% 100%,0 100%)",
              }}
            />
          </div>
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 622,
          right: 58,
          top: 45,
          bottom: 47,
          borderRadius: 20,
          background: "#111a24e8",
          boxShadow: "inset 0 0 0 1px #ffffff18, 0 30px 70px #0007",
          overflow: "hidden",
        }}
      >
        <Img
          src={floor7}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            imageRendering: "pixelated",
            transform: "scale(1.04)",
            filter: "saturate(.95) brightness(.9)",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 28,
            top: 25,
            padding: "10px 13px",
            borderRadius: 8,
            background: "#0a111bdd",
            boxShadow: "inset 0 0 0 1px #ad91ff70",
            font: "700 11px ui-monospace, SFMono-Regular, Menlo, monospace",
          }}
        >
          Floor 3 · Library
        </div>
        <div
          style={{
            position: "absolute",
            right: 26,
            top: 24,
            display: "flex",
            gap: 8,
          }}
        >
          {faces.map((src, index) => (
            <Img
              key={src}
              src={src}
              style={{
                width: 31,
                height: 31,
                imageRendering: "pixelated",
                borderRadius: 6,
                boxShadow: `0 0 0 1px ${colors[index]}`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const Cursor = ({x, y, click = 0, visible = true}) => (
  <div
    style={{
      position: "absolute",
      left: x,
      top: y,
      width: 24,
      height: 31,
      opacity: visible ? 1 : 0,
      zIndex: 50,
      filter: "drop-shadow(0 3px 5px #000c)",
      transform: `scale(${1 - click * 0.12})`,
    }}
  >
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: "#f8fbff",
        clipPath: "polygon(0 0,0 92%,27% 68%,43% 100%,56% 94%,40% 63%,76% 63%)",
      }}
    />
    {click > 0 && (
      <div
        style={{
          position: "absolute",
          left: -12,
          top: -12,
          width: 42,
          height: 42,
          borderRadius: 50,
          border: "2px solid #77b8ff",
          opacity: click,
          transform: `scale(${0.45 + click * 0.9})`,
        }}
      />
    )}
  </div>
);

const ActiveCursor = ({frame}) => {
  let x = 1475;
  let y = 54;
  let visible = frame < 675;
  let click = 0;

  if (frame < 145) {
    const move = progress(frame, 72, 112);
    x = interpolate(move, [0, 1], [1110, 560]);
    y = interpolate(move, [0, 1], [740, 210]);
    click = pulse(frame, 118, 8);
  } else if (frame < 292) {
    const move = progress(frame, 228, 252);
    x = interpolate(move, [0, 1], [610, 811]);
    y = interpolate(move, [0, 1], [355, 551]);
    click = pulse(frame, 258, 8);
  } else if (frame < 480) {
    const move = progress(frame, 370, 405);
    x = interpolate(move, [0, 1], [1240, 840]);
    y = interpolate(move, [0, 1], [610, 828]);
    click = pulse(frame, 438, 8);
  } else if (frame < 630) {
    const move = progress(frame, 540, 574);
    x = interpolate(move, [0, 1], [1240, 904]);
    y = interpolate(move, [0, 1], [700, 444]);
    click = pulse(frame, 580, 8);
  } else {
    const move = progress(frame, 632, 650);
    x = interpolate(move, [0, 1], [1420, 1510]);
    y = interpolate(move, [0, 1], [210, 113]);
    click = pulse(frame, 655, 8);
  }

  return <Cursor x={x} y={y} click={click} visible={visible} />;
};

const FeatureCaption = ({frame}) => {
  const beats = [
    {from: 22, to: 137, eyebrow: "THE WORKSPACE", title: "Every agent. One clear view.", color: colors[0]},
    {from: 145, to: 284, eyebrow: "LIVE PROGRESS", title: "Know what’s done — and what’s next.", color: colors[2]},
    {from: 305, to: 469, eyebrow: "CINEMATIC MODE", title: "Direct the whole team in one sentence.", color: colors[1]},
    {from: 492, to: 620, eyebrow: "PIXEL TOWER", title: "See the work come alive.", color: colors[3]},
    {from: 646, to: 758, eyebrow: "OUTPUTS", title: "Everything lands where you expect.", color: colors[0]},
  ];

  return (
    <>
      {beats.map((beat) => {
        const opacity = fadeWindow(frame, beat.from, beat.from + 12, beat.to - 12, beat.to);
        const rise = progress(frame, beat.from, beat.from + 18);
        return (
          <div
            key={beat.eyebrow}
            style={{
              position: "absolute",
              left: 92,
              top: 70,
              color: "#f4f7fa",
              fontFamily: "Inter, ui-sans-serif, system-ui",
              opacity,
              transform: `translateY(${(1 - rise) * 18}px)`,
              zIndex: 70,
              textShadow: "0 3px 24px #000",
            }}
          >
            <div style={{color: beat.color, fontSize: 13, fontWeight: 850, letterSpacing: 2.8}}>
              {beat.eyebrow}
            </div>
            <div style={{fontSize: 34, lineHeight: 1.05, fontWeight: 800, letterSpacing: -1.7, marginTop: 8}}>
              {beat.title}
            </div>
          </div>
        );
      })}
    </>
  );
};

const AppWindow = ({frame}) => {
  const cinematic = frame >= 292 && frame < 480;
  const pixel = frame >= 480 && frame < 630;
  const outputOpen = frame >= 630;
  return (
    <div
      style={{
        position: "relative",
        width: APP_WIDTH,
        height: APP_HEIGHT,
        borderRadius: 25,
        background: "#0e1218",
        overflow: "hidden",
        boxShadow: "0 55px 140px #000c, 0 0 0 1px #ffffff24, inset 0 0 0 1px #000",
      }}
    >
      {!cinematic && !pixel && (
        <>
          <MacChrome />
          <WorkspaceTabs />
          <Workspace frame={frame} outputOpen={outputOpen} />
          <StatusBar />
        </>
      )}
      {cinematic && <CinematicMode frame={frame} />}
      {pixel && <PixelMode frame={frame} />}
      <ActiveCursor frame={frame} />
    </div>
  );
};

const cameraForFrame = (frame) => {
  let scale = 0.86;
  let x = 0;
  let y = 12;
  let rx = 1.8;
  let ry = -2.6;

  if (frame >= 110 && frame < 292) {
    const zoomIn = progress(frame, 110, 157);
    const zoomOut = progress(frame, 260, 292);
    const mix = zoomIn * (1 - zoomOut);
    scale = 0.86 + mix * 0.27;
    x = mix * 210;
    y = mix * 128;
    rx = 1.8 - mix * 1.8;
    ry = -2.6 + mix * 2.6;
  } else if (frame >= 292 && frame < 480) {
    scale = 0.91;
    x = 0;
    y = 4;
    rx = interpolate(progress(frame, 292, 480), [0, 1], [0.8, -0.5]);
    ry = interpolate(progress(frame, 292, 480), [0, 1], [1.7, -1.1]);
  } else if (frame >= 480 && frame < 630) {
    const drift = progress(frame, 480, 630);
    scale = 0.9 + drift * 0.02;
    x = interpolate(drift, [0, 1], [18, -18]);
    y = 8;
    rx = 0.7;
    ry = interpolate(drift, [0, 1], [-1.8, 1.4]);
  } else if (frame >= 630) {
    const zoom = progress(frame, 645, 700) * (1 - progress(frame, 734, 774));
    scale = 0.86 + zoom * 0.16;
    x = -zoom * 120;
    y = zoom * 60;
    rx = 1.3 - zoom;
    ry = -2 + zoom * 2;
  }

  return {scale, x, y, rx, ry};
};

export const BsCodeDemo = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const intro = spring({
    frame,
    fps,
    config: {damping: 22, stiffness: 96, mass: 0.9},
  });
  const end = progress(frame, 776, 809);
  const cam = cameraForFrame(frame);

  return (
    <AbsoluteFill
      style={{
        overflow: "hidden",
        background: "#07080a",
        fontFamily: "Inter, ui-sans-serif, -apple-system, BlinkMacSystemFont, system-ui",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          perspective: 2400,
          opacity: intro * (1 - end),
          transform: "translate(-50%,-50%)",
        }}
      >
        <div
          style={{
            width: APP_WIDTH,
            height: APP_HEIGHT,
            transformOrigin: "50% 50%",
            transform: `translate3d(${cam.x}px,${cam.y + (1 - intro) * 50}px,0) scale(${cam.scale * (0.96 + intro * 0.04)}) rotateX(${cam.rx}deg) rotateY(${cam.ry}deg)`,
            transformStyle: "preserve-3d",
          }}
        >
          <AppWindow frame={frame} />
        </div>
      </div>
      <FeatureCaption frame={frame} />
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: end,
          background: "#07080a",
          display: "grid",
          placeItems: "center",
        }}
      >
        <div
          style={{
            opacity: progress(frame, 787, 803) * (1 - progress(frame, 803, 809)),
            transform: `scale(${0.92 + progress(frame, 787, 803) * 0.08})`,
            display: "flex",
            alignItems: "center",
            gap: 16,
            color: "#f6f8fb",
            fontSize: 34,
            fontWeight: 760,
            letterSpacing: -1.4,
          }}
        >
          <BrandMark size={58} />
          BsCode
        </div>
      </div>
    </AbsoluteFill>
  );
};
