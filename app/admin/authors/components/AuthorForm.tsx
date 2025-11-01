'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Loader2, Save, User, Mail, Image as ImageIcon, FileText } from 'lucide-react'
import { toast } from 'sonner'

const authorSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  avatar: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
  bio: z.string().max(500, 'Bio must be less than 500 characters').optional(),
})

type AuthorFormValues = z.infer<typeof authorSchema>

interface AuthorFormProps {
  author?: {
    id: string
    name: string
    email: string
    avatar: string | null
    bio: string | null
  }
}

export function AuthorForm({ author }: AuthorFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  const isEditing = !!author

  const form = useForm<AuthorFormValues>({
    resolver: zodResolver(authorSchema),
    defaultValues: {
      name: author?.name || '',
      email: author?.email || '',
      avatar: author?.avatar || '',
      bio: author?.bio || '',
    },
  })

  const onSubmit = async (values: AuthorFormValues) => {
    setIsSubmitting(true)
    try {
      const url = isEditing
        ? `/api/authors/${author.id}`
        : '/api/authors'
      
      const method = isEditing ? 'PATCH' : 'POST'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Failed to save author')
      }

      toast.success(
        isEditing
          ? 'Author updated successfully'
          : 'Author created successfully'
      )
      router.push('/admin/authors')
      router.refresh()
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Failed to save author'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-semibold flex items-center">
                <User className="w-4 h-4 mr-2 text-purple-600" />
                Author Name
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="John Doe"
                  className="h-11 border-gray-200 focus:border-purple-500 transition-colors"
                  disabled={isSubmitting}
                />
              </FormControl>
              <FormDescription>
                The full name of the author as it will appear on posts
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-semibold flex items-center">
                <Mail className="w-4 h-4 mr-2 text-purple-600" />
                Email Address
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="email"
                  placeholder="john@example.com"
                  className="h-11 border-gray-200 focus:border-purple-500 transition-colors"
                  disabled={isSubmitting}
                />
              </FormControl>
              <FormDescription>
                Contact email for the author
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="avatar"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-semibold flex items-center">
                <ImageIcon className="w-4 h-4 mr-2 text-purple-600" />
                Avatar URL
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="url"
                  placeholder="https://example.com/avatar.jpg"
                  className="h-11 border-gray-200 focus:border-purple-500 transition-colors"
                  disabled={isSubmitting}
                />
              </FormControl>
              <FormDescription>
                Optional: URL to the author profile picture
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-semibold flex items-center">
                <FileText className="w-4 h-4 mr-2 text-purple-600" />
                Bio
              </FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Tell us about the author..."
                  className="min-h-[120px] resize-none border-gray-200 focus:border-purple-500 transition-colors"
                  disabled={isSubmitting}
                />
              </FormControl>
              <FormDescription>
                Optional: Brief description about the author (max 500 characters)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-center gap-4 pt-4">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-lg flex-1 sm:flex-none"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                {isEditing ? 'Update Author' : 'Create Author'}
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
  )
}