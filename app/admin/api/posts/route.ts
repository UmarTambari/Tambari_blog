import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { db } from '@/lib/db'
import { blogs, contentBlocks, blogsToTags } from '@/lib/db/schema'

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const {
      title,
      slug,
      summary,
      image,
      status,
      category,
      readTime,
      featured,
      authorId,
      content,
      tagIds,
    } = body

    if (!title || !slug || !summary || !image || !authorId || !content) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const [newPost] = await db
      .insert(blogs)
      .values({
        title,
        slug,
        summary,
        image,
        status: status || 'draft',
        category: category || null,
        readTime: readTime || null,
        featured: featured || false,
        authorId,
        publishedAt: status === 'published' ? new Date() : null,
      })
      .returning()

    // Create content block from content text
    await db.insert(contentBlocks).values({
      type: 'text',
      content,
      order: 0,
      blogId: newPost.id,
    })

    // Associate tags if provided
    if (tagIds && tagIds.length > 0) {
      await db.insert(blogsToTags).values(
        tagIds.map((tagId: string) => ({
          blogId: newPost.id,
          tagId,
        }))
      )
    }

    return NextResponse.json(newPost, { status: 201 })
  } catch (error) {
    console.error('Error creating post:', error)
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    )
  }
}