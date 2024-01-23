import {useSelector} from 'react-redux';
import {useEffect, useState} from 'react';
import Card from './Card';
import {SlArrowRight, SlArrowLeft} from 'react-icons/sl';

import styles from './Cards.module.css';

export default function cards({onSearch}) {
  const [numPag, setNumPag] = useState(1);
  const [renderPag, setRenderPag] = useState([]);
  const paginationArray = Array.from({length: 10}, (_, i) => i);
  const memoriPag = useSelector((state) => state.pag);

  useEffect(() => {
    setTimeout(() => {
      setRenderPag(memoriPag[numPag]);
    }, 4000);
  }, []);
  useEffect(() => {
    if (renderPag && renderPag.length && memoriPag.hasOwnProperty(numPag)) {
      setRenderPag([]);
      setTimeout(() => {
        setRenderPag(memoriPag[numPag]);
      }, 10);
    } else if (
      renderPag &&
      renderPag.length &&
      !memoriPag.hasOwnProperty(numPag)
    ) {
      setRenderPag([]);

      setTimeout(() => {
        setRenderPag(memoriPag[numPag]);
      }, 4000);
    }
  }, [numPag]);

  return (
    <article className={styles.container}>
      <section className={styles.containerCardsP}>
        <div className={styles.containerCards}>
          {renderPag.map((e, i) => <Card key={i} data={e} />).slice(0, 1)}
        </div>
        <div className={styles.containerCards}>
          {renderPag.map((e, i) => <Card key={i} data={e} />).slice(1, 2)}
        </div>
        <div className={styles.containerCards}>
          {renderPag.map((e, i) => <Card key={i} data={e} />).slice(2)}
        </div>
      </section>

      <nav className={styles.containerNav}>
        <button
          className={styles.btnNav}
          disabled={numPag === 1}
          onClick={() => {
            setNumPag(numPag - 1);
            onSearch(numPag - 1);
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
                  onSearch(e + 1);
                  setNumPag(e + 1);
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
            onSearch(numPag + 1);
          }}>
          <SlArrowRight />
          <SlArrowRight />
        </button>
      </nav>
    </article>
  );
}
