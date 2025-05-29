import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

interface PageTabsProps {
  className?: string;
  onTabChange?: (tab: string) => void;
}

const PageTabs: React.FC<PageTabsProps> = ({ className, onTabChange }) => {
  const [activeTab, setActiveTab] = React.useState<string>('leads');

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    if (onTabChange) {
      onTabChange(value);
    }
  };

  return (
    <Tabs defaultValue="leads" className={cn("w-full", className)} onValueChange={handleTabChange}>
      <TabsList className="bg-transparent p-0">
        <TabsTrigger 
          value="sales"
          className={cn(
            "text-muted-foreground data-[state=active]:text-primary data-[state=active]:shadow-none pb-2 px-4 rounded-none border-b-2 border-transparent data-[state=active]:border-primary",
            "hover:text-primary transition-colors duration-200 ease-in-out text-sm font-medium"
          )}
        >
          Sales
        </TabsTrigger>
        <TabsTrigger 
          value="leads"
          className={cn(
            "text-muted-foreground data-[state=active]:text-primary data-[state=active]:shadow-none pb-2 px-4 rounded-none border-b-2 border-transparent data-[state=active]:border-primary",
            "hover:text-primary transition-colors duration-200 ease-in-out text-sm font-medium"
          )}
        >
          Leads
        </TabsTrigger>
      </TabsList>
      {/* TabsContent would go here if we were rendering different content per tab directly within this component */}
      {/* For this example, we are just showing the tabs themselves based on the image */}
    </Tabs>
  );
};

export default PageTabs;
