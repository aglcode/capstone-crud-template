import React from 'react';
import * as LucideIcons from 'lucide-react';
import type { LucideProps } from 'lucide-react';

interface IconProps {
  name: keyof typeof LucideIcons;
  className?: string;
}

const Icon: React.FC<IconProps> = ({ name, className = "" }) => {
  const IconComponent = LucideIcons[name] as unknown as React.ComponentType<LucideProps> | undefined;
  if (!IconComponent) {
    return <span className={className}>?</span>;
  }
  return <IconComponent className={className} />;
};

export default Icon;
