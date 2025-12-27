import { motion } from "framer-motion";

interface NeuralNodeProps {
  x: number;
  y: number;
  isActive: boolean;
  delay?: number;
  label?: string;
  size?: "sm" | "md" | "lg";
  activationValue?: number;
}

const sizeMap = {
  sm: 24,
  md: 36,
  lg: 48,
};

export const NeuralNode = ({
  x,
  y,
  isActive,
  delay = 0,
  label,
  size = "md",
  activationValue,
}: NeuralNodeProps) => {
  const nodeSize = sizeMap[size];
  
  return (
    <motion.g
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: delay * 0.05, duration: 0.3 }}
    >
      {/* Glow effect */}
      {isActive && (
        <motion.circle
          cx={x}
          cy={y}
          r={nodeSize * 0.8}
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth="2"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ 
            opacity: [0.2, 0.6, 0.2], 
            scale: [1, 1.3, 1],
          }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          style={{ filter: "blur(8px)" }}
        />
      )}
      
      {/* Outer ring */}
      <motion.circle
        cx={x}
        cy={y}
        r={nodeSize / 2}
        fill="hsl(var(--card))"
        stroke={isActive ? "hsl(var(--primary))" : "hsl(var(--border))"}
        strokeWidth="2"
        animate={{
          stroke: isActive ? "hsl(var(--primary))" : "hsl(var(--border))",
        }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Inner activation */}
      <motion.circle
        cx={x}
        cy={y}
        r={nodeSize / 2 - 4}
        fill={isActive ? "hsl(var(--primary) / 0.3)" : "hsl(var(--muted))"}
        animate={{
          fill: isActive ? "hsl(var(--primary) / 0.3)" : "hsl(var(--muted))",
          scale: isActive ? 1 : 0.8,
        }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Center dot */}
      <motion.circle
        cx={x}
        cy={y}
        r={4}
        fill={isActive ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))"}
        animate={{
          fill: isActive ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))",
          scale: isActive ? [1, 1.2, 1] : 1,
        }}
        transition={{ duration: 0.5, repeat: isActive ? Infinity : 0, repeatDelay: 0.5 }}
      />
      
      {/* Label */}
      {label && (
        <text
          x={x}
          y={y + nodeSize / 2 + 16}
          textAnchor="middle"
          fill="hsl(var(--muted-foreground))"
          fontSize="10"
          fontFamily="JetBrains Mono"
        >
          {label}
        </text>
      )}
      
      {/* Activation value */}
      {activationValue !== undefined && isActive && (
        <motion.text
          x={x}
          y={y + 4}
          textAnchor="middle"
          fill="hsl(var(--foreground))"
          fontSize="10"
          fontFamily="JetBrains Mono"
          fontWeight="600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {activationValue.toFixed(2)}
        </motion.text>
      )}
    </motion.g>
  );
};
