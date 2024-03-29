import axios from 'axios';
import {useState, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {access, user} from '../../Redux/actions';
import SearchResults from './SearchResults';
import styles from './SearchBar.module.css';

export default function searchBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState('');
  const [results, setResults] = useState([]);
  const [cancelToken, setCancelToken] = useState(null);
  const admision = useSelector((state) => state.access);

  useEffect(() => {
    return () => {
      // Cancelar la solicitud cuando el componente se desmonta
      if (cancelToken) {
        cancelToken.cancel();
      }
    };
  }, [cancelToken]);

  const handleChange = async (event) => {
    try {
      const {value} = event.target;
      setSearchValue(value);

      // Cancelar la solicitud anterior
      if (cancelToken) {
        cancelToken.cancel();
      }

      // Crear un nuevo token de cancelación
      const newCancelToken = axios.CancelToken.source();
      setCancelToken(newCancelToken);

      const {data} = await axios.get(
        `http://localhost:3001/videogames/?name=${value}`,
        {withCredentials: true, cancelToken: newCancelToken.token},
      );

      setResults(data);
    } catch (error) {
      if (axios.isCancel(error)) {
        return;
      }
      console.log(error.message);
    }
  };

  const pressKeys = (event) => {
    if (event.altKey && event.ctrlKey) {
      if (document.activeElement.tagName !== 'INPUT') {
        document.getElementById('search-bar').focus();
      }
    }
  };

  const logout = async () => {
    try {
      await axios.post('http://localhost:3001/logout');
      dispatch(access(false));
      dispatch(user(''));
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', pressKeys);
    return () => {
      document.removeEventListener('keydown', pressKeys);
    };
  }, []);
  const clearSearch = () => {
    setSearchValue('');
    setResults([]);
  };
  return (
    <div className={styles.containerSearch}>
      <div className={styles.containerSearchBar}>
        <div className={styles.containerInput}>
          <input
            autoComplete="off"
            type="search"
            id="search-bar"
            value={searchValue}
            placeholder={' Search +800,000 games'}
            onChange={handleChange}
          />
          {results.length > 0 && (
            <SearchResults data={results} clearSearch={clearSearch} />
          )}
        </div>

        <div className={styles.containerKey}>
          <div>alt</div>
          <span>+</span>
          <div>ctrl</div>
        </div>
      </div>

      {!admision && (
        <div className={styles.containerSession}>
          <Link to={'/login'} style={{textDecoration: 'none'}}>
            <span>LOG IN</span>
          </Link>

          <Link to={'/sing_up'} style={{textDecoration: 'none'}}>
            <span>SIGN UP</span>
          </Link>
        </div>
      )}
      {admision && (
        <div className={styles.containerSession}>
          <Link
            to={'/profile'}
            style={{textDecoration: 'none', color: 'white'}}>
            <span style={{cursor: 'pointer'}}>Your Profile</span>
          </Link>
          <span onClick={logout} style={{cursor: 'pointer'}}>
            Log Out
          </span>
        </div>
      )}
    </div>
  );
}
