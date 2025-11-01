import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function PostWrapper({ children }: { children: React.ReactNode }) {
  return (
    <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
      <CardHeader className="border-b bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardTitle className="text-2xl">All Posts</CardTitle>
        <CardDescription>Manage and edit your blog posts</CardDescription>
      </CardHeader>

      <CardContent className="p-0">
        {children}
      </CardContent>
    </Card>
  );
}
