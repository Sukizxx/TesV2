import "./index.css";
import { Composition } from "remotion";
import { Cinematic3D } from "./Cinematic3D";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="Cinematic3D"
        component={Cinematic3D}
        durationInFrames={300}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
