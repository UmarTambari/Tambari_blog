import { Card, CardContent } from "@/components/ui/card";
import { User } from "lucide-react";

export default function AuthorsStats({ totalAuthors }: { totalAuthors: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Total Authors</p>
              <p className="text-3xl font-bold text-gray-900">{totalAuthors}</p>
            </div>
            <div className="p-3 rounded-xl bg-purple-50">
              <User className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
