import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { server_url } from "../utils/api";
import { useNavigate } from "react-router-dom";
import isEmpty from "../utils/isEmpty";
import { toast } from "react-toastify";
import { UserContext } from "../utils/userContext";

function UpdateProfile() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  const [data, setData] = useState({ email: "", name: "", rm: "", password: "" });

  useEffect(() => {
    axios
      .get(`${server_url}/users/${user?.id}`)
      .then((res) => {
        setData({ ...res.data });
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error");
      });
  }, []);

  const handleChange = (e) => setData({ ...data, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEmpty(data.email)) return toast.warn("Invalid Email");
    if (isEmpty(data.name)) return toast.warn("Invalid Name");
    if (isEmpty(data.password)) return toast.warn("Invalid password");

    axios
      .put(`${server_url}/users/${user.id}`, data)
      .then((res) => {
        setUser({ ...res.data });
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
            <input type="text" name="email" onChange={handleChange} defaultValue={data?.email} />
          </div>

          <div className="input_form">
            <span>nome</span>
            <input type="text" name="name" onChange={handleChange} defaultValue={data?.name} />
          </div>

          <div className="input_form">
            <span>Número de registro</span>
            <input type="text" name="rm" onChange={handleChange} defaultValue={data?.rm} />
          </div>

          <div className="submit_btn">
            <button type="submit">atualizar</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateProfile;
