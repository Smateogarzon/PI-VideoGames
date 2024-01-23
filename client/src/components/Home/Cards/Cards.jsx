import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Card from "./Card";
import styles from "./Cards.module.css";

export default function cards({ onSearch }) {
  const [numPag, setNumPag] = useState(1);
  const [renderPag, setRenderPag] = useState([]);
  const paginationArray = Array.from({ length: 10 }, (_, i) => i);
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
      }, 5000);
    }
  }, [numPag]);

  return (
    <div className={styles.containerCardsP}>
      <div className={styles.containerCards}>
        {renderPag.map((e, i) => (
          <Card key={i} data={e} />
        ))}
      </div>

      <nav>
        <button
          disabled={numPag === 1}
          onClick={() => {
            setNumPag(numPag - 1);
            onSearch(numPag - 1);
          }}
        >
          Prev
        </button>
        <ul>
          {paginationArray.map((e) => (
            <li key={e}>
              <button
                onClick={() => {
                  onSearch(e + 1);
                  setNumPag(e + 1);
                }}
              >
                {e + 1}
              </button>
            </li>
          ))}
        </ul>
        <button
          disabled={numPag === 10}
          onClick={() => {
            setNumPag(numPag + 1);
            onSearch(numPag + 1);
          }}
        >
          Next
        </button>
      </nav>
    </div>
  );
}
