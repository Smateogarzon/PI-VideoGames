import {CgMathPlus, CgMathMinus} from 'react-icons/cg';
import {Link} from 'react-router-dom';
import {useState} from 'react';
import {SlArrowRight} from 'react-icons/sl';
import Icon from '../../SearchBar/Icons';
import styles from './Card.module.css';
export default function card({data, data2}) {
  const [isFav, setIsFav] = useState(false);

  const {id, background_image, name, platforms, released, genres, rating} = data
    ? data.data
    : data2;
  const newGenres = data ? genres.map((e) => e.name) : data2.genres;

  const handleFavorite = () => {
    if (!isFav) {
      setIsFav(true);
      return;
    }
    setIsFav(false);
  };

  return (
    <div className={styles.containerCardMini}>
      <div className={styles.top}>
        <div className={styles.containerImg}>
          <img src={background_image} alt={`${name}`} />
        </div>

        <div className={styles.detail}>
          <div className={styles.coninerIcon}>
            <Icon cardP={platforms} />
          </div>
          <div className={styles.coninerName}>
            <Link
              to={`/detail/${id}`}
              style={{textDecoration: 'none', color: 'white'}}>
              <h2>{name}</h2>
            </Link>
          </div>
          <div className={styles.containerBtn}>
            {!isFav && (
              <button className={styles.btnFav} onClick={handleFavorite}>
                <CgMathPlus />
                <span className={styles.btnFavText}>Add Library</span>
              </button>
            )}
            {isFav && (
              <button className={styles.btnFav} onClick={handleFavorite}>
                <CgMathMinus />
                <span className={styles.btnFavText}>Delete Library</span>
              </button>
            )}
          </div>
        </div>

        <article className={styles.containerDetail}>
          <ul>
            <li>
              <p>Release date:</p>
              <span>{released}</span>
            </li>
            <li>
              <p>Genres:</p>
              <span>
                {newGenres.length > 0 ? newGenres.join(' ,') : 'undefined'}
              </span>
            </li>
            <li>
              <p>Rating</p>
              <span>{rating}</span>
            </li>
          </ul>
          <Link to={`/detail/${id}`} style={{textDecoration: 'none'}}>
            <div className={styles.containerBtnShow}>
              <div className={styles.btmSow}>
                <button>show more </button>
                <span>
                  <SlArrowRight />
                </span>
              </div>
            </div>
          </Link>
        </article>
      </div>
    </div>
  );
}
