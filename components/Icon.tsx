
import React from 'react';

interface IconProps {
  name: string;
  className?: string;
}

export const Icon: React.FC<IconProps> = ({ name, className }) => {
  return <i data-lucide={name} className={className}></i>;
};
