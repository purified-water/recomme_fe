import { useState } from "react";
import { llmApi } from "@/lib/api/llmApi";
import { MdRocket } from "rocketicons/md";

export const AIChatBox = () => {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!query.trim()) return;
    setIsLoading(true);
    try {
      const { data } = await llmApi.ask(query);
      setResponse(data.result.data.result);
      setQuery("");
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setResponse("Something went wrong. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`${isOpen ? "translate-y" : "translate-y-[calc(100%+8px)]"}`}>
      {/* Chat Header */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="z-50 flex items-center justify-center w-16 h-16 mb-2 rounded-full shadow-2xl cursor-pointer bg-appPrimary hover:bg-appPrimary/80"
      >
        <MdRocket className="icon-xl icon-white" />
      </div>

      {/* Chat Content */}
      {isOpen && (
        <div className="flex flex-col h-full w-[500px] bg-white rounded shadow-lg">
          {/* Response Display */}
          <div className="flex-grow p-3 overflow-auto text-gray-800 rounded-lg bg-gray-50">
            <div className="text-sm">
              <strong>AI:</strong> {isLoading ? "Loading..." : response || "How can I assist you today?"}
            </div>
          </div>

          {/* Input Section */}
          <div className="p-3 bg-gray-100 border-t border-gray-300">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Type your message..."
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={isLoading}
            />
            <button
              onClick={handleSend}
              className="w-full px-4 py-2 mt-2 text-white transition rounded bg-gray1 hover:bg-gray2"
              disabled={isLoading}
            >
              {isLoading ? "Sending..." : "Send"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
