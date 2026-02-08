import React from 'react';
import { cn } from '@/lib/utils';

interface LogoProps {
    className?: string;
    size?: number;
}

export const Logo: React.FC<LogoProps> = ({ className, size = 20 }) => {
    return (
        <div className={cn("bg-primary text-primary-foreground rounded-md p-1 flex items-center justify-center", className)} style={{ width: size + 8, height: size + 8 }}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={size}
                height={size}
                fill="none"
                viewBox="0 0 256 256"
            >
                <path d="M 128 192 C 92.654 192 64 220.654 64 256 L 0 256 C 0 185.308 57.308 128 128 128 Z M 256 128 C 256 198.692 198.692 256 128 256 L 128 192 C 163.346 192 192 163.346 192 128 Z M 128 64 C 92.654 64 64 92.654 64 128 L 0 128 C 0 57.308 57.308 0 128 0 Z M 256 0 C 256 70.692 198.692 128 128 128 L 128 64 C 163.346 64 192 35.346 192 0 Z" fill="currentColor"></path>
            </svg>
        </div>
    );
};
