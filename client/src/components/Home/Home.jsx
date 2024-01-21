import SeccionFilters from './quickAccessFilters/seccionFilters';
import styles from './Home.module.css';

export default function Home() {
  return (
    <div className={styles.containerHome}>
      <section className={styles.sectionHome}>
        <SeccionFilters />
      </section>
      <section>
        <div>
          <h1>More Video Games</h1>
        </div>
        <section></section>
      </section>
    </div>
  );
}
