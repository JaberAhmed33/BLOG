import styles from "./Menu.module.css";
import MenuPosts from "../menuPosts/MenuPosts";
import MenuCategory from "../menuCategory/MenuCategory";

export default function Menu() {
  return (
    <div className={styles.container}>
      <h2 className={styles.subtitle}>what's hot</h2>
      <h1 className={styles.title}>Most Popular</h1>

      <MenuPosts withImage={false}/>

      <h2 className={styles.subtitle}>Discover by topic</h2>
      <h1 className={styles.title}>Categories</h1>
      
      <MenuCategory />

      <h2 className={styles.subtitle}>Chosen by the editor</h2>
      <h1 className={styles.title}>Editors Pick</h1>

      <MenuPosts withImage={true}/>
    </div>
  );
}
