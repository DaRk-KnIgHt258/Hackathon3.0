import React, { useState } from 'react';

export function AskAiDrawer({ isOpen, onClose, selectedCase }) {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: `Namaste Counselor. I am your grounded NyayaSutra Docket Intelligence assistant. I have indexed all 1,248 case dockets, certified orders, and statutory sections. How can I assist you with ${
        selectedCase ? selectedCase.title : 'this registry'
      }?`,
      citation: 'High Court & Supreme Court Registry Feed (CIS 3.2)',
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  if (!isOpen) return null;

  const handleSend = (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    const userText = query;
    setQuery('');
    setMessages((prev) => [...prev, { sender: 'user', text: userText }]);
    setIsTyping(true);

    setTimeout(() => {
      let reply = `Based on the judicial record in ${
        selectedCase ? selectedCase.title : 'the active case docket'
      }, the Bench ruled that procedural safeguards are mandatory. Any non-compliance constitutes an irregularity under statutory rules.`;
      let citation = `${selectedCase ? selectedCase.citation : '(2014) 8 SCC 273'}, Para 12-14`;

      if (userText.toLowerCase().includes('498a') || userText.toLowerCase().includes('arrest')) {
        reply =
          'Under Section 41A CrPC as interpreted in Arnesh Kumar, notice of appearance must be issued within 2 weeks from date of institution. Arrest is an exceptional remedy requiring recorded justification.';
        citation = 'Arnesh Kumar v. State of Bihar, (2014) 8 SCC 273, Page 6, Para 11';
      } else if (userText.toLowerCase().includes('privacy') || userText.toLowerCase().includes('puttaswamy')) {
        reply =
          'In Justice K.S. Puttaswamy (2017), the 9-Judge Constitution Bench held that Privacy is protected as an intrinsic facet of the Right to Life under Article 21, subject to the test of legality, legitimate state aim, and proportionality.';
        citation = 'K.S. Puttaswamy v. Union of India, (2017) 10 SCC 1, Para 324';
      } else if (userText.toLowerCase().includes('cheque') || userText.toLowerCase().includes('138')) {
        reply =
          'Pursuant to the 2015 amendment to Section 142(2) of the NI Act following Dashrath Rupsingh Rathod, territorial jurisdiction is fixed at the court within whose local jurisdiction the branch of the bank where the payee maintains the account is situated.';
        citation = 'NI Act Section 142(2) & Dashrath Rupsingh Rathod, (2014) 9 SCC 129';
      }

      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: reply,
          citation: citation,
        },
      ]);
      setIsTyping(false);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/60 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-lg bg-surface border-l border-outline-variant shadow-2xl flex flex-col h-full animate-in slide-in-from-right duration-250">
        {/* Drawer Header */}
        <div className="p-4 bg-primary text-white flex items-center justify-between border-b border-outline/30">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-[#172D4E] border border-secondary/50 flex items-center justify-center text-secondary">
              <span className="material-symbols-outlined text-[20px]">smart_toy</span>
            </div>
            <div>
              <h3 className="font-headline font-bold text-sm text-white">
                NyayaSutra Grounded Legal AI
              </h3>
              <p className="text-[11px] text-slate-300">
                {selectedCase ? selectedCase.title : 'Global Judicial Copilot'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-300 hover:text-white p-1 rounded-lg hover:bg-white/10 transition"
          >
            <span className="material-symbols-outlined text-[22px]">close</span>
          </button>
        </div>

        {/* Message Thread */}
        <div className="flex-1 p-4 overflow-y-auto custom-scroll space-y-4 bg-[#F8FAFC]">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-lg p-3 text-xs leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-primary text-white rounded-br-none shadow-sm'
                    : 'bg-white text-slate-800 border border-outline-variant rounded-bl-none shadow-2xs'
                }`}
              >
                <p>{m.text}</p>
                {m.citation && (
                  <div className="mt-2 pt-2 border-t border-slate-100 flex items-center gap-1 text-[10px] text-secondary font-mono font-semibold">
                    <span className="material-symbols-outlined text-[12px]">verified</span>
                    Citing: {m.citation}
                  </div>
                )}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
              Synthesizing judgment paragraphs...
            </div>
          )}
        </div>

        {/* Suggested Queries */}
        <div className="px-4 py-2 bg-slate-50 border-t border-slate-200 overflow-x-auto flex items-center gap-2 text-[11px]">
          <span className="text-slate-400 shrink-0 font-semibold uppercase text-[10px]">Prompt:</span>
          <button
            onClick={() => setQuery('What is the ratio decidendi under Section 498A?')}
            className="px-2 py-0.5 rounded bg-white border border-slate-300 text-slate-700 hover:border-secondary hover:text-primary transition shrink-0"
          >
            Sec 498A Checklist
          </button>
          <button
            onClick={() => setQuery('Where to file a Section 138 cheque bounce case?')}
            className="px-2 py-0.5 rounded bg-white border border-slate-300 text-slate-700 hover:border-secondary hover:text-primary transition shrink-0"
          >
            Sec 138 Jurisdiction
          </button>
          <button
            onClick={() => setQuery('Explain the 4-fold test of arbitrability in Vidya Drolia')}
            className="px-2 py-0.5 rounded bg-white border border-slate-300 text-slate-700 hover:border-secondary hover:text-primary transition shrink-0"
          >
            Arbitrability Test
          </button>
        </div>

        {/* Drawer Input */}
        <form onSubmit={handleSend} className="p-3 bg-white border-t border-outline-variant flex items-center gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask a grounded legal query citing judgment text..."
            className="flex-1 text-xs px-3 py-2 rounded-lg border border-outline-variant focus:outline-none focus:border-secondary font-body bg-surface"
          />
          <button
            type="submit"
            className="px-3.5 py-2 rounded-lg bg-secondary text-primary font-bold text-xs hover:bg-[#d6b46b] transition flex items-center gap-1 active:scale-95 shadow-sm"
          >
            <span className="material-symbols-outlined text-[16px]">send</span>
          </button>
        </form>
      </div>
    </div>
  );
}
