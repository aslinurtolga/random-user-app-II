import React from "react";
import mailSvg from "./assets/mail.svg";
import manSvg from "./assets/man.svg";
import womanSvg from "./assets/woman.svg";
import manAgeSvg from "./assets/growing-up-man.svg";
import womanAgeSvg from "./assets/growing-up-woman.svg";
import mapSvg from "./assets/map.svg";
import phoneSvg from "./assets/phone.svg";
import padlockSvg from "./assets/padlock.svg";
import cwSvg from "./assets/cw.svg";
import Footer from "./components/footer/Footer";
import axios from "axios";
import { useState, useEffect } from "react";

const url = "https://randomuser.me/api/";

function App() {
  const [user, setUser] = useState([]);
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(true);
  const [userList, setUserList] = useState([]);

  let userImg = "";
  let firstTitle = "";
  let firstValue = "";

  const getUser = async () => {
    const { data } = await axios(url);
    setUser(data.results[0]);
    console.log(user);
    setLoading(false);
  };

  useEffect(() => {
    getUser();
  }, []);

  console.log(user);

  if (user.picture) {
    userImg = user.picture.medium;

    firstTitle = "name";
    const { title, first, last } = user.name;

    firstValue = title + " " + first + " " + last;
  }

  const showName = (e) => {
    const { title, first, last } = user.name;
    setTitle(e.target.parentElement.name);
    setValue(title + " " + first + " " + last);
  };
  const showEmail = (e) => {
    setTitle(e.target.parentElement.name);
    setValue(user.email);
  };
  const showAge = (e) => {
    setTitle(e.target.parentElement.name);
    setValue(user.dob.age);
  };
  const showStreet = (e) => {
    setTitle(e.target.parentElement.name);
    setValue(user.location.street.number + " " + user.location.street.name);
  };
  const showPhone = (e) => {
    setTitle(e.target.parentElement.name);
    setValue(user.phone);
  };
  const showPassword = (e) => {
    setTitle(e.target.parentElement.name);
    setValue(user.login.password);
  };

  const change = () => {
    getUser();
    setTitle("");
    setValue("");
    setLoading(true);
  };

  const add = () => {
    if (!userList.includes(user)) {
      setUserList([...userList, user]);
    }
  };
  return (
    <main>
      <div className="block bcg-orange">
        <img src={cwSvg} alt="cw" id="cw" />
      </div>
      <div className="block">
        <div className="container">
          <img src={userImg} alt="random user" className="user-img" />
          <p className="user-title">My {title ? title : firstTitle} is</p>
          <p className="user-value">{value ? value : firstValue}</p>
          <div className="values-list">
            <button className="icon" name="name" onClick={showName}>
              <img
                src={user?.gender === "female" ? womanSvg : manSvg}
                alt="user"
                id="iconImg"
              />
            </button>
            <button className="icon" name="email" onClick={showEmail}>
              <img src={mailSvg} alt="mail" id="iconImg" />
            </button>
            <button className="icon" name="age" onClick={showAge}>
              <img
                src={user?.gender === "female" ? womanAgeSvg : manAgeSvg}
                alt="age"
                id="iconImg"
              />
            </button>
            <button className="icon" name="street" onClick={showStreet}>
              <img src={mapSvg} alt="map" id="iconImg" />
            </button>
            <button className="icon" name="phone" onClick={showPhone}>
              <img src={phoneSvg} alt="phone" id="iconImg" />
            </button>
            <button className="icon" name="password" onClick={showPassword}>
              <img src={padlockSvg} alt="lock" id="iconImg" />
            </button>
          </div>
          <div className="btn-group">
            <button className="btn" type="button" onClick={change}>
              {loading ? "loading..." : "new user"}
            </button>
            <button className="btn" type="button" onClick={add}>
              add user
            </button>
          </div>

          <table className="table">
            <thead>
              <tr className="head-tr">
                <th className="th">Firstname</th>
                <th className="th">Email</th>
                <th className="th">Phone</th>
                <th className="th">Age</th>
              </tr>
            </thead>

            <tbody>
              {userList.map((item) => {
                console.log(item);
                return (
                  <tr key={item.id.value}>
                    <td>{item.name.first}</td>
                    <td>{item.email}</td>
                    <td>{item.phone}</td>
                    <td>{item.dob.age}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Footer />
      </div>
    </main>
  );
}

export default App;
