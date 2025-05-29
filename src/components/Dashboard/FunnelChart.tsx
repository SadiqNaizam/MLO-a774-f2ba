import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import { CalendarDays, ChevronDown } from 'lucide-react';

interface SourceData {
  name: string;
  value: number;
  percentage: number;
  color: string;
  showTooltip?: boolean;
}

const funnelSourcesData: SourceData[] = [
  { name: 'Clutch', value: 3000, percentage: 50, color: 'hsl(var(--prd-accent-orange))' }, // #FD7E14
  { name: 'Behance', value: 1000, percentage: 25, color: 'hsl(var(--prd-accent-yellow))' }, // #FFC107 (Adjusted percentage for sum to 100)
  { name: 'Instagram', value: 1500, percentage: 15, color: 'hsl(var(--prd-accent-green))' }, // #0AB39C (Adjusted percentage)
  { name: 'Dribbble', value: 500, percentage: 10, color: '#6366F1', showTooltip: true }, // Using a Tailwind Indigo for Dribbble as it's distinct
];
// Recalculate total for percentages if necessary, here assuming percentages are direct inputs for display simplicity.
// To make it dynamic: const totalValue = funnelSourcesData.reduce((sum, item) => sum + item.value, 0);
// Then percentage: (item.value / totalValue) * 100

interface FunnelChartProps {
  className?: string;
}

const FunnelChart: React.FC<FunnelChartProps> = ({ className }) => {
  const [activeTab, setActiveTab] = React.useState<string>('leadsConverted');

  const tabs = [
    { id: 'leadsCame', label: 'Leads came' },
    { id: 'leadsConverted', label: 'Leads Converted' },
    { id: 'totalDealsSize', label: 'Total deals size' },
  ];

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold text-foreground">Sources</CardTitle>
        <Button variant="outline" size="sm" className="ml-auto text-muted-foreground">
          <CalendarDays className="mr-2 h-4 w-4" />
          Last 6 months
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-6 items-center">
          <div className="w-full h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={funnelSourcesData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  innerRadius={60} // For Donut chart
                  fill="#8884d8"
                  dataKey="value"
                  stroke="var(--card)" // Add border between slices
                  strokeWidth={2}
                >
                  {funnelSourcesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                {/* <Tooltip /> No default recharts tooltip as custom legend is used */}
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-3">
            {funnelSourcesData.map(source => (
              <div key={source.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <span style={{ backgroundColor: source.color }} className="w-3 h-3 rounded-sm mr-2"></span>
                  <span className="text-foreground">{source.name}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-muted-foreground mr-4 min-w-[60px] text-right">${source.value.toLocaleString()}</span>
                  {source.showTooltip ? (
                     <TooltipProvider delayDuration={100}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span className="text-foreground font-medium min-w-[30px] text-right cursor-default">{source.percentage}%</span>
                          </TooltipTrigger>
                          <TooltipContent className="bg-gray-800 text-white text-xs p-2 rounded-md">
                            <p>from leads total</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                  ) : (
                    <span className="text-foreground font-medium min-w-[30px] text-right">{source.percentage}%</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-6 flex items-center justify-start space-x-1 border-b border-border">
          {tabs.map(tab => (
            <Button
              key={tab.id}
              variant="ghost"
              size="sm"
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "px-3 py-1.5 rounded-t-md rounded-b-none text-sm font-medium",
                activeTab === tab.id 
                  ? 'border-b-2 border-primary text-primary bg-muted'
                  : 'text-muted-foreground hover:text-primary'
              )}
            >
              {tab.label}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default FunnelChart;
