// app/admin/tags/components/tag-actions.tsx
"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { EditTagDialog } from "./EditTagDialog";
import { DeleteTagDialog } from "./DeleteTagDialog";

interface TagWithCount {
  id: string;
  name: string;
  count: number;
}

interface TagActionsProps {
  tag: TagWithCount;
  onDeleted: () => void;
  onUpdated: (tag: TagWithCount) => void;
}

export function TagActions({
  tag,
  onDeleted,
  onUpdated,
}: TagActionsProps) {
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setEditOpen(true)}>
            <Pencil className="w-4 h-4 mr-2" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setDeleteOpen(true)}
            className="text-red-600"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <EditTagDialog
        open={editOpen}
        onOpenChange={setEditOpen}
        tag={tag}
        onUpdated={onUpdated}
      />
      <DeleteTagDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        tag={tag}
        onDeleted={onDeleted}
      />
    </>
  );
}