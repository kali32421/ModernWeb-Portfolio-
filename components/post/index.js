import CountUp from '@components/countup'
import Page from '@components/page'
import { Eye } from 'lucide-react'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import {
  getVisitorCount,
  incrementVisitorCount
} from '../../services/firebaseService'
import Navigation from './navigation'
import styles from './post.module.css'

function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

const Post = ({
  title,
  slug,
  html,
  hidden,
  og,
  description,
  date,
  previous,
  next
}) => {
  const [firebaseValue, setFirebaseValue] = useState(0)

  useEffect(() => {
    const updateCount = async () => {
      try {
        await incrementVisitorCount(slug)
        const count = await getVisitorCount(slug)
        setFirebaseValue(count)
      } catch (error) {
        console.error(error)
      }
    }
    updateCount()
  }, [slug])

  return (
    <Page
      slug={slug}
      title={title}
      description={description}
      showHeaderTitle={false}
      image={
        og && og === true
          ? `https://res.cloudinary.com/dsdlhtnpw/image/upload/${slug}.png`
          : og
      }
    >
      <Head>
        {hidden && <meta name="robots" content="noindex" />}
        {date && <meta name="date" content={date} />}
      </Head>
      <div style={{ display: 'flex', marginBottom: '20px' }}>
        <Eye />{' '}
        <a style={{ marginLeft: '10px' }}>
          <CountUp
            from={0}
            to={firebaseValue}
            separator=","
            direction="up"
            duration={1}
            className="count-up-text"
          />
        </a>
      </div>
      <article
        dangerouslySetInnerHTML={{
          __html: `<span class="${styles.date}">${date}</span><h1 class="${
            styles.title
          }">${escapeHtml(title)}</h1>${html}`
        }}
      />
      <Navigation previous={previous} next={next} />
    </Page>
  )
}

export default Post
