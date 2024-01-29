import {useParams} from 'react-router-dom';
import {useEffect, useState} from 'react';
import axios from 'axios';
import styles from './Detail.module.css';

export default function detail() {
  const [videogame, setVideogame] = useState({});
  const {id} = useParams();
  useEffect(() => {
    axios
      .get(`http://localhost:3001/videogames/${id}`)
      .then(({data}) => {
        if (data.name) setVideogame(data);
      })
      .catch((error) => console.error(error));
    return () => setVideogame({});
  }, [id]);
  return (
    <div className={styles.container}>
      <div
        className={styles.imgDetail}
        style={{backgroundImage: `url(${videogame.background_image})`}}></div>
    </div>
  );
}
