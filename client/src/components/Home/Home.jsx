import SeccionFilters from "./quickAccessFilters/seccionFilters";
import Cards from "./Cards/Cards.jsx";
import styles from "./Home.module.css";
import Detail from "../Detail/Detail.jsx";
import { useLocation } from "react-router-dom";
import CreataeVideoG from "./FormVideoGame/CreataeVideoG.jsx";
import { useSelector } from "react-redux";
export default function Home({ onSearch }) {
  const location = useLocation();
  return (
    <div className={styles.containerHome}>
      <section style={{ width: "18%" }}>
        <div className={styles.sectionHome}>
          <SeccionFilters />
        </div>
      </section>
      <section style={{ width: "76%" }}>
        <div className={styles.sectionHome2}>
          <div className={styles.containerName}>
            {location.pathname !== "/detail/:id" &&
              (location.pathname === "/createVideoGame" ? (
                <h1 className={styles.h1C}>Create Video Game</h1>
              ) : (
                <h1>More Video Games</h1>
              ))}
          </div>
          <div className={styles.containerCards}>
            {location.pathname === "/createVideoGame" ? (
              <CreataeVideoG />
            ) : location.pathname === "/detail/:id" ? (
              <Detail />
            ) : (
              <Cards onSearch={onSearch} />
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
