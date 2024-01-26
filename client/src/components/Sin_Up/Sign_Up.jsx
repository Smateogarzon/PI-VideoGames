import axios from 'axios';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import styles from './Sign_Up.module.css';

export default function singUp() {
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [tipeError, setTipeError] = useState('');
  const [dataUser, setDateUser] = useState({
    username: '',
    email: '',
    password: '',
  });
  const handleChange = (e) => {
    const {name, value} = e.target;
    setDateUser((prevData) => ({...prevData, [name]: value}));
  };
  const submmit = async (e) => {
    e.preventDefault();
    try {
      const {data} = await axios.post(
        'http://localhost:3001/create_user',
        dataUser,
      );
      if (data.register === true) {
        setDateUser({
          username: '',
          email: '',
          password: '',
        });
        setError(false);
        navigate('/login');
      }
    } catch (error) {
      if (typeof error.response.data === 'object') {
        const values = Object.values(error.response.data);
        setTipeError(values.join(' ,'));
        setError(true);
      } else {
        setTipeError(error.response.data);
        setError(true);
      }
    }
  };
  console.log(tipeError);
  return (
    <div className={styles.container}>
      <form>
        <h2>Sing Up</h2>

        <input
          autoComplete="off"
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          value={dataUser.email}
          onChange={handleChange}
        />
        <input
          autoComplete="off"
          type="text"
          id="username"
          name="username"
          value={dataUser.username}
          placeholder="Username"
          onChange={handleChange}
        />
        <input
          autoComplete="off"
          type="password"
          id="passwprd"
          name="password"
          value={dataUser.password}
          placeholder="Create a Password"
          onChange={handleChange}
        />
        <button onClick={submmit}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          Sing Up
        </button>
        {error && <p className={styles.error}>{tipeError}</p>}
        <p>
          By signing up, you agree to GamerFile Terms of Service and Privacy
          Policy.
        </p>
      </form>
    </div>
  );
}
