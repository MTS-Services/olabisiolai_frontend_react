import { stats } from "./analyticsData";
import { StatCard } from "./StatCard";

export function StatsGrid() {
  return (
    <div className="grid gap-4 xl:grid-cols-4 md:grid-cols-2">
      {stats.map((item) => (
        <StatCard key={item.title} {...item} />
      ))}
    </div>
  );
}
