import SeccionFilters from "./quickAccessFilters/seccionFilters";
import Cards from "./Cards/Cards";
import styles from "./Home.module.css";

export default function Home({ onSearch }) {
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
            <h1>More Video Games</h1>
          </div>
          <div className={styles.containerCards}>
            <Cards onSearch={onSearch} />
          </div>
        </div>
      </section>
    </div>
  );
}
