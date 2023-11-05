"use client";
import { useEffect, useState } from "react";
import styles from "./write.module.css";
import Image from "next/image";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "@/utils/firebase";

export default function Write() {
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState("");
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [titleValue, setTitleValue] = useState("");
  const [catSlug, setCatSlug] = useState("");

  const { status } = useSession();
  const redirect = useRouter();

  const storage = getStorage(app);

  useEffect(() => {
    const upload = () => {
      const uniName = new Date().getDate() + file.name;

      const storageRef = ref(storage, uniName);

      const uploadTask = uploadBytesResumable(storageRef, file);

      // Register three observers:
      // 1. 'state_changed' observer, called any time the state changes
      // 2. Error observer, called on failure
      // 3. Completion observer, called on successful completion
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
        
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setUrl(downloadURL);
          });
        }
      );
    };

    file && upload();
  }, [file]);

  if (status === "loading") {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (status === "unauthenticated") {
    redirect.push("/");
  }

  const slugify = (str) =>
    str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

  const handleSubmit = async () => {
    const res = await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify({
        title: titleValue,
        desc: value,
        img: url,
        slug: slugify(titleValue),
        catSlug: catSlug || "style",
      }),
    });

    console.log(res);
  };

  return (
    <div className={styles.container}>
      <input
        type="text"
        placeholder="Title"
        className={styles.input}
        onChange={(e) => setTitleValue(e.target.value)}
        value={titleValue}
      />
      <select
        className={styles.select}
        onChange={(e) => setCatSlug(e.target.value)}
        name="categories"
      >
        <option value="">--Please choose an option--</option>
        <option value="style">style</option>
        <option value="fashion">fashion</option>
        <option value="food">food</option>
        <option value="culture">culture</option>
        <option value="travel">travel</option>
        <option value="coding">coding</option>
      </select>

      <div className={styles.editor}>
        <button className={styles.btn} onClick={() => setOpen(!open)}>
          <Image src="/plus.png" alt="add button" width={17} height={17} />
        </button>
        {open && (
          <div className={styles.add}>
            <input
              type="file"
              id="image"
              onChange={(e) => setFile(e.target.files[0])}
              style={{ display: "none" }}
            />
            <button className={styles.addBtn}>
              <label htmlFor="image">
                <Image
                  src="/image.png"
                  alt="add image"
                  width={17}
                  height={17}
                />
              </label>
            </button>

            <button className={styles.addBtn}>
              <Image
                src="/external.png"
                alt="add file"
                width={17}
                height={17}
              />
            </button>

            <button className={styles.addBtn}>
              <Image src="/video.png" alt="add video" width={17} height={17} />
            </button>
          </div>
        )}

        <ReactQuill
          className={styles.textArea}
          theme="bubble"
          value={value}
          onChange={setValue}
          placeholder="Tell your story..."
        />
      </div>
      <button className={styles.publish} onClick={handleSubmit}>
        Publish
      </button>
    </div>
  );
}
