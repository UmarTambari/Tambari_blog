"use client";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import {
  FileText,
  CheckCircle2,
  Clock,
  Users,
  Tags as TagsIcon,
} from "lucide-react";

const icons = {
  FileText,
  CheckCircle2,
  Clock,
  Users,
  TagsIcon,
};

type StatCardProps = {
  name: string;
  value: number;
  icon: keyof typeof icons;
  href: string;
  bgColor: string;
  textColor: string;
};

export default function StatCard({ name, value, icon, href, bgColor, textColor }: StatCardProps) {
  const Icon = icons[icon];

  return (
    <Link href={href}>
      <Card
        className={`p-6 rounded-2xl shadow-md hover:shadow-xl transition-shadow cursor-pointer ${bgColor} ${textColor}`}
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium">{name}</h3>
            <p className="text-2xl font-bold">{value}</p>
          </div>
          <Icon className="w-8 h-8" />
        </div>
      </Card>
    </Link>
  );
}
