import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ReasonLost {
  id: string;
  percentage: number;
  reason: string;
}

const reasonsData: ReasonLost[] = [
  { id: 'proposal', percentage: 40, reason: 'The proposal is unclear' },
  { id: 'competitor', percentage: 20, reason: 'Competitor chosen' }, // Changed from 'However venture pursuit'
  { id: 'other', percentage: 10, reason: 'Other' },
  { id: 'budget', percentage: 30, reason: 'Lack of budget' }, // Changed from duplicate 'The proposal is unclear'
];

interface ReasonsLeadsLostProps {
  className?: string;
}

const ReasonsLeadsLost: React.FC<ReasonsLeadsLostProps> = ({ className }) => {
  // Reorder for 2x2 grid as seen in image (40% top-left, 20% top-right, 10% bottom-left, 30% bottom-right)
  const orderedReasons: ReasonLost[] = [
    reasonsData.find(r => r.id === 'proposal')!,
    reasonsData.find(r => r.id === 'competitor')!,
    reasonsData.find(r => r.id === 'other')!,
    reasonsData.find(r => r.id === 'budget')!,
  ];

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground">Reasons of leads lost</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-x-8 gap-y-6">
          {orderedReasons.map(item => (
            <div key={item.id}>
              <p className="text-3xl font-bold text-foreground">{item.percentage}%</p>
              <p className="text-sm text-muted-foreground mt-1">{item.reason}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ReasonsLeadsLost;
