import { CgMathPlus, CgMathMinus } from "react-icons/cg";
import { useState } from "react";
import Icon from "../../SearchBar/Icons";
import styles from "./Card.module.css";
export default function card({ data }) {
  const [isFav, setIsFav] = useState(false);
  const { background_image, name, platforms } = data.data;

  const handleFavorite = () => {
    if (!isFav) {
      setIsFav(true);
      return;
    }
    setIsFav(false);
  };
  return (
    <div className={styles.containerCard}>
      <div className={styles.containerImg}>
        <img src={background_image} alt={`${name}`} />
      </div>
      <div className={styles.detail}>
        <div className={styles.coninerIcon}>
          <Icon cardP={platforms} />
        </div>
        <div className={styles.coninerName}>
          <samp>{name}</samp>
        </div>
        <div className={styles.containerBtn}>
          {!isFav && (
            <button onClick={handleFavorite}>
              <CgMathPlus />
            </button>
          )}
          {isFav && (
            <button onClick={handleFavorite}>
              <CgMathMinus />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
