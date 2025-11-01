import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/client'
import { db } from '@/lib/db'
import { authors } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { name, email, avatar, bio } = body

    // Validate required fields
    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      )
    }

    const [updatedAuthor] = await db
      .update(authors)
      .set({
        name,
        email,
        avatar: avatar || null,
        bio: bio || null,
        updatedAt: new Date(),
      })
      .where(eq(authors.id, params.id))
      .returning()

    if (!updatedAuthor) {
      return NextResponse.json({ error: 'Author not found' }, { status: 404 })
    }

    return NextResponse.json(updatedAuthor)
  } catch (error) {
    console.error('Error updating author:', error)
    return NextResponse.json(
      { error: 'Failed to update author' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await db.delete(authors).where(eq(authors.id, params.id))

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting author:', error)
    return NextResponse.json(
      { error: 'Failed to delete author' },
      { status: 500 }
    )
  }
}