import { AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig, interpolate, Easing } from "remotion";
import { TextOverlay } from "./TextOverlay";

export const Cinematic3D: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const rotation = interpolate(frame, [0, 300], [0, 360], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  const floatY = Math.sin(frame * 0.05) * 20;

  const cameraZ = interpolate(frame, [0, 300], [800, 600], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.bezier(0.25, 0.1, 0.25, 1),
  });

  const lightIntensity = interpolate(
    frame,
    [0, 60, 120, 180, 240, 300],
    [0.3, 1, 0.5, 1.2, 0.6, 0.3],
    { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
  );

  return (
    <AbsoluteFill style={{ backgroundColor: "#0a0a0f", perspective: 1200 }}>
      {/* Animated background gradients */}
      <AbsoluteFill
        style={{
          background: `
            radial-gradient(ellipse at 30% 20%, rgba(233, 69, 96, ${lightIntensity * 0.15}) 0%, transparent 50%),
            radial-gradient(ellipse at 70% 80%, rgba(74, 158, 255, ${lightIntensity * 0.15}) 0%, transparent 50%)
          `,
        }}
      />

      {/* 3D Car Container */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: `translate(-50%, -50%) translateZ(${cameraZ}px) rotateX(-15deg)`,
          transformStyle: "preserve-3d",
        }}
      >
        <div
          style={{
            transform: `rotateY(${rotation}deg) translateY(${floatY}px)`,
            transformStyle: "preserve-3d",
          }}
        >
          {/* Car Body - Main */}
          <div
            style={{
              position: "absolute",
              width: 400,
              height: 80,
              background: "linear-gradient(180deg, #1a1a2e 0%, #16213e 100%)",
              borderRadius: "10px 10px 5px 5px",
              transform: "translateX(-200px) translateY(-40px) translateZ(0px)",
              boxShadow: `
                0 20px 60px rgba(0,0,0,0.8),
                inset 0 2px 0 rgba(255,255,255,0.1),
                0 0 100px rgba(233, 69, 96, ${lightIntensity * 0.3})
              `,
            }}
          />

          {/* Car Body - Side Left */}
          <div
            style={{
              position: "absolute",
              width: 400,
              height: 60,
              background: "linear-gradient(180deg, #0f3460 0%, #1a1a2e 100%)",
              transform: "translateX(-200px) translateY(0px) rotateX(-90deg) translateZ(30px)",
              boxShadow: "inset 0 2px 0 rgba(255,255,255,0.05)",
            }}
          />

          {/* Car Body - Side Right */}
          <div
            style={{
              position: "absolute",
              width: 400,
              height: 60,
              background: "linear-gradient(180deg, #16213e 0%, #0f3460 100%)",
              transform: "translateX(-200px) translateY(0px) rotateX(90deg) translateZ(30px)",
              boxShadow: "inset 0 2px 0 rgba(255,255,255,0.05)",
            }}
          />

          {/* Cabin */}
          <div
            style={{
              position: "absolute",
              width: 200,
              height: 60,
              background: "linear-gradient(180deg, #16213e 0%, #1a1a2e 100%)",
              borderRadius: "5px 5px 0 0",
              transform: "translateX(-100px) translateY(-100px) translateZ(0px)",
              boxShadow: `
                0 10px 40px rgba(0,0,0,0.6),
                inset 0 2px 0 rgba(255,255,255,0.1)
              `,
            }}
          />

          {/* Windshield */}
          <div
            style={{
              position: "absolute",
              width: 80,
              height: 50,
              background: "linear-gradient(180deg, rgba(74, 158, 255, 0.3) 0%, rgba(15, 52, 96, 0.8) 100%)",
              borderRadius: "3px",
              transform: "translateX(-140px) translateY(-95px) rotateY(-20deg)",
              boxShadow: "inset 0 0 20px rgba(74, 158, 255, 0.2)",
            }}
          />

          {/* Rear Window */}
          <div
            style={{
              position: "absolute",
              width: 80,
              height: 50,
              background: "linear-gradient(180deg, rgba(74, 158, 255, 0.3) 0%, rgba(15, 52, 96, 0.8) 100%)",
              borderRadius: "3px",
              transform: "translateX(60px) translateY(-95px) rotateY(20deg)",
              boxShadow: "inset 0 0 20px rgba(74, 158, 255, 0.2)",
            }}
          />

          {/* Wheels */}
          {[
            { x: -140, y: 40, z: 35 },
            { x: -140, y: 40, z: -35 },
            { x: 140, y: 40, z: 35 },
            { x: 140, y: 40, z: -35 },
          ].map((pos, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                width: 50,
                height: 50,
                borderRadius: "50%",
                background: "radial-gradient(circle at 30% 30%, #333 0%, #0d0d0d 70%)",
                transform: `translateX(${pos.x - 25}px) translateY(${pos.y - 25}px) translateZ(${pos.z}px) rotateY(${rotation * 2}deg)`,
                boxShadow: `
                  inset 0 0 10px rgba(0,0,0,0.8),
                  0 5px 15px rgba(0,0,0,0.6),
                  0 0 20px rgba(192, 192, 192, 0.2)
                `,
              }}
            >
              {/* Rim */}
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  width: 30,
                  height: 30,
                  borderRadius: "50%",
                  background: "radial-gradient(circle at 30% 30%, #c0c0c0 0%, #808080 100%)",
                  transform: "translate(-50%, -50%)",
                  boxShadow: "inset 0 2px 4px rgba(255,255,255,0.5)",
                }}
              />
            </div>
          ))}

          {/* Headlights */}
          {[-25, 25].map((z, i) => (
            <div
              key={`headlight-${i}`}
              style={{
                position: "absolute",
                width: 20,
                height: 15,
                borderRadius: "50%",
                background: "radial-gradient(circle, #ffffff 0%, #ffffcc 100%)",
                transform: `translateX(-210px) translateY(-30px) translateZ(${z}px)`,
                boxShadow: `
                  0 0 30px #ffffff,
                  0 0 60px rgba(255, 255, 200, 0.8),
                  0 0 100px rgba(255, 255, 200, 0.4)
                `,
              }}
            />
          ))}

          {/* Tail lights */}
          {[-30, 30].map((z, i) => (
            <div
              key={`taillight-${i}`}
              style={{
                position: "absolute",
                width: 15,
                height: 20,
                borderRadius: "3px",
                background: "linear-gradient(180deg, #e94560 0%, #ff6b6b 100%)",
                transform: `translateX(195px) translateY(-35px) translateZ(${z}px)`,
                boxShadow: `
                  0 0 20px #e94560,
                  0 0 40px rgba(233, 69, 96, 0.6),
                  0 0 80px rgba(233, 69, 96, 0.3)
                `,
              }}
            />
          ))}
        </div>
      </div>

      {/* Floor reflection */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "40%",
          background: "linear-gradient(180deg, transparent 0%, rgba(233, 69, 96, 0.05) 100%)",
          transform: "perspective(500px) rotateX(60deg)",
          transformOrigin: "bottom",
        }}
      />

      {/* Vignette */}
      <AbsoluteFill
        style={{
          background: "radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.6) 100%)",
          pointerEvents: "none",
        }}
      />

      {/* Floating particles */}
      {[...Array(30)].map((_, i) => {
        const x = (i * 137.508) % 100;
        const baseY = ((i * 137.508 * 7.3) % 100);
        const y = (baseY + frame * (0.2 + (i % 5) * 0.1) * 0.1) % 110 - 5;
        const size = 2 + (i % 3);
        const opacity = interpolate(y, [-5, 10, 90, 105], [0, 0.5, 0.5, 0], {
          extrapolateRight: "clamp",
          extrapolateLeft: "clamp",
        });

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${x + Math.sin(frame * 0.02 + i) * 3}%`,
              top: `${y}%`,
              width: size,
              height: size,
              borderRadius: "50%",
              backgroundColor: i % 2 === 0 ? "#e94560" : "#4a9eff",
              opacity,
              boxShadow: `0 0 ${size * 3}px ${i % 2 === 0 ? "#e94560" : "#4a9eff"}`,
            }}
          />
        );
      })}

      {/* Text overlays */}
      <Sequence from={Math.floor(1.5 * fps)} durationInFrames={Math.floor(3 * fps)} layout="none">
        <TextOverlay title="PHANTOM" subtitle="REDEFINE LUXURY" position="center" />
      </Sequence>

      <Sequence from={Math.floor(5 * fps)} durationInFrames={Math.floor(3 * fps)} layout="none">
        <TextOverlay title="0-100" subtitle="2.9 SECONDS" position="left" />
      </Sequence>

      <Sequence from={Math.floor(9 * fps)} durationInFrames={Math.floor(3 * fps)} layout="none">
        <TextOverlay title="1200" subtitle="HORSEPOWER" position="right" />
      </Sequence>

      <Sequence from={Math.floor(13 * fps)} durationInFrames={Math.floor(3 * fps)} layout="none">
        <TextOverlay title="EXPERIENCE" subtitle="THE FUTURE" position="center" />
      </Sequence>
    </AbsoluteFill>
  );
};
