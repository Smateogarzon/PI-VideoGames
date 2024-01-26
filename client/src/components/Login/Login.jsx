import axios from 'axios';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {access} from '../../Redux/actions';
import styles from './Login.module.css';

export default function login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [tipeError, setTipeError] = useState('');
  const [log, setLog] = useState({
    email: '',
    password: '',
  });

  const handleChange = (event) => {
    const {name, value} = event.target;
    setLog((prevLogin) => ({
      ...prevLogin,
      [name]: value,
    }));
  };

  const submmit = async (e) => {
    e.preventDefault();
    try {
      const {data} = await axios.post('http://localhost:3001/login', log);
      if (data.access === true) {
        setLog({
          email: '',
          password: '',
        });
        dispatch(access(true));
        setError(false);
        navigate('/');
      }
    } catch (error) {
      const values = Object.values(error.response.data);
      setTipeError(values.join(' , '));
      setError(true);
    }
  };
  return (
    <div className={styles.container}>
      <form>
        <h2>Log in</h2>
        <div>
          <input
            autoComplete="off"
            type="text"
            id="email"
            name="email"
            placeholder="Email"
            value={log.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            autoComplete="off"
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            value={log.password}
            onChange={handleChange}
          />
        </div>
        <button onClick={submmit}>
          <span> </span>
          <span> </span>
          <span> </span>
          <span> </span>Log in
        </button>
        {error && <p>{tipeError}</p>}
        <a href="/sing_up">Don't have an account? Sign up.</a>
      </form>
    </div>
  );
}
