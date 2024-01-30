import Icons from './Icons';
import styles from './MiniCardResult.module.css';
import {Link} from 'react-router-dom';

export default function MiniCardResult(props) {
  const handleImageClick = () => {
    props.clearSearch();
  };

  return (
    <div className={styles.containerResult}>
      <Link to={`/detail/${props.id}`}>
        <div className={styles.containerImg} onClick={handleImageClick}>
          <img src={props.image} alt={props.name} />
        </div>
      </Link>
      <div className={styles.containerText}>
        <div className={styles.containerIcons}>
          <Icons platforms={props.platforms} />
        </div>

        <h5>{props.name}</h5>
      </div>
    </div>
  );
}
