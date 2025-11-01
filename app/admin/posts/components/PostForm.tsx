"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Loader2,
  Save,
  FileText,
  Image as ImageIcon,
  User,
  Tags as TagsIcon,
  FolderOpen,
  Clock,
  Star,
  Eye,
} from "lucide-react";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Blog, ContentBlock, Author,Tag } from "@/app/types";

const postSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  slug: z
    .string()
    .min(3, "Slug must be at least 3 characters")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be lowercase with hyphens"),
  summary: z.string().min(10, "Summary must be at least 10 characters"),
  image: z.url("Please enter a valid image URL"),
  category: z.string().optional(),
  readTime: z
    .number()
    .int()
    .positive("Read time must be a positive number")
    .optional(),
  status: z.enum(["draft", "published"]),
  featured: z.boolean(),
  authorId: z.string().min(1, "Please select an author"),
  content: z.string().min(50, "Content must be at least 50 characters"),
  tagIds: z.array(z.string()).optional(),
});

type PostFormValues = z.infer<typeof postSchema>;

type PostFormProps = {
  post?: Blog;
  contentBlocks?: ContentBlock[];
  postTags?: string[];
  authors: Author[];
  tags?: Tag[];
}

export function PostForm({
  post,
  contentBlocks,
  postTags,
  authors,
  tags,
}: PostFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const isEditing = !!post;

  // Convert content blocks to single content string
  const initialContent = contentBlocks
    ? contentBlocks
        .sort((a, b) => a.order - b.order)
        .map((block) => block.content)
        .join("\n\n")
    : "";

  const form = useForm<PostFormValues>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: post?.title || "",
      slug: post?.slug || "",
      summary: post?.summary || "",
      image: post?.image || "",
      category: post?.category || "",
      readTime: post?.readTime || undefined,
      status: post?.status || "draft",
      featured: post?.featured || false,
      authorId: post?.authorId || "",
      content: initialContent,
      tagIds: postTags || [],
    },
  });

  // Auto-generate slug from title
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const onSubmit = async (values: PostFormValues) => {
    setIsSubmitting(true);
    try {
      const url = isEditing ? `/api/posts/${post.id}` : "/api/posts";
      const method = isEditing ? "PATCH" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to save post");
      }

      toast.success(
        isEditing ? "Post updated successfully" : "Post created successfully"
      );
      router.push("/admin/posts");
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to save post"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Basic Information */}
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <FileText className="w-5 h-5 mr-2 text-blue-600" />
              Basic Information
            </h3>
            <Separator className="mb-6" />
          </div>

          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-semibold">
                  Post Title
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Enter post title"
                    className="h-11 text-lg border-gray-200 focus:border-blue-500"
                    disabled={isSubmitting}
                    onChange={(e) => {
                      field.onChange(e);
                      if (!isEditing) {
                        form.setValue("slug", generateSlug(e.target.value));
                      }
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-semibold">Slug</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="post-url-slug"
                    className="h-11 border-gray-200 focus:border-blue-500 font-mono text-sm"
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormDescription>
                  URL-friendly version of the title (lowercase, hyphens only)
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="summary"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-semibold">
                  Summary
                </FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Brief description of your post..."
                    className="min-h-[100px] resize-none border-gray-200 focus:border-blue-500"
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormDescription>
                  A short summary that appears in post listings
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-semibold flex items-center">
                  <ImageIcon className="w-4 h-4 mr-2 text-blue-600" />
                  Featured Image URL
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="url"
                    placeholder="https://example.com/image.jpg"
                    className="h-11 border-gray-200 focus:border-blue-500"
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Content */}
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-4">Content</h3>
            <Separator className="mb-6" />
          </div>

          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-semibold">
                  Post Content
                </FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Write your post content here..."
                    className="min-h-[400px] resize-y border-gray-200 focus:border-blue-500 font-mono text-sm"
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormDescription>
                  Write your post content in plain text or markdown
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Metadata */}
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <FolderOpen className="w-5 h-5 mr-2 text-blue-600" />
              Metadata & Options
            </h3>
            <Separator className="mb-6" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="authorId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold flex items-center">
                    <User className="w-4 h-4 mr-2 text-blue-600" />
                    Author
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={isSubmitting}
                  >
                    <FormControl>
                      <SelectTrigger className="h-11 border-gray-200 focus:border-blue-500">
                        <SelectValue placeholder="Select an author" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {authors.map((author) => (
                        <SelectItem key={author.id} value={author.id}>
                          {author.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold flex items-center">
                    <TagsIcon className="w-4 h-4 mr-2 text-blue-600" />
                    Category
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="e.g., Technology, Tutorial"
                      className="h-11 border-gray-200 focus:border-blue-500"
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormDescription>
                    Optional category for the post
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="readTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-semibold flex items-center">
                  <Clock className="w-4 h-4 mr-2 text-blue-600" />
                  Read Time (minutes)
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    placeholder="5"
                    className="h-11 border-gray-200 focus:border-blue-500 max-w-xs"
                    disabled={isSubmitting}
                    onChange={(e) => field.onChange(e.target.valueAsNumber)}
                  />
                </FormControl>
                <FormDescription>
                  Estimated reading time in minutes
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div>
            <Label className="text-base font-semibold mb-4 block">Tags</Label>
            <FormField
              control={form.control}
              name="tagIds"
              render={() => (
                <FormItem>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {(tags || []).map((tag) => (
                      <FormField
                        key={tag.id}
                        control={form.control}
                        name="tagIds"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={tag.id}
                              className="flex flex-row items-start space-x-3 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(tag.id)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([
                                          ...(field.value || []),
                                          tag.id,
                                        ])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== tag.id
                                          )
                                        );
                                  }}
                                  disabled={isSubmitting}
                                />
                              </FormControl>
                              <FormLabel className="font-normal cursor-pointer">
                                {tag.name}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                  </div>
                  <FormDescription>
                    Select tags that apply to this post
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Publishing Options */}
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Eye className="w-5 h-5 mr-2 text-blue-600" />
              Publishing Options
            </h3>
            <Separator className="mb-6" />
          </div>

          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-semibold">
                  Status
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={isSubmitting}
                >
                  <FormControl>
                    <SelectTrigger className="h-11 border-gray-200 focus:border-blue-500 max-w-xs">
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="draft">
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-yellow-500 mr-2" />
                        Draft
                      </div>
                    </SelectItem>
                    <SelectItem value="published">
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-green-500 mr-2" />
                        Published
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  Draft posts are not visible to the public
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="featured"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border border-gray-200 p-4 bg-yellow-50/50">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    disabled={isSubmitting}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="text-base font-semibold flex items-center">
                    <Star className="w-4 h-4 mr-2 text-yellow-600" />
                    Featured Post
                  </FormLabel>
                  <FormDescription>
                    Featured posts appear prominently on your blogs homepage
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-4 pt-6 border-t">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg flex-1 sm:flex-none"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                {isEditing ? "Update Post" : "Create Post"}
              </>
            )}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            disabled={isSubmitting}
            className="flex-1 sm:flex-none"
          >
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
}
