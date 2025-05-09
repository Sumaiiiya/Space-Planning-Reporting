"use client"

import { useState } from "react"
import type { ColumnDef } from "@tanstack/react-table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ReportFilters } from "@/components/report-filters"
import { DataTable } from "@/components/data-table"
import { downloadCSV, downloadExcel } from "@/lib/export-utils"

// Updated data structure based on new column headers
interface HistoricalData {
  storeId: string
  countryCode: string
  fixtureKey: string
  fixtureCount: number
  item: string
  group: string
  department: string
  class: string
  subClass: string
  lm: number
  zone: string
  type: string
  componentLength: number
  componentHeight: number
  fixtureLinearMeter: number
  validFrom: string
  validTo: string
  status: boolean
  user: string
}

// Sample data with the updated fields
const sampleData: HistoricalData[] = Array.from({ length: 20 }).map((_, i) => {
  // Generate a random date in the past for validFrom
  const validFromDate = new Date(Date.now() - Math.floor(Math.random() * 365) * 86400000)

  // For some records, set validTo to null (still active) or a date after validFrom
  const isActive = Math.random() > 0.3
  const validToDate = isActive ? null : new Date(validFromDate.getTime() + Math.floor(Math.random() * 180) * 86400000)

  return {
    storeId: `ST${100 + i}`,
    countryCode: ["US", "UK", "CA", "DE", "FR"][i % 5],
    fixtureKey: `FK${2000 + i}`,
    fixtureCount: Math.floor(Math.random() * 10) + 1,
    item: `Item ${i}`,
    group: `Group ${Math.floor(i / 5) + 1}`,
    department: `Dept ${Math.floor(i / 10) + 1}`,
    class: `Class ${Math.floor(i / 7) + 1}`,
    subClass: `Subclass ${Math.floor(i / 3) + 1}`,
    lm: Number.parseFloat((Math.random() * 5 + 1).toFixed(2)),
    zone: `Zone ${Math.floor(i / 4) + 1}`,
    type: ["Standard", "Promotional", "Seasonal", "Clearance"][i % 4],
    componentLength: Number.parseFloat((Math.random() * 2 + 0.5).toFixed(2)),
    componentHeight: Number.parseFloat((Math.random() * 3 + 1).toFixed(2)),
    fixtureLinearMeter: Number.parseFloat((Math.random() * 10 + 2).toFixed(2)),
    validFrom: validFromDate.toISOString().split("T")[0],
    validTo: validToDate ? validToDate.toISOString().split("T")[0] : "",
    status: isActive,
    user: `User ${i % 5}`,
  }
})

// Updated columns definition with the new headers
const columns: ColumnDef<HistoricalData>[] = [
  {
    accessorKey: "storeId",
    header: "Store ID",
  },
  {
    accessorKey: "countryCode",
    header: "Country Code",
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
    accessorKey: "class",
    header: "Class",
  },
  {
    accessorKey: "subClass",
    header: "Sub Class",
  },
  {
    accessorKey: "lm",
    header: "LM",
  },
  {
    accessorKey: "zone",
    header: "Zone",
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "componentLength",
    header: "Component Length",
  },
  {
    accessorKey: "componentHeight",
    header: "Component Height",
  },
  {
    accessorKey: "fixtureLinearMeter",
    header: "Fixture Linear Meter",
  },
  {
    accessorKey: "validFrom",
    header: "Valid From",
  },
  {
    accessorKey: "validTo",
    header: "Valid To",
    cell: ({ row }) => {
      const validTo = row.getValue("validTo") as string
      return validTo ? validTo : "Present"
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className={row.getValue("status") ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
        {row.getValue("status") ? "TRUE" : "FALSE"}
      </div>
    ),
  },
  {
    accessorKey: "user",
    header: "User",
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
