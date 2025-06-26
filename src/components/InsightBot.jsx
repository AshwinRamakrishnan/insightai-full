// File: src/components/InsightBot.jsx
import React, { useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useDataContext } from '../context/DataContext';
import { X, SendHorizonal, Bot } from 'lucide-react';

const genAI = new GoogleGenerativeAI("AIzaSyDFF0qlHYRFm0U9wKX5iLfuuMKfnvTw1Qs"); // 🔐 Replace with your working Gemini API Key

const InsightBot = () => {
  const { csvData } = useDataContext();
  const [input, setInput] = useState("");
  const [responses, setResponses] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleAsk = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    setResponses(prev => [...prev, { type: 'user', text: userMessage }]);
    setInput("");
    setIsLoading(true);

    if (!csvData.length) {
      setResponses(prev => [...prev, { type: 'error', text: "📂 Please upload CSV data first." }]);
      setIsLoading(false);
      return;
    }

     const summary = JSON.stringify(csvData);
    const prompt = `
You are an AI assistant that ONLY responds based on the uploaded CSV data.
Creator: Ashwin from FUTECX.
If the question is unrelated, reply: "Sorry, I can only assist with the uploaded CSV insights."

CSV DATA:
${summary}

QUESTION:
${userMessage}
    `;

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent(prompt);
      const response = result.response.text();

      setResponses(prev => [...prev, { type: 'bot', text: response }]);
    } catch (err) {
      setResponses(prev => [...prev, { type: 'error', text: "❌ Error: Please check your API Key or input." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Toggle Icon */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 right-4 z-50 bg-indigo-600 text-white p-3 rounded-full shadow-xl hover:bg-indigo-700"
        >
          <Bot size={22} />
        </button>
      )}

      {/* Chat Popup */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 w-[340px] md:w-[400px] bg-white dark:bg-gray-900 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 z-50 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-3 bg-indigo-600 text-white rounded-t-xl">
            <h2 className="text-sm font-semibold">🤖 Insight Assistant</h2>
            <button onClick={() => setIsOpen(false)}>
              <X size={20} />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="h-64 overflow-y-auto p-3 space-y-3 text-sm bg-white dark:bg-gray-900">
            {responses.map((res, i) => (
              <div
                key={i}
                className={`
                  px-3 py-2 max-w-[80%] rounded-lg whitespace-pre-wrap leading-relaxed 
                  ${res.type === 'user' ? 'bg-indigo-500 text-white self-end ml-auto' : ''}
                  ${res.type === 'bot' ? 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white self-start' : ''}
                  ${res.type === 'error' ? 'bg-red-100 text-red-800 dark:bg-red-700 dark:text-white self-start' : ''}
                `}
              >
                {res.text}
              </div>
            ))}
            {isLoading && (
              <div className="text-xs text-gray-400">⏳ Thinking...</div>
            )}
          </div>

          {/* Input Section */}
          <div className="flex items-center gap-2 p-3 border-t dark:border-gray-700 bg-white dark:bg-gray-900">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
              placeholder="Ask about uploaded data..."
              className="flex-1 px-3 py-2 rounded-lg border dark:border-gray-600 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none text-sm"
            />
            <button
              onClick={handleAsk}
              disabled={!input.trim()}
              className="p-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg disabled:opacity-50"
            >
              <SendHorizonal size={18} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default InsightBot;
