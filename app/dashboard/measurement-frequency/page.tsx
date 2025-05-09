"use client"

import { useState } from "react"
import type { ColumnDef } from "@tanstack/react-table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ReportFilters } from "@/components/report-filters"
import { DataTable } from "@/components/data-table"
import { downloadCSV, downloadExcel } from "@/lib/export-utils"

// Sample data structure based on PRD
interface FrequencyData {
  storeName: string
  totalZones: number
  totalFixtureKeys: number
  zonesMeasuredLast15Days: number
  percentageFixturesMeasuredLast30Days: number
  percentageZonesMeasuredLast30Days: number
  averageRefreshInMonth: number
}

// Sample data
const sampleData: FrequencyData[] = Array.from({ length: 10 }).map((_, i) => ({
  storeName: `Store ${String.fromCharCode(65 + i)}`,
  totalZones: Math.floor(Math.random() * 20) + 10,
  totalFixtureKeys: Math.floor(Math.random() * 100) + 50,
  zonesMeasuredLast15Days: Math.floor(Math.random() * 15) + 5,
  percentageFixturesMeasuredLast30Days: Number.parseFloat((Math.random() * 100).toFixed(1)),
  percentageZonesMeasuredLast30Days: Number.parseFloat((Math.random() * 100).toFixed(1)),
  averageRefreshInMonth: Number.parseFloat((Math.random() * 5 + 1).toFixed(1)),
}))

// Define columns for the data table
const columns: ColumnDef<FrequencyData>[] = [
  {
    accessorKey: "storeName",
    header: "Store Name",
  },
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

// Helper function to determine color based on percentage
function getColorClass(percentage: number): string {
  if (percentage >= 80) return "text-green-600 font-medium"
  if (percentage >= 50) return "text-amber-600 font-medium"
  return "text-red-600 font-medium"
}

export default function MeasurementFrequencyPage() {
  const [filteredData, setFilteredData] = useState<FrequencyData[]>(sampleData)

  const handleFilterChange = (filters: any) => {
    // In a real app, this would call an API with the filters
    console.log("Filters applied:", filters)
    // For demo, we'll just use the sample data
    setFilteredData(sampleData)
  }

  const handleDownload = (format: "csv" | "excel") => {
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
