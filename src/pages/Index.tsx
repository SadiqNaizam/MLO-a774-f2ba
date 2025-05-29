import React from 'react';
import MainAppLayout from '@/components/layout/MainAppLayout';
import PageTabs from '@/components/Dashboard/PageTabs';
import LeadsSummaryCard from '@/components/Dashboard/LeadsSummaryCard';
import FunnelChart from '@/components/Dashboard/FunnelChart';
import LeadsTrackingChart from '@/components/Dashboard/LeadsTrackingChart';
import ReasonsLeadsLost from '@/components/Dashboard/ReasonsLeadsLost';
import OtherStatsCard from '@/components/Dashboard/OtherStatsCard';

const IndexPage: React.FC = () => {
  return (
    <MainAppLayout>
      {/* MainAppLayout's children are rendered within a main content area 
          that uses: flex flex-col gap-6. Each top-level element below 
          will be a direct child of that flex container. */}

      {/* Section 1: Page Title and Tabs */}
      {/* This div acts as a single item in the main flex container. */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-semibold text-foreground">Dashboard</h1>
          {/* Note: The "Create" button is globally available in TopHeader. */}
          {/* Note: Date range selectors like "last 6 months" are localized within specific cards 
              (e.g., FunnelChart, LeadsTrackingChart) as per their own implementations. */}
        </div>
        <PageTabs /> {/* PageTabs component handles its own state, defaulting to "Leads" active. */}
      </div>

      {/* Section 2: Leads Summary & Sources (Funnel Count & Sources Chart) */}
      {/* This grid div acts as a single item in the main flex container. */}
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
        <LeadsSummaryCard className="xl:col-span-2" />
        <FunnelChart className="xl:col-span-3" />
      </div>

      {/* Section 3: Leads Tracking Chart */}
      {/* This component acts as a single item in the main flex container. */}
      <LeadsTrackingChart />

      {/* Section 4: Reasons for Leads Lost & Other Data */}
      {/* This grid div acts as a single item in the main flex container. */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ReasonsLeadsLost className="md:col-span-1" />
        <OtherStatsCard className="md:col-span-2" />
      </div>
    </MainAppLayout>
  );
};

export default IndexPage;
