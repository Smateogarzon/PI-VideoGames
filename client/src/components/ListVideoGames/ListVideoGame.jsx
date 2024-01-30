import axios from 'axios';
import {useEffect, useState} from 'react';
import Card from '../Home/Cards/Card';
import {LoaderMax} from '../lo/Loader';
export default function listVideoGames() {
  const [videogames, setVideogames] = useState([]);
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const {data} = await axios.get(
          'http://localhost:3001/videogames_user',
          {
            withCredentials: true,
          },
        );
        setVideogames(data);
        setLoader(false);
      } catch (error) {}
    };
    fetchData();
    return () => {
      setVideogames([]);
      setLoader(true);
    };
  }, []);

  return (
    <div>
      {loader ? (
        <LoaderMax />
      ) : (
        <div>
          {videogames.map((e, i) => (
            <Card data2={e} key={i} />
          ))}
        </div>
      )}
    </div>
  );
}
