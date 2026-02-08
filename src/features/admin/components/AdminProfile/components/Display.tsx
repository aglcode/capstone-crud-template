import { Separator } from "@/components/ui/separator";

export default function Display() {
    const title = "Display";
    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-medium">{title}</h3>
                <p className="text-sm text-muted-foreground">
                    Manage your {title.toLowerCase()} settings.
                </p>
            </div>
            <Separator />
            <div className="flex h-[200px] w-full items-center justify-center rounded-md border border-dashed text-sm text-muted-foreground">
                {title} settings coming soon
            </div>
        </div>
    );
}
