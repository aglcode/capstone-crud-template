import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Profile() {
    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-medium">Profile</h3>
                <p className="text-sm text-muted-foreground">
                    This is how others will see you on the site.
                </p>
            </div>
            <Separator />
            <div className="space-y-4">
                <div className="flex items-center gap-x-4">
                    <Avatar className="h-20 w-20">
                        <AvatarImage src="https://lh3.googleusercontent.com/aida-public/AB6AXuA1XV9LbQz7NaXltmIL7-9B0ZOjXbXeEffD5WstMrNvWiNsTct3iY3c_c8dBZXAHzuxiPo5czNcSWU9SW32UROKarGO8sXGWx68h1W0pm0xESjGjiUJ1nZ4SsBf0jAMZbQ_OvVIPDn4qNlVxBkXM6Uv6mgp7fDCyMIQeARzVTHvgrgRrExzYFNikVo_8PR3uqZTr7DsOKF8ZNiKz8wiBNyVsEthT1wKcpdcJvxS8GVOpD-9gSdauTTdAO34g5Z7jwbDWCk97UTLNcat" />
                        <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <Button variant="outline" size="sm">
                        Change Avatar
                    </Button>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input id="username" placeholder="jdoe" defaultValue="angelo_almonte" />
                    <p className="text-[0.8rem] text-muted-foreground">
                        This is your public display name.
                    </p>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" placeholder="example@gmail.com" defaultValue="angelo@example.com" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                        id="bio"
                        placeholder="Tell us a little bit about yourself"
                        className="resize-none"
                    />
                    <p className="text-[0.8rem] text-muted-foreground">
                        You can <span>@mention</span> other users and organizations.
                    </p>
                </div>
                <Button>Update profile</Button>
            </div>
        </div>
    );
}
