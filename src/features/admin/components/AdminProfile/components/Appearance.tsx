import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useTheme } from "@/components/theme-provider";
import { cn } from "@/lib/utils";

export default function Appearance() {
    const { setTheme, theme } = useTheme();

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-medium">Appearance</h3>
                <p className="text-sm text-muted-foreground">
                    Customize the appearance of the app. Automatically switch between day and night themes.
                </p>
            </div>
            <Separator />
            <div className="space-y-4">
                <div className="space-y-2">
                    <Label>Theme</Label>
                    <p className="text-[0.8rem] text-muted-foreground">
                        Select the theme for the dashboard.
                    </p>
                    <div className="grid max-w-md grid-cols-2 gap-8 pt-2">
                        <div className="space-y-2" onClick={() => setTheme("light")}>
                            <div className={cn("items-center rounded-md border-2 border-muted p-1 hover:border-accent cursor-pointer", theme === 'light' && "border-primary")}>
                                <div className="space-y-2 rounded-sm bg-[#ecedef] p-2">
                                    <div className="space-y-2 rounded-md bg-white p-2 shadow-sm">
                                        <div className="h-2 w-[80px] rounded-lg bg-[#ecedef]" />
                                        <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                                    </div>
                                    <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                                        <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
                                        <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                                    </div>
                                    <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                                        <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
                                        <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                                    </div>
                                </div>
                            </div>
                            <span className="block w-full p-2 text-center font-normal">Light</span>
                        </div>
                        <div className="space-y-2" onClick={() => setTheme("dark")}>
                            <div className={cn("items-center rounded-md border-2 border-muted p-1 hover:border-accent cursor-pointer", theme === 'dark' && "border-primary")}>
                                <div className="space-y-2 rounded-sm bg-slate-950 p-2">
                                    <div className="space-y-2 rounded-md bg-slate-800 p-2 shadow-sm">
                                        <div className="h-2 w-[80px] rounded-lg bg-slate-400" />
                                        <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                                    </div>
                                    <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
                                        <div className="h-4 w-4 rounded-full bg-slate-400" />
                                        <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                                    </div>
                                    <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
                                        <div className="h-4 w-4 rounded-full bg-slate-400" />
                                        <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                                    </div>
                                </div>
                            </div>
                            <span className="block w-full p-2 text-center font-normal">Dark</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
