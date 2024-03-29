import {CgMathPlus, CgMathMinus} from 'react-icons/cg';
import {Link} from 'react-router-dom';
import {useState, useEffect} from 'react';
import {SlArrowRight} from 'react-icons/sl';
import {useSelector, useDispatch} from 'react-redux';
import {lib, arrayIds, deleteArrayIds} from '../../../Redux/actions';
import Icon from '../../SearchBar/Icons';
import styles from './Card.module.css';
import {toast, Bounce} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function card({data, data2, libState}) {
  const dispatch = useDispatch();
  const [isFav, setIsFav] = useState(false);

  const access = useSelector((state) => state.access);
  const ids = useSelector((state) => state.ids);
  const {id, background_image, name, platforms, released, genres, rating} = data
    ? data.data
    : data2;
  const newGenres = data ? genres.map((e) => e.name) : data2.genres;
  useEffect(() => {
    if (libState) {
      setIsFav(libState);
    }
    if (ids.includes(id)) {
      setIsFav(true);
    }
  }, []);

  const handleFavorite = () => {
    if (!isFav) {
      setIsFav(true);
      fetch(`http://localhost:3001/add_library/${id}`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
      })
        .then((response) => {
          dispatch(lib());
          dispatch(arrayIds(id));
        })
        .catch((error) => console.log(error));
      return;
    }
    setIsFav(false);
    fetch(`http://localhost:3001/delete_library/${id}`, {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'},
      credentials: 'include',
    })
      .then((response) => {
        dispatch(lib());
        dispatch(deleteArrayIds(id));
      })
      .catch((error) => console.log(error));
  };
  const notify = () =>
    toast.warn('💣💥Login to create a video game💣💥', {
      position: 'top-center',
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
      transition: Bounce,
    });
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
              <button
                className={styles.btnFav}
                onClick={access ? handleFavorite : notify}>
                <CgMathPlus />
                <span className={styles.btnFavText}>Add Library</span>
              </button>
            )}

            {isFav && (
              <button
                className={styles.btnFav}
                onClick={access ? handleFavorite : notify}>
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
