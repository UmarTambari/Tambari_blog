"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { CreateTagDialog } from "./CreateTagDialog";

export function TagsHeader() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tags</h1>
          <p className="text-gray-500 mt-1">Manage your blog tags</p>
        </div>
        <Button onClick={() => setOpen(true)} className="gap-2">
          <Plus className="w-4 h-4" />
          Create Tag
        </Button>
      </div>
      <CreateTagDialog open={open} onOpenChange={setOpen} />
    </>
  );
}
