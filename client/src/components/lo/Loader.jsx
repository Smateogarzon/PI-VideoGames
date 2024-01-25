import styles from './Loader.module.css';
export function LoaderMax() {
  return (
    <div className={styles.container}>
      <div className={styles.loader}></div>
    </div>
  );
}

export function LoaderMin() {
  return (
    <div className={styles.containerMin}>
      <div className={styles.loaderMin}></div>
    </div>
  );
}
