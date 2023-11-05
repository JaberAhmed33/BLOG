import styles from "./CardList.module.css";
import Pagination from "./../pagination/Pagination";
import Card from "../card/Card";

const getData = async (page, cat) => {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/posts?page=${page}&cat=${cat}`, {cache: "no-store"});
  if (!res.ok) {
    throw new Error("Failed");
  }
  return res.json();
};

export default async function CardList({page, cat}) {

  const {posts, count} = await getData(page, cat);

  // console.log("count ===> ", count);

  const POST_PER_PAGE = 2;

  const hasPrev = POST_PER_PAGE * (page - 1) > 0
  const hasNext = POST_PER_PAGE * (page - 1) + POST_PER_PAGE < count

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Recent Posts</h1>
      <div className={styles.posts}>
        {
          posts?.map((e) => (
            <Card item={e} key={e._id}/>
          ))
        }
      </div>
      <Pagination page={page} hasNext={hasNext} hasPrev={hasPrev}/>
    </div>
  );
}
