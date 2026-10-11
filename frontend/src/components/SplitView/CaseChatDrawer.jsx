import React, { useState, useEffect, useRef } from 'react';
import {
  Send,
  Bot,
  User,
  X,
  Sparkles,
  BookOpen,
  Quote,
  ChevronRight,
  ExternalLink,
  RotateCcw
} from 'lucide-react';

export function CaseChatDrawer({ isOpen, onClose, activeCase, onSelectCitation }) {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Initialize and reset messages whenever activeCase changes
  useEffect(() => {
    if (!activeCase) return;

    let initialCitations = null;
    let starterQ = 'What is the core takeaway of this ruling?';
    let starterA = `In ${activeCase.case_number}, the ${activeCase.court} held: "${activeCase.lawyer_headnote}"`;

    if (activeCase.id === 'sample_arnesh_kumar') {
      starterQ = 'Why was automatic arrest restricted under Section 498-A IPC?';
      starterA =
        'The Hon’ble Bench held that mechanical arrest without satisfying Section 41 CrPC checklist infringes Article 21. Notice of appearance under Section 41-A must be issued first.';
      initialCitations = {
        page: 'Page 2, Para 4',
        excerpt:
          'Notice of appearance under Section 41-A CrPC be served on the accused within two weeks... failure to comply renders police officer liable for contempt.'
      };
    } else if (activeCase.id === 'sample_dashrath_rupsingh') {
      starterQ = 'Where must a Section 138 cheque bounce case be filed?';
      starterA =
        'Exclusive territorial jurisdiction lies strictly where the drawee bank is located (the paying branch), overruling previous interpretations in K. Bhaskaran.';
      initialCitations = {
        page: 'Page 2, Para 3',
        excerpt:
          'Territorial jurisdiction under Section 138 NI Act is restricted to the court within whose local jurisdiction the drawee bank branch is situated.'
      };
    } else if (activeCase.id === 'sample_puttaswamy') {
      starterQ = 'Under which constitutional articles is privacy protected?';
      starterA =
        'A 9-judge Constitution Bench held unanimously that privacy is an intrinsic fundamental right guaranteed under Articles 14, 19, and 21 of the Constitution of India.';
      initialCitations = {
        page: 'Page 2, Para 4',
        excerpt:
          'An invasion of life or personal liberty must meet the threefold requirement of legality, legitimate state aim, and proportionality.'
      };
    } else if (activeCase.id === 'sample_balco') {
      starterQ = 'Can an Indian court grant interim relief in a foreign arbitration?';
      starterA =
        'No. The 5-judge bench overruled Bhatia International and held that Part I of the Arbitration Act does not apply to arbitrations seated outside India.';
      initialCitations = {
        page: 'Page 2, Para 4',
        excerpt:
          'Indian courts have no supervisory jurisdiction over foreign-seated arbitrations. No interim relief under Section 9 can be entertained.'
      };
    }

    setMessages([
      {
        sender: 'ai',
        text: `Greetings Counsel! I am Nyaya AI, indexed directly on "${activeCase.title}". Ask me any question regarding legal reasoning, statutes cited, or ratio decidendi.`,
        citation: null
      },
      {
        sender: 'user',
        text: starterQ,
        citation: null
      },
      {
        sender: 'ai',
        text: starterA,
        citation: initialCitations
      }
    ]);
  }, [activeCase.id]);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  if (!isOpen) return null;

  // Case-specific quick prompts
  const getQuickPrompts = () => {
    if (activeCase.id === 'sample_arnesh_kumar') {
      return ['What is the Section 41 checklist?', 'Explain outcome in Hindi', 'What happens if police violate 41A?'];
    }
    if (activeCase.id === 'sample_dashrath_rupsingh') {
      return ['Explain territorial jurisdiction', 'Why was K. Bhaskaran overruled?', 'Explain in simple Hindi'];
    }
    if (activeCase.id === 'sample_puttaswamy') {
      return ['What is the 4-fold proportionality test?', 'Explain privacy in Hindi', 'Which prior cases were overruled?'];
    }
    if (activeCase.id === 'sample_balco') {
      return ['Why does Part I not apply abroad?', 'Can an Indian court appoint arbitrator?', 'Explain in Hindi'];
    }
    return ['What is the ratio decidendi?', 'List all statutes cited', 'Explain outcome in Hindi'];
  };

  const handleSend = (textToSend = inputText) => {
    if (!textToSend.trim()) return;

    const userMsg = { sender: 'user', text: textToSend, citation: null };
    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      let aiText = `Under ${activeCase.case_number}, the court observed that: "${activeCase.lawyer_headnote}"`;
      let aiCitation = {
        page: 'Page 1, Para 2',
        excerpt: activeCase.statutes_cited?.[0]?.context_in_case || 'Judicial directions framed.'
      };

      const query = textToSend.toLowerCase();

      if (query.includes('hindi')) {
        aiText = activeCase.citizen_summary_hi;
        aiCitation = { page: 'Citizen Summary Mode', excerpt: 'सुलभ हिंदी अनुवाद' };
      } else if (query.includes('statute') || query.includes('section') || query.includes('act')) {
        aiText = `The statutes cited in this matter are: ${activeCase.statutes_cited
          ?.map((s) => `${s.section} of ${s.act}`)
          .join(', ')}.`;
        aiCitation = {
          page: activeCase.statutes_cited?.[0]?.page_ref || 'Page 2',
          excerpt: activeCase.statutes_cited?.[0]?.description || 'Statutory authority'
        };
      } else if (query.includes('precedent') || query.includes('overrule')) {
        aiText = `Key precedents cited: ${activeCase.precedents_cited
          ?.map((p) => `${p.title} (${p.relation})`)
          .join('; ')}.`;
        aiCitation = { page: 'Page 2, Para 3', excerpt: 'Prior authorities reviewed by Bench.' };
      } else if (query.includes('who') || query.includes('coram') || query.includes('judge')) {
        aiText = `The matter was heard and decided by: ${activeCase.coram?.join('; ')}.`;
        aiCitation = { page: 'Formal Order Header', excerpt: activeCase.court };
      }

      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: aiText,
          citation: aiCitation
        }
      ]);
      setIsTyping(false);
    }, 600);
  };

  return (
    <div className="fixed inset-y-0 right-0 z-40 w-full sm:w-[500px] bg-[#0B0F19]/95 backdrop-blur-2xl border-l border-slate-800 shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
      {/* Header */}
      <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-[#070B14]">
        <div className="flex items-center gap-2.5">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 p-0.5 shadow-lg shadow-cyan-500/20">
            <div className="h-full w-full bg-slate-900 rounded-[10px] flex items-center justify-center">
              <Bot className="w-5 h-5 text-cyan-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="font-bold text-white text-sm">Ask Nyaya AI</h3>
              <span className="px-1.5 py-0.2 rounded text-[10px] bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-medium">
                Judgment RAG Grounded
              </span>
            </div>
            <p className="text-[11px] text-slate-400 truncate max-w-[280px]">
              {activeCase.case_number}
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

      {/* Messages Feed */}
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
                className={`p-3.5 rounded-2xl text-xs leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-emerald-500/20 text-emerald-100 border border-emerald-500/30 rounded-tr-none'
                    : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none space-y-2'
                }`}
              >
                <p>{msg.text}</p>

                {msg.citation && (
                  <div className="mt-2.5 pt-2 border-t border-slate-800 bg-slate-950/60 -mx-1 -mb-1 p-2.5 rounded-xl space-y-1">
                    <div className="flex items-center justify-between text-[10px] font-semibold text-cyan-400">
                      <span className="flex items-center gap-1">
                        <Quote className="w-3 h-3" />
                        Exact Citation: {msg.citation.page}
                      </span>
                      {onSelectCitation && (
                        <button
                          onClick={() => onSelectCitation(msg.citation.page || msg.citation.excerpt)}
                          className="flex items-center gap-0.5 text-cyan-300 hover:text-white underline text-[10px]"
                        >
                          <span>Jump to Text</span>
                          <ChevronRight className="w-2.5 h-2.5" />
                        </button>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-400 italic">"{msg.citation.excerpt}"</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-2 text-xs text-slate-400 animate-pulse p-2">
            <Bot className="w-4 h-4 text-cyan-400" />
            <span>Nyaya AI querying judgment clauses...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Queries */}
      <div className="px-4 py-2.5 bg-slate-950/80 border-t border-slate-800/80">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {getQuickPrompts().map((prompt, idx) => (
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

      {/* Input Form */}
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
            placeholder="Ask anything about this judgment..."
            className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/60"
          />
          <button
            type="submit"
            className="p-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 hover:from-cyan-400 hover:to-blue-500 transition shadow-[0_0_12px_rgba(6,182,212,0.3)] disabled:opacity-40"
            disabled={!inputText.trim() || isTyping}
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
