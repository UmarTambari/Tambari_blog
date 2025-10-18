import React from 'react'
import { prisma } from '@/lib/prisma'
import { Footer } from '@/components/Footer'
import Hero from '@/components/Hero'

const page = async () => {

  const recentPosts = await prisma.blog.findMany({
    take: 6,
    orderBy: { publishedAt: "desc"},
    include: {
      tags: true,
      author: {
        select: {
          name: true,
          avatar: true
        }
      }
    }
  })

  return (
    <div>
      <Hero recentPosts={recentPosts} />
      <Footer />
    </div>
  )
}

export default page