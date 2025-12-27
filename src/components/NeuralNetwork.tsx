import { motion } from "framer-motion";
import { NeuralNode } from "./NeuralNode";
import { Connection } from "./Connection";
import { useMemo } from "react";

interface NeuralNetworkProps {
  tokens: string[];
  isProcessing: boolean;
  activeLayer: number;
}

export const NeuralNetwork = ({ tokens, isProcessing, activeLayer }: NeuralNetworkProps) => {
  const width = 900;
  const height = 500;
  const padding = 80;
  
  // Layer configurations
  const layers = useMemo(() => {
    const inputCount = Math.max(Math.min(tokens.length || 4, 8), 4);
    return [
      { count: inputCount, label: "Input (Tokens)" },
      { count: 6, label: "Embedding" },
      { count: 8, label: "Hidden 1" },
      { count: 6, label: "Hidden 2" },
      { count: 4, label: "Output" },
    ];
  }, [tokens.length]);
  
  // Calculate node positions
  const nodePositions = useMemo(() => {
    const layerWidth = (width - padding * 2) / (layers.length - 1);
    
    return layers.map((layer, layerIndex) => {
      const x = padding + layerIndex * layerWidth;
      const nodeSpacing = (height - padding * 2) / (layer.count + 1);
      
      return Array.from({ length: layer.count }, (_, nodeIndex) => ({
        x,
        y: padding + (nodeIndex + 1) * nodeSpacing,
        label: layerIndex === 0 && tokens[nodeIndex] ? tokens[nodeIndex].slice(0, 6) : undefined,
      }));
    });
  }, [layers, tokens, width, height]);
  
  // Generate connections
  const connections = useMemo(() => {
    const conns: Array<{
      x1: number;
      y1: number;
      x2: number;
      y2: number;
      layerIndex: number;
      weight: number;
    }> = [];
    
    for (let i = 0; i < nodePositions.length - 1; i++) {
      const currentLayer = nodePositions[i];
      const nextLayer = nodePositions[i + 1];
      
      currentLayer.forEach((from) => {
        nextLayer.forEach((to) => {
          conns.push({
            x1: from.x,
            y1: from.y,
            x2: to.x,
            y2: to.y,
            layerIndex: i,
            weight: Math.random() * 0.5 + 0.25,
          });
        });
      });
    }
    
    return conns;
  }, [nodePositions]);
  
  return (
    <div className="relative w-full overflow-hidden rounded-xl border border-border/50 bg-card/30 backdrop-blur-sm">
      {/* Layer labels */}
      <div className="absolute top-4 left-0 right-0 flex justify-around px-8">
        {layers.map((layer, i) => (
          <motion.div
            key={i}
            className="text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <span
              className={`font-mono text-xs ${
                activeLayer === i ? "text-primary glow-text" : "text-muted-foreground"
              }`}
            >
              {layer.label}
            </span>
          </motion.div>
        ))}
      </div>
      
      <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} className="mt-8">
      {/* Connections */}
        <g opacity={0.8}>
          {connections.map((conn, i) => (
            <Connection
              key={`conn-${i}`}
              x1={conn.x1}
              y1={conn.y1}
              x2={conn.x2}
              y2={conn.y2}
              isActive={isProcessing && activeLayer > conn.layerIndex}
              delay={conn.layerIndex * 2 + (i % 10)}
              weight={conn.weight}
            />
          ))}
        </g>
        
        {/* Nodes */}
        <g>
          {nodePositions.map((layer, layerIndex) =>
            layer.map((node, nodeIndex) => (
              <NeuralNode
                key={`${layerIndex}-${nodeIndex}`}
                x={node.x}
                y={node.y}
                isActive={isProcessing && activeLayer >= layerIndex}
                delay={layerIndex * 5 + nodeIndex}
                label={node.label}
                size={layerIndex === 0 || layerIndex === nodePositions.length - 1 ? "lg" : "md"}
                activationValue={
                  isProcessing && activeLayer >= layerIndex
                    ? Math.random()
                    : undefined
                }
              />
            ))
          )}
        </g>
      </svg>
      
      {/* Processing indicator */}
      {isProcessing && (
        <motion.div
          className="absolute bottom-4 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2">
            <motion.div
              className="h-2 w-2 rounded-full bg-primary"
              animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
            />
            <span className="font-mono text-xs text-primary">
              Processing Layer {activeLayer + 1}/{layers.length}
            </span>
          </div>
        </motion.div>
      )}
    </div>
  );
};
