import styles from '@/app/admin/categories/styles/categoriesStyles..module.scss' //reusing same style from categories
import TagsTable from './ui/TagsTable'
import AddTagForm from './ui/AddTagForm'

export default function page() {
  return (
    <>
    <div className={styles.categoriesWrapperHead}>
    <h1>Blog Tags : </h1>
    <p>list of Tags to manage you can create update delete as you please </p>
    </div>

    <div className={styles.categoriesWrapper}>
        <div className={styles.categoriesWrapperForm}>
          <AddTagForm />
        </div>
        <div className={styles.categoriesWrapperTable}>
            <TagsTable />
        </div>
    </div>
    </>
  )
}
