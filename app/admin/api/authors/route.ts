import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/client'
import { db } from '@/lib/db'
import { authors } from '@/lib/db/schema'

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
    const { name, email, avatar, bio } = body

    // Validate required fields
    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      )
    }

    const [newAuthor] = await db
      .insert(authors)
      .values({
        name,
        email,
        avatar: avatar || null,
        bio: bio || null,
      })
      .returning()

    return NextResponse.json(newAuthor, { status: 201 })
  } catch (error) {
    console.error('Error creating author:', error)
    return NextResponse.json(
      { error: 'Failed to create author' },
      { status: 500 }
    )
  }
}