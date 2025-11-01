"use client";

import { Card, CardContent } from "@/components/ui/card";
import { FileText, Eye } from "lucide-react";

interface PostStatsProps {
  counts: {
    total: number;
    published: number;
    drafts: number;
  };
}

export default function PostStats({ counts }: PostStatsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">
                Total Posts
              </p>
              <p className="text-3xl font-bold text-gray-900">{counts.total}</p>
            </div>
            <div className="p-3 rounded-xl bg-blue-50">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">
                Published
              </p>
              <p className="text-3xl font-bold text-gray-900">
                {counts.published}
              </p>
            </div>
            <div className="p-3 rounded-xl bg-green-50">
              <Eye className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Drafts</p>
              <p className="text-3xl font-bold text-gray-900">
                {counts.drafts}
              </p>
            </div>
            <div className="p-3 rounded-xl bg-yellow-50">
              <FileText className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
