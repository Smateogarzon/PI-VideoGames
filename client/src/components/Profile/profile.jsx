import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styles from "./Profile.module.css";
export default function Profile() {
  const name = useSelector((state) => state.userName);
  return (
    <div className={styles.containerProfile}>
      <div>
        <h1>{name}mateo</h1>
      </div>
      <article className={styles.containerCards}>
        <div
          style={{
            backgroundImage:
              'url("https://images-porsche.imgix.net/-/jssmedia/9D90CE5F6573404EB8D852A7A95AB623_1719E7D5620B469EBBBBF7D4B572F8F4_forza-horizon-5-the-complete-list-of-porsche-cars?mw=375&h=auto")',
          }}
        >
          <div className={styles.shadow}>
            <Link
              to="/listLibrary"
              style={{ textDecoration: "none", color: "white" }}
            >
              <h2>your library of video Games</h2>
            </Link>
            <span>0</span>
          </div>
        </div>
        <div
          style={{
            backgroundImage: `url("https://highxtar.com/wp-content/uploads/2023/10/Thumb_Minecraft_2023_Web_Nueva-1440x1080.jpg")`,
          }}
        >
          <div className={styles.shadow}>
            <Link
              to="/listVideoGame"
              style={{ textDecoration: "none", color: "white" }}
            >
              <h2>your created video games</h2>
            </Link>
            <span>0</span>
          </div>
        </div>
      </article>
    </div>
  );
}
