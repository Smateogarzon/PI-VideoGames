import {useParams} from 'react-router-dom';
import {useEffect, useState} from 'react';
import axios from 'axios';
import styles from './Detail.module.css';

export default function detail() {
  const [videogame, setVideogame] = useState({});
  const [render, setRender] = useState(false);
  const {id} = useParams();
  useEffect(() => {
    axios
      .get(`http://localhost:3001/videogames/${id}`)
      .then(({data}) => {
        if (data.name) {
          setVideogame(data);
          setRender(true);
        }
      })
      .catch((error) => console.error(error));
    return () => {
      setVideogame({});
      setRender(false);
    };
  }, [id]);

  return (
    render && (
      <div className={styles.container}>
        <div
          className={styles.imgDetail}
          style={{backgroundImage: `url(${videogame.background_image})`}}></div>
        <section className={styles.containerDetail}>
          <article className={styles.detail1}>
            <div className={styles.name}>
              <div>
                {videogame.updated && (
                  <p>
                    updated:{' '}
                    {convertirFormatoFecha(videogame.updated.substring(0, 10))}
                  </p>
                )}
                <span>{videogame.metacritic}</span>
              </div>
              <h1>{videogame.name}</h1>
            </div>
            <div>
              {videogame.ratings && (
                <div className={styles.percentage}>
                  {videogame.ratings.map((e, i) => {
                    const isFirst = i === 0;
                    const isLast = i === videogame.ratings.length - 1;

                    let borderRadiusStyle = {};
                    if (isFirst) {
                      borderRadiusStyle = {
                        borderTopLeftRadius: '5px',
                        borderBottomLeftRadius: '5px',
                      };
                    } else if (isLast) {
                      borderRadiusStyle = {
                        borderTopRightRadius: '5px',
                        borderBottomRightRadius: '5px',
                      };
                    }

                    let backgroundColor;
                    switch (e.title) {
                      case 'exceptional':
                        backgroundColor = 'green';
                        break;
                      case 'recommended':
                        backgroundColor = 'blue';
                        break;
                      case 'meh':
                        backgroundColor = 'yellow';
                        break;
                      default:
                        backgroundColor = 'red';
                    }

                    return (
                      <span
                        key={i}
                        style={{
                          width: `${e.percent}%`,
                          height: '100%',
                          backgroundColor,
                          ...borderRadiusStyle,
                        }}></span>
                    );
                  })}
                </div>
              )}

              {render && videogame.ratings && (
                <div className={styles.ratings}>
                  {videogame.ratings.map((elemt, i) => {
                    let backgroundColor;
                    switch (elemt.title) {
                      case 'exceptional':
                        backgroundColor = 'green';
                        break;
                      case 'recommended':
                        backgroundColor = 'blue';
                        break;
                      case 'meh':
                        backgroundColor = 'yellow';
                        break;
                      default:
                        backgroundColor = 'red';
                    }
                    return (
                      <div key={i} className={styles.contentRatings}>
                        <span
                          className={styles.Ratings1}
                          style={{
                            borderBottom: `2px solid ${backgroundColor}`,
                          }}>
                          {elemt.title}:
                        </span>
                        <span className={styles.Ratings2}>{elemt.count}</span>
                      </div>
                    );
                  })}
                </div>
              )}
              <h2 style={{paddingLeft: '20px', marginTop: '25px'}}>About</h2>
              <div
                dangerouslySetInnerHTML={{__html: videogame.description}}
                style={{
                  textWrap: 'balance',
                  textAlign: 'justify',
                  paddingLeft: '20px',
                  margin: '0',
                  width: '95%',
                }}
              />
              <div className={styles.more}>
                <div className={styles.more1}>
                  <h3>Platforms</h3>
                  <div className={styles.moreP}>
                    {render &&
                      (typeof videogame.platforms[0] === 'string' ? (
                        <p>{videogame.platforms.join(' / ')}</p>
                      ) : (
                        videogame.platforms.map((e, i) => (
                          <p key={i}>{e.platform.name} / </p>
                        ))
                      ))}
                  </div>

                  <h3>Release date</h3>
                  <p>{convertirFormatoFecha(videogame.released)}</p>
                  <h3>Publisher</h3>
                  {videogame.publishers && (
                    <div className={styles.moreP}>
                      {render &&
                        videogame.publishers.map((e, i) => (
                          <p key={i}>{e.name} / </p>
                        ))}
                    </div>
                  )}
                </div>
                <div className={styles.more1}>
                  <h3>Genres</h3>
                  <div className={styles.moreP}>
                    {render &&
                      (typeof videogame.genres[0] === 'string' ? (
                        <p>{videogame.genres.join(' / ')}</p>
                      ) : (
                        videogame.genres.map((e, i) => (
                          <p key={i}> {e.name} / </p>
                        ))
                      ))}
                  </div>

                  <h3>Developers</h3>
                  {videogame.developers && (
                    <div className={styles.moreP}>
                      {render &&
                        videogame.developers.map((e, i) => (
                          <p key={i}>{e.name} /</p>
                        ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </article>
          <article className={styles.detail2}>
            <div className={styles.imgP}>
              <img
                src={videogame.background_image_additional}
                alt={videogame.name}
              />
              {videogame.screenshots_count && (
                <div className={styles.imgPlus}>
                  {videogame.screenshots_count.map((e, i) => (
                    <img key={i} src={e} alt={i} />
                  ))}
                </div>
              )}
            </div>
            <div className={styles.more1}>
              <h3>Tags</h3>
              {videogame.tags && (
                <div className={styles.moreP}>
                  {videogame.tags.map((e, i) => (
                    <span key={i}>{e.name} /</span>
                  ))}
                </div>
              )}
            </div>
          </article>
        </section>
      </div>
    )
  );
}

function convertirFormatoFecha(fechaString) {
  const meses = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const fecha = new Date(fechaString);
  const mes = meses[fecha.getMonth()];
  const dia = fecha.getDate();
  const año = fecha.getFullYear();

  return `${mes} ${dia}, ${año}`;
}
