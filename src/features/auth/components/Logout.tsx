import { useNavigate } from '@tanstack/react-router';
import { useState } from "react";
import { supabase } from "../../../lib/supabase";
import { Button } from "../../../components/ui/button";
import { LogOut } from "lucide-react";

export default function Logout() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const handleLogout = async () => {
        try {
            setIsLoading(true);

            const { error } = await supabase.auth.signOut();
            if (error) throw error;

            localStorage.removeItem('authToken');
            localStorage.removeItem('userRole');

            navigate({ to: '/login' });
        } catch (err) {
            console.error('Error logigng out', err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Button
            variant='ghost'
            className='w-full justify-start text-red-500 hover:text-600 hover:bg-red-50'
            onClick={handleLogout}
            disabled={isLoading}
        >
            <LogOut className='mr-2 h-4 w-4' />
            {isLoading ? 'Logging out...' : 'Log out'}
        </Button>
    )
}