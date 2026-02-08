import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { CardDescription } from "@/components/ui/card";

export default function Notifications() {
    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-medium">Notifications</h3>
                <p className="text-sm text-muted-foreground">
                    Configure how you receive notifications.
                </p>
            </div>
            <Separator />
            <div className="space-y-4">
                <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                        <Label className="text-base">Communication emails</Label>
                        <CardDescription>
                            Receive emails about your account activity.
                        </CardDescription>
                    </div>
                    <Switch />
                </div>
                <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                        <Label className="text-base">Marketing emails</Label>
                        <CardDescription>
                            Receive emails about new products, features, and more.
                        </CardDescription>
                    </div>
                    <Switch />
                </div>
                <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                        <Label className="text-base">Social emails</Label>
                        <CardDescription>
                            Receive emails for friend requests, follows, and more.
                        </CardDescription>
                    </div>
                    <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                        <Label className="text-base">Security emails</Label>
                        <CardDescription>
                            Receive emails about your account security.
                        </CardDescription>
                    </div>
                    <Switch defaultChecked />
                </div>
            </div>
        </div>
    );
}
