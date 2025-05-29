import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface FunnelStage {
  id: string;
  name: string;
  count: number;
  value: number;
  avgTime: string;
  color: string;
  showTooltip?: boolean;
}

const funnelData: FunnelStage[] = [
  { id: 'discovery', name: 'Discovery', count: 250, value: 200, avgTime: '2 days', color: 'bg-red-500' },
  { id: 'qualified', name: 'Qualified', count: 150, value: 100, avgTime: '2 days', color: 'bg-yellow-400', showTooltip: true },
  { id: 'inConversation', name: 'In conversation', count: 100, value: 100, avgTime: 'average time on this stage', color: 'bg-indigo-700' },
  { id: 'negotiations', name: 'Negotiations', count: 60, value: 50, avgTime: '8 days', color: 'bg-green-500' },
  { id: 'closedWon', name: 'Closed won', count: 40, value: 50, avgTime: '10 days', color: 'bg-purple-600' },
];

const totalActiveLeads = funnelData.reduce((sum, stage) => sum + stage.count, 0);

interface LeadsSummaryCardProps {
  className?: string;
}

const LeadsSummaryCard: React.FC<LeadsSummaryCardProps> = ({ className }) => {
  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground">Funnel count</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <span className="text-5xl font-bold text-foreground">{totalActiveLeads}</span>
          <span className="ml-2 text-muted-foreground">active leads</span>
        </div>

        <div className="w-full h-3 flex rounded overflow-hidden mb-6">
          {funnelData.map(stage => (
            <div 
              key={stage.id} 
              className={cn("h-full", stage.color)} 
              style={{ width: `${(stage.count / totalActiveLeads) * 100}%` }}
              title={`${stage.name}: ${stage.count}`}
            ></div>
          ))}
        </div>

        <div className="space-y-3">
          {funnelData.map(stage => (
            <div key={stage.id} className="grid grid-cols-[auto_1fr_auto_auto_auto] items-center gap-x-4 text-sm">
              <div className="flex items-center">
                <span className={cn("w-3 h-3 rounded-sm mr-2", stage.color)}></span>
                <span className="text-foreground min-w-[120px]">{stage.name}</span>
              </div>
              <div className="text-right text-muted-foreground">{stage.count}</div>
              <div className="text-right text-muted-foreground min-w-[60px]">${stage.value}</div>
              {stage.showTooltip ? (
                <TooltipProvider delayDuration={100}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="text-right text-muted-foreground min-w-[50px] cursor-default">{stage.avgTime}</div>
                    </TooltipTrigger>
                    <TooltipContent className="bg-gray-800 text-white text-xs p-2 rounded-md">
                      <p>average time on this stage</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ) : (
                <div className={cn("text-right text-muted-foreground min-w-[50px]", stage.id === 'inConversation' && 'opacity-0' )}>{stage.avgTime}</div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default LeadsSummaryCard;
