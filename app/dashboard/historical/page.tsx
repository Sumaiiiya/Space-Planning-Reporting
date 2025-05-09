"use client"

import { useState } from "react"
import type { ColumnDef } from "@tanstack/react-table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ReportFilters } from "@/components/report-filters"
import { DataTable } from "@/components/data-table"
import { downloadCSV, downloadExcel } from "@/lib/export-utils"

// Sample data structure based on PRD
interface HistoricalData {
  fixtureBarcode: string
  fixtureKey: string
  zone: string
  store: string
  isCurrent: boolean
  lastMeasured: string
  createdBy: string
  linearMeters: number
  department: string
  brand: string
}

// Sample data
const sampleData: HistoricalData[] = Array.from({ length: 20 }).map((_, i) => ({
  fixtureBarcode: `FB${1000 + i}`,
  fixtureKey: `FK${2000 + i}`,
  zone: `Zone ${Math.floor(i / 4) + 1}`,
  store: `Store ${String.fromCharCode(65 + (i % 4))}`,
  isCurrent: Math.random() > 0.3,
  lastMeasured: new Date(Date.now() - Math.floor(Math.random() * 30) * 86400000).toLocaleDateString(),
  createdBy: `User ${i % 5} (${new Date(Date.now() - Math.floor(Math.random() * 90) * 86400000).toLocaleDateString()})`,
  linearMeters: Number.parseFloat((Math.random() * 5 + 1).toFixed(2)),
  department: `Dept ${Math.floor(i / 10) + 1}`,
  brand: `Brand ${Math.floor(i / 4) + 1}`,
}))

// Define columns for the data table
const columns: ColumnDef<HistoricalData>[] = [
  {
    accessorKey: "fixtureBarcode",
    header: "Fixture Barcode",
  },
  {
    accessorKey: "fixtureKey",
    header: "Fixture Key",
  },
  {
    accessorKey: "zone",
    header: "Zone",
  },
  {
    accessorKey: "store",
    header: "Store",
  },
  {
    accessorKey: "isCurrent",
    header: "Is Current",
    cell: ({ row }) => (
      <div className={row.getValue("isCurrent") ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
        {row.getValue("isCurrent") ? "TRUE" : "FALSE"}
      </div>
    ),
  },
  {
    accessorKey: "lastMeasured",
    header: "Last Measured",
  },
  {
    accessorKey: "createdBy",
    header: "Created By",
  },
]

export default function HistoricalPage() {
  const [filteredData, setFilteredData] = useState<HistoricalData[]>(sampleData)

  const handleFilterChange = (filters: any) => {
    // In a real app, this would call an API with the filters
    console.log("Filters applied:", filters)
    // For demo, we'll just use the sample data
    setFilteredData(sampleData)
  }

  const handleDownload = (format: "csv" | "excel") => {
    const filename = `HistoricalReport_${new Date().toISOString().split("T")[0]}`

    if (format === "csv") {
      downloadCSV(filteredData, filename)
    } else {
      downloadExcel(filteredData, filename)
    }
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Historical Report</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
          <CardDescription>Select a date range, concept, and store to view historical data</CardDescription>
        </CardHeader>
        <CardContent>
          <ReportFilters showDateRange={true} onFilterChange={handleFilterChange} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Historical Data</CardTitle>
          <CardDescription>Showing historical fixture measurement data based on selected filters</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={filteredData} searchColumn="fixtureKey" onDownload={handleDownload} />
        </CardContent>
      </Card>
    </div>
  )
}
