import {useState, useEffect} from 'react';
import {Routes, Route, Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {idRandom} from './Redux/actions';
import SearchBar from './components/SearchBar/SearchBar';
import SingUp from './components/Sin_Up/Sign_Up';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import styles from './App.module.css';

function App() {
  const dispatch = useDispatch();
  const onSearch = (numPag) => {
    dispatch(idRandom(numPag));
  };

  return (
    <div className={styles.containerApp}>
      <header className={styles.header}>
        <div className={styles.containerHeaderH1}>
          <Link to={'/'} style={{textDecoration: 'none', color: 'white'}}>
            <h1> GamerFile</h1>
          </Link>
        </div>
        <SearchBar />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home onSearch={onSearch} />} />
          <Route
            path="/filters/:genre"
            element={<Home onSearch={onSearch} />}
          />
          <Route path="/createVideoGame" element={<Home />} />
          <Route path="/sing_up" element={<SingUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
      <footer></footer>
    </div>
  );
}

export default App;
