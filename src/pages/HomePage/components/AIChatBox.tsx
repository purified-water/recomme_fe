import { useState } from "react";
import { llmApi } from "@/lib/api/llmApi";
import { MdRocket } from "rocketicons/md";

export const AIChatBox = () => {
    const [query, setQuery] = useState("");
    const [response, setResponse] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    const handleSend = async () => {
        if (!query.trim()) return;
        try {
            const { data } = await llmApi.ask(query);
            setResponse(data.result.data.result);
            setQuery("");
        } catch (error) {
            console.error("Error fetching AI response:", error);
            setResponse("Something went wrong. Please try again later.");
        }
    };

    return (
        <div
            className={`${isOpen ? "translate-y-0" : "translate-y-[calc(100%+16px)]"
                }`}
        >
            {/* Chat Header */}
            <div
                onClick={() => setIsOpen(!isOpen)}
            >
                <MdRocket className="icon-xl icon-black" />
            </div>

            {/* Chat Content */}
            {isOpen && (
                <div className="flex flex-col h-full"
                    style={{ width: "300px", maxHeight: "400px" }}
                >
                    {/* Response Display */}
                    <div className="flex-grow p-3 overflow-auto text-gray-800 bg-gray-50">
                        <div className="text-sm">
                            <strong>AI:</strong> {response || "How can I assist you today?"}
                        </div>
                    </div>

                    {/* Input Section */}
                    <div className="p-3 border-t border-gray-300 bg-gray-100">
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Type your message..."
                            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <button
                            onClick={handleSend}
                            className="mt-2 w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
                        >
                            Send
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
