import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Brain, Zap, Layers, GitBranch } from "lucide-react";
import { NeuralNetwork } from "@/components/NeuralNetwork";
import { PromptInput } from "@/components/PromptInput";
import { TokenDisplay } from "@/components/TokenDisplay";
import { OutputDisplay } from "@/components/OutputDisplay";

// Simple tokenizer (word-based for visualization)
const tokenize = (text: string): string[] => {
  return text.trim().split(/\s+/).filter(Boolean);
};

// Simulate probability distribution
const generateProbabilities = (): Array<{ token: string; probability: number }> => {
  const tokens = ["the", "a", "is", "and", "to", "in", "it", "of"];
  const probs = tokens.map(() => Math.random());
  const sum = probs.reduce((a, b) => a + b, 0);
  return tokens
    .map((token, i) => ({ token, probability: probs[i] / sum }))
    .sort((a, b) => b.probability - a.probability);
};

// Simulate output generation
const simulateOutput = (input: string): string => {
  const continuations = [
    " jumps over the lazy dog.",
    " runs through the forest quickly.",
    " appears in the morning light.",
    " creates beautiful patterns.",
    " transforms into something new.",
  ];
  return input + continuations[Math.floor(Math.random() * continuations.length)];
};

const Index = () => {
  const [prompt, setPrompt] = useState("");
  const [tokens, setTokens] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeLayer, setActiveLayer] = useState(-1);
  const [output, setOutput] = useState("");
  const [probabilities, setProbabilities] = useState<Array<{ token: string; probability: number }>>([]);

  const handleVisualize = useCallback(() => {
    if (!prompt.trim()) return;

    setIsProcessing(true);
    setTokens(tokenize(prompt));
    setOutput("");
    setProbabilities([]);
    setActiveLayer(0);

    // Simulate layer-by-layer processing
    const totalLayers = 5;
    let currentLayer = 0;

    const layerInterval = setInterval(() => {
      currentLayer++;
      setActiveLayer(currentLayer);

      if (currentLayer >= totalLayers - 1) {
        clearInterval(layerInterval);
        
        // Generate output after processing
        setTimeout(() => {
          const generatedOutput = simulateOutput(prompt);
          setProbabilities(generateProbabilities());
          
          // Animate output character by character
          let charIndex = prompt.length;
          const outputInterval = setInterval(() => {
            if (charIndex <= generatedOutput.length) {
              setOutput(generatedOutput.slice(0, charIndex));
              charIndex++;
            } else {
              clearInterval(outputInterval);
              setIsProcessing(false);
            }
          }, 40);
        }, 500);
      }
    }, 600);
  }, [prompt]);

  return (
    <div className="min-h-screen">
      {/* Hero Header */}
      <header className="relative overflow-hidden border-b border-border/30 bg-card/20 backdrop-blur-sm">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5" />
        <div className="container relative py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="mb-4 flex items-center justify-center gap-3">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Brain className="h-10 w-10 text-primary" />
              </motion.div>
              <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">
                Neural Network{" "}
                <span className="text-primary glow-text">Visualizer</span>
              </h1>
            </div>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Watch how your prompts flow through neural network layers and see how AI generates responses
            </p>
          </motion.div>

          {/* Feature badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 flex flex-wrap items-center justify-center gap-4"
          >
            {[
              { icon: Zap, label: "Real-time Processing" },
              { icon: Layers, label: "Layer Visualization" },
              { icon: GitBranch, label: "Token Flow" },
            ].map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2 rounded-full border border-border/50 bg-muted/30 px-4 py-2"
              >
                <Icon className="h-4 w-4 text-primary" />
                <span className="text-sm text-muted-foreground">{label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left Panel - Input & Tokens */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-6"
          >
            <div className="rounded-xl border border-border/50 bg-card/30 p-6 backdrop-blur-sm">
              <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-foreground">
                <Zap className="h-5 w-5 text-primary" />
                Input Prompt
              </h2>
              <PromptInput
                value={prompt}
                onChange={setPrompt}
                onSubmit={handleVisualize}
                isProcessing={isProcessing}
              />
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="rounded-xl border border-border/50 bg-card/30 p-6 backdrop-blur-sm"
            >
              <TokenDisplay tokens={tokens} isProcessing={isProcessing} />
            </motion.div>
          </motion.div>

          {/* Center Panel - Neural Network */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <NeuralNetwork
              tokens={tokens}
              isProcessing={isProcessing}
              activeLayer={activeLayer}
            />

            {/* Output Display */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-6 rounded-xl border border-border/50 bg-card/30 p-6 backdrop-blur-sm"
            >
              <OutputDisplay
                output={output}
                probabilities={probabilities}
                isGenerating={isProcessing}
              />
            </motion.div>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/30 bg-card/10 py-6">
        <div className="container text-center">
          <p className="text-sm text-muted-foreground">
            Interactive neural network visualization • Educational demonstration
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
