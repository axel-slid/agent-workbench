import {Composition, registerRoot} from "remotion";
import {BsCodeDemo} from "./bscode-demo";

const RemotionRoot = () => (
  <Composition
    id="BsCodeDigitalTwin"
    component={BsCodeDemo}
    durationInFrames={810}
    fps={30}
    width={1920}
    height={1080}
  />
);

registerRoot(RemotionRoot);
