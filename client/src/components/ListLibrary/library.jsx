import {useEffect, useState} from 'react';
import axios from 'axios';
import Card from '../Home/Cards/Card';
import {LoaderMax} from '../lo/Loader';
export default function library() {
  const [library, setLibrary] = useState([]);
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const {data} = await axios.get('http://localhost:3001/library', {
          withCredentials: true,
        });
        setLibrary(data);
        setLoader(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
    return () => {
      setLoader(true);
      setLibrary([]);
    };
  }, []);
  return (
    <div>
      {loader ? (
        <LoaderMax />
      ) : (
        <div>
          {library.map((e, i) => (
            <Card data2={e} key={i} />
          ))}
        </div>
      )}
    </div>
  );
}
