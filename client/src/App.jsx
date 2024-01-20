import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import SearchBar from "./components/SearchBar/SearchBar";
import SingUp from "./components/Sin_Up/Sign_Up";
import Login from "./components/Login/Login";
import styles from "./App.module.css";

function App() {
  return (
    <div className={styles.containerApp}>
      <header className={styles.header}>
        <div className={styles.containerHeaderH1}>
          <h1> GamerFile</h1>
        </div>
        <SearchBar />
      </header>
      <main>
        <Routes>
          <Route path="/sing_up" element={<SingUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
      <footer></footer>
    </div>
  );
}

export default App;
