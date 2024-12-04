import React, { useState, useMemo } from 'react'
import { 
  PieChart, 
  Pie, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts'
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Mock Data Generation
const generateUserCountryData = () => [
  { country: 'United States', users: 450 },
  { country: 'Brazil', users: 280 },
  { country: 'India', users: 350 },
  { country: 'Germany', users: 220 },
  { country: 'Australia', users: 180 },
  { country: 'Japan', users: 210 }
]

const generateMonthlyAppUsageData = () => [
  { month: 'Jan 2024', hours: 1200, shortName: 'Jan' },
  { month: 'Feb 2024', hours: 1350, shortName: 'Feb' },
  { month: 'Mar 2024', hours: 1100, shortName: 'Mar' },
  { month: 'Apr 2024', hours: 1480, shortName: 'Apr' },
  { month: 'May 2024', hours: 1250, shortName: 'May' },
  { month: 'Jun 2024', hours: 1600, shortName: 'Jun' },
  { month: 'Jul 2024', hours: 1420, shortName: 'Jul' },
  { month: 'Aug 2024', hours: 1300, shortName: 'Aug' },
  { month: 'Sep 2024', hours: 1180, shortName: 'Sep' },
  { month: 'Oct 2024', hours: 1450, shortName: 'Oct' },
  { month: 'Nov 2024', hours: 1550, shortName: 'Nov' },
  { month: 'Dec 2024', hours: 1380, shortName: 'Dec' }
]

const Dashboard: React.FC = () => {
  // State for filters
  const [selectedCountry, setSelectedCountry] = useState<string>('All')
  const [selectedMonth, setSelectedMonth] = useState<string>('All')

  // Generate data
  const userCountryData = generateUserCountryData()
  const monthlyAppUsageData = generateMonthlyAppUsageData()

  // Filtered data logic
  const filteredCountryData = useMemo(() => {
    return selectedCountry !== 'All'
      ? userCountryData.filter(item => item.country === selectedCountry)
      : userCountryData 
  }, [selectedCountry])

  const filteredMonthlyData = useMemo(() => {
    return selectedMonth !== 'All'
      ? monthlyAppUsageData.filter(item => item.month === selectedMonth)
      : monthlyAppUsageData
  }, [selectedMonth])

  return (
    <div className="space-y-6 p-4">
      <div className="flex space-x-4 mb-6">
        {/* Country Filter */}
        <div className="w-1/2">
          <Select 
            onValueChange={(value) => setSelectedCountry(value)}
            value={selectedCountry}
          >
            <SelectTrigger>
              <SelectValue placeholder="Filter by Country" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Countries</SelectItem>
              {userCountryData.map(country => (
                <SelectItem 
                  key={country.country} 
                  value={country.country}
                >
                  {country.country}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Month Filter */}
        <div className="w-1/2">
          <Select 
            onValueChange={(value) => setSelectedMonth(value)}
            value={selectedMonth}
          >
            <SelectTrigger>
              <SelectValue placeholder="Filter by Month" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Months</SelectItem>
              {monthlyAppUsageData.map(month => (
                <SelectItem 
                  key={month.month} 
                  value={month.month}
                >
                  {month.month}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* User by Country Donut Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Users by Country</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={filteredCountryData}
                  dataKey="users"
                  nameKey="country"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  label
                />
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Monthly App Usage Bar Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly App Usage (Hours)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={filteredMonthlyData}>
                <XAxis dataKey="shortName" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="hours" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Dashboard