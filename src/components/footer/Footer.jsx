import Link from "next/link";
import styles from "./Footer.module.css";
import Image from "next/image";

export default function Footer() {
  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <div className={styles.logo}>
          <Image src="/logo.jpg" alt="jaber blog" width={57} height={57} className={styles.image}/>
          <h1 className={styles.logoText}>Jaberblog</h1>
        </div>
        <p className={styles.desc}>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ratione,
          consequatur temporibus? Sint esse quis aliquid est totam! Temporibus
          illo dolorum earum harum ducimus.
        </p>
        <div className={styles.icons}>
          <Image src="/facebook.png" alt="facebook" width={17} height={17} />
          <Image src="/instagram.png" alt="instagram" width={17} height={17} />
          <Image src="/tiktok.png" alt="tiktok" width={17} height={17} />
          <Image src="/youtube.png" alt="youtube" width={17} height={17} />
        </div>
      </div>
      <div className={styles.links}>
        <div className={styles.list}>
          <span className={styles.listTitle}>Links</span>
          <Link href="/">Home</Link>
          <Link href="/">Blog</Link>
          <Link href="/">About</Link>
          <Link href="/">Contact</Link>
        </div>

        <div className={styles.list}>
          <span className={styles.listTitle}>Tags</span>
          <Link href="/">Style</Link>
          <Link href="/">Food</Link>
          <Link href="/">Coding</Link>
          <Link href="/">Travel</Link>
        </div>

        <div className={styles.list}>
          <span className={styles.listTitle}>Social</span>
          <Link href="/">Facebook</Link>
          <Link href="/">Instagram</Link>
          <Link href="/">Tiktok</Link>
          <Link href="/">Youtube</Link>
        </div>
      </div>
    </div>
  );
}
