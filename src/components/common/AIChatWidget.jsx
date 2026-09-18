import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, 
  MessageSquare, 
  X, 
  Send, 
  Bot, 
  User, 
  Minimize2, 
  RefreshCw,
  Zap,
  CheckCircle2
} from 'lucide-react';
import { BATCHES_DATA, STUDENTS_DATA, INVENTORY_DATA, EXAM_SERIES_DATA } from '../../data/erpData';

export default function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: 'Hello! I am EduMission AI Copilot 🤖. How can I assist you with student rosters, fee collections, live classes, or batch telemetry today?',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  // Quick suggestion chips
  const suggestions = [
    'What is today fee collection?',
    'Batch A JEE enrolment count',
    'Facial attendance camera status',
    'How do I issue book sets?'
  ];

  // Smart Response Generator
  const generateResponse = (userQuery) => {
    const query = userQuery.toLowerCase();

    if (query.includes('fee') || query.includes('collection') || query.includes('finance')) {
      return '💰 Today\'s total fee collection stands at **$92,500** across all active campuses with a 94.2% collection rate. You can view detailed defaulters in Module 05 (Fees & Finance).';
    }
    if (query.includes('batch') || query.includes('jee') || query.includes('neet')) {
      return `📅 We currently have **${BATCHES_DATA.length} active batches**! Batch A (JEE Advanced 2026) has 118 enrolled students with an 88% homework completion rate.`;
    }
    if (query.includes('student') || query.includes('roster') || query.includes('count')) {
      return `🎓 Total active enrolled students across all branches is **${STUDENTS_DATA.length * 150} students**. You can view full student details in Module 02 (Students Master).`;
    }
    if (query.includes('camera') || query.includes('facial') || query.includes('attendance') || query.includes('webcam')) {
      return '📸 Facial Attendance AI is active! Hardware Turnstiles are running at 60 FPS HD with 118ms match latency. Real Laptop Camera streaming is enabled in Module 04.';
    }
    if (query.includes('book') || query.includes('inventory') || query.includes('kit')) {
      return `📦 Inventory currently holds **${INVENTORY_DATA.reduce((acc, i) => acc + i.inStock, 0)} items** including 18-Vol JEE Book Sets and Admission Welcome Kits (Backpack, RFID Card, Bottle).`;
    }
    if (query.includes('exam') || query.includes('test') || query.includes('mark')) {
      return `📝 Active exam series: **${EXAM_SERIES_DATA[0]?.title}** (Average Score: ${EXAM_SERIES_DATA[0]?.averageMarks} Marks). WebRTC AI proctoring is enabled for live tests.`;
    }

    return `🤖 Thank you for your question regarding "${userQuery}". EduMission ERP AI Copilot has synchronized all 22 module telemetry streams. You can use the left sidebar to navigate to specific module desks or ask me for statistics!`;
  };

  const handleSend = (textToSend) => {
    const text = textToSend || input;
    if (!text.trim()) return;

    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: text,
      time: timeStr
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const aiReplyText = generateResponse(text);
      const aiMsg = {
        id: Date.now() + 1,
        sender: 'ai',
        text: aiReplyText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* FLOATING TRIGGER BUTTON */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group px-4 py-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-full shadow-2xl flex items-center gap-2.5 transition-all duration-300 hover:scale-105 active:scale-95 border border-white/20"
        >
          <div className="relative">
            <Sparkles className="w-5 h-5 text-amber-300 animate-spin-slow" />
            <span className="w-2 h-2 rounded-full bg-emerald-400 absolute -top-0.5 -right-0.5 animate-ping"></span>
          </div>
          <span className="font-heading font-extrabold text-xs tracking-wide">AI Assistant</span>
          <span className="px-2 py-0.5 rounded-full bg-white/20 text-[10px] font-mono font-bold">Online</span>
        </button>
      )}

      {/* CHAT POPUP WINDOW */}
      {isOpen && (
        <div className="w-80 md:w-96 h-[500px] bg-slate-900 text-white rounded-3xl shadow-2xl border border-indigo-500/40 flex flex-col justify-between overflow-hidden animate-in zoom-in-95 duration-200">
          
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border-b border-slate-800 flex justify-between items-center">
            <div className="flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-lg shadow-md border border-indigo-400/30">
                🤖
              </div>
              <div>
                <h3 className="font-heading font-black text-sm text-white flex items-center gap-1.5">
                  EduMission AI Copilot
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                </h3>
                <p className="text-[10px] text-indigo-300">General ERP & Student AI Assistant</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setMessages([messages[0]])}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                title="Clear Chat"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                title="Minimize"
              >
                <Minimize2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-slate-950/60 scrollbar-thin">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-2.5 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.sender === 'ai' && (
                  <div className="w-7 h-7 rounded-xl bg-indigo-600 flex items-center justify-center text-xs shrink-0 text-white shadow-sm mt-0.5">
                    🤖
                  </div>
                )}

                <div
                  className={`max-w-[80%] p-3 rounded-2xl text-xs space-y-1 ${
                    m.sender === 'user'
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-br-xs shadow-md'
                      : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-bl-xs'
                  }`}
                >
                  <p className="leading-relaxed font-medium whitespace-pre-line">{m.text}</p>
                  <span className={`text-[9px] block text-right font-mono ${
                    m.sender === 'user' ? 'text-indigo-200' : 'text-slate-500'
                  }`}>
                    {m.time}
                  </span>
                </div>

                {m.sender === 'user' && (
                  <div className="w-7 h-7 rounded-xl bg-purple-600 flex items-center justify-center text-xs shrink-0 text-white shadow-sm mt-0.5">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 text-xs text-indigo-400 font-mono animate-pulse">
                <Bot className="w-4 h-4" /> AI Copilot is thinking...
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Suggestion Chips */}
          <div className="px-3 py-2 bg-slate-900 border-t border-slate-800 overflow-x-auto flex gap-1.5 scrollbar-none">
            {suggestions.map((s, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(s)}
                className="px-2.5 py-1 rounded-full bg-slate-800 hover:bg-indigo-950 text-indigo-300 border border-slate-700 text-[10px] whitespace-nowrap font-medium transition-all"
              >
                💡 {s}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-slate-900 border-t border-slate-800 flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Ask AI Copilot anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 font-medium"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className={`p-2 rounded-xl text-white font-bold transition-all shadow-md ${
                input.trim() ? 'bg-indigo-600 hover:bg-indigo-500' : 'bg-slate-800 text-slate-600 cursor-not-allowed'
              }`}
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}
    </div>
  );
}
