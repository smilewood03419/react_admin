import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { server_url } from "../utils/api";
import { useNavigate } from "react-router-dom";
import isEmpty from "../utils/isEmpty";
import { toast } from "react-toastify";
import { UserContext } from "../utils/userContext";

function Signup() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const [data, setData] = useState({ email: "", name: "", rm: "", password: "" });

  useEffect(() => {
    if (!isEmpty(user)) return navigate("/dashboard");
  }, [user]);

  const handleChange = (e) => setData({ ...data, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEmpty(data.email)) return toast.warn("Invalid Email");
    if (isEmpty(data.password)) return toast.warn("Invalid password");

    axios
      .post(`${server_url}/users`, data)
      .then((res) => {
        return navigate("/");
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
            <span>nome</span>
            <input type="text" name="name" onChange={handleChange} />
          </div>

          <div className="input_form">
            <span>Número de registro</span>
            <input type="text" name="rm" onChange={handleChange} />
          </div>

          <div className="input_form">
            <span>senha</span>
            <input type="password" name="password" onChange={handleChange} />
          </div>

          <div className="submit_btn">
            <button type="submit">inscrever-se</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
