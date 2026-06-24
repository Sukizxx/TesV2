import { useCurrentFrame, useVideoConfig, interpolate, Easing } from "remotion";

interface TextOverlayProps {
  title: string;
  subtitle: string;
  position: "center" | "left" | "right";
}

export const TextOverlay: React.FC<TextOverlayProps> = ({
  title,
  subtitle,
  position,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 0.5 * fps], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const fadeOut = interpolate(frame, [2 * fps, 2.5 * fps], [1, 0], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const opacity = Math.min(fadeIn, fadeOut);

  const slideX = interpolate(frame, [0, 0.8 * fps], [position === "right" ? 60 : -60, 0], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const slideY = interpolate(frame, [0, 0.6 * fps], [30, 0], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const scale = interpolate(frame, [0, 0.6 * fps], [0.9, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const lineWidth = interpolate(frame, [0.3 * fps, 1 * fps], [0, 120], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const positionStyles: React.CSSProperties = {
    center: {
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
    },
    left: {
      justifyContent: "center",
      alignItems: "flex-start",
      textAlign: "left",
      paddingLeft: "10%",
    },
    right: {
      justifyContent: "center",
      alignItems: "flex-end",
      textAlign: "right",
      paddingRight: "10%",
    },
  }[position];

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        flexDirection: "column",
        opacity,
        transform: `translate(${slideX}px, ${slideY}px) scale(${scale})`,
        ...positionStyles,
      }}
    >
      <div
        style={{
          fontFamily: "'Arial Black', 'Helvetica Neue', sans-serif",
          fontSize: position === "center" ? 120 : 90,
          fontWeight: 900,
          color: "#ffffff",
          letterSpacing: position === "center" ? "0.15em" : "0.1em",
          lineHeight: 1,
          textShadow: "0 0 60px rgba(233, 69, 96, 0.5), 0 0 120px rgba(74, 158, 255, 0.3)",
          marginBottom: 20,
        }}
      >
        {title}
      </div>

      <div
        style={{
          width: lineWidth,
          height: 2,
          background: "linear-gradient(90deg, #e94560, #4a9eff)",
          marginBottom: 20,
        }}
      />

      <div
        style={{
          fontFamily: "'Helvetica Neue', Arial, sans-serif",
          fontSize: 32,
          fontWeight: 300,
          color: "rgba(255, 255, 255, 0.7)",
          letterSpacing: "0.4em",
          textTransform: "uppercase",
        }}
      >
        {subtitle}
      </div>
    </div>
  );
};
