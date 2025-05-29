import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { CalendarDays, ChevronDown } from 'lucide-react';

const leadsTrackingData = [
  { month: 'March', closedWon: 65, closedLost: 50 },
  { month: 'April', closedWon: 50, closedLost: 38 },
  { month: 'May', closedWon: 85, closedLost: 25 },
  { month: 'June', closedWon: 62, closedLost: 5 }, // Significant dip for closedLost
  { month: 'July', closedWon: 75, closedLost: 42 },
  { month: 'August', closedWon: 55, closedLost: 95 }, // Spike for closedLost
];

interface LeadsTrackingChartProps {
  className?: string;
}

const CustomTooltip: React.FC<any> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card p-3 shadow-lg rounded-md border border-border">
        <p className="label text-sm font-medium text-foreground">{`${label}`}</p>
        {payload.map((pld: any, index: number) => (
          <div key={index} style={{ color: pld.stroke }} className="text-xs">
            {`${pld.name}: ${pld.value}`}
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const LeadsTrackingChart: React.FC<LeadsTrackingChartProps> = ({ className }) => {
  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <div className="flex flex-row items-start justify-between">
          <div>
            <CardTitle className="text-lg font-semibold text-foreground">Leads tracking</CardTitle>
            <div className="mt-2 flex items-end space-x-4">
              <div>
                <span className="text-3xl font-bold text-foreground">680</span>
                <span className="ml-1 text-sm text-muted-foreground">total closed</span>
              </div>
              <div>
                <span className="text-3xl font-bold text-foreground">70</span>
                <span className="ml-1 text-sm text-muted-foreground">total lost</span>
              </div>
            </div>
          </div>
          <Button variant="outline" size="sm" className="text-muted-foreground">
            <CalendarDays className="mr-2 h-4 w-4" />
            Last 6 months
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="w-full h-[300px] mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={leadsTrackingData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
              <defs>
                <linearGradient id="colorClosedWon" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0AB39C" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#0AB39C" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorClosedLost" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F06548" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#F06548" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis 
                dataKey="month" 
                tickLine={false} 
                axisLine={false} 
                fontSize={12} 
                stroke="hsl(var(--muted-foreground))"
              />
              <YAxis 
                tickLine={false} 
                axisLine={false} 
                fontSize={12} 
                stroke="hsl(var(--muted-foreground))"
                domain={[0, 'dataMax + 10']}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'hsl(var(--border))', strokeWidth: 1, strokeDasharray: '3 3' }} />
              <Area type="monotone" dataKey="closedWon" name="Closed won" strokeWidth={2} stroke="#0AB39C" fillOpacity={1} fill="url(#colorClosedWon)" dot={{ r: 4, strokeWidth: 2, fill: '#0AB39C', stroke: 'var(--card)' }} activeDot={{ r: 6, strokeWidth: 2, fill: '#0AB39C', stroke: 'var(--card)' }} />
              <Area type="monotone" dataKey="closedLost" name="Closed lost" strokeWidth={2} stroke="#F06548" fillOpacity={1} fill="url(#colorClosedLost)" dot={{ r: 4, strokeWidth: 2, fill: '#F06548', stroke: 'var(--card)' }} activeDot={{ r: 6, strokeWidth: 2, fill: '#F06548', stroke: 'var(--card)' }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 flex justify-center space-x-6 text-sm">
          <div className="flex items-center">
            <span className="w-3 h-3 rounded-sm mr-2 bg-[#0AB39C]"></span>
            <span className="text-muted-foreground">Closed won</span>
          </div>
          <div className="flex items-center">
            <span className="w-3 h-3 rounded-sm mr-2 bg-[#F06548]"></span>
            <span className="text-muted-foreground">Closed lost</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LeadsTrackingChart;
