import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, User, ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BlogCardProps } from "@/app/types";
import { formattedDate } from "@/app/functions";

const BlogCard: React.FC<BlogCardProps> = ({
  blog,
  className = "",
  onClick,
}) => {
  const {
    slug,
    title,
    summary,
    image,
    publishedAt,
    category,
    tags = [],
    readTime,
    featured = false,
    author,
  } = blog;

  const blogDate = formattedDate(publishedAt);

  return (
    <Link href={`/blogs/${slug}`}>
      <Card
        className={`group overflow-hidden transition-blog card-shadow hover:card-shadow-hover cursor-pointer ${
          featured ? "blog-gradient" : "bg-card"
        } ${className}`}
        onClick={onClick}
      >
        {/* --- Image + Category + Featured Badge --- */}
        <div className="relative h-48 w-full overflow-hidden bg-muted">
          <Image
            fill
            src={image}
            alt={title}
            className="object-cover transition-blog group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={featured}
          />
          {featured && (
            <Badge
              variant="secondary"
              className="absolute top-4 left-4 bg-primary text-primary-foreground z-10"
            >
              Featured
            </Badge>
          )}
          {category && (
            <Badge
              variant="outline"
              className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm z-10"
            >
              {category}
            </Badge>
          )}
        </div>
        {/* --- Card Content --- */}
        <CardContent className="p-6">
          {/* Date + Read Time */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{blogDate}</span>
            </div>
            {readTime && (
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{readTime} min read</span>
              </div>
            )}
          </div>
          {/* Title */}
          <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-blog line-clamp-2">
            {title}
          </h3>
          {/* Summary */}
          <p className="text-muted-foreground mb-4 line-clamp-3 leading-relaxed">
            {summary}
          </p>
          {/* Tags */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {tags.slice(0, 3).map((tag) => (
                <Badge
                  key={tag.id}
                  variant="secondary"
                  className="text-xs bg-blog-accent-light text-blog-accent"
                >
                  #{tag.name}
                </Badge>
              ))}
              {tags.length > 3 && (
                <Badge variant="secondary" className="text-xs">
                  +{tags.length - 3} more
                </Badge>
              )}
            </div>
          )}
          {/* Author + Read more */}
          <div className="flex items-center justify-between">
            {author && (
              <div className="flex items-center gap-2">
                {author.avatar ? (
                  <div className="relative h-8 w-8 rounded-full overflow-hidden">
                    <Image
                      fill
                      src={author.avatar}
                      alt={author.name}
                      sizes="42px"
                      className="object-cover"
                      unoptimized={true}
                    />
                  </div>
                ) : (
                  <div className="h-8 w-8 rounded-full bg-blog-accent-light flex items-center justify-center">
                    <User className="h-4 w-4 text-blog-accent" />
                  </div>
                )}
                <span className="text-sm text-muted-foreground">
                  {author.name}
                </span>
              </div>
            )}
            <div className="flex items-center gap-1 text-sm text-primary group-hover:text-primary-glow transition-blog">
              <span>Read more</span>
              <ExternalLink className="h-4 w-4" />
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default BlogCard;
