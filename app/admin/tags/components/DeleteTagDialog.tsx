"use client";

import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { deleteTag } from "./../actions";
import { Loader2 } from "lucide-react";

interface TagWithCount {
  id: string;
  name: string;
  count: number;
}

interface DeleteTagDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tag: TagWithCount;
  onDeleted: () => void;
}

export function DeleteTagDialog({
  open,
  onOpenChange,
  tag,
  onDeleted,
}: DeleteTagDialogProps) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      const result = await deleteTag(tag.id);

      if (result.success) {
        toast.success("Tag deleted successfully");
        onDeleted();
        onOpenChange(false);
      } else {
        toast.error(result.error || "Failed to delete tag");
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Tag</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete the tag &ldquo;{tag.name}&rdquo;? This action
            cannot be undone. The tag will be removed from all associated blog
            posts.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="flex gap-2 justify-end">
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={loading}
            className="bg-red-600 hover:bg-red-700"
          >
            {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            Delete
          </AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
