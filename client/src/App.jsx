import {useState} from 'react';
import SearchBar from './components/SearchBar/SearchBar';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <header>
        <h1>Archivo Gamer</h1>
        <SearchBar />
      </header>
      <main></main>
      <footer></footer>
    </div>
  );
}

export default App;
