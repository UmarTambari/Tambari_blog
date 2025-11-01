import StatCard from "./StatCard";
import {
  FileText,
  CheckCircle2,
  Clock,
  Users,
  Tags as TagsIcon,
} from "lucide-react";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const icons = {
  FileText,
  CheckCircle2,
  Clock,
  Users,
  TagsIcon,
};

type Stat = {
  name: string;
  value: number;
  icon: keyof typeof icons;
  href: string;
  bgColor: string;
  textColor: string;
};

interface StatsGridProps {
  stats: Stat[];
}

export default function StatsGrid({ stats }: StatsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
      {stats.map((stat) => (
        <StatCard
          key={stat.name}
          name={stat.name}
          value={stat.value}
          icon={stat.icon}
          href={stat.href}
          bgColor={stat.bgColor}
          textColor={stat.textColor}
        />
      ))}
    </div>
  );
}
