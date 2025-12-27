import { motion } from "framer-motion";
import { Sparkles, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

interface PromptInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  isProcessing: boolean;
}

export const PromptInput = ({ value, onChange, onSubmit, isProcessing }: PromptInputProps) => {
  return (
    <div className="space-y-4">
      <div className="relative">
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Enter your prompt here... (e.g., 'The quick brown fox')"
          className="min-h-[100px] resize-none border-border/50 bg-card/50 font-mono text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary/20"
          disabled={isProcessing}
        />
        {value && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute bottom-3 right-3 font-mono text-xs text-muted-foreground"
          >
            {value.length} characters
          </motion.div>
        )}
      </div>
      
      <Button
        onClick={onSubmit}
        disabled={!value.trim() || isProcessing}
        className="w-full gap-2"
        variant="default"
        size="lg"
      >
        {isProcessing ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Processing...
          </>
        ) : (
          <>
            <Sparkles className="h-4 w-4" />
            Visualize Neural Network
          </>
        )}
      </Button>
    </div>
  );
};
