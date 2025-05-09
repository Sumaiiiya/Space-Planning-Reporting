"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ReportFilters } from "@/components/report-filters"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

// Sample data for the pie charts
const zoneData15Days = [
  { name: "Measured", value: 65, color: "#1876D2" },
  { name: "Not Measured", value: 35, color: "#E0E0E0" },
]

const zoneData30Days = [
  { name: "Measured", value: 78, color: "#1876D2" },
  { name: "Not Measured", value: 22, color: "#E0E0E0" },
]

const fixtureData15Days = [
  { name: "Measured", value: 55, color: "#42A5F5" },
  { name: "Not Measured", value: 45, color: "#E0E0E0" },
]

const fixtureData30Days = [
  { name: "Measured", value: 72, color: "#42A5F5" },
  { name: "Not Measured", value: 28, color: "#E0E0E0" },
]

export default function FrequencyDashboardPage() {
  const [selectedStore, setSelectedStore] = useState<string>("All Stores")
  const [selectedConcept, setSelectedConcept] = useState<string>("All Concepts")

  const handleFilterChange = (filters: any) => {
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

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Zones Measured (Last 15 Days)</CardTitle>
            <CardDescription>
              {selectedStore} - {selectedConcept}
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={zoneData15Days}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {zoneData15Days.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Zones Measured (Last 30 Days)</CardTitle>
            <CardDescription>
              {selectedStore} - {selectedConcept}
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={zoneData30Days}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {zoneData30Days.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Fixtures Measured (Last 15 Days)</CardTitle>
            <CardDescription>
              {selectedStore} - {selectedConcept}
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={fixtureData15Days}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {fixtureData15Days.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Fixtures Measured (Last 30 Days)</CardTitle>
            <CardDescription>
              {selectedStore} - {selectedConcept}
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={fixtureData30Days}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {fixtureData30Days.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
