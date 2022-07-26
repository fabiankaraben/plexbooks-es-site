import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import NewsletterForm from '@/components/NewsletterForm'

export const getStaticProps = async () => {
  return { props: { noLayout: true } }
}

export default function Form() {
  return (
    <>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} noIndex={true} />
      <div className="w-full px-2">
        <NewsletterForm />
      </div>
    </>
  )
}
