import {Routes, Route, Link, useLocation} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {idRandom} from './Redux/actions';

import SearchBar from './components/SearchBar/SearchBar';
import SingUp from './components/Sin_Up/Sign_Up';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import {ToastContainer, toast, Bounce} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './App.module.css';

function App() {
  const location = useLocation();
  const dispatch = useDispatch();

  const onSearch = (numPag) => {
    dispatch(idRandom(numPag));
  };

  const containerAppClassName =
    location.pathname === '/createVideoGame'
      ? styles.containerAppCreate
      : location.pathname === '/sing_up'
      ? styles.containerAppSing
      : location.pathname === '/login'
      ? styles.containerAppLogin
      : styles.containerApp;

  return (
    <div className={containerAppClassName}>
      <ToastContainer
        position="top-center"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
      <div
        className={
          (location.pathname === '/createVideoGame' ||
            location.pathname === '/sing_up' ||
            location.pathname === '/login') &&
          styles.container
        }>
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
            <Route path="/detail/:id" element={<Home />} />
            <Route path="/Profile" element={<Home />} />
            <Route path="/listVideoGame" element={<Home />} />
            <Route path="/listLibrary" element={<Home />} />
            <Route path="/sing_up" element={<SingUp />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
        <footer></footer>
      </div>
    </div>
  );
}

export default App;
