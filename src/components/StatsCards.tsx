import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Users, Calendar, Phone } from "lucide-react";

const StatsCards = () => {
  const stats = [
    {
      title: "AI Identified",
      value: "47",
      change: "+12 this week",
      icon: TrendingUp,
      color: "text-success",
    },
    {
      title: "Assigned Today",
      value: "23",
      change: "8 remaining",
      icon: Users,
      color: "text-primary",
    },
    {
      title: "Calls Made",
      value: "156",
      change: "+34 today",
      icon: Phone,
      color: "text-secondary",
    },
    {
      title: "Reactivated",
      value: "18",
      change: "This month",
      icon: Calendar,
      color: "text-accent-foreground",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card key={index} className="transition-all duration-300 hover:shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{stat.value}</div>
            <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StatsCards;