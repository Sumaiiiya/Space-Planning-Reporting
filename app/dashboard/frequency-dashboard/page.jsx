"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ReportFilters } from "@/components/report-filters"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Department colors for consistency across charts
const departmentColors = {
  "Men's Wear": "#4f46e5",
  "Women's Wear": "#ec4899",
  "Kid's Wear": "#f59e0b",
  Accessories: "#10b981",
  Footwear: "#6366f1",
}

// New data with department dimension for measured zones (15 days)
const zonesByDepartment15Days = [
  { name: "Men's Wear", measured: 22, notMeasured: 8, added: 5, removed: 3, totalSpace: 30 },
  { name: "Women's Wear", measured: 18, notMeasured: 12, added: 3, removed: 2, totalSpace: 30 },
  { name: "Kid's Wear", measured: 10, notMeasured: 5, added: 2, removed: 1, totalSpace: 15 },
  { name: "Accessories", measured: 8, notMeasured: 7, added: 1, removed: 1, totalSpace: 15 },
  { name: "Footwear", measured: 7, notMeasured: 3, added: 1, removed: 1, totalSpace: 10 },
]

// New data with department dimension for measured zones (30 days)
const zonesByDepartment30Days = [
  { name: "Men's Wear", measured: 25, notMeasured: 5, added: 8, removed: 5, totalSpace: 30 },
  { name: "Women's Wear", measured: 24, notMeasured: 6, added: 7, removed: 4, totalSpace: 30 },
  { name: "Kid's Wear", measured: 12, notMeasured: 3, added: 4, removed: 2, totalSpace: 15 },
  { name: "Accessories", measured: 10, notMeasured: 5, added: 3, removed: 2, totalSpace: 15 },
  { name: "Footwear", measured: 7, notMeasured: 3, added: 2, removed: 2, totalSpace: 10 },
]

// New data with department dimension for measured fixtures (15 days)
const fixturesByDepartment15Days = [
  { name: "Men's Wear", measured: 120, notMeasured: 80, added: 15, removed: 10, totalFixtures: 200 },
  { name: "Women's Wear", measured: 150, notMeasured: 100, added: 12, removed: 8, totalFixtures: 250 },
  { name: "Kid's Wear", measured: 80, notMeasured: 70, added: 5, removed: 3, totalFixtures: 150 },
  { name: "Accessories", measured: 60, notMeasured: 90, added: 2, removed: 1, totalFixtures: 150 },
  { name: "Footwear", measured: 40, notMeasured: 60, added: 1, removed: 0, totalFixtures: 100 },
]

// New data with department dimension for measured fixtures (30 days)
const fixturesByDepartment30Days = [
  { name: "Men's Wear", measured: 160, notMeasured: 40, added: 25, removed: 15, totalFixtures: 200 },
  { name: "Women's Wear", measured: 200, notMeasured: 50, added: 20, removed: 12, totalFixtures: 250 },
  { name: "Kid's Wear", measured: 100, notMeasured: 50, added: 10, removed: 5, totalFixtures: 150 },
  { name: "Accessories", measured: 90, notMeasured: 60, added: 8, removed: 3, totalFixtures: 150 },
  { name: "Footwear", measured: 70, notMeasured: 30, added: 5, removed: 7, totalFixtures: 100 },
]

// Custom tooltip for stacked/grouped bar charts
const StackedBarTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border border-gray-200 rounded shadow-sm text-xs">
        <p className="font-medium mb-1">{label}</p>
        {payload.map((entry, index) => (
          <p key={`item-${index}`} style={{ color: entry.color }}>
            {`${entry.name}: ${entry.value}`}
          </p>
        ))}
      </div>
    )
  }
  return null
}

