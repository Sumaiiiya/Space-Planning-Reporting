"use client"

import { useState } from "react"
import type { ColumnDef } from "@tanstack/react-table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ReportFilters } from "@/components/report-filters"
import { DataTable } from "@/components/data-table"
import { downloadCSV, downloadExcel } from "@/lib/export-utils"
import { AlertTriangle } from "lucide-react"

// Sample data structure based on PRD
interface RiskData {
  storeName: string
  zone: string
  lastMeasured: string
  daysSinceLastMeasurement: number
  riskLevel: "High" | "Medium" | "Low"
  riskReason: string
  recommendedAction: string
}

// Sample data
const sampleData: RiskData[] = [
  {
    storeName: "Store A",
    zone: "Zone 3",
    lastMeasured: "2023-04-15",
    daysSinceLastMeasurement: 45,
    riskLevel: "High",
    riskReason: "Not measured in over 45 days",
    recommendedAction: "Schedule immediate measurement",
  },
  {
    storeName: "Store B",
    zone: "Zone 1",
    lastMeasured: "2023-05-10",
    daysSinceLastMeasurement: 20,
    riskLevel: "Medium",
    riskReason: "Inconsistent measurement pattern",
    recommendedAction: "Review measurement schedule",
  },
  {
    storeName: "Store C",
    zone: "Zone 2",
    lastMeasured: "2023-05-25",
    daysSinceLastMeasurement: 5,
    riskLevel: "Low",
    riskReason: "Recent measurement but historical gaps",
    recommendedAction: "Monitor for consistency",
  },
  {
    storeName: "Store A",
    zone: "Zone 5",
    lastMeasured: "2023-04-20",
    daysSinceLastMeasurement: 40,
    riskLevel: "High",
    riskReason: "Not measured in over 40 days",
    recommendedAction: "Schedule immediate measurement",
  },
  {
    storeName: "Store D",
    zone: "Zone 4",
    lastMeasured: "2023-05-05",
    daysSinceLastMeasurement: 25,
    riskLevel: "Medium",
    riskReason: "Below average measurement frequency",
    recommendedAction: "Include in next measurement cycle",
  },
  {
    storeName: "Store B",
    zone: "Zone 3",
    lastMeasured: "2023-05-20",
    daysSinceLastMeasurement: 10,
    riskLevel: "Low",
    riskReason: "Recent measurement but product category outliers",
    recommendedAction: "Review product category assignments",
  },
]

// Define columns for the data table
const columns: ColumnDef<RiskData>[] = [
  {
    accessorKey: "storeName",
    header: "Store Name",
  },
  {
    accessorKey: "zone",
    header: "Zone",
  },
  {
    accessorKey: "lastMeasured",
    header: "Last Measured",
  },
  {
    accessorKey: "daysSinceLastMeasurement",
    header: "Days Since Last Measurement",
  },
  {
    accessorKey: "riskLevel",
    header: "Risk Level",
    cell: ({ row }) => {
      const riskLevel = row.getValue("riskLevel") as string
      return (
        <div
          className={
            riskLevel === "High"
              ? "text-red-600 font-medium flex items-center"
              : riskLevel === "Medium"
                ? "text-amber-600 font-medium flex items-center"
                : "text-green-600 font-medium flex items-center"
          }
        >
          {riskLevel === "High" && <AlertTriangle className="mr-1 h-4 w-4" />}
          {riskLevel}
        </div>
      )
    },
  },
  {
    accessorKey: "riskReason",
    header: "Risk Reason",
  },
  {
    accessorKey: "recommendedAction",
    header: "Recommended Action",
  },
]

export default function RiskReportPage() {
  const [filteredData, setFilteredData] = useState<RiskData[]>(sampleData)

  const handleFilterChange = (filters: any) => {
    // In a real app, this would call an API with the filters
    console.log("Filters applied:", filters)
    // For demo, we'll just use the sample data
    setFilteredData(sampleData)
  }

  const handleDownload = (format: "csv" | "excel") => {
    const filename = `RiskReport_${new Date().toISOString().split("T")[0]}`

    if (format === "csv") {
      downloadCSV(filteredData, filename)
    } else {
      downloadExcel(filteredData, filename)
    }
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Risk Report</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
          <CardDescription>Select concept and store to view risk data</CardDescription>
        </CardHeader>
        <CardContent>
          <ReportFilters onFilterChange={handleFilterChange} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Risk Analysis</CardTitle>
          <CardDescription>Showing zones at risk for infrequent measurement</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={filteredData} searchColumn="storeName" onDownload={handleDownload} />
        </CardContent>
      </Card>
    </div>
  )
}
