import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function singUp() {
  const navigate = useNavigate();
  const [dataUser, setDateUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDateUser((prevData) => ({ ...prevData, [name]: value }));
  };
  const submmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:3001/create_user",
        dataUser
      );
      if (data.register === true) {
        setDateUser({
          username: "",
          email: "",
          password: "",
        });
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <div>
      <h2>Sing Up</h2>
      <form>
        <div>
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
          <button onClick={submmit}>Sing Up</button>
          <p>
            By signing up, you agree to GamerFile Terms of Service and Privacy
            Policy.
          </p>
        </div>
      </form>
    </div>
  );
}
