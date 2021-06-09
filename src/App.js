import "./App.css";
import { useState } from "react";
import Axios from "axios";

function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState("");
  const [password, setPassword] = useState("");

  const [loginlist, setLoginlist] = useState([]);
  const [newpassword, setNewPassword] = useState(0);

  const addLogin = () => {
    Axios.post("http://localhost:3001/create", {
      name: name,
      age: age,
      country: country,
      password: password,
    }).then(() => {
      console.log("success");
    });
  };
  const getLogin = () => {
    Axios.get("http://localhost:3001/login", {}).then((response) => {
      setLoginlist(response.data);
    });
  };
  const updatepassword = (id) => {
    Axios.put("http://localhost:3001/update", {
      password: newpassword,
      id: id,
    }).then((response) => {
      setLoginlist(
        loginlist.map((val) => {
          return val.id == id
            ? {
                id: val.id,
                name: val.name,
                country: val.country,
                age: val.age,
                password: newpassword,
              }
            : val;
        })
      );
    });
  };

  const deletelogin = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
      setLoginlist(
        loginlist.filter((val) => {
          return val.id != id;
        })
      );
    });
  };
  return (
    <div className="App">
      <form className="info">
        <label>Name:</label>
        <input
          type="text"
          placeholder="john"
          onChange={(event) => {
            setName(event.target.value);
          }}
          required
        />

        <label>Age:</label>
        <input
          type="number"
          placeholder="24"
          onChange={(event) => {
            setAge(event.target.value);
          }}
          min="18"
          max="99"
          required
        />

        <label>Country:</label>
        <input
          type="text"
          placeholder="armenia"
          onChange={(event) => {
            setCountry(event.target.value);
          }}
          required
        />

        <label>Password:</label>
        <input
          type="password"
          placeholder="*****"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
          required
        />

        <button onClick={addLogin}>Login</button>
      </form>
      <div className="button1">
        <button onClick={getLogin}>show login</button>

        {loginlist.map((val) => {
          return (
            <div className="infostuff">
              <div>
                <h3>Name: {val.Name}</h3>
                <h3>Age: {val.Age}</h3>
                <h3>Country: {val.Country}</h3>
                <h3>Password: {val.Password}</h3>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="2000..."
                  onChange={(event) => {
                    setNewPassword(event.target.value);
                  }}
                />
                <button
                  onClick={() => {
                    updatepassword(val.id);
                  }}
                >
                  {" "}
                  Updatepassword
                </button>

                <button
                  onClick={() => {
                    deletelogin(val.id);
                  }}
                >
                  Deletelogininfo
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
