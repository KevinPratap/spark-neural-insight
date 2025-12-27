import { motion } from "framer-motion";

interface ConnectionProps {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  isActive: boolean;
  delay?: number;
  weight?: number;
}

export const Connection = ({
  x1,
  y1,
  x2,
  y2,
  isActive,
  delay = 0,
  weight = 0.5,
}: ConnectionProps) => {
  const pathId = `path-${x1}-${y1}-${x2}-${y2}`;
  
  return (
    <g>
      {/* Base connection line */}
      <motion.line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={isActive ? "hsl(var(--primary) / 0.6)" : "hsl(var(--border) / 0.3)"}
        strokeWidth={Math.max(0.5, weight * 2)}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ 
          pathLength: 1, 
          opacity: 1,
          stroke: isActive ? "hsl(var(--primary) / 0.6)" : "hsl(var(--border) / 0.3)",
        }}
        transition={{ delay: delay * 0.02, duration: 0.5 }}
      />
      
      {/* Animated particle along connection */}
      {isActive && (
        <motion.circle
          r="3"
          fill="hsl(var(--primary))"
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 1, 1, 0],
            cx: [x1, x2],
            cy: [y1, y2],
          }}
          transition={{
            delay: delay * 0.1,
            duration: 0.8,
            repeat: Infinity,
            repeatDelay: 0.5,
            ease: "easeInOut",
          }}
          style={{ filter: "blur(1px)" }}
        />
      )}
      
      {/* Glow effect for active connections */}
      {isActive && (
        <motion.line
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke="hsl(var(--primary))"
          strokeWidth="4"
          style={{ filter: "blur(4px)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      )}
    </g>
  );
};
