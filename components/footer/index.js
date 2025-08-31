import CountUp from '@components/countup'
import { Eye } from 'lucide-react'
import { memo, useEffect, useState } from 'react'
import {
  getVisitorCount,
  incrementVisitorCount
} from '../../services/firebaseService'
import styles from './footer.module.css'

const RenderFooter = () => {
  const [firebaseValue, setFirebaseValue] = useState(0)

  useEffect(() => {
    const updateCount = async () => {
      try {
        await incrementVisitorCount('index')
        const count = await getVisitorCount('index')
        setFirebaseValue(count)
      } catch (error) {
        console.error(error)
      }
    }
    updateCount()
  }, [])

  return (
    <div className={styles.footer_container}>
      <footer id="section-footer" className={styles.page_section}>
        <div className={styles.page_section_inner}>
          <section
            id="footer-top"
            className={`${styles.footer_top} ${styles.hide_mobile}`}
          >
            <div className={styles.footer_column}>
              <h3 className={styles.footer_column_header}>Community</h3>
              <a
                rel="noreferrer noopener"
                target="_blank"
                href="/discord"
                className={styles.footer_column_item}
              >
                <span>Discord</span>
              </a>
              <a
                rel="noreferrer noopener"
                target="_blank"
                href="https://github.com/devollox/"
                className={styles.footer_column_item}
              >
                <span>GitHub</span>
              </a>
              <a
                rel="noreferrer noopener"
                target="_blank"
                href="https://steamcommunity.com/id/Devollox/"
                className={styles.footer_column_item}
              >
                <span>Steam</span>
              </a>
            </div>
            <div className={styles.footer_column}>
              <h3 className={styles.footer_column_header}>Content</h3>
              <a href="/" className={styles.footer_column_item}>
                <span>Developers</span>
              </a>
            </div>
            <div className={styles.footer_column}>
              <h3 className={styles.footer_column_header}>Help</h3>
              <a
                href="/404"
                target="_blank"
                className={styles.footer_column_item}
              >
                Page of life
              </a>
            </div>
          </section>
          <section
            id="footer-bottom"
            className={
              styles.flex_container +
              ' ' +
              styles.wrap +
              ' ' +
              styles.align_center +
              ' ' +
              styles.justify_between
            }
          >
            <div
              className={styles.flex_container + ' ' + styles.wrap}
              id="footer-copyright-container"
            >
              <div
                className={styles.footer_copyright + ' ' + styles.text_center}
              >
                <span style={{ color: '#95989d' }}>Dev</span>{' '}
                <a className={styles.copyright_logo}>Ⓓ</a> <a> Devollox.</a>
              </div>
            </div>
            <div
              className={styles.flex_container + ' ' + styles.wrap}
              id="footer-copyright-container"
            >
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
            </div>
          </section>
        </div>
      </footer>
    </div>
  )
}
export default memo(RenderFooter)