export default function FrequencyDashboardPage() {
  const [selectedStore, setSelectedStore] = useState("All Stores")
  const [selectedConcept, setSelectedConcept] = useState("All Concepts")
  const [timeframe, setTimeframe] = useState("15days")

  const handleFilterChange = (filters) => {
    // In a real app, this would call an API with the filters
    console.log("Filters applied:", filters)

    // Update the selected store and concept for display
    if (filters.store && filters.store !== "all") {
      setSelectedStore(
        filters.store === "store-a"
          ? "Store A"
          : filters.store === "store-b"
            ? "Store B"
            : filters.store === "store-c"
              ? "Store C"
              : filters.store === "store-d"
                ? "Store D"
                : "All Stores",
      )
    } else {
      setSelectedStore("All Stores")
    }

    if (filters.concept && filters.concept !== "all") {
      setSelectedConcept(
        filters.concept === "concept-a"
          ? "Concept A"
          : filters.concept === "concept-b"
            ? "Concept B"
            : filters.concept === "concept-c"
              ? "Concept C"
              : "All Concepts",
      )
    } else {
      setSelectedConcept("All Concepts")
    }
  }

  // Get the appropriate data based on the selected timeframe
  const getZonesByDepartment = () => {
    return timeframe === "15days" ? zonesByDepartment15Days : zonesByDepartment30Days
  }

  const getFixturesByDepartment = () => {
    return timeframe === "15days" ? fixturesByDepartment15Days : fixturesByDepartment30Days
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Measurement Frequency Dashboard</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
          <CardDescription>Select a date range, concept, and store to view the dashboard</CardDescription>
        </CardHeader>
        <CardContent>
          <ReportFilters showDateRange={true} onFilterChange={handleFilterChange} />
        </CardContent>
      </Card>

      {/* Timeframe selector */}
      <div className="flex justify-end">
        <Tabs defaultValue="15days" className="w-[400px]" onValueChange={setTimeframe}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="15days">Last 15 Days</TabsTrigger>
            <TabsTrigger value="30days">Last 30 Days</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Summary section */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Zones</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">100</div>
            <p className="text-xs text-muted-foreground">{timeframe === "15days" ? "Last 15 days" : "Last 30 days"}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Fixtures</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">850</div>
            <p className="text-xs text-muted-foreground">{timeframe === "15days" ? "Last 15 days" : "Last 30 days"}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Zones Added/Removed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              +{timeframe === "15days" ? 12 : 24} / -{timeframe === "15days" ? 8 : 15}
            </div>
            <p className="text-xs text-muted-foreground">{timeframe === "15days" ? "Last 15 days" : "Last 30 days"}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Fixtures Added/Removed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              +{timeframe === "15days" ? 35 : 68} / -{timeframe === "15days" ? 22 : 42}
            </div>
            <p className="text-xs text-muted-foreground">{timeframe === "15days" ? "Last 15 days" : "Last 30 days"}</p>
          </CardContent>
        </Card>
      </div>

      {/* Department dimension for zones */}
      <Card>
        <CardHeader>
          <CardTitle>Zones by Department</CardTitle>
          <CardDescription>
            {selectedStore} - {selectedConcept} - {timeframe === "15days" ? "Last 15 Days" : "Last 30 Days"}
          </CardDescription>
        </CardHeader>
        <CardContent className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={getZonesByDepartment()} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip content={<StackedBarTooltip />} />
              <Legend
                wrapperStyle={{
                  fontSize: "10px",
                  paddingTop: "10px",
                }}
              />
              <Bar dataKey="measured" name="Measured" stackId="a" fill="#1876D2" />
              <Bar dataKey="notMeasured" name="Not Measured" stackId="a" fill="#E0E0E0" />
              <Bar dataKey="added" name="Added" stackId="b" fill="#4CAF50" />
              <Bar dataKey="removed" name="Removed" stackId="b" fill="#F44336" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Department dimension for fixtures */}
      <Card>
        <CardHeader>
          <CardTitle>Fixtures by Department</CardTitle>
          <CardDescription>
            {selectedStore} - {selectedConcept} - {timeframe === "15days" ? "Last 15 Days" : "Last 30 Days"}
          </CardDescription>
        </CardHeader>
        <CardContent className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={getFixturesByDepartment()} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip content={<StackedBarTooltip />} />
              <Legend
                wrapperStyle={{
                  fontSize: "10px",
                  paddingTop: "10px",
                }}
              />
              <Bar dataKey="measured" name="Measured" stackId="a" fill="#42A5F5" />
              <Bar dataKey="notMeasured" name="Not Measured" stackId="a" fill="#E0E0E0" />
              <Bar dataKey="added" name="Added" stackId="b" fill="#4CAF50" />
              <Bar dataKey="removed" name="Removed" stackId="b" fill="#F44336" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
