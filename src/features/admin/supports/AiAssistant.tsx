import { useState, useRef, useEffect } from "react";
import {
    Send,
    Bot,
    Search,
    Plus,
    MessageSquare,
    MoreVertical,
    Paperclip
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
}

interface ChatSession {
    id: string;
    title: string;
    date: string;
}

const HISTORY_MOCK: ChatSession[] = [
    { id: '1', title: 'Market Analysis Q3', date: 'Today' },
    { id: '2', title: 'Draft Email to Leads', date: 'Today' },
    { id: '3', title: 'Python Script Help', date: 'Yesterday' },
    { id: '4', title: 'CRM Database Query', date: 'Yesterday' },
];

const INITIAL_MESSAGES: Message[] = [
    {
        id: '1',
        role: 'assistant',
        content: "Hello! I'm your CRM AI Assistant. I can help you analyze your data, draft communications, or manage your leads.\n\nHow can I assist you with your tasks today?",
        timestamp: new Date(Date.now() - 1000 * 60 * 5) // 5 mins ago
    }
];

export default function AiAssistant() {
    const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const scrollAreaRef = useRef<HTMLDivElement>(null);

    const handleSendMessage = () => {
        if (!inputValue.trim()) return;

        const newUserMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: inputValue,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, newUserMessage]);
        setInputValue("");
        setIsTyping(true);

        // Simulate AI response
        setTimeout(() => {
            const newAiMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: "I've received your request. I'm processing the data now to provide you with the best possible answer.",
                timestamp: new Date()
            };
            setMessages(prev => [...prev, newAiMessage]);
            setIsTyping(false);
        }, 1500);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    // Auto-scroll to bottom
    useEffect(() => {
        if (scrollAreaRef.current) {
            const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
            if (scrollContainer) {
                scrollContainer.scrollTop = scrollContainer.scrollHeight;
            }
        }
    }, [messages, isTyping]);

    return (
        <div className="flex h-[calc(100vh-64px)] overflow-hidden bg-background">
            {/* Sidebar - Chat History */}
            <div className="w-80 border-r border-border bg-muted/10 hidden md:flex flex-col">
                <div className="p-4 space-y-4">
                    <Button className="w-full justify-start gap-2" size="lg">
                        <Plus className="w-5 h-5" />
                        New Chat
                    </Button>
                    <div className="relative">
                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Search chats..." className="pl-9 h-9" />
                    </div>
                </div>

                <ScrollArea className="flex-1 px-2">
                    <div className="space-y-6 p-2">
                        {/* Group by Date */}
                        {['Today', 'Yesterday'].map(dateGroup => (
                            <div key={dateGroup} className="space-y-2">
                                <h3 className="px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                    {dateGroup}
                                </h3>
                                <div className="space-y-1">
                                    {HISTORY_MOCK.filter(h => h.date === dateGroup).map(chat => (
                                        <Button
                                            key={chat.id}
                                            variant="ghost"
                                            className="w-full justify-start text-sm font-normal h-auto py-2 px-3 truncate"
                                        >
                                            <MessageSquare className="mr-2 h-4 w-4 shrink-0 opacity-70" />
                                            <span className="truncate">{chat.title}</span>
                                        </Button>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </ScrollArea>

                <div className="p-4 border-t border-border">
                    <div className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                        <Avatar className="h-8 w-8">
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>AM</AvatarFallback>
                        </Avatar>
                        <div className="text-sm">
                            <p className="font-medium leading-none">Alex Morgan</p>
                            <p className="text-muted-foreground text-xs">alex@enterprise.com</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Chat Area */}
            <div className="flex-1 flex flex-col min-w-0 bg-background">
                {/* Chat Header (Mobile only toggle could go here, for now simple title) */}
                <div className="h-14 border-b border-border flex items-center justify-between px-6 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-10">
                    <div className="flex items-center gap-2">
                        <Bot className="h-6 w-6 text-primary" />
                        <div>
                            <h2 className="text-lg font-semibold leading-none">AI Assistant</h2>
                            <p className="text-xs text-muted-foreground">Always here to help</p>
                        </div>
                    </div>
                    <Button variant="ghost" size="icon">
                        <MoreVertical className="h-5 w-5 text-muted-foreground" />
                    </Button>
                </div>

                {/* Messages */}
                <ScrollArea className="flex-1 p-4 md:p-6" ref={scrollAreaRef}>
                    <div className="max-w-3xl mx-auto space-y-6">
                        {messages.map((msg) => (
                            <motion.div
                                key={msg.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={cn(
                                    "flex w-full gap-4",
                                    msg.role === 'user' ? "justify-end" : "justify-start"
                                )}
                            >
                                {msg.role === 'assistant' && (
                                    <Avatar className="h-8 w-8 mt-1 border border-border">
                                        <div className="bg-primary h-full w-full flex items-center justify-center text-primary-foreground">
                                            <Bot className="h-5 w-5" />
                                        </div>
                                    </Avatar>
                                )}

                                <div className={cn(
                                    "flex flex-col max-w-[80%]",
                                    msg.role === 'user' ? "items-end" : "items-start"
                                )}>
                                    <div className={cn(
                                        "rounded-2xl px-5 py-3 shadow-sm",
                                        msg.role === 'user'
                                            ? "bg-primary text-primary-foreground rounded-tr-none"
                                            : "bg-muted text-foreground rounded-tl-none"
                                    )}>
                                        <p className="whitespace-pre-wrap text-sm leading-relaxed">{msg.content}</p>
                                    </div>
                                    <span className="text-[10px] text-muted-foreground mt-1 px-1 opacity-70">
                                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                </div>

                                {msg.role === 'user' && (
                                    <Avatar className="h-8 w-8 mt-1 border border-border">
                                        <AvatarFallback>AM</AvatarFallback>
                                        <AvatarImage src="https://github.com/shadcn.png" />
                                    </Avatar>
                                )}
                            </motion.div>
                        ))}
                        {isTyping && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex w-full gap-4 justify-start"
                            >
                                <Avatar className="h-8 w-8 mt-1 border border-border">
                                    <div className="bg-primary h-full w-full flex items-center justify-center text-primary-foreground">
                                        <Bot className="h-5 w-5" />
                                    </div>
                                </Avatar>
                                <div className="bg-muted text-foreground rounded-2xl rounded-tl-none px-5 py-4 shadow-sm">
                                    <div className="flex gap-1">
                                        <span className="w-1.5 h-1.5 bg-foreground/40 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                        <span className="w-1.5 h-1.5 bg-foreground/40 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                        <span className="w-1.5 h-1.5 bg-foreground/40 rounded-full animate-bounce"></span>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                        <div className="h-4" /> {/* Spacer */}
                    </div>
                </ScrollArea>

                {/* Input Area */}
                <div className="p-4 border-t border-border bg-background">
                    <div className="max-w-3xl mx-auto">
                        <div className="relative flex items-end gap-2 bg-muted/30 p-2 rounded-xl border border-border shadow-sm focus-within:ring-1 focus-within:ring-ring focus-within:border-ring transition-all">
                            <Button variant="ghost" size="icon" className="h-9 w-9 shrink-0 text-muted-foreground hover:text-foreground mb-0.5">
                                <Paperclip className="h-5 w-5" />
                            </Button>
                            <textarea
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Message AI Assistant..."
                                className="flex-1 bg-transparent border-0 focus:ring-0 resize-none max-h-32 min-h-[40px] py-2.5 text-sm"
                                rows={1}
                                style={{ height: 'auto', minHeight: '40px' }} // Simple auto-height hack could go here
                            />
                            <Button
                                onClick={handleSendMessage}
                                disabled={!inputValue.trim() || isTyping}
                                size="icon"
                                className={cn(
                                    "h-9 w-9 shrink-0 mb-0.5 transition-all",
                                    inputValue.trim() ? "translate-x-0 opacity-100" : "translate-x-2 opacity-0 w-0 p-0 overflow-hidden"
                                )}
                            >
                                <Send className="h-4 w-4" />
                            </Button>
                        </div>
                        <p className="text-[10px] text-center text-muted-foreground mt-2">
                            AI can make mistakes. Consider checking important information.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
