import Link from "next/link";
import styles from "./CategoryList.module.css";
import Image from "next/image";

const getData = async () => {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/categories`);
  if (!res.ok) {
    throw new Error("Failed");
  }
  return res.json();
};

export default async function CategoryList() {
  const data = await getData();
  
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Popular Categories</h1>
      <div className={styles.categories}>
        {data.map((e) => (
          <Link
            href={`/blog?cat=${e.slug}`}
            className={`${styles.category} ${styles[e.slug]}`}
            key={e._id}
          >
            {e.img && (
              <Image
                src={e.img}
                alt="style"
                width={50}
                height={50}
                className={styles.image}
              />
            )}
            {e.title}
          </Link>
        ))}
      </div>
    </div>
  );
}
