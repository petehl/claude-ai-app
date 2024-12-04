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
  ResponsiveContainer, 
  Cell
} from 'recharts'
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

// Custom color palette
const COLORS = [
  '#0088FE',  // Blue
  '#00C49F',  // Teal
  '#FFBB28',  // Yellow
  '#FF8042',  // Orange
  '#8884D8',  // Purple
  '#FF4D4D',  // Red
]

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
  const [selectedCountries, setSelectedCountries] = useState<string[]>([])
  const [selectedMonth, setSelectedMonth] = useState<string>('All')

  // Generate data
  const userCountryData = generateUserCountryData()
  const monthlyAppUsageData = generateMonthlyAppUsageData()

  // Add country to selection
  const handleAddCountry = (country: string) => {
    if (!selectedCountries.includes(country)) {
      setSelectedCountries([...selectedCountries, country])
    }
  }

  // Remove country from selection
  const handleRemoveCountry = (country: string) => {
    setSelectedCountries(selectedCountries.filter(c => c !== country))
  }

  // Filtered data logic
  const filteredCountryData = useMemo(() => {
    return selectedCountries.length > 0
      ? userCountryData.filter(item => selectedCountries.includes(item.country))
      : userCountryData
  }, [selectedCountries])

  const filteredMonthlyData = useMemo(() => {
    return selectedMonth !== 'All'
      ? monthlyAppUsageData.filter(item => item.month === selectedMonth)
      : monthlyAppUsageData
  }, [selectedMonth])

  // Calculate total users for selected countries
  const totalSelectedUsers = useMemo(() => {
    return filteredCountryData.reduce((sum, country) => sum + country.users, 0)
  }, [filteredCountryData])

  return (
    <div className="space-y-6 p-4">
      <div className="flex space-x-4 mb-6">
        {/* Country Filter */}
        <div className="w-1/2">
          <div className="mb-2 flex flex-wrap gap-2">
            {selectedCountries.map(country => (
              <Badge 
                key={country} 
                variant="secondary" 
                className="flex items-center"
              >
                {country}
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="ml-2 h-4 w-4"
                  onClick={() => handleRemoveCountry(country)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            ))}
          </div>
          <Select 
            onValueChange={(value) => {
              if (value && !selectedCountries.includes(value)) {
                handleAddCountry(value)
              }
            }}
            value=""
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Countries" />
            </SelectTrigger>
            <SelectContent>
              {userCountryData
                .filter(country => !selectedCountries.includes(country.country))
                .map(country => (
                  <SelectItem 
                    key={country.country} 
                    value={country.country}
                  >
                    {country.country} ({country.users} users)
                  </SelectItem>
                ))
              }
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

      {/* Total Users Display */}
      {selectedCountries.length > 0 && (
        <div className="mb-4 text-center">
          <p className="text-xl font-semibold">
            Total Users in Selected Countries: {totalSelectedUsers}
          </p>
        </div>
      )}

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
                  innerRadius={60}  // Creates donut effect
                  outerRadius={100}
                  fill="#8884d8"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  // labelStyle={{ fontSize: '80%' }}
                >
                  {filteredCountryData.map((entry, index) => (
                    <Cell 
                      key={`cell-${entry.country}`} 
                      fill={COLORS[index % COLORS.length]} 
                    />
                  ))}
                </Pie>
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