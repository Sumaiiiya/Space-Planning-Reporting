"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ReportFilters } from "@/components/report-filters"
import { DataTable } from "@/components/data-table"
import { downloadCSV, downloadExcel } from "@/lib/export-utils"

// Sample data with the new fields
const sampleData = Array.from({ length: 10 }).map((_, i) => ({
  storeName: `Store ${String.fromCharCode(65 + i)}`,
  // New fields
  group: `Group ${Math.floor(i / 3) + 1}`,
  department: `Department ${Math.floor(i / 2) + 1}`,
  class: `Class ${Math.floor(i / 4) + 1}`,
  subclass: `Subclass ${(i % 3) + 1}`,
  // Existing fields
  totalZones: Math.floor(Math.random() * 20) + 10,
  totalFixtureKeys: Math.floor(Math.random() * 100) + 50,
  zonesMeasuredLast15Days: Math.floor(Math.random() * 15) + 5,
  percentageFixturesMeasuredLast30Days: Number.parseFloat((Math.random() * 100).toFixed(1)),
  percentageZonesMeasuredLast30Days: Number.parseFloat((Math.random() * 100).toFixed(1)),
  averageRefreshInMonth: Number.parseFloat((Math.random() * 5 + 1).toFixed(1)),
}))

// Helper function to determine color based on percentage
function getColorClass(percentage) {
  if (percentage >= 80) return "text-green-600 font-medium"
  if (percentage >= 50) return "text-amber-600 font-medium"
  return "text-red-600 font-medium"
}

// Define columns for the data table with the new columns
const columns = [
  {
    accessorKey: "storeName",
    header: "Store Name",
  },
  // New columns
  {
    accessorKey: "group",
    header: "Group",
  },
  {
    accessorKey: "department",
    header: "Department",
  },
  {
    accessorKey: "class",
    header: "Class",
  },
  {
    accessorKey: "subclass",
    header: "Subclass",
  },
  // Existing columns
  {
    accessorKey: "totalZones",
    header: "Total Zones",
  },
  {
    accessorKey: "totalFixtureKeys",
    header: "Total Fixture Keys",
  },
  {
    accessorKey: "zonesMeasuredLast15Days",
    header: "Zones Measured (Last 15 Days)",
  },
  {
    accessorKey: "percentageFixturesMeasuredLast30Days",
    header: "Fixtures Measured (Last 30 Days)",
    cell: ({ row }) => (
      <div className={getColorClass(row.getValue("percentageFixturesMeasuredLast30Days"))}>
        {row.getValue("percentageFixturesMeasuredLast30Days")}%
      </div>
    ),
  },
  {
    accessorKey: "percentageZonesMeasuredLast30Days",
    header: "Zones Measured (Last 30 Days)",
    cell: ({ row }) => (
      <div className={getColorClass(row.getValue("percentageZonesMeasuredLast30Days"))}>
        {row.getValue("percentageZonesMeasuredLast30Days")}%
      </div>
    ),
  },
  {
    accessorKey: "averageRefreshInMonth",
    header: "Average Refresh in a Month",
  },
]

export default function MeasurementFrequencyPage() {
  const [filteredData, setFilteredData] = useState(sampleData)

  const handleFilterChange = (filters) => {
    // In a real app, this would call an API with the filters
    console.log("Filters applied:", filters)
    // For demo, we'll just use the sample data
    setFilteredData(sampleData)
  }

  const handleDownload = (format) => {
    const filename = `MeasurementFrequencyReport_${new Date().toISOString().split("T")[0]}`

    if (format === "csv") {
      downloadCSV(filteredData, filename)
    } else {
      downloadExcel(filteredData, filename)
    }
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Measurement Frequency Report</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
          <CardDescription>Select a date range, concept, and store to view measurement frequency data</CardDescription>
        </CardHeader>
        <CardContent>
          <ReportFilters showDateRange={true} onFilterChange={handleFilterChange} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Measurement Frequency Data</CardTitle>
          <CardDescription>Showing measurement frequency data based on selected filters</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={filteredData} searchColumn="storeName" onDownload={handleDownload} />
        </CardContent>
      </Card>
    </div>
  )
}
