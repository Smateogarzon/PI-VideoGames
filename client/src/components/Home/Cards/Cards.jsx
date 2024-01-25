import {useSelector, useDispatch} from 'react-redux';
import {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import {classGenres} from '../../../Redux/actions';
import Card from './Card';
import {LoaderMax} from '../../lo/Loader';
import {SlArrowRight, SlArrowLeft} from 'react-icons/sl';
import {smoothScrollToTop} from '../../../assets/scroll';

import styles from './Cards.module.css';

export default function cards({onSearch}) {
  const dispatch = useDispatch();
  const location = useLocation();
  const [numPag, setNumPag] = useState(1);
  const [renderPag, setRenderPag] = useState([]);
  const [renderPag2, setRenderPag2] = useState([]);
  const [loader, setLoader] = useState(true);
  const paginationArray = Array.from({length: 10}, (_, i) => i);
  const memoriPag = useSelector((state) => state.pag);
  const memoriFilters = useSelector((state) => state.classGenres);

  useEffect(() => {
    setLoader(true);
    dispatch(classGenres('delete'));
    if (location.pathname === '/') {
      onSearch(1);
      setTimeout(() => {
        setRenderPag(memoriPag[numPag]);
        setLoader(false);
      }, 5000);
    } else if (location.pathname === '/filters/Lowest%20Rated') {
      if (numPag === 1) {
        setNumPag(11);
      }
      setTimeout(() => {
        setNumPag(1);
        setLoader(false);
        setRenderPag2(memoriFilters[numPag]);
      }, 15000);
    } else {
      if (numPag === 1) {
        setNumPag(11);
      }
      setTimeout(() => {
        setNumPag(1);
        setLoader(false);
        setRenderPag2(memoriFilters[numPag]);
      }, 4000);
    }
  }, [location.pathname]);
  useEffect(() => {
    if (
      renderPag &&
      renderPag.length &&
      memoriPag.hasOwnProperty(numPag) &&
      location.pathname === '/'
    ) {
      setRenderPag([]);
      setTimeout(() => {
        setRenderPag(memoriPag[numPag]);
      }, 10);
    } else if (
      renderPag &&
      renderPag.length &&
      !memoriPag.hasOwnProperty(numPag) &&
      location.pathname === '/'
    ) {
      setRenderPag([]);

      setTimeout(() => {
        setRenderPag(memoriPag[numPag]);
      }, 5000);
    } else {
      setRenderPag2(memoriFilters[numPag]);
    }
  }, [numPag]);
  return (
    <article className={styles.container}>
      {loader ? (
        <LoaderMax />
      ) : (
        <section className={styles.containerCardsP}>
          <div className={styles.containerCards}>
            {location.pathname === '/' &&
              renderPag &&
              renderPag.length > 0 &&
              renderPag.map((e, i) => <Card key={i} data={e} />).slice(0, 1)}
            {location.pathname !== '/' &&
              renderPag2 &&
              renderPag2.length > 0 &&
              renderPag2.map((e, i) => <Card key={i} data2={e} />).slice(0, 4)}
          </div>
          <div className={styles.containerCards}>
            {location.pathname === '/' &&
              renderPag.map((e, i) => <Card key={i} data={e} />).slice(1, 2)}
            {location.pathname !== '/' &&
              renderPag2 &&
              renderPag2.length > 0 &&
              renderPag2.map((e, i) => <Card key={i} data2={e} />).slice(4, 7)}
          </div>
          <div className={styles.containerCards}>
            {location.pathname === '/' &&
              renderPag.map((e, i) => <Card key={i} data={e} />).slice(2)}
            {location.pathname !== '/' &&
              renderPag2 &&
              renderPag2.length > 0 &&
              renderPag2.map((e, i) => <Card key={i} data2={e} />).slice(7)}
          </div>
        </section>
      )}

      <nav className={styles.containerNav}>
        <button
          className={styles.btnNav}
          disabled={numPag === 1}
          onClick={() => {
            setNumPag(numPag - 1);
            location.pathname === '/' && onSearch(numPag - 1);
            smoothScrollToTop();
          }}>
          <SlArrowLeft />
          <SlArrowLeft />
        </button>
        <ul className={styles.pagination}>
          {paginationArray.map((e) => (
            <li key={e}>
              <button
                className={e + 1 === numPag ? styles.activeButton : ''}
                onClick={() => {
                  location.pathname === '/' && onSearch(e + 1);
                  setNumPag(e + 1);
                  smoothScrollToTop();
                }}>
                {e + 1}
              </button>
            </li>
          ))}
        </ul>
        <button
          className={styles.btnNav}
          disabled={numPag === 10}
          onClick={() => {
            setNumPag(numPag + 1);
            location.pathname === '/' && onSearch(numPag + 1);
            smoothScrollToTop();
          }}>
          <SlArrowRight />
          <SlArrowRight />
        </button>
      </nav>
    </article>
  );
}
