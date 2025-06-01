import React from 'react';

interface InventoryStatusProps {
  current: number;
  minimum: number;
  showText?: boolean;
}

const InventoryStatus: React.FC<InventoryStatusProps> = ({ current, minimum, showText = true }) => {
  // Calculate percentage of current to minimum
  const percentage = (current / minimum) * 100;
  
  let statusColor = '';
  let statusText = '';
  
  if (percentage <= 80) {
    statusColor = 'bg-error';
    statusText = 'منخفض';
  } else if (percentage <= 120) {
    statusColor = 'bg-warning';
    statusText = 'متوسط';
  } else {
    statusColor = 'bg-success';
    statusText = 'جيد';
  }
  
  return (
    <div className="flex items-center">
      <div className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: statusColor.replace('bg-', '').startsWith('#') ? statusColor.replace('bg-', '') : '' }}></div>
      {showText && <span className="text-sm font-medium" style={{ color: statusColor.replace('bg-', '').startsWith('#') ? statusColor.replace('bg-', '') : '' }}>{statusText}</span>}
    </div>
  );
};

export default InventoryStatus;