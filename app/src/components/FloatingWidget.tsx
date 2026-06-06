import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronRight, Search, Send, ArrowLeft, HelpCircle, Home, MessageCircle } from 'lucide-react'

const helpArticles = [
  'Getting started with Olyth',
  'Setting up your omnichannel inbox',
  'How Olyth AI resolves conversations',
  'Understanding your plan and billing',
  'Connecting CRM, ERP and third-party tools',
  'Managing team roles and permissions',
]

const teamAvatars = [
  { initial: 'A', color: '#F6941D' },
  { initial: 'M', color: '#00C9A7' },
  { initial: 'J', color: '#E07E0A' },
]

type Tab = 'home' | 'messages' | 'help'
type View = 'home' | 'chat'

export default function FloatingWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<Tab>('home')
  const [view, setView] = useState<View>('home')
  const [searchQuery, setSearchQuery] = useState('')
  const [messages, setMessages] = useState<{ text: string; from: 'agent' | 'user' }[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  const handleOpenChat = () => {
    setView('chat')
    setActiveTab('messages')
    if (messages.length === 0) {
      setIsTyping(true)
      setTimeout(() => {
        setIsTyping(false)
        setMessages([{
          text: "Hi there! 👋 I'm Thal, Olyth's AI assistant. How can I help you today?",
          from: 'agent'
        }])
      }, 1000)
    }
  }

  const handleSend = () => {
    const text = inputValue.trim()
    if (!text) return
    setMessages(prev => [...prev, { text, from: 'user' }])
    setInputValue('')
    setIsTyping(true)
    setTimeout(() => {
      setIsTyping(false)
      setMessages(prev => [...prev, {
        text: "Thanks for reaching out! Our team will get back to you shortly. You can also join our waitlist for early access to Olyth.",
        from: 'agent'
      }])
    }, 1400)
  }

  const filteredArticles = helpArticles.filter(a =>
    a.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <>
      {/* Widget Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed bottom-24 right-6 z-[999] w-[360px] max-w-[calc(100vw-48px)] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col"
            style={{ height: '520px' }}
          >
            {/* Header */}
            <div
              className="px-5 pt-6 pb-8 relative shrink-0"
              style={{ background: 'linear-gradient(135deg, #F6941D 0%, #E07E0A 60%, #C96A00 100%)' }}
            >
              {/* Close */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 w-7 h-7 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors"
              >
                <X size={14} />
              </button>

              {/* Back button in chat view */}
              {view === 'chat' && (
                <button
                  onClick={() => setView('home')}
                  className="absolute top-4 left-4 w-7 h-7 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors"
                >
                  <ArrowLeft size={14} />
                </button>
              )}

              {/* Team Avatars */}
              <div className="flex items-center mb-4">
                {teamAvatars.map((a, i) => (
                  <div
                    key={i}
                    className="w-9 h-9 rounded-full border-2 border-white flex items-center justify-center text-white text-sm font-semibold"
                    style={{ backgroundColor: a.color, marginLeft: i > 0 ? '-8px' : '0' }}
                  >
                    {a.initial}
                  </div>
                ))}
              </div>

              <h2 className="font-archivo text-xl font-bold text-white">
                Hi there <span>👋</span>
              </h2>
              <p className="font-inter text-sm text-white/80 mt-0.5">How can we help?</p>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto bg-gray-50">

              {/* HOME TAB */}
              {(activeTab === 'home' || activeTab === 'messages') && view === 'home' && (
                <div className="p-4 flex flex-col gap-3">
                  {/* Send a message */}
                  <button
                    onClick={handleOpenChat}
                    className="w-full flex items-center gap-3 bg-white rounded-xl px-4 py-3.5 shadow-sm hover:shadow-md transition-shadow text-left"
                  >
                    <div className="w-9 h-9 rounded-lg bg-teal/20 flex items-center justify-center shrink-0">
                      <Send size={16} className="text-teal" />
                    </div>
                    <span className="font-inter text-sm font-medium text-charcoal flex-1">Send us a message</span>
                    <ChevronRight size={16} className="text-clay" />
                  </button>

                  {/* Search */}
                  <div className="flex items-center gap-2 bg-white rounded-xl px-4 py-3 shadow-sm">
                    <Search size={15} className="text-clay shrink-0" />
                    <input
                      type="text"
                      placeholder="Search for help"
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      className="flex-1 font-inter text-sm text-charcoal placeholder:text-clay bg-transparent focus:outline-none"
                      onFocus={() => setActiveTab('help')}
                    />
                  </div>

                  {/* Articles */}
                  <div className="flex flex-col">
                    {filteredArticles.map((article, i) => (
                      <button
                        key={i}
                        className="flex items-center justify-between py-3 px-1 border-b border-cream last:border-0 hover:text-teal transition-colors text-left group"
                      >
                        <span className="font-inter text-sm text-charcoal group-hover:text-teal">{article}</span>
                        <ChevronRight size={15} className="text-clay shrink-0 ml-2" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* CHAT VIEW */}
              {view === 'chat' && (
                <div className="flex flex-col h-full">
                  <div className="flex-1 p-4 flex flex-col gap-3 overflow-y-auto">
                    {messages.map((msg, i) => (
                      <div key={i} className={`flex gap-2 ${msg.from === 'user' ? 'flex-row-reverse' : ''}`}>
                        {msg.from === 'agent' && (
                          <div className="w-7 h-7 rounded-full bg-teal flex items-center justify-center text-white text-xs font-bold shrink-0 self-end">
                            T
                          </div>
                        )}
                        <div
                          className={`px-3.5 py-2.5 rounded-2xl font-inter text-sm max-w-[240px] ${
                            msg.from === 'agent'
                              ? 'bg-white text-charcoal rounded-bl-sm shadow-sm'
                              : 'bg-teal text-white rounded-br-sm'
                          }`}
                        >
                          {msg.text}
                        </div>
                      </div>
                    ))}

                    {/* Typing indicator */}
                    {isTyping && (
                      <div className="flex gap-2 items-end">
                        <div className="w-7 h-7 rounded-full bg-teal flex items-center justify-center text-white text-xs font-bold shrink-0">
                          T
                        </div>
                        <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-sm shadow-sm flex gap-1 items-center">
                          <span className="w-1.5 h-1.5 bg-clay rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                          <span className="w-1.5 h-1.5 bg-clay rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                          <span className="w-1.5 h-1.5 bg-clay rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Chat Input */}
                  <div className="px-4 py-3 bg-white border-t border-cream flex items-center gap-2">
                    <input
                      type="text"
                      value={inputValue}
                      onChange={e => setInputValue(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && handleSend()}
                      placeholder="Type a message..."
                      className="flex-1 font-inter text-sm text-charcoal placeholder:text-clay bg-transparent focus:outline-none"
                    />
                    <button
                      onClick={handleSend}
                      className="w-8 h-8 rounded-full bg-teal hover:bg-teal-dark flex items-center justify-center text-white transition-colors"
                    >
                      <Send size={14} />
                    </button>
                  </div>
                </div>
              )}

              {/* HELP TAB */}
              {activeTab === 'help' && view === 'home' && (
                <div className="p-4 flex flex-col gap-3">
                  <div className="flex items-center gap-2 bg-white rounded-xl px-4 py-3 shadow-sm">
                    <Search size={15} className="text-clay shrink-0" />
                    <input
                      type="text"
                      placeholder="Search for help"
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      className="flex-1 font-inter text-sm text-charcoal placeholder:text-clay bg-transparent focus:outline-none"
                      autoFocus
                    />
                  </div>
                  <div className="flex flex-col">
                    {filteredArticles.map((article, i) => (
                      <button
                        key={i}
                        className="flex items-center justify-between py-3 px-1 border-b border-cream last:border-0 hover:text-teal transition-colors text-left group"
                      >
                        <span className="font-inter text-sm text-charcoal group-hover:text-teal">{article}</span>
                        <ChevronRight size={15} className="text-clay shrink-0 ml-2" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Tab Bar */}
            {view === 'home' && (
              <div className="flex items-center border-t border-cream bg-white shrink-0">
                {([
                  { key: 'home', icon: Home, label: 'Home' },
                  { key: 'messages', icon: MessageCircle, label: 'Messages' },
                  { key: 'help', icon: HelpCircle, label: 'Help' },
                ] as { key: Tab; icon: React.ElementType; label: string }[]).map(({ key, icon: Icon, label }) => (
                  <button
                    key={key}
                    onClick={() => setActiveTab(key)}
                    className={`flex-1 flex flex-col items-center gap-1 py-3 transition-colors duration-300 ease-out ${
                      activeTab === key ? 'text-teal' : 'text-clay hover:text-charcoal'
                    }`}
                  >
                    <Icon size={18} />
                    <span className="font-inter text-xs">{label}</span>
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Close support widget' : 'Open support widget'}
        className="fixed bottom-6 right-6 z-[999] w-14 h-14 rounded-full flex items-center justify-center text-white shadow-lg hover:scale-105 active:scale-95 transition-transform duration-200"
        style={{ background: 'linear-gradient(135deg, #F6941D 0%, #E07E0A 100%)' }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <X size={22} />
            </motion.span>
          ) : (
            <motion.span key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <MessageCircle size={22} />
            </motion.span>
          )}
        </AnimatePresence>
      </button>
    </>
  )
}
