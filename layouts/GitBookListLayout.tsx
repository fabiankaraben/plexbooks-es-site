import Link from '@/components/Link'
import { ComponentProps, useState } from 'react'
import Pagination from '@/components/Pagination'
import { CoreContent } from '@/lib/utils/contentlayer'
import type { GitBook } from 'contentlayer/generated'

interface Props {
  posts: CoreContent<GitBook>[]
  title: string
  initialDisplayPosts?: CoreContent<GitBook>[]
  pagination?: ComponentProps<typeof Pagination>
}

export default function GitBookListLayout({
  posts,
  title,
  initialDisplayPosts = [],
  pagination,
}: Props) {
  const [searchValue, setSearchValue] = useState('')
  const filteredBlogPosts = posts.filter((post) => {
    const searchContent = post.title + post.summary
    return searchContent.toLowerCase().includes(searchValue.toLowerCase())
  })

  // If initialDisplayPosts exist, display it if no searchValue is specified
  const displayPosts =
    initialDisplayPosts.length > 0 && !searchValue ? initialDisplayPosts : filteredBlogPosts

  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            {title}
          </h1>
          <div className="relative max-w-lg">
            <input
              aria-label="Buscar"
              type="text"
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Buscar"
              className="block w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-900 dark:bg-gray-800 dark:text-gray-100"
            />
            <svg
              className="absolute right-3 top-3 h-5 w-5 text-gray-400 dark:text-gray-300"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
        <div>
          <ul className="mx-auto max-w-4xl divide-y divide-gray-200 dark:divide-gray-700">
            {!filteredBlogPosts.length && 'No publications found.'}
            {displayPosts.map((post) => {
              const { slug, title, summary } = post
              return (
                <li key={slug} className="py-12">
                  <article className="space-y-2">
                    <div className="space-y-3 xl:col-span-3">
                      <div>
                        <h3 className="text-4xl font-bold leading-14 tracking-tight">
                          <Link href={`/git/${slug}`} className="text-gray-900 dark:text-gray-100">
                            {title}
                          </Link>
                        </h3>
                      </div>
                      <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                        {summary}
                      </div>
                    </div>
                  </article>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
      {pagination && pagination.totalPages > 1 && !searchValue && (
        <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
      )}
    </>
  )
}
