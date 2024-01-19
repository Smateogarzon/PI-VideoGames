import axios from 'axios';
import {useState, useEffect} from 'react';

import SearchResults from './SearchResults';
export default function searchBar() {
  const [searchValue, setSearchValue] = useState('');
  const [results, setResults] = useState([]);
  const [cancelToken, setCancelToken] = useState(null);

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
  return (
    <div>
      <div>
        <input
          type="search"
          id="search-bar"
          value={searchValue}
          placeholder={'🔍 Search +800,000 games'}
          onChange={handleChange}
        />
        <div>
          <div>alt</div>
          <span>+</span>
          <div>ctrl</div>
        </div>
      </div>

      {results.length > 0 && <SearchResults data={results} />}

      <div>
        <span>Login</span>
        <span>/</span>
        <span>Sign Up</span>
      </div>
      <div>
        <span>Logout</span>
      </div>
    </div>
  );
}
