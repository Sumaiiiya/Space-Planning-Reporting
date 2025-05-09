// Simple utility for CSV export
export function downloadCSV(data: any[], filename: string) {
  // Get headers from first item
  const headers = Object.keys(data[0])

  // Create CSV content
  const csvContent = [
    headers.join(","), // Header row
    ...data.map((row) =>
      headers
        .map((header) => {
          // Handle values with commas by wrapping in quotes
          const value = row[header]
          const stringValue = String(value)
          return stringValue.includes(",") ? `"${stringValue}"` : stringValue
        })
        .join(","),
    ),
  ].join("\n")

  // Create and trigger download
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
  const link = document.createElement("a")
  const url = URL.createObjectURL(blob)

  link.setAttribute("href", url)
  link.setAttribute("download", `${filename}.csv`)
  link.style.visibility = "hidden"

  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

// Simple utility for Excel export (in a real app, you'd use a library like xlsx)
export function downloadExcel(data: any[], filename: string) {
  // For this demo, we'll just use CSV with an .xlsx extension
  // In a real app, you would use a proper Excel library
  downloadCSV(data, `${filename}.xlsx`)
}
