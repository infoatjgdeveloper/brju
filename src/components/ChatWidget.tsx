import React, { useState, useEffect, useRef } from 'react';

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

const SYSTEM_PROMPT = `You are a helpful AI assistant for BRJU Infosec. 
You answer questions about BRJU Infosec services, solutions, products, and company information. 
Keep your answers concise, professional, and helpful. 

When users ask for contact information, to get a demo, or to make an inquiry, ALWAYS provide the following details:
- Email: ops@brjuinfosec.com
- Get a Demo / Inquiry Form: https://docs.google.com/forms/d/e/1FAIpQLSeUTygTM3E4EtVAzwCSFqN1Q60q2EKer7Vtme8admS9Xht9nA/viewform?usp=dialog

If you don't know the answer, say you don't know and recommend contacting the team at ops@brjuinfosec.com.`;

// Simple custom markdown renderer to handle bold and newlines
const formatMessage = (content: string) => {
  return content.split('\n').map((line, lineIndex) => {
    if (!line.trim()) return <br key={`br-${lineIndex}`} />;

    // Split by ** for bold
    const parts = line.split(/(\*\*.*?\*\*)/g);

    return (
      <p key={`p-${lineIndex}`} className="mb-2 last:mb-0 leading-relaxed">
        {parts.map((part, partIndex) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            return (
              <strong key={`str-${partIndex}`} className="font-semibold text-slate-900 dark:text-white">
                {part.slice(2, -2)}
              </strong>
            );
          }
          return <span key={`span-${partIndex}`}>{part}</span>;
        })}
      </p>
    );
  });
};

const parseRssItems = (items: HTMLCollectionOf<Element>): string => {
  return Array.from(items)
    .slice(0, 5)
    .map((item) => {
      const title = item.getElementsByTagName('title')[0]?.textContent || '';
      const pubDate = item.getElementsByTagName('pubDate')[0]?.textContent || '';
      const link = item.getElementsByTagName('link')[0]?.textContent || '';
      return `- Title: ${title}\n  Published: ${pubDate}\n  Link: ${link}`;
    })
    .join('\n\n');
};

