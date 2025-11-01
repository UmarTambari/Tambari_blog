"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateTag } from "./../actions";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

interface TagWithCount {
  id: string;
  name: string;
  count: number;
}

interface EditTagDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tag: TagWithCount;
  onUpdated: (tag: TagWithCount) => void;
}

export function EditTagDialog({
  open,
  onOpenChange,
  tag,
  onUpdated,
}: EditTagDialogProps) {
  const [name, setName] = useState(tag.name);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Tag name cannot be empty");
      return;
    }

    if (name === tag.name) {
      onOpenChange(false);
      return;
    }

    setLoading(true);
    try {
      const result = await updateTag(tag.id, name.trim());

      if (result.success) {
        toast.success("Tag updated successfully");
        onUpdated({ ...tag, name: name.trim() });
        onOpenChange(false);
      } else {
        toast.error(result.error || "Failed to update tag"); 
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Tag</DialogTitle>
          <DialogDescription>Update the tag name</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="edit-tag-name">Tag Name</Label>
            <Input
              id="edit-tag-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={loading}
            />
          </div>

          <div className="flex gap-2 justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Update Tag
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
