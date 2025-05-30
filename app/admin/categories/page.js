import CategoriesTable from './ui/CategoriesTable'
import styles from './styles/categoriesStyles..module.scss'
import AddCategoryForm from './ui/AddCategoryForm'

export default function page() {
  return (
    <>
    <div className={styles.categoriesWrapperHead}>
    <h1>Blog Categories : </h1>
    <p>list of Categories to manage you can create update delete as you please </p>
    </div>

    <div className={styles.categoriesWrapper}>
        <div className={styles.categoriesWrapperForm}>
          <AddCategoryForm />
        </div>
        <div className={styles.categoriesWrapperTable}>
            <CategoriesTable />
        </div>
    </div>
    </>
  )
}
