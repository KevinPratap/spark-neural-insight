import { motion } from "framer-motion";

interface TokenDisplayProps {
  tokens: string[];
  isProcessing: boolean;
}

export const TokenDisplay = ({ tokens, isProcessing }: TokenDisplayProps) => {
  if (tokens.length === 0) return null;
  
  return (
    <div className="space-y-3">
      <h3 className="font-mono text-sm text-muted-foreground">Tokenized Input</h3>
      <div className="flex flex-wrap gap-2">
        {tokens.map((token, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`relative overflow-hidden rounded-md border px-3 py-1.5 font-mono text-sm ${
              isProcessing
                ? "border-primary/50 bg-primary/10 text-primary"
                : "border-border bg-muted text-foreground"
            }`}
          >
            {isProcessing && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent"
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 1, repeat: Infinity, delay: index * 0.1 }}
              />
            )}
            <span className="relative z-10">{token}</span>
            <span className="ml-2 text-xs text-muted-foreground">[{index}]</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
