import { useState } from "react"
import { supabase } from "@/lib/supabase"
import { useToast } from "@/hooks/use-toast"
import { Modal } from "@/components/ui/modals/Modal"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { type UserRole } from "@/types/types"

interface AddUserModalProps {
    isOpen: boolean
    onClose: () => void
    onSuccess?: () => void
}

export const AddUserModal: React.FC<AddUserModalProps> = ({ isOpen, onClose, onSuccess }) => {
    const { toast } = useToast()
    const [isLoading, setIsLoading] = useState(false)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [role, setRole] = useState<UserRole>("Customer")

    const onSubmit = async () => {
        if (!name || !email) {
            toast({
                title: "Validation Error",
                description: "Name and Email are required.",
                variant: "destructive"
            })
            return
        }

        try {
            setIsLoading(true)
            
            const { error } = await supabase
                .from("users")
                .insert([
                    { name, email, role }
                ])

            if (error) throw error

            toast({
                title: "Success",
                description: "User has been added successfully.",
            })

            // Reset form
            setName("")
            setEmail("")
            setRole("Customer")
            
            onSuccess?.()
            onClose()
        } catch (error: any) {
            console.error(error)
            toast({
                title: "Error",
                description: error.message || "Failed to add user.",
                variant: "destructive"
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Modal
            title="Add User"
            description="Add a new user to your organization."
            isOpen={isOpen}
            onClose={onClose}
        >
            <div className="space-y-4 py-2 pb-4">
                <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input 
                        id="name" 
                        placeholder="John Doe" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        disabled={isLoading}
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                        id="email" 
                        placeholder="john@example.com" 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={isLoading}
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Select 
                        value={role} 
                        onValueChange={(value) => setRole(value as UserRole)}
                        disabled={isLoading}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Super Admin">Super Admin</SelectItem>
                            <SelectItem value="Admin">Admin</SelectItem>
                            <SelectItem value="Customer">Customer</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                    <Button disabled={isLoading} variant="outline" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button disabled={isLoading} onClick={onSubmit}>
                        {isLoading ? "Adding..." : "Continue"}
                    </Button>
                </div>
            </div>
        </Modal>
    )
}
