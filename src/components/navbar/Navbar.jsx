import styles from './Navbar.module.css';
import Image from 'next/image';
import Link from 'next/link';
import AuthLinks from '../authLinks/AuthLinks';
import ThemeToggle from '../themeToggle/ThemeToggle';

export default function Navbar() {
  return (
    <div className={styles.container}>
      <div className={styles.social}>
      <Image src="/facebook.png" alt="facebook" width={25} height={25}/>
      <Image src="/instagram.png" alt="instagram" width={25} height={25}/>
      <Image src="/tiktok.png" alt="tiktok" width={25} height={25}/>
      <Image src="/youtube.png" alt="youtube" width={25} height={25}/>
      </div>
      <div className={styles.logo}>Jaberblog</div>
      <div className={styles.links}>
        <ThemeToggle />
        <Link className={styles.link} href={"/"}>Home</Link>
        <Link className={styles.link} href={"/contact"}>Contact</Link>
        <Link className={styles.link} href={"/about"}>About</Link>
        <AuthLinks />
      </div>
    </div>
  )
}
