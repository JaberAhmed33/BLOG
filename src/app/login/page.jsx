'use client';
import { signIn, useSession } from "next-auth/react";
import styles from "./login.module.css";
import { useRouter } from "next/navigation";

export default function Login() {
  const {data, status} = useSession();
  console.log(status);
  const redirect = useRouter();

  if (status === "loading") {
    return <div className={styles.loading}>Loading...</div>
  }

  if (status === "authenticated") {
    redirect.push("/");
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.socialBtn} onClick={() => signIn("google")}>Sign in with Google</div>
        <div className={styles.socialBtn}>Sign in with Github</div>
        <div className={styles.socialBtn}>Sign in with Facebook</div>
      </div>
    </div>
  );
}
