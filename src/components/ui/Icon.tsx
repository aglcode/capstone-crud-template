import React from 'react';
import * as LucideIcons from 'lucide-react';

interface IconProps {
  name: string;
  className?: string;
}

const Icon: React.FC<IconProps> = ({ name, className = "" }) => {
  const IconComponent = (LucideIcons as any)[name];
  if (!IconComponent) {
    return <span className={className}>?</span>;
  }
  return <IconComponent className={className} />;
};

export default Icon;
