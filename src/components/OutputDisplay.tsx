import { motion, AnimatePresence } from "framer-motion";

interface OutputDisplayProps {
  output: string;
  probabilities: Array<{ token: string; probability: number }>;
  isGenerating: boolean;
}

export const OutputDisplay = ({ output, probabilities, isGenerating }: OutputDisplayProps) => {
  return (
    <div className="space-y-4">
      {/* Generated output */}
      <div className="space-y-2">
        <h3 className="font-mono text-sm text-muted-foreground">Generated Output</h3>
        <div className="min-h-[80px] rounded-lg border border-border bg-card/50 p-4">
          <AnimatePresence mode="wait">
            {output ? (
              <motion.p
                key={output}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-mono text-foreground"
              >
                {output.split("").map((char, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.02 }}
                    className={i === output.length - 1 && isGenerating ? "text-primary" : ""}
                  >
                    {char}
                  </motion.span>
                ))}
                {isGenerating && (
                  <motion.span
                    className="inline-block h-5 w-2 bg-primary"
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                  />
                )}
              </motion.p>
            ) : (
              <p className="text-muted-foreground italic">
                Enter a prompt and click "Visualize" to see the output...
              </p>
            )}
          </AnimatePresence>
        </div>
      </div>
      
      {/* Token probabilities */}
      {probabilities.length > 0 && (
        <div className="space-y-2">
          <h3 className="font-mono text-sm text-muted-foreground">Next Token Probabilities</h3>
          <div className="grid gap-2">
            {probabilities.slice(0, 5).map((prob, index) => (
              <motion.div
                key={prob.token}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-3"
              >
                <span className="w-20 font-mono text-sm text-foreground truncate">
                  "{prob.token}"
                </span>
                <div className="flex-1 h-6 rounded bg-muted overflow-hidden">
                  <motion.div
                    className="h-full rounded"
                    style={{
                      background: `linear-gradient(90deg, hsl(var(--primary)), hsl(var(--secondary)))`,
                    }}
                    initial={{ width: 0 }}
                    animate={{ width: `${prob.probability * 100}%` }}
                    transition={{ delay: index * 0.1 + 0.2, duration: 0.5 }}
                  />
                </div>
                <span className="w-16 font-mono text-xs text-muted-foreground text-right">
                  {(prob.probability * 100).toFixed(1)}%
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
