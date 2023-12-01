import React, { useContext, useEffect, useState } from "react";
import isEmpty from "../utils/isEmpty";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../utils/userContext";
import axios from "axios";
import { server_url } from "../utils/api";

function Dashboard() {
  const navigate = useNavigate();

  const { user } = useContext(UserContext);
  const [userdata, setUserdata] = useState({});

  useEffect(() => {
    if (isEmpty(user)) return navigate("/");
    else
      axios
        .get(`${server_url}/users/${user.id}`)
        .then((res) => {
          setUserdata(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
  }, []);

  return (
    <div className="dashboard">
      <div className="title">
        <div>
          <img src="/imgs/logo.png" alt="logo" />
          <h2>brand</h2>
        </div>
        <div>
          <h2>home</h2>
        </div>
      </div>
      <div className="top_content">
        <div className="top_left col-6">
          <img src="/imgs/main01.png" alt="01" />
          <div>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
            industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
            scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into
            electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of
            Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like
            Aldus PageMaker including versions of Lorem Ipsum.
          </div>
        </div>
        <div className="top_right col-6">
          <div>
            <h3>WHAT</h3>
            <p>
              It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and
              more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </p>
          </div>
          <div>
            <h3>HOW</h3>
            <p>
              It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and
              more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </p>
          </div>
          <div>
            <h3>WHY</h3>
            <p>
              It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and
              more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </p>
          </div>
        </div>
      </div>
      <div className="bottom_content">
        <img src="/imgs/main02.png" alt="02" />
        <div>
          <div>It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages</div>
        </div>
        <img src="/imgs/main03.png" alt="03" />
        <div>
          <p>It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages</p>
        </div>
        <img src="/imgs/main04.png" alt="04" />
      </div>
    </div>
  );
}

export default Dashboard;
