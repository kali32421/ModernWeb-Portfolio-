import CountUp from '@components/countup'
import Link from '@components/link'
import cn from 'classnames'
import { Eye } from 'lucide-react'
import { memo, useEffect, useState } from 'react'
import { getVisitorCount } from '../../services/firebaseService'
import styles from './text.module.css'

const TextEntry = ({ title, description, type, comment, href, as, slug }) => {
  const [viewCount, setViewCount] = useState(0)

  useEffect(() => {
    getVisitorCount(`${slug}`).then(count => setViewCount(count))
  }, [slug])

  return (
    <li className={styles.item}>
      <Link
        href={href}
        as={as}
        external={!as}
        title={`${title} (${description})`}
        className={styles.link}
      >
        <div className={styles.type}>
          {type}
          <span style={{ display: 'flex' }}>
            <Eye />
            <span style={{ marginLeft: '5px', color: 'var(--fg)' }}>
              <CountUp
                from={0}
                to={viewCount}
                separator=","
                direction="up"
                duration={1}
                className="count-up-text"
              />
            </span>
          </span>
        </div>

        <div>
          <p className={cn(styles.title, 'clamp')}>{title}</p>
          {description && (
            <p className={cn(styles.description, 'clamp')}>{description}</p>
          )}
        </div>
      </Link>
    </li>
  )
}

export default memo(TextEntry)
