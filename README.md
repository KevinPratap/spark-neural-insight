🔥 spark-neural-insight
An interactive web application that visually demonstrates how text prompts are processed inside a neural network and how AI output is generated in real time. This project breaks down the AI inference process — from tokenization to layer animations to live probability distributions — into an intuitive visual experience.

✨ Key Features
✅ Prompt Tokenization & Visualization — Converts input text into visual tokens
✅ Layer Animation — Simulates token propagation through neural network layers
✅ Real-Time Output Streaming — Displays AI-generated text token by token
✅ Live Probability Display — Updates token probabilities dynamically
✅ Interactive UI — Responsive interface with animations
✅ Simplified Neural Metaphor — Makes complex AI concepts approachable

🧠 How It Works

Tokenization
Input text is split into simple word tokens for visualization.
Layer Progression Animation
Tokens move through animated neural network layers to depict forward processing.
Streaming Output
Model responses are streamed in real time, updating UI incrementally.
Probability Visualization
Probabilities are estimated from streamed text and shown live (for educational purposes).


🛠️ Technologies Used

React + TypeScript — Core app
Framer Motion — UI animation
Custom AI Stream Hook — Handles streamed model responses
TailwindCSS — Styling
Lucide Icons — Visual clarity
Modular Components — Clean structure


🚀 How to Use
Clone the Repository
bashgit clone https://github.com/KevinPratap/spark-neural-insight.git
cd spark-neural-insight
Install Dependencies
bashnpm install
Run the App
bashnpm run dev
Open your browser and navigate to:
http://localhost:3000

📈 What You'll Learn
This project teaches:

How tokens are derived from prompts
How neural layers conceptually process text
How AI generates text incrementally
How probabilities can be visualized live
How streaming responses drive UI updates


💡 Development Insights
Layer animations help explain forward propagation visually.
Streaming creates a real-time "AI in action" feel.
Simple heuristics approximate prediction confidence for education.

☁️ Future Enhancements
✨ Add attention heatmaps
✨ Multiple backend model support
✨ Step-by-step generation controls
✨ A hosted deployed demo

⚠️ Disclaimer
This tool provides a conceptual simulation of neural network inference for educational purposes. It does not implement real transformer internals.

📌 Screenshots / Demo
(Add screenshots or live demo GIF here once available)
