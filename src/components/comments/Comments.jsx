"use client";
import Image from "next/image";
import styles from "./comments.module.css";
import Link from "next/link";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import { useState } from "react";

const fetcher = async (url) => {
  const res = await fetch(url);

  const data = await res.json();

  if (!res.ok) {
    const error = new Error(data.message);
    throw error;
  }

  return data;
};

export default function Comments({ postSlug }) {
  const { status } = useSession();

  const { data, mutate, isLoading } = useSWR(
    `${process.env.NEXTAUTH_URL}/api/comments?postSlug=${postSlug}`,
    fetcher
  );

  const [desc, setDesc] = useState("");

  const handleSubmit = async () => {
    await fetch("/api/comments", {
      method: "POST", 
      body: JSON.stringify({ desc, postSlug }),
    });
    setDesc("");
    mutate();
  };

  console.log(data);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Comments</h1>

      {status === "authenticated" ? (
        <div className={styles.write}>
          <textarea
            placeholder="write a comment..."
            className={styles.input}
            onChange={(e) => setDesc(e.target.value)}
            value={desc}
          />
          <button className={styles.btn} onClick={handleSubmit}>
            Send
          </button>
        </div>
      ) : (
        <Link href="/login">Login to write a comment...</Link>
      )}

      <div className={styles.comments}>
        {isLoading
          ? "Loading..."
          : data?.map((e) => (
              <div className={styles.comment} key={e.id}>
                <div className={styles.user}>
                  {e?.user?.image && (
                    <Image
                      src={e.user.image}
                      alt="blog image"
                      width={50}
                      height={50}
                      className={styles.image}
                    />
                  )}

                  <div className={styles.userInfo}>
                    <span className={styles.username}>{e.user.name}</span>
                    <span className={styles.date}>
                      {e.createdAt.substring(0, 10)}
                    </span>
                  </div>
                </div>
                <p className={status.desc}>{e.desc}</p>
              </div>
            ))}
      </div>
    </div>
  );
}
