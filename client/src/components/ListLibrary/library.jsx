import {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import axios from 'axios';
import Card from '../Home/Cards/Card';
import {LoaderMax} from '../lo/Loader';
import {lib} from '../../Redux/actions';
import styles from './library.module.css';

export default function library() {
  const dispatch = useDispatch();
  const library = useSelector((state) => state.lib);
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    dispatch(lib());
    setLoader(false);
  }, []);
  return (
    <div className={styles.container}>
      {loader ? (
        <LoaderMax />
      ) : (
        <div className={styles.container1}>
          {library.map((e, i) => (
            <Card data2={e} key={i} libState={true} />
          ))}
        </div>
      )}
    </div>
  );
}
