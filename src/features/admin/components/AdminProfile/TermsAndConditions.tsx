
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
    }
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: { type: "spring" as const, stiffness: 100 }
    }
};

export default function TermsAndConditions() {
    const { toast } = useToast();

    const handleAccept = () => {
        toast({
            title: "Terms Accepted",
            description: "You have successfully accepted the Terms and Conditions.",
        });
    };

    const handleDecline = () => {
        toast({
            title: "Terms Declined",
            description: "You have declined the Terms and Conditions.",
            variant: "destructive",
        });
    };

    return (
        <div className="flex-1 flex flex-col h-full bg-background transition-colors duration-300">
            {/* Header */}
            <header className="flex-shrink-0 px-8 py-6 border-b border-border/40">
                <div className="max-w-4xl mx-auto flex items-center justify-between">
                    <div className="flex flex-col gap-1">
                        <h2 className="text-3xl font-bold tracking-tight text-foreground">Terms and Conditions</h2>
                        <p className="text-muted-foreground text-sm">
                            Legal Center • Last updated: February 9, 2026
                        </p>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div className="flex-1 overflow-hidden">
                <ScrollArea className="h-full">
                    <div className="px-8 pb-16 pt-6">
                        <motion.div
                            className="max-w-4xl mx-auto space-y-8"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            <motion.div variants={itemVariants}>
                                <Card>
                                    <CardContent className="p-8 space-y-8">
                                        <section className="space-y-4">
                                            <h3 className="text-xl font-semibold tracking-tight">01. Acceptance of Terms</h3>
                                            <p className="leading-7 text-muted-foreground">
                                                By accessing or using our CRM platform (the "Service"), you agree to be bound by these Terms and Conditions and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
                                            </p>
                                            <p className="leading-7 text-muted-foreground italic">
                                                "The materials contained in this website are protected by applicable copyright and trademark law. We reserve the right to update these terms at any time without prior notice."
                                            </p>
                                            <p className="leading-7 text-muted-foreground">
                                                Acceptance is confirmed upon the first login or registration of an account on the CRM system. Continuous use of the Service following any changes constitutes your agreement to such modifications.
                                            </p>
                                        </section>

                                        <Separator />

                                        <section className="space-y-4">
                                            <h3 className="text-xl font-semibold tracking-tight">02. Use License</h3>
                                            <p className="leading-7 text-muted-foreground">
                                                Permission is granted to temporarily download one copy of the materials (information or software) on the Legal Center's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
                                            </p>
                                            <ul className="list-disc pl-6 space-y-2 text-muted-foreground leading-7">
                                                <li>Modify or copy the materials;</li>
                                                <li>Use the materials for any commercial purpose, or for any public display (commercial or non-commercial);</li>
                                                <li>Attempt to decompile or reverse engineer any software contained on the Legal Center's website;</li>
                                                <li>Remove any copyright or other proprietary notations from the materials;</li>
                                                <li>Transfer the materials to another person or "mirror" the materials on any other server.</li>
                                            </ul>
                                        </section>

                                        <Separator />

                                        <section className="space-y-4">
                                            <h3 className="text-xl font-semibold tracking-tight">03. Restrictions</h3>
                                            <p className="leading-7 text-muted-foreground">
                                                You are specifically restricted from all of the following:
                                            </p>
                                            <div className="space-y-4 pt-2">
                                                <div>
                                                    <h4 className="font-medium text-foreground">Automated Access</h4>
                                                    <p className="leading-7 text-muted-foreground">
                                                        Using any robot, spider, or other automated device to monitor or copy the service content.
                                                    </p>
                                                </div>
                                                <div>
                                                    <h4 className="font-medium text-foreground">System Integrity</h4>
                                                    <p className="leading-7 text-muted-foreground">
                                                        Engaging in any activity that interferes with or disrupts the Service or connected networks.
                                                    </p>
                                                </div>
                                            </div>
                                        </section>

                                        <Separator />

                                        <section className="space-y-4">
                                            <h3 className="text-xl font-semibold tracking-tight">04. Intellectual Property Rights</h3>
                                            <p className="leading-7 text-muted-foreground">
                                                Other than the content you own, under these Terms, Legal Center and/or its licensors own all the intellectual property rights and materials contained in this Website.
                                            </p>
                                            <p className="leading-7 text-muted-foreground">
                                                <span className="font-medium text-foreground">Proprietary Assets Protected by International Law</span><br />
                                                You are granted limited license only for purposes of viewing the material contained on this Website.
                                            </p>
                                        </section>

                                        <Separator />

                                        <section className="space-y-4">
                                            <h3 className="text-xl font-semibold tracking-tight">05. Limitation of Liability</h3>
                                            <p className="leading-7 text-muted-foreground">
                                                In no event shall Legal Center, nor any of its officers, directors and employees, be held liable for anything arising out of or in any way connected with your use of this Website whether such liability is under contract. Legal Center, including its officers, directors and employees shall not be held liable for any indirect, consequential or special liability arising out of or in any way related to your use of this Website.
                                            </p>
                                        </section>

                                        <Separator />

                                        <section className="space-y-4">
                                            <h3 className="text-xl font-semibold tracking-tight">06. Governing Law & Jurisdiction</h3>
                                            <p className="leading-7 text-muted-foreground">
                                                These Terms will be governed by and interpreted in accordance with the laws of the State of New York, and you submit to the non-exclusive jurisdiction of the state and federal courts located in New York for the resolution of any disputes.
                                            </p>
                                            <p className="leading-7 text-muted-foreground mt-4">
                                                By continuing to use this service, you acknowledge that you have read and understood these terms.
                                            </p>
                                            <p className="text-sm text-muted-foreground mt-8">
                                                © 2023 CRM Legal Center. All rights reserved.
                                            </p>
                                        </section>

                                        <Separator />

                                        <div className="flex flex-col sm:flex-row gap-4 justify-end pt-4">
                                            <Button variant="outline" onClick={handleDecline} className="w-full sm:w-auto">
                                                Decline
                                            </Button>
                                            <Button onClick={handleAccept} className="w-full sm:w-auto">
                                                Accept Terms
                                            </Button>
                                        </div>

                                        <Separator />

                                        <section className="flex flex-col sm:flex-row gap-6 text-sm text-muted-foreground">
                                            <a href="#" className="hover:text-primary hover:underline transition-colors">Privacy Policy</a>
                                            <a href="#" className="hover:text-primary hover:underline transition-colors">Cookie Policy</a>
                                            <a href="#" className="hover:text-primary hover:underline transition-colors">Compliance</a>
                                            <span className="sm:ml-auto">
                                                Need assistance? <a href="mailto:legal@crm-platform.com" className="text-primary hover:underline">legal@crm-platform.com</a>
                                            </span>
                                        </section>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        </motion.div>
                    </div>
                </ScrollArea>
            </div>
        </div>
    );
}
