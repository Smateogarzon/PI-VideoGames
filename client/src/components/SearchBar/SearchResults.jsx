import MiniCardResult from './MiniCardResult';
import styles from './SerachResults.module.css';
export default function SearchResults({data}) {
  return (
    data.length > 0 && (
      <div className={styles.containerResults}>
        <h2>Games...</h2>
        {data.map((item) => (
          <MiniCardResult key={item.id} {...item} />
        ))}
      </div>
    )
  );
}
