import {useState} from 'react';
import FilterTemplate from './FilterTemplate';
import {Genres, ImgsGenres} from '../../../assets/genres.js';
import {LuChevronUp, LuChevronDown} from 'react-icons/lu';
import {GrDislike, GrLike} from 'react-icons/gr';

import styles from './SeccionFilters.module.css';

export default function SeccionFilters() {
  const [showGenres, setShowGenres] = useState(false);
  const genres = Genres;
  const imgGenres = ImgsGenres;

  return (
    <div className={styles.seccionFilters}>
      <h1>Home</h1>
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
          <span>A - Z</span>
          <span>Z - A</span>
        </div>
      </div>
    </div>
  );
}
