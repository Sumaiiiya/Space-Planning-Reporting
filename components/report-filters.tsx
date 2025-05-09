"use client"

import { useState } from "react"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { DateRange } from "react-day-picker"

interface ReportFiltersProps {
  showDateRange?: boolean
  showSingleDate?: boolean
  onFilterChange: (filters: any) => void
}

export function ReportFilters({ showDateRange = false, showSingleDate = false, onFilterChange }: ReportFiltersProps) {
  const [date, setDate] = useState<Date>()
  const [dateRange, setDateRange] = useState<DateRange | undefined>()
  const [concept, setConcept] = useState<string>("")
  const [store, setStore] = useState<string>("")

  const handleFilterApply = () => {
    onFilterChange({
      date,
      dateRange,
      concept,
      store,
    })
  }

  return (
    <div className="flex flex-col space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {showSingleDate && (
          <div className="space-y-2">
            <label className="text-sm font-medium">Date</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
              </PopoverContent>
            </Popover>
          </div>
        )}

        {showDateRange && (
          <div className="space-y-2">
            <label className="text-sm font-medium">Date Range</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn("w-full justify-start text-left font-normal", !dateRange && "text-muted-foreground")}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateRange?.from ? (
                    dateRange.to ? (
                      <>
                        {format(dateRange.from, "LLL dd, y")} - {format(dateRange.to, "LLL dd, y")}
                      </>
                    ) : (
                      format(dateRange.from, "LLL dd, y")
                    )
                  ) : (
                    <span>Pick a date range</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={dateRange?.from}
                  selected={dateRange}
                  onSelect={setDateRange}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>
          </div>
        )}

        <div className="space-y-2">
          <label className="text-sm font-medium">Concept</label>
          <Select value={concept} onValueChange={setConcept}>
            <SelectTrigger>
              <SelectValue placeholder="Select concept" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Concepts</SelectItem>
              <SelectItem value="concept-a">Concept A</SelectItem>
              <SelectItem value="concept-b">Concept B</SelectItem>
              <SelectItem value="concept-c">Concept C</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Store</label>
          <Select value={store} onValueChange={setStore}>
            <SelectTrigger>
              <SelectValue placeholder="Select store" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Stores</SelectItem>
              <SelectItem value="store-a">Store A</SelectItem>
              <SelectItem value="store-b">Store B</SelectItem>
              <SelectItem value="store-c">Store C</SelectItem>
              <SelectItem value="store-d">Store D</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-end">
          <Button className="w-full bg-[#1876D2]" onClick={handleFilterApply}>
            Apply Filters
          </Button>
        </div>
      </div>
    </div>
  )
}
