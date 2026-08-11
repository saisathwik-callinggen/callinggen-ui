"use client";

import { Play, Pause, Mic, Settings2, Globe, Volume2 } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LiveDemoSection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setDuration(d => d + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <section id="livedemo" className="bg-white py-24 dark:bg-zinc-950 sm:py-32 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 right-0 -z-10 h-[600px] w-[600px] opacity-20 mix-blend-multiply blur-[120px] dark:opacity-10 pointer-events-none">
        <div className="absolute right-0 top-0 h-[400px] w-[400px] rounded-full bg-gradient-to-bl from-[#7B61FF] to-[#4F6BFF]" />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-[#4F6BFF]/10 px-3 py-1 text-sm font-semibold text-[#4F6BFF] mb-6">
              <Volume2 className="h-4 w-4" /> Interactive Experience
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white sm:text-5xl mb-6">
              Hear CallingGen in Action
            </h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400">
              Listen to a real, unedited conversation between our AI agent and a customer. Notice the natural pauses, dynamic responses, and perfect understanding.
            </p>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-4xl"
        >
          <div className="rounded-3xl border border-zinc-200/80 bg-white/50 backdrop-blur-xl shadow-2xl dark:border-zinc-800/80 dark:bg-zinc-900/50 overflow-hidden">
            
            {/* Top Toolbar */}
            <div className="flex flex-col sm:flex-row items-center justify-between border-b border-zinc-100 bg-zinc-50/50 px-6 py-4 dark:border-zinc-800 dark:bg-zinc-950/50 gap-4">
              <div className="flex items-center gap-4 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0">
                <div className="flex items-center gap-2 rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm font-medium text-zinc-700 shadow-sm dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
                  <Settings2 className="h-4 w-4 text-zinc-400" />
                  <select className="bg-transparent outline-none cursor-pointer">
                    <option>Sarah (Friendly Support)</option>
                    <option>James (Direct Sales)</option>
                    <option>Emma (Professional Reception)</option>
                  </select>
                </div>
                <div className="flex items-center gap-2 rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm font-medium text-zinc-700 shadow-sm dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
                  <Globe className="h-4 w-4 text-zinc-400" />
                  <select className="bg-transparent outline-none cursor-pointer">
                    <option>English (US)</option>
                    <option>Spanish (ES)</option>
                    <option>French (FR)</option>
                  </select>
                </div>
              </div>
              <div className="font-mono text-sm font-bold text-zinc-500 dark:text-zinc-400 shrink-0">
                {formatTime(duration)}
              </div>
            </div>

            {/* Conversation Area */}
            <div className="p-6 sm:p-10 bg-gradient-to-b from-transparent to-zinc-50/50 dark:to-zinc-950/50 min-h-[300px] flex flex-col justify-end space-y-6 relative overflow-hidden">
              <AnimatePresence>
                {isPlaying && (
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex flex-col items-start gap-1 w-full max-w-[80%]"
                  >
                    <div className="text-xs font-bold text-zinc-400 uppercase tracking-wider ml-2">Customer</div>
                    <div className="rounded-2xl rounded-tl-sm bg-white px-5 py-3 text-base text-zinc-700 shadow-sm border border-zinc-100 dark:border-zinc-800 dark:bg-zinc-800 dark:text-zinc-300">
                      Hi, I missed a call from this number earlier today?
                    </div>
                  </motion.div>
                )}

                {isPlaying && duration > 2 && (
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex flex-col items-end gap-1 w-full max-w-[80%] self-end"
                  >
                    <div className="text-xs font-bold text-[#4F6BFF] uppercase tracking-wider mr-2">CallingGen Agent</div>
                    <div className="rounded-2xl rounded-tr-sm bg-gradient-to-br from-[#4F6BFF] to-[#7B61FF] px-5 py-3 text-base text-white shadow-md">
                      Hello! Yes, this is Sarah from Acme Corp. We were calling to follow up on your recent inquiry about our enterprise plans. Do you have a quick minute?
                    </div>
                  </motion.div>
                )}

                {isPlaying && duration > 7 && (
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex flex-col items-start gap-1 w-full max-w-[80%]"
                  >
                    <div className="text-xs font-bold text-zinc-400 uppercase tracking-wider ml-2">Customer</div>
                    <div className="rounded-2xl rounded-tl-sm bg-white px-5 py-3 text-base text-zinc-700 shadow-sm border border-zinc-100 dark:border-zinc-800 dark:bg-zinc-800 dark:text-zinc-300">
                      Oh right, yes. Actually, I was hoping to schedule a demo for next Tuesday if possible.
                    </div>
                  </motion.div>
                )}

                {isPlaying && duration > 10 && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="self-center flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-100 dark:bg-zinc-800 mt-4"
                  >
                    <div className="flex gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-bounce" />
                      <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-bounce" style={{ animationDelay: '0.15s' }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-bounce" style={{ animationDelay: '0.3s' }} />
                    </div>
                    <span className="text-xs font-medium text-zinc-500">Agent is typing/speaking...</span>
                  </motion.div>
                )}
              </AnimatePresence>
              
              {!isPlaying && duration === 0 && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <Mic className="h-12 w-12 text-zinc-300 dark:text-zinc-700 mx-auto mb-4" />
                    <p className="text-zinc-500 dark:text-zinc-400 font-medium">Click play to start the demo simulation</p>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Controls */}
            <div className="flex flex-col sm:flex-row items-center justify-between border-t border-zinc-100 bg-white px-6 py-6 dark:border-zinc-800 dark:bg-zinc-950 gap-6">
              
              {/* Playback Controls & Waveform */}
              <div className="flex items-center gap-6 w-full sm:w-auto">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-[#4F6BFF] to-[#7B61FF] text-white shadow-lg transition-transform hover:scale-105"
                >
                  {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 ml-1" />}
                </button>
                
                {/* Simulated Waveform line */}
                <div className="flex items-center gap-1 h-8 w-full sm:w-48 overflow-hidden opacity-80">
                  {Array.from({ length: 30 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className={`w-1 rounded-full ${isPlaying ? 'bg-[#4F6BFF]' : 'bg-zinc-200 dark:bg-zinc-800'}`}
                      animate={isPlaying ? { height: [`20%`, `${Math.random() * 80 + 20}%`, `20%`] } : { height: '20%' }}
                      transition={{ duration: 0.5 + Math.random(), repeat: Infinity, ease: "easeInOut" }}
                    />
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <button className="w-full sm:w-auto rounded-full border-2 border-zinc-900 bg-zinc-900 px-8 py-3.5 text-sm font-bold text-white shadow-xl transition-all hover:bg-transparent hover:text-zinc-900 dark:border-white dark:bg-white dark:text-zinc-900 dark:hover:bg-transparent dark:hover:text-white">
                Try Live Demo Yourself
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
