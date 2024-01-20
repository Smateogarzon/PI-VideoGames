import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SearchResults from "./SearchResults";
import styles from "./SearchBar.module.css";

export default function searchBar() {
  const [searchValue, setSearchValue] = useState("");
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
      const { value } = event.target;
      setSearchValue(value);

      // Cancelar la solicitud anterior
      if (cancelToken) {
        cancelToken.cancel();
      }

      // Crear un nuevo token de cancelación
      const newCancelToken = axios.CancelToken.source();
      setCancelToken(newCancelToken);

      const { data } = await axios.get(
        `http://localhost:3001/videogames/?name=${value}`,
        { withCredentials: true, cancelToken: newCancelToken.token }
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
      if (document.activeElement.tagName !== "INPUT") {
        document.getElementById("search-bar").focus();
      }
    }
  };

  const logout = async () => {
    try {
      const { data } = await axios.post("http://localhost:3001/logout");
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", pressKeys);
    return () => {
      document.removeEventListener("keydown", pressKeys);
    };
  }, []);

  return (
    <div className={styles.containerSearch}>
      <div className={styles.containerSearchBar}>
        <input
          autoComplete="off"
          type="search"
          id="search-bar"
          value={searchValue}
          placeholder={" Search +800,000 games"}
          onChange={handleChange}
        />
        {results.length > 0 && <SearchResults data={results} />}
        <div className={styles.containerKey}>
          <div>alt</div>
          <span>+</span>
          <div>ctrl</div>
        </div>
      </div>

      <div className={styles.containerSession}>
        <Link to={"/login"} style={{ textDecoration: "none" }}>
          <span>LOG IN</span>
        </Link>

        <Link to={"/sing_up"} style={{ textDecoration: "none" }}>
          <span>SING UP</span>
        </Link>
      </div>
      <div>
        <button onClick={logout}>Log Out</button>
      </div>
    </div>
  );
}
