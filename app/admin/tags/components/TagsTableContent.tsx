"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { TagActions } from "./TagActions";
import { useState } from "react";

interface TagWithCount {
  id: string;
  name: string;
  count: number;
}

interface TagsTableContentProps {
  initialTags: TagWithCount[];
}



export function TagsTableContent({ initialTags }: TagsTableContentProps) {
  const [tags, setTags] = useState(initialTags);

  const handleTagDeleted = (tagId: string) => {
    setTags((prev) => prev.filter((tag) => tag.id !== tagId));
  };

  const handleTagUpdated = (updatedTag: TagWithCount) => {
    setTags((prev) =>
      prev.map((tag) => (tag.id === updatedTag.id ? updatedTag : tag))
    );
  };

  if (tags.length === 0) {
    return (
      <div className="text-center py-12 border rounded-lg bg-gray-50">
        <p className="text-gray-500">No tags found. Create your first tag!</p>
      </div>
    );
  }

  return (
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50">
            <TableHead>Tag Name</TableHead>
            <TableHead>Blog Count</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tags.map((tag) => (
            <TableRow key={tag.id} className="hover:bg-gray-50">
              <TableCell className="font-medium">{tag.name}</TableCell>
              <TableCell>
                <Badge variant="secondary">{tag.count} blogs</Badge>
              </TableCell>
              <TableCell className="text-right">
                <TagActions
                  tag={tag}
                  onDeleted={() => handleTagDeleted(tag.id)}
                  onUpdated={handleTagUpdated}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}