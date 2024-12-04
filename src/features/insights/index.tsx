import React, { useState } from 'react';
import { Progress } from '@/components/ui/progress';
import { X } from 'lucide-react';

interface Insight {
    id: number;
    title: string;
    description: string;
    country: string;
}

const Insights: React.FC  = () => {
  const [insights, setInsights] = useState<Insight[]>([
    {
      id: 1,
      title: 'US User Growth',
      description: 'United States users increased by 12.5% this month',
      country: 'US'
    },
    {
      id: 2, 
      title: 'Monthly Engagement',
      description: 'Average monthly app usage is down 5% from last quarter',
      country: 'Global'
    },
    {
      id: 3,
      title: 'European Market',
      description: 'Significant user growth in Germany and France',
      country: 'EU'
    }
  ]);

  const dismissInsight = (id: number) => {
    setInsights(insights.filter(insight => insight.id !== id));
  };

  return (
    <div className="p-4 space-y-6">
      <div className="bg-white shadow-sm rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-3">2024 User Goal Progress</h2>
        <Progress value={84.5} className="w-full h-4" />
        <div className="text-sm text-gray-600 mt-2">
          84.5% Complete (Target: 100,000 Users)
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-4">Actionable Insights</h2>
        {insights.length === 0 ? (
          <p className="text-gray-500">No active insights</p>
        ) : (
          <div className="space-y-3">
            {insights.map((insight) => (
              <div 
                key={insight.id} 
                className="border rounded-lg p-3 flex justify-between items-left"
              >
                <div>
                  <h3 className="font-medium">{insight.title}</h3>
                  <p className="text-sm text-gray-600">{insight.description}</p>
                  <span className="text-xs text-gray-500 mt-1">
                    Country: {insight.country}
                  </span>
                </div>
                <button 
                  onClick={() => dismissInsight(insight.id)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={20} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Insights;