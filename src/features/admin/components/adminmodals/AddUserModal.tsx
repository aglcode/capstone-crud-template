import { useState } from "react"
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

interface AddUserModalProps {
    isOpen: boolean
    onClose: () => void
}

export const AddUserModal: React.FC<AddUserModalProps> = ({ isOpen, onClose }) => {
    const [isLoading, setIsLoading] = useState(false)

    const onSubmit = async () => {
        try {
            setIsLoading(true)
            // TODO: Add API call
            setTimeout(() => {
                setIsLoading(false)
                onClose()
            }, 1000)
        } catch (error) {
            console.error(error)
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
                    <Input id="name" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" placeholder="john@example.com" type="email" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Select defaultValue="customer">
                        <SelectTrigger>
                            <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="super_admin">Super Admin</SelectItem>
                            <SelectItem value="admin">Admin</SelectItem>
                            <SelectItem value="customer">Customer</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                    <Button disabled={isLoading} variant="outline" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button disabled={isLoading} onClick={onSubmit}>
                        Continue
                    </Button>
                </div>
            </div>
        </Modal>
    )
}
