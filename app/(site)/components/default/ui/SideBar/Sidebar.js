'use client'
import Link from 'next/link'
import styles from './sidebar.module.scss'
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function Sidebar({categories,tags,pages}) {


  if (!categories || !tags || !pages) {
    return (
      <div className={styles.Sidebar}>
        <Skeleton height={200} style={{ marginBottom: '10px' }} />
        <Skeleton height={250} style={{ marginBottom: '10px' }} />
        <Skeleton height={120} style={{ marginBottom: '10px' }} />
        <Skeleton height={250} style={{ marginBottom: '10px' }} />
      </div>
    );
  }

  return (
    <div className={styles.Sidebar}>
      <div className={styles.Widget}>
        <div className={styles.WidgetTitle}>
          <h3>About Us</h3>
        </div>
        <div className={styles.WidgetContent}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis 
        </div>
      </div>

      <div className={styles.Widget}>
        <div className={styles.WidgetTitle}>
          <h3>Categories</h3>
        </div>
        <div className={styles.WidgetContent}>
          <div className={styles.WidgetList}>
              {categories.map(cat=>{
                return <Link href={'/category/'+cat.title} key={cat.id} >{cat.title}</Link>
              })}
          </div>
        </div>
      </div>

      <div className={styles.Widget}>
        <div className={styles.WidgetTitle}>
          <h3>Tags</h3>
        </div>
        <div className={styles.WidgetContent}>
          <div className={styles.WidgetCloud}>
              {tags.map(tag=>{
                return <Link key={tag.id} href={'/tags/'+ tag.title}>{tag.title}</Link>
              })}
          </div>
        </div>
      </div>

      <div className={styles.Widget}>
        <div className={styles.WidgetTitle}>
          <h3>Pages</h3>
        </div>
        <div className={styles.WidgetContent}>
          <div className={styles.WidgetList}>
              {pages.map(page=>{
                return <Link href={'/'+page.slug} key={page.id} >{page.title}</Link>
              })}
          </div>
        </div>
      </div>

    </div>
  )
}
