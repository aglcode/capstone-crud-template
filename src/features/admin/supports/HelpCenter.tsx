import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion, type Variants } from "framer-motion";
import {
    Search,
    BookOpen,
    CreditCard,
    Code,
    Users,
    Shield,
    Puzzle,
    ChevronRight,
    MessageCircle,
    Mail,
    ExternalLink,
    FileText
} from "lucide-react";

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            type: "spring",
            stiffness: 100
        }
    }
};

const categories = [
    {
        title: "Getting Started",
        description: "Learn the basics of the dashboard, user setup, and initial configuration.",
        icon: BookOpen,
        color: "text-blue-500",
        bg: "bg-blue-500/10"
    },
    {
        title: "Account & Billing",
        description: "Manage your subscription, view invoices, and update payment methods.",
        icon: CreditCard,
        color: "text-green-500",
        bg: "bg-green-500/10"
    },
    {
        title: "API Reference",
        description: "Comprehensive developer documentation, endpoints, and integration guides.",
        icon: Code,
        color: "text-purple-500",
        bg: "bg-purple-500/10"
    },
    {
        title: "User Management",
        description: "Invite team members, assign roles, and manage access permissions.",
        icon: Users,
        color: "text-orange-500",
        bg: "bg-orange-500/10"
    },
    {
        title: "Security & Privacy",
        description: "Configure 2FA, review audit logs, and understand our data policies.",
        icon: Shield,
        color: "text-red-500",
        bg: "bg-red-500/10"
    },
    {
        title: "Integrations",
        description: "Connect Nexus CRM with your favorite tools like Slack, Jira, and Gmail.",
        icon: Puzzle,
        color: "text-cyan-500",
        bg: "bg-cyan-500/10"
    }
];

const popularArticles = [
    { title: "How to reset your password", tags: ["Account", "Security"] },
    { title: "Exporting customer data to CSV", tags: ["Data", "Export"] },
    { title: "Setting up custom webhooks", tags: ["API", "Developers"] },
    { title: "Understanding role-based access control", tags: ["Users", "Security"] },
];

export default function HelpCenter() {
    return (
        <ScrollArea className="h-full w-full">
            <div className="min-h-screen bg-background pb-12">
                {/* Hero / Search Section */}
                <div className="bg-muted/30 border-b border-border/40 py-16 px-8">
                    <motion.div
                        className="container mx-auto max-w-4xl text-center space-y-6"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h1 className="text-4xl font-bold tracking-tight">How can we help you?</h1>
                        <p className="text-xl text-muted-foreground">
                            Search our knowledge base or browse categories below.
                        </p>
                        <div className="relative max-w-2xl mx-auto mt-8">
                            <Search className="absolute left-4 top-3.5 h-5 w-5 text-muted-foreground" />
                            <Input
                                placeholder="Search for articles, guides, and docs..."
                                className="h-12 pl-12 text-lg shadow-sm"
                            />
                        </div>
                    </motion.div>
                </div>

                <div className="container mx-auto px-8 py-12 space-y-16">
                    {/* Categories Grid */}
                    <motion.div
                        className="space-y-6"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-semibold tracking-tight">Browse by Category</h2>
                        </div>
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {categories.map((category, index) => (
                                <motion.div key={index} variants={itemVariants}>
                                    <Card className="h-full hover:shadow-md transition-shadow cursor-pointer group border-border/60">
                                        <CardHeader>
                                            <div className={`w-12 h-12 rounded-lg ${category.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                                                <category.icon className={`h-6 w-6 ${category.color}`} />
                                            </div>
                                            <CardTitle className="group-hover:text-primary transition-colors">
                                                {category.title}
                                            </CardTitle>
                                            <CardDescription className="text-base pt-2">
                                                {category.description}
                                            </CardDescription>
                                        </CardHeader>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Popular Articles & Support */}
                    <motion.div
                        className="grid gap-8 md:grid-cols-3"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                    >
                        {/* Popular Articles List */}
                        <div className="md:col-span-2 space-y-6">
                            <h2 className="text-2xl font-semibold tracking-tight">Popular Articles</h2>
                            <div className="grid gap-4">
                                {popularArticles.map((article, index) => (
                                    <motion.div key={index} variants={itemVariants}>
                                        <Card className="hover:bg-muted/30 transition-colors cursor-pointer border-border/60">
                                            <div className="p-4 flex items-center justify-between">
                                                <div className="flex items-center gap-4">
                                                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                                                        <FileText className="h-4 w-4 text-primary" />
                                                    </div>
                                                    <div>
                                                        <h3 className="font-medium">{article.title}</h3>
                                                        <div className="flex gap-2 mt-1">
                                                            {article.tags.map(tag => (
                                                                <span key={tag} className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                                                                    {tag}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                                <ChevronRight className="h-5 w-5 text-muted-foreground" />
                                            </div>
                                        </Card>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Contact Support */}
                        <motion.div variants={itemVariants} className="space-y-6">
                            <h2 className="text-2xl font-semibold tracking-tight">Still need help?</h2>
                            <Card className="bg-primary text-primary-foreground border-none">
                                <CardHeader>
                                    <CardTitle className="text-xl">Contact Support</CardTitle>
                                    <CardDescription className="text-primary-foreground/80">
                                        Our team is available 24/7 to assist you.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <Button variant="secondary" className="w-full text-primary font-semibold">
                                        <MessageCircle className="mr-2 h-4 w-4" />
                                        Start a Chat
                                    </Button>
                                    <Button variant="outline" className="w-full border-primary-foreground/20 hover:bg-primary-foreground/10 hover:text-primary-foreground text-primary-foreground">
                                        <Mail className="mr-2 h-4 w-4" />
                                        Email Support
                                    </Button>
                                    <div className="pt-4 mt-4 border-t border-primary-foreground/20">
                                        <div className="flex items-center justify-between text-sm text-primary-foreground/80">
                                            <span>Values</span>
                                            <ExternalLink className="h-4 w-4" />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </ScrollArea>
    );
}
