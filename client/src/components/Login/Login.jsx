import axios from 'axios';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {access} from '../../Redux/actions';

export default function login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
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
        <button onClick={submmit}>Log in</button>
        <a href="/sing_up">Don't have an account? Sign up.</a>
      </form>
    </div>
  );
}
