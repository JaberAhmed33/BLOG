import styles from "./Featured.module.css";
import Image from "next/image";

export default function Featured() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        <b>Hi, its Jaber Dev Blog.</b> Discover my stories and creative
        ideas.
      </h1>
      <div className={styles.post}>
        <div className={styles.imgContainer}>
          <Image className={styles.image} src="/p1.jpeg" alt="/" fill />
        </div>
        <div className={styles.textContainer}>
          <h2 className={styles.post_title}>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</h2>
          <p className={styles.post_text}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officia
            veritatis mollitia tenetur at porro vel libero dolorem est dolorum
            impedit voluptatem natus, perferendis deserunt delectus. Accusantium
            optio cum animi cumque!
          </p>
          <button className={styles.btn}>Read More</button>
        </div>
      </div>
    </div>
  );
}
