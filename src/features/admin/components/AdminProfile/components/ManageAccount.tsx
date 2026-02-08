import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";

export default function ManageAccount() {
    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-medium">Account Management</h3>
                <p className="text-sm text-muted-foreground">
                    Update your account settings. Set your preferred language and timezone.
                </p>
            </div>
            <Separator />
            <div className="space-y-6">
                <div className="grid gap-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input id="current-password" type="password" />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input id="new-password" type="password" />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <Input id="confirm-password" type="password" />
                </div>
                <Button>Update Password</Button>
            </div>
            <Separator />
            <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                    <div className="font-medium">Two-factor Authentication</div>
                    <div className="text-sm text-muted-foreground">
                        Add an extra layer of security to your account.
                    </div>
                </div>
                <Switch />
            </div>
            <Separator />
            <div>
                <h3 className="text-lg font-medium text-destructive">Delete Account</h3>
                <p className="text-sm text-muted-foreground mb-4">
                    Permanently remove your Personal Account and all of its contents from the platform. This action is not reversible, so please continue with caution.
                </p>
                <Button
                    variant="outline"
                    className="bg-red-100 text-red-600 hover:bg-red-200 hover:text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/30 dark:border-red-900 transition-colors"
                >
                    Delete Personal Account
                </Button>
            </div>
        </div>
    );
}
