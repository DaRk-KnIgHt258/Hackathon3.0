import React, { useState } from 'react';
import { Send, Bot, User, X, Sparkles, BookOpen, Quote, ChevronRight } from 'lucide-react';

export function CaseChatDrawer({ isOpen, onClose, activeCase }) {
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: `Hello Counsel! I am Nyaya AI, indexed directly on "${activeCase.title}". Ask me any query about the court's reasoning, statutory citations, or plain-English takeaway.`,
      citation: null,
    },
    {
      sender: 'user',
      text: 'Why was the order / bail granted in this matter?',
      citation: null,
    },
    {
      sender: 'ai',
      text: 'The Hon’ble Bench held that automatic arrest without satisfying the objective necessity criteria laid down in Section 41 CrPC violates constitutional safeguards. The Magistrate must examine the police checklist before authorizing any further detention.',
      citation: {
        page: 'Page 7, Para 11',
        excerpt: 'Arrest brings humiliation, curtails freedom and casts scars forever... Police officers shall not automatically arrest under Section 498-A.',
      },
    },
  ]);
  const [inputText, setInputText] = useState('');

  if (!isOpen) return null;

  const quickPrompts = [
    'What is the ratio decidendi?',
    'List all statutory sections cited',
    'Explain outcome in Hindi',
  ];

  const handleSend = (textToSend = inputText) => {
    if (!textToSend.trim()) return;

    const userMsg = { sender: 'user', text: textToSend, citation: null };
    setMessages((prev) => [...prev, userMsg]);
    setInputText('');

    setTimeout(() => {
      let aiResponse = {
        sender: 'ai',
        text: `Based on the judicial text of ${activeCase.case_number}, the court held that: "${activeCase.lawyer_headnote}"`,
        citation: {
          page: 'Page 4, Para 6',
          excerpt: activeCase.statutes_cited?.[0]?.context_in_case || 'Statutory directions framed to prevent procedural abuse.',
        },
      };

      if (textToSend.toLowerCase().includes('hindi')) {
        aiResponse.text = activeCase.citizen_summary_hi;
        aiResponse.citation = { page: 'Citizen Summary Section', excerpt: 'सुलभ हिंदी अनुवाद' };
      } else if (textToSend.toLowerCase().includes('section') || textToSend.toLowerCase().includes('statute')) {
        aiResponse.text = `The primary enactments cited are: ${activeCase.statutes_cited?.map((s) => `${s.section} of ${s.act}`).join(', ')}.`;
      }

      setMessages((prev) => [...prev, aiResponse]);
    }, 600);
  };

  return (
    <div className="fixed inset-y-0 right-0 z-40 w-full sm:w-[480px] bg-[#0B0F19]/95 backdrop-blur-2xl border-l border-slate-800 shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
      {/* Header */}
      <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-[#070B14]">
        <div className="flex items-center gap-2.5">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 p-0.5">
            <div className="h-full w-full bg-slate-900 rounded-[10px] flex items-center justify-center">
              <Bot className="w-5 h-5 text-cyan-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="font-bold text-white text-sm">Ask Nyaya AI</h3>
              <span className="px-1.5 py-0.2 rounded text-[10px] bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-medium">
                RAG Active
              </span>
            </div>
            <p className="text-[11px] text-slate-400 truncate max-w-[260px]">
              Grounded in {activeCase.case_number}
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div className="flex items-start gap-2 max-w-[90%]">
              {msg.sender === 'ai' && (
                <div className="w-6 h-6 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shrink-0 mt-0.5">
                  <Bot className="w-3.5 h-3.5 text-cyan-400" />
                </div>
              )}

              <div
                className={`p-3 rounded-2xl text-xs leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-emerald-500/20 text-emerald-100 border border-emerald-500/30 rounded-tr-none'
                    : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none'
                }`}
              >
                <p>{msg.text}</p>

                {msg.citation && (
                  <div className="mt-2.5 pt-2 border-t border-slate-800/80 bg-slate-950/40 -mx-1 -mb-1 p-2 rounded-lg">
                    <div className="flex items-center gap-1 text-[10px] font-semibold text-cyan-400 mb-1">
                      <Quote className="w-3 h-3" />
                      <span>Exact Page Citation: {msg.citation.page}</span>
                    </div>
                    <p className="text-[11px] text-slate-400 italic">"{msg.citation.excerpt}"</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Suggested quick queries */}
      <div className="px-4 py-2 bg-slate-950/60 border-t border-slate-800/60">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {quickPrompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(prompt)}
              className="text-[11px] px-2.5 py-1 rounded-full bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-cyan-300 border border-slate-800 whitespace-nowrap transition"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="p-3 bg-[#070B14] border-t border-slate-800">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Ask question about this judgment..."
            className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/50"
          />
          <button
            type="submit"
            className="p-2 rounded-xl bg-cyan-500 text-slate-950 hover:bg-cyan-400 transition shadow-[0_0_12px_rgba(6,182,212,0.3)] disabled:opacity-50"
            disabled={!inputText.trim()}
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
