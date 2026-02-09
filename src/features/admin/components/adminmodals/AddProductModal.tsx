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

interface AddProductModalProps {
    isOpen: boolean
    onClose: () => void
}

export const AddProductModal: React.FC<AddProductModalProps> = ({ isOpen, onClose }) => {
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
            title="Add Product"
            description="Add a new product to your inventory."
            isOpen={isOpen}
            onClose={onClose}
        >
            <div className="space-y-4 py-2 pb-4">
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" placeholder="Product Name" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="model">Model</Label>
                        <Input id="model" placeholder="Model Number" />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="sku">SKU</Label>
                        <Input id="sku" placeholder="SKU-123" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <Input id="category" placeholder="Electronics" />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="price">Price ($)</Label>
                        <Input id="price" type="number" placeholder="0.00" min="0" step="0.01" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="stock">Stock</Label>
                        <Input id="stock" type="number" placeholder="0" min="0" />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select defaultValue="in_stock">
                        <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="in_stock">In Stock</SelectItem>
                            <SelectItem value="low_stock">Low Stock</SelectItem>
                            <SelectItem value="out_of_stock">Out of Stock</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                    <Button disabled={isLoading} variant="outline" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button disabled={isLoading} onClick={onSubmit}>
                        Add Product
                    </Button>
                </div>
            </div>
        </Modal>
    )
}
