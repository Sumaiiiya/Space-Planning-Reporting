"use client"

import { useState } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Sample data for department space allocation throughout the year
// Added sum total for each month
const departmentData = [
  {
    month: "Jan",
    "Men's Wear": 35,
    "Women's Wear": 45,
    "Kid's Wear": 25,
    Accessories: 15,
    Footwear: 20,
    Average: 28,
    "Sum Total": 140, // 35 + 45 + 25 + 15 + 20
  },
  {
    month: "Feb",
    "Men's Wear": 38,
    "Women's Wear": 48,
    "Kid's Wear": 24,
    Accessories: 16,
    Footwear: 22,
    Average: 29.6,
    "Sum Total": 148, // 38 + 48 + 24 + 16 + 22
  },
  {
    month: "Mar",
    "Men's Wear": 40,
    "Women's Wear": 52,
    "Kid's Wear": 26,
    Accessories: 18,
    Footwear: 24,
    Average: 32,
    "Sum Total": 160, // 40 + 52 + 26 + 18 + 24
  },
  {
    month: "Apr",
    "Men's Wear": 42,
    "Women's Wear": 55,
    "Kid's Wear": 28,
    Accessories: 20,
    Footwear: 25,
    Average: 34,
    "Sum Total": 170, // 42 + 55 + 28 + 20 + 25
  },
  {
    month: "May",
    "Men's Wear": 45,
    "Women's Wear": 58,
    "Kid's Wear": 30,
    Accessories: 22,
    Footwear: 26,
    Average: 36.2,
    "Sum Total": 181, // 45 + 58 + 30 + 22 + 26
  },
  {
    month: "Jun",
    "Men's Wear": 48,
    "Women's Wear": 60,
    "Kid's Wear": 32,
    Accessories: 24,
    Footwear: 28,
    Average: 38.4,
    "Sum Total": 192, // 48 + 60 + 32 + 24 + 28
  },
  {
    month: "Jul",
    "Men's Wear": 50,
    "Women's Wear": 62,
    "Kid's Wear": 35,
    Accessories: 25,
    Footwear: 30,
    Average: 40.4,
    "Sum Total": 202, // 50 + 62 + 35 + 25 + 30
  },
  {
    month: "Aug",
    "Men's Wear": 52,
    "Women's Wear": 65,
    "Kid's Wear": 38,
    Accessories: 26,
    Footwear: 32,
    Average: 42.6,
    "Sum Total": 213, // 52 + 65 + 38 + 26 + 32
  },
  {
    month: "Sep",
    "Men's Wear": 48,
    "Women's Wear": 60,
    "Kid's Wear": 35,
    Accessories: 24,
    Footwear: 30,
    Average: 39.4,
    "Sum Total": 197, // 48 + 60 + 35 + 24 + 30
  },
  {
    month: "Oct",
    "Men's Wear": 45,
    "Women's Wear": 55,
    "Kid's Wear": 32,
    Accessories: 22,
    Footwear: 28,
    Average: 36.4,
    "Sum Total": 182, // 45 + 55 + 32 + 22 + 28
  },
  {
    month: "Nov",
    "Men's Wear": 50,
    "Women's Wear": 58,
    "Kid's Wear": 35,
    Accessories: 25,
    Footwear: 30,
    Average: 39.6,
    "Sum Total": 198, // 50 + 58 + 35 + 25 + 30
  },
  {
    month: "Dec",
    "Men's Wear": 55,
    "Women's Wear": 65,
    "Kid's Wear": 40,
    Accessories: 28,
    Footwear: 35,
    Average: 44.6,
    "Sum Total": 223, // 55 + 65 + 40 + 28 + 35
  },
]

// Line colors for each department
const departmentColors = {
  "Men's Wear": "#4f46e5",
  "Women's Wear": "#ec4899",
  "Kid's Wear": "#f59e0b",
  Accessories: "#10b981",
  Footwear: "#6366f1",
  Average: "#000000",
  "Sum Total": "#777777", // Added grey color for Sum Total
}

export function SpaceDepartmentChart() {
  const [selectedYear, setSelectedYear] = useState("2025")

  // Get all department names except "month", "Average", and "Sum Total"
  const departments = Object.keys(departmentData[0]).filter(
    (key) => key !== "month" && key !== "Average" && key !== "Sum Total",
  )

  // Custom tooltip formatter
  const tooltipFormatter = (value, name, props) => {
    // Only show the currently hovered department, the Average, and Sum Total
    if (name === props.dataKey || name === "Average" || name === "Sum Total") {
      return [`${value} lm`, name]
    }
    return null
  }

  // Custom tooltip label formatter
  const tooltipLabelFormatter = (label) => {
    return `${label} ${selectedYear}`
  }

  return (
    <Card className="col-span-7">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle>Space and Department</CardTitle>
          <CardDescription>Linear meters allocation by department throughout the year</CardDescription>
        </div>
        <div className="flex items-center space-x-2">
          <Select value={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger className="w-[100px]">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2023">2023</SelectItem>
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2025">2025</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={departmentData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis
                label={{ value: "Linear Meters (lm)", angle: -90, position: "insideLeft" }}
                domain={[0, "dataMax + 10"]}
                ticks={[0, 50, 100, 150, 200, 250]}
              />
              <Tooltip
                formatter={tooltipFormatter}
                labelFormatter={tooltipLabelFormatter}
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  padding: "8px",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                  fontSize: "12px",
                }}
                itemStyle={{ padding: "2px 0" }}
                labelStyle={{ fontWeight: "bold", marginBottom: "4px" }}
              />
              <Legend
                wrapperStyle={{
                  fontSize: "10px", // Smaller font size for legend
                  paddingTop: "10px",
                }}
              />

              {/* Render department lines */}
              {departments.map((dept) => (
                <Line
                  key={dept}
                  type="monotone"
                  dataKey={dept}
                  name={dept}
                  stroke={departmentColors[dept]}
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              ))}

              {/* Average line - thicker and black */}
              <Line
                type="monotone"
                dataKey="Average"
                name="Average"
                stroke={departmentColors["Average"]}
                strokeWidth={3}
                dot={{ r: 5 }}
                activeDot={{ r: 7 }}
              />

              {/* Sum Total line - grey and dashed */}
              <Line
                type="monotone"
                dataKey="Sum Total"
                name="Sum Total"
                stroke={departmentColors["Sum Total"]}
                strokeWidth={2.5}
                strokeDasharray="5 5"
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
