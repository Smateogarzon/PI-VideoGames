import {useState} from 'react';
import FilterTemplate from './FilterTemplate';
import {Genres, ImgsGenres} from '../../../assets/genres.js';
import {LuChevronUp, LuChevronDown} from 'react-icons/lu';
import {GrDislike, GrLike} from 'react-icons/gr';
import styles from './SeccionFilters.module.css';
import {useDispatch} from 'react-redux';
import {Link, useNavigate} from 'react-router-dom';
import {classGenres} from '../../../Redux/actions.js';
import {smoothScrollToTop} from '../../../assets/scroll.js';

export default function SeccionFilters() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showGenres, setShowGenres] = useState(false);
  const genres = Genres;
  const imgGenres = ImgsGenres;

  const handleReload = () => {
    navigate('/');
    window.location.reload();
  };
  const handleClick = (genre) => {
    dispatch(classGenres(genre));
    navigate(`/filters/${genre}`);
    smoothScrollToTop();
  };
  return (
    <div className={styles.seccionFilters}>
      <Link
        to={'/'}
        style={{textDecoration: 'none', color: 'white'}}
        onClick={handleReload}>
        <h1>Home</h1>
      </Link>

      <Link
        to={'/createVideoGame'}
        style={{textDecoration: 'none', color: 'white'}}>
        <h2>Create Video Game</h2>
      </Link>
      <div className={styles.containerFilters}>
        <h2>Genres</h2>
        <ul>
          {genres.map(
            (genre, index) =>
              index < 4 && (
                <FilterTemplate
                  key={index}
                  genre={genre}
                  imgGenre={imgGenres[index]}
                />
              ),
          )}
          {showGenres &&
            genres
              .map((genre, index) => (
                <FilterTemplate
                  key={index}
                  genre={genre}
                  imgGenre={imgGenres[index]}
                />
              ))
              .slice(4)}
        </ul>
        {!showGenres && (
          <div onClick={() => setShowGenres(true)} className={styles.show}>
            <span>
              <LuChevronDown />
            </span>
            <p>Show All</p>
          </div>
        )}
        {showGenres && (
          <div onClick={() => setShowGenres(false)} className={styles.show}>
            <span>
              <LuChevronUp />
            </span>
            <p>Hide</p>
          </div>
        )}
        <h2>Rating</h2>
        <ul style={{padding: '0px', height: '20%'}}>
          <FilterTemplate
            genre={<GrLike style={{color: '#8929FC', fontSize: '35px'}} />}
            text={'Top Rated'}
          />
          <FilterTemplate
            genre={<GrDislike style={{color: '#8929FC', fontSize: '35px'}} />}
            text={'Lowest Rated'}
          />
        </ul>
        <h2>By Name</h2>
        <div className={styles.byName}>
          <span onClick={() => handleClick('name')}>A - Z</span>
          <span onClick={() => handleClick('-name')}>Z - A</span>
        </div>
      </div>
    </div>
  );
}
