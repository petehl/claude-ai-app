import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
// import Dashboard from '@/features/dashboard';

const ThreeTabNavigation = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="max-w-2xl mx-auto p-4">
      <Tabs 
        defaultValue="dashboard" 
        value={activeTab} 
        onValueChange={setActiveTab}
        className="w-full"
      >
        {/* Tab Navigation */}
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        {/* Tab Content */}
        <TabsContent value="dashboard" className="mt-4">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
            <p>Welcome to your main dashboard. Here you can view key metrics and overview.</p>
           {/* < Dashboard /> */}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="mt-4">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Analytics</h2>
            <p>Dive deep into your data and performance metrics.</p>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="mt-4">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Settings</h2>
            <p>Configure your application preferences and account settings.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ThreeTabNavigation;