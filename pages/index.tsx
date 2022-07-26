import Link from '@/components/Link'
import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import { descSortedGitBookPost, allCoreContent } from '@/lib/utils/contentlayer'
import { InferGetStaticPropsType } from 'next'
import NewsletterForm from '@/components/NewsletterForm'
import { allGitBooks } from 'contentlayer/generated'

const MAX_DISPLAY = 3

export const getStaticProps = async () => {
  // TODO: move computation to get only the essential frontmatter to contentlayer.config
  const sortedGitBookPosts = descSortedGitBookPost(allGitBooks)
  const gitBookPosts = allCoreContent(sortedGitBookPosts)

  return { props: { gitBookPosts } }
}

export default function Home({ gitBookPosts }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h2 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-3xl sm:leading-10 md:text-5xl md:leading-14">
            ¿Qué es Plexbooks?
          </h2>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            {siteMetadata.description}
          </p>
          {/* <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            These are our books in the writing process:
          </p>
          <div className="container py-12">
            <div className="-m-4 flex flex-wrap">
              {projectsData.map((d) => (
                <Card
                  key={d.title}
                  title={d.title}
                  description={d.description}
                  imgSrc={d.imgSrc}
                  href={d.href}
                  done={d.done}
                />
              ))}
            </div>
          </div> */}
        </div>
        <div className="mt-7 space-y-2 pt-6 pb-8 md:space-y-5">
          <h2 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-3xl sm:leading-10 md:text-5xl md:leading-14">
            GIT book
          </h2>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            Lee las últimas lecciones publicadas en nuestro libro de GIT
          </p>
          {gitBookPosts.length > MAX_DISPLAY && (
            <div className="flex justify-start text-base font-medium leading-6">
              <Link
                href="/git"
                className="text-primary-600 hover:text-primary-700 dark:text-primary-500 dark:hover:text-primary-400"
                aria-label="All Git lessons"
              >
                All Git lessons &rarr;
              </Link>
            </div>
          )}
        </div>
        <div>
          <ul className="mx-auto max-w-4xl divide-y divide-gray-200 dark:divide-gray-700">
            {!gitBookPosts.length && 'No publications found.'}
            {gitBookPosts.slice(0, MAX_DISPLAY).map((post) => {
              const { slug, title, summary } = post
              return (
                <li key={slug} className="py-12">
                  <article>
                    <div className="space-y-2">
                      <div className="space-y-5 xl:col-span-3">
                        <div className="space-y-6">
                          <div>
                            <h2 className="text-4xl font-bold leading-14 tracking-tight">
                              <Link
                                href={`/git/${slug}`}
                                className="text-gray-900 dark:text-gray-100"
                              >
                                {title}
                              </Link>
                            </h2>
                          </div>
                          <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                            {summary}
                          </div>
                        </div>
                        <div className="text-base font-medium leading-6">
                          <Link
                            href={`/git/${slug}`}
                            className="text-primary-600 hover:text-primary-700 dark:text-primary-500 dark:hover:text-primary-400"
                            aria-label={`Read "${title}"`}
                          >
                            Read more &rarr;
                          </Link>
                        </div>
                      </div>
                    </div>
                  </article>
                </li>
              )
            })}
          </ul>
        </div>
      </div>

      {siteMetadata.newsletter.provider !== '' && (
        <div className="flex items-center justify-center pt-8">
          <NewsletterForm />
        </div>
      )}
    </>
  )
}
