import { memo } from 'react'
import styles from './footer.module.css'

const RenderFooter = () => {
  return (
    <div className={styles.footer_container}>
      <footer id="section-footer" className={styles.page_section}>
        <span className={styles.footer}>
          <a
            href="https://steamcommunity.com/id/Devollox/"
            className={styles.wrapper_footer}
          >
            <span>Steam</span>
          </a>
          <a
            href="https://github.com/devollox"
            target="_blank"
            className={styles.wrapper_footer}
          >
            <span>GitHub</span>
          </a>
          <a
            href="https://ru.stackoverflow.com/users/560760/devollox"
            target="_blank"
            className={styles.wrapper_footer}
          >
            <span>stackoverflow</span>
          </a>
          <a
            href="https://www.reddit.com/user/Devollox/"
            target="_blank"
            className={styles.wrapper_footer}
          >
            <span>reddit</span>
          </a>
        </span>
        <div className={styles.page_section_inner}>
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
            </div>
          </section>
        </div>
      </footer>
    </div>
  )
}
export default memo(RenderFooter)
