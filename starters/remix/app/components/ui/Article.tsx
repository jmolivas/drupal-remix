import { ComponentProps } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from 'app/utils/ui'
import { Avatar, AvatarFallback, AvatarImage } from './Avatar'
import { Badge } from './Badge'
import { RichText } from './RichText'
import { ImageProps } from './types'

const articleVariants = cva('w-full bg-white', {
  variants: {},
  defaultVariants: {},
})

type AuthorProps = {
  avatar: {
    src: string
    alt: string
  }
  name: string
}

type Props = {
  title: string
  summary?: string
  content: string
  image: ImageProps
  tags?: string[]
  publishDate: number
  author: AuthorProps
}

type ArticleProps = ComponentProps<'article'> &
  VariantProps<typeof articleVariants> &
  Props

const formatDate = (timestamp: number): string => {
  const date = new Date(timestamp * 1000) // Convert seconds to milliseconds
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  }
  return date.toLocaleDateString('en-US', options)
}

export const Article = ({
  className,
  title,
  summary,
  content,
  image,
  tags,
  publishDate,
  author,
  ...props
}: ArticleProps) => {
  return (
    <article className={cn(articleVariants(), className)} {...props}>
      <div className="container mb-8">
        <img
          {...image}
          alt={image.alt}
          className="h-auto w-full object-cover"
        />
      </div>
      <div className="mx-auto mb-8 max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="mb-6 text-3xl font-bold">{title}</h1>
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="mr-4 h-10 w-10">
              <AvatarImage
                src={author.avatar.src}
                alt={author.avatar.alt || author.name}
              />
              <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <p className="text-sm font-medium">{author.name}</p>
          </div>
          <p className="text-sm text-gray-500">{formatDate(publishDate)}</p>
        </div>
        {tags && tags.length > 0 && (
          <div className="mb-8 flex flex-wrap gap-2">
            {tags.map(tag => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        )}
        {summary && <p className="mb-8 italic text-gray-400">{summary}</p>}
        <RichText content={content} />
      </div>
    </article>
  )
}

Article.displayName = 'Article'
