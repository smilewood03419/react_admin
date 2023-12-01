import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { server_url } from "../utils/api";
import { useNavigate } from "react-router-dom";
import isEmpty from "../utils/isEmpty";
import { toast } from "react-toastify";
import { UserContext } from "../utils/userContext";

function Signin() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  const [data, setData] = useState({ email: "", password: "" });

  useEffect(() => {
    if (!isEmpty(user)) navigate("/dashboard");
  }, [user]);

  const handleChange = (e) => setData({ ...data, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEmpty(data.email)) return toast.warn("insira o e-mail corretamente");
    if (isEmpty(data.password)) return toast.warn("insira a senha corretamente");

    axios
      .get(`${server_url}/users`)
      .then((res) => {
        const users = res.data;
        let userdata = users.find((u) => u.email === data.email && u.password === data.password);
        if (userdata === undefined) return toast.warn(`Email or password is not valid`);
        else toast.success(`Success`);
        const user = { id: userdata.id, email: userdata.email };
        setUser(user);
        sessionStorage.setItem("user", JSON.stringify(user));
        return navigate("/dashboard");
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  return (
    <div className="signin-container">
      <div className="signin">
        <form onSubmit={handleSubmit}>
          <div className="input_form">
            <span>e-mail</span>
            <input type="text" name="email" onChange={handleChange} />
          </div>

          <div className="input_form">
            <span>senha</span>
            <input type="password" name="password" onChange={handleChange} />
          </div>

          <div className="submit_btn">
            <button type="submit">Conecte-se</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signin;
