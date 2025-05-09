"use client"

import { useState } from "react"
import type { ColumnDef } from "@tanstack/react-table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ReportFilters } from "@/components/report-filters"
import { DataTable } from "@/components/data-table"
import { downloadCSV, downloadExcel } from "@/lib/export-utils"

// Sample data structure based on PRD
interface PointInTimeData {
  fixtureBarcode: string
  fixtureKey: string
  fixtureCount: number
  item: string
  group: string
  department: string
  class: string
  subclass: string
  brand: string
  color: string
  shade: string
  style: string
  vpn: string
  linearMeters: number
  zone: string
  name: string
  componentLength: number
  componentHeight: number
  fixtureLinearMeter: number
  createdBy: string
}

// Sample data
const sampleData: PointInTimeData[] = Array.from({ length: 20 }).map((_, i) => ({
  fixtureBarcode: `FB${1000 + i}`,
  fixtureKey: `FK${2000 + i}`,
  fixtureCount: Math.floor(Math.random() * 10) + 1,
  item: `Item ${i}`,
  group: `Group ${Math.floor(i / 5) + 1}`,
  department: `Dept ${Math.floor(i / 10) + 1}`,
  class: `Class ${Math.floor(i / 7) + 1}`,
  subclass: `Subclass ${Math.floor(i / 3) + 1}`,
  brand: `Brand ${Math.floor(i / 4) + 1}`,
  color: ["Red", "Blue", "Green", "Yellow", "Black"][i % 5],
  shade: ["Light", "Medium", "Dark"][i % 3],
  style: `Style ${i % 10}`,
  vpn: `VPN${10000 + i}`,
  linearMeters: Number.parseFloat((Math.random() * 5 + 1).toFixed(2)),
  zone: `Zone ${Math.floor(i / 4) + 1}`,
  name: `Fixture Name ${i}`,
  componentLength: Number.parseFloat((Math.random() * 2 + 0.5).toFixed(2)),
  componentHeight: Number.parseFloat((Math.random() * 3 + 1).toFixed(2)),
  fixtureLinearMeter: Number.parseFloat((Math.random() * 10 + 2).toFixed(2)),
  createdBy: `User ${i % 5} (${new Date(Date.now() - Math.floor(Math.random() * 7) * 86400000).toLocaleDateString()})`,
}))

// Define columns for the data table
const columns: ColumnDef<PointInTimeData>[] = [
  {
    accessorKey: "fixtureBarcode",
    header: "Fixture Barcode",
  },
  {
    accessorKey: "fixtureKey",
    header: "Fixture Key",
  },
  {
    accessorKey: "fixtureCount",
    header: "Fixture Count",
  },
  {
    accessorKey: "item",
    header: "Item",
  },
  {
    accessorKey: "group",
    header: "Group",
  },
  {
    accessorKey: "department",
    header: "Department",
  },
  {
    accessorKey: "zone",
    header: "Zone",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "linearMeters",
    header: "Linear Meters",
  },
  {
    accessorKey: "createdBy",
    header: "Created By",
  },
]

export default function PointInTimePage() {
  const [filteredData, setFilteredData] = useState<PointInTimeData[]>(sampleData)

  const handleFilterChange = (filters: any) => {
    // In a real app, this would call an API with the filters
    console.log("Filters applied:", filters)
    // For demo, we'll just use the sample data
    setFilteredData(sampleData)
  }

  const handleDownload = (format: "csv" | "excel") => {
    const filename = `PointInTimeReport_${new Date().toISOString().split("T")[0]}`

    if (format === "csv") {
      downloadCSV(filteredData, filename)
    } else {
      downloadExcel(filteredData, filename)
    }
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Point-in-Time Report</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
          <CardDescription>Select a single date, concept, and store to view the report</CardDescription>
        </CardHeader>
        <CardContent>
          <ReportFilters showSingleDate={true} onFilterChange={handleFilterChange} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Report Data</CardTitle>
          <CardDescription>Showing fixture measurement data based on selected filters</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={filteredData} searchColumn="fixtureKey" onDownload={handleDownload} />
        </CardContent>
      </Card>
    </div>
  )
}
