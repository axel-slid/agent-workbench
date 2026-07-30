import {Composition, registerRoot} from "remotion";
import {BsCodeDemo} from "./bscode-demo";

const RemotionRoot = () => (
  <Composition
    id="BsCodeDemo"
    component={BsCodeDemo}
    durationInFrames={360}
    fps={60}
    width={960}
    height={540}
  />
);

registerRoot(RemotionRoot);
