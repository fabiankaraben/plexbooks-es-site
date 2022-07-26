import SocialIcon from '@/components/social-icons'
import Image from '@/components/Image'
import { PageSEO } from '@/components/SEO'
import { ReactNode } from 'react'
import type { Authors } from 'contentlayer/generated'

interface Props {
  children: ReactNode
  content: Omit<Authors, '_id' | '_raw' | 'body'>
}

export default function AboutLayout({ children, content }: Props) {
  const { name, avatar, occupation, company, email, twitter, linkedin, github } = content

  return (
    <>
      <PageSEO
        title={`Acerca del proyecto Plexbooks`}
        description={`Plexbooks es un proyecto de traducción al español de documentación de tecnologías open
            source`}
        noIndex={true}
      />
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Acerca de Plexbooks
          </h1>
        </div>
        <div className="prose max-w-none pt-8 pb-8 dark:prose-dark xl:col-span-2">
          <p>
            Plexbooks es un proyecto de traducción al español de documentación de tecnologías open
            source, iniciando por algunas de las tecnologías más populares para el desarrollo web y
            de aplicaciones móviles.
          </p>
          <p>
            El proyecto pretende no solo realizar las traducciones, sino también mantenerlas siempre
            actualizadas y sincronizadas con la versión original en inglés.
          </p>
          <p>
            Plexbooks es un proyecto open source en el que cualquier persona puede colaborar a
            través de los repositorios en nuestra cuenta de{' '}
            <a
              href="https://github.com/plexbooks"
              target="_blank"
              className="text-sky-600 hover:text-sky-800"
              rel="noreferrer"
            >
              GitHub
            </a>
            .
          </p>
        </div>
      </div>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="mt-7 pt-4 pb-6 md:space-y-5">
          <h2 className="text-2xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-3xl sm:leading-10 md:text-5xl md:leading-14">
            Traducciones siempre actualizadas
          </h2>
        </div>
        <div className="prose max-w-none pt-8 pb-8 dark:prose-dark xl:col-span-2">
          <p>
            Luego de finalizar la primera traducción completa de una documentación, nuestro sistema
            monitorea las modificaciones (commits) que se realicen en el repositorio original en
            inglés. En ese momento analizamos el commit y aplicamos los mismos cambios (si están
            relacionados con el contenido de documentación) al repositorio de la traducción al
            español.
          </p>
          <p>
            De esta manera las traducciones se mantienen siempre actualizadas y sincronizadas con la
            versión en inglés.
          </p>
        </div>
      </div>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="mt-7 pt-4 pb-6 md:space-y-5">
          <h2 className="text-2xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-3xl sm:leading-10 md:text-5xl md:leading-14">
            Equipo
          </h2>
        </div>
        <div className="items-start space-y-2 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:space-y-0">
          <div className="flex flex-col items-center pt-8">
            <Image
              src={avatar}
              alt="avatar"
              width="100px"
              height="100px"
              className="h-48 w-48 rounded-full"
            />
            <h3 className="pt-4 pb-2 text-2xl font-bold leading-8 tracking-tight">{name}</h3>
            <div className="text-gray-500 dark:text-gray-400">{occupation}</div>
            <div className="text-gray-500 dark:text-gray-400">{company}</div>
            <div className="flex space-x-3 pt-6">
              <SocialIcon kind="mail" href={`mailto:${email}`} />
              <SocialIcon kind="github" href={github} />
              <SocialIcon kind="linkedin" href={linkedin} />
              <SocialIcon kind="twitter" href={twitter} />
            </div>
          </div>
          <div className="prose max-w-none pt-12 pb-8 dark:prose-dark xl:col-span-2">
            {children}
          </div>
        </div>
      </div>
    </>
  )
}
