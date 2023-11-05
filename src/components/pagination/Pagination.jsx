"use client";
import { useRouter } from "next/navigation";
import styles from "./Pagination.module.css";

export default function Pagination({ page, hasPrev, hasNext }) {
  const router = useRouter();
  console.log(!hasPrev);
  return (
    <div className={styles.container}>
      <button
        className={styles.btn}
        onClick={() => router.push(`?page=${page - 1}`)}
        disabled={!hasPrev}
      >
        Previous
      </button>
      <button
        className={styles.btn}
        onClick={() => router.push(`?page=${page + 1}`)}
        disabled={!hasNext}
      >
        Next
      </button>
    </div>
  );
}
