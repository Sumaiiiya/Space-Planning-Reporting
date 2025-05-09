import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const recentActivity = [
  {
    store: "Store A",
    zone: "Zone 1",
    user: "John Doe",
    time: "2 hours ago",
    initials: "JD",
  },
  {
    store: "Store B",
    zone: "Zone 3",
    user: "Jane Smith",
    time: "3 hours ago",
    initials: "JS",
  },
  {
    store: "Store C",
    zone: "Zone 2",
    user: "Mike Johnson",
    time: "5 hours ago",
    initials: "MJ",
  },
  {
    store: "Store A",
    zone: "Zone 4",
    user: "Sarah Williams",
    time: "6 hours ago",
    initials: "SW",
  },
  {
    store: "Store D",
    zone: "Zone 1",
    user: "Robert Brown",
    time: "8 hours ago",
    initials: "RB",
  },
]

export function RecentActivity() {
  return (
    <div className="space-y-8">
      {recentActivity.map((activity, index) => (
        <div key={index} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarFallback className="bg-sky-100 text-[#1876D2]">{activity.initials}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">
              {activity.store} - {activity.zone}
            </p>
            <p className="text-sm text-muted-foreground">Updated by {activity.user}</p>
          </div>
          <div className="ml-auto font-medium text-sm text-muted-foreground">{activity.time}</div>
        </div>
      ))}
    </div>
  )
}
