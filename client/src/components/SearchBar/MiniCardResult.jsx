import Icons from "./Icons";
import styles from "./MiniCardResult.module.css";

export default function MiniCardResult(props) {
  return (
    <div className={styles.containerResult}>
      <div className={styles.containerImg}>
        <img src={props.image} alt={props.name} />
      </div>
      <div className={styles.containerText}>
        <div className={styles.containerIcons}>
          <Icons platforms={props.platforms} />
        </div>

        <h5>{props.name}</h5>
      </div>
    </div>
  );
}