const fetchNews = async (query: string): Promise<string> => {
  try {
    // Try using the local proxy first
    let response = await fetch(`/api/news?q=${encodeURIComponent(query)}`);

    // Fallback if local proxy fails or returns non-200
    if (!response.ok) {
      const allOriginsUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(`https://news.google.com/rss/search?q=${encodeURIComponent(query)}`)}`;
      const fallbackResponse = await fetch(allOriginsUrl);
      if (fallbackResponse.ok) {
        const json = await fallbackResponse.json();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(json.contents, 'text/xml');
        const items = xmlDoc.getElementsByTagName('item');
        if (items.length > 0) {
          return parseRssItems(items);
        }
      }
      return '';
    }

    const text = await response.text();
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(text, 'text/xml');
    const items = xmlDoc.getElementsByTagName('item');
    return parseRssItems(items);
  } catch (error) {
    console.error('Failed to fetch news:', error);
    // Try public fallback proxy directly in case of network issues
    try {
      const allOriginsUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(`https://news.google.com/rss/search?q=${encodeURIComponent(query)}`)}`;
      const fallbackResponse = await fetch(allOriginsUrl);
      if (fallbackResponse.ok) {
        const json = await fallbackResponse.json();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(json.contents, 'text/xml');
        const items = xmlDoc.getElementsByTagName('item');
        if (items.length > 0) {
          return parseRssItems(items);
        }
      }
    } catch (fallbackError) {
      console.error('Fallback fetch news failed:', fallbackError);
    }
    return '';
  }
};

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Hi there! How can I help you with BRJU Infosec services and solutions today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelectDemo = (agentType: string) => {
    let messageText = '';

    switch (agentType) {
      case 'Logistic':
        messageText = `Hello! I am the BRJU Logistic Agent. I focus on deploying AI solutions for global supply chains, automated warehouse routing, predictive fleet maintenance, and last-mile delivery route optimization. How can I assist you with your logistics operations?`;
        break;
      case 'Healthcare':
        messageText = `Hello! I am the BRJU Healthcare Agent. I specialize in developing HIPAA-compliant AI systems for clinical workflow automation, medical data analysis, diagnostic support models, and secure electronic health records (EHR) analytics. How can I help with your healthcare technology needs?`;
        break;
      case 'Cyber securtiy':
        messageText = `Hello! I am the BRJU Cyber Security Agent (representing our BRJU Infosec team). I specialize in 24/7 SOC monitoring, automated threat hunting, custom penetration testing models, and securing enterprise AI deployments. How can I assist with your cybersecurity posture?`;
        break;
      case 'other':
      default:
        messageText = `Hello! I am the BRJU Enterprise AI Agent. I am here to help you design custom LLM solutions, deploy customer support chatbots in under 48 hours, and explore tailored AI research and development partnerships. What are you looking to build?`;
        break;
    }

    setMessages((prev) => [...prev, { role: 'assistant', content: messageText }]);
    setIsDropdownOpen(false);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const apiKey = import.meta.env.VITE_GROQ_API_KEY;

    if (!apiKey) {
      setMessages((prev) => [...prev, {
        role: 'assistant',
        content: 'Error: API key is not configured. Please add VITE_GROQ_API_KEY to your .env file.'
      }]);
      return;
    }

    const userMessage: Message = { role: 'user', content: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Determine if query is seeking real-time info/news
      const cleanPrompt = userMessage.content.toLowerCase();
      const needsNews = /\b(news|latest|current|today|now|recent|weather|headlines|update|recent|logistic|logistics|healthcare|cybersecurity|security)\b/i.test(cleanPrompt);

      let contextMsg = '';
      if (needsNews) {
        // Clean query to be most relevant for Google News
        let searchQuery = userMessage.content
          .replace(/\b(can you|please|give|show|me|tell|about|what|is|the|latest|news|on|for|current|today|now|recent|search)\b/gi, '')
          .trim();

        if (!searchQuery) {
          searchQuery = userMessage.content;
        }

        const newsContent = await fetchNews(searchQuery);
        if (newsContent) {
          contextMsg = `Here is the real-time latest news and search results for "${searchQuery}" retrieved from Google News. Use this information to construct a detailed, factual, and up-to-date answer for the user's question:\n\n${newsContent}`;
        }
      }

      // Add custom system instruction/context if we have real-time news
      const systemPromptWithContext = contextMsg
        ? `${SYSTEM_PROMPT}\n\n[REAL-TIME SEARCH CONTEXT]\n${contextMsg}\n\nIMPORTANT: Use the real-time search context above to answer the user's question accurately. Cite news sources/links if possible. If the context is empty or unrelated, reply normally.`
        : SYSTEM_PROMPT;

      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama-3.1-8b-instant', // updated to supported model
          messages: [
            { role: 'system', content: systemPromptWithContext },
            ...messages.map(m => ({ role: m.role, content: m.content })),
            userMessage
          ],
          temperature: 0.7,
          max_tokens: 500,
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      const assistantMessage: Message = {
        role: 'assistant',
        content: data.choices[0].message.content,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages((prev) => [...prev, {
        role: 'assistant',
        content: 'Sorry, I encountered an error connecting to the AI. Please check your API key or try again later.'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-40 p-4 bg-primary text-white rounded-full shadow-lg hover:bg-primary/90 transition-all duration-300 hover:scale-105 ${isOpen ? 'hidden' : 'block'}`}
        aria-label="Open Chat"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
      </button>

      {/* Chat Window */}
      <div
        className={`fixed bottom-6 right-6 z-50 w-[350px] h-[500px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300 origin-bottom-right ${isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-primary text-white relative">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center font-bold text-sm">
              AI
            </div>
            <div>
              <h3 className="font-semibold text-sm">BRJU Assistant</h3>
              <p className="text-xs text-white/80">Online</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {/* Demo Dropdown Button */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="px-2.5 py-1 bg-white/20 hover:bg-white/30 text-white text-xs font-semibold rounded-lg transition-all duration-200 flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-white/40"
              >
                <span>Demo</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl z-50 overflow-hidden py-1 text-slate-800 dark:text-slate-200 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="px-3 py-1 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                    Select Agent Demo
                  </div>
                  <button
                    type="button"
                    onClick={() => handleSelectDemo('Logistic')}
                    className="w-full text-left px-3.5 py-2 text-xs hover:bg-slate-50 dark:hover:bg-slate-700/50 flex items-center gap-2.5 transition-colors font-medium text-slate-700 dark:text-slate-200"
                  >
                    <span className="text-base select-none">🚚</span>
                    <span>Logistic</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSelectDemo('Healthcare')}
                    className="w-full text-left px-3.5 py-2 text-xs hover:bg-slate-50 dark:hover:bg-slate-700/50 flex items-center gap-2.5 transition-colors font-medium text-slate-700 dark:text-slate-200"
                  >
                    <span className="text-base select-none">🏥</span>
                    <span>Healthcare</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSelectDemo('Cyber securtiy')}
                    className="w-full text-left px-3.5 py-2 text-xs hover:bg-slate-50 dark:hover:bg-slate-700/50 flex items-center gap-2.5 transition-colors font-medium text-slate-700 dark:text-slate-200"
                  >
                    <span className="text-base select-none">🛡️</span>
                    <span>Cyber securtiy</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSelectDemo('other')}
                    className="w-full text-left px-3.5 py-2 text-xs hover:bg-slate-50 dark:hover:bg-slate-700/50 flex items-center gap-2.5 transition-colors font-medium text-slate-700 dark:text-slate-200"
                  >
                    <span className="text-base select-none">🌐</span>
                    <span>Other</span>
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-white/20 rounded-full transition-colors focus:outline-none"
              aria-label="Close Chat"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 p-4 overflow-y-auto bg-slate-50 dark:bg-slate-800/50 flex flex-col gap-3">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] p-3 rounded-2xl text-sm break-words ${msg.role === 'user'
                    ? 'bg-primary text-white rounded-tr-sm whitespace-pre-wrap'
                    : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 rounded-tl-sm'
                  }`}
              >
                {msg.role === 'user' ? (
                  msg.content
                ) : (
                  formatMessage(msg.content)
                )}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-3 rounded-2xl rounded-tl-sm flex gap-1 items-center">
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <form onSubmit={handleSendMessage} className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700 flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about BRJU Infosec..."
            className="flex-1 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white px-4 py-2 rounded-full text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="p-2 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </form>
      </div>
    </>
  );
};

export default ChatWidget;
