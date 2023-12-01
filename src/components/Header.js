import React, { useContext } from "react";
import isEmpty from "../utils/isEmpty";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../utils/userContext";

function Header() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  const logout = (e) => {
    sessionStorage.clear();
    setUser(null);
    return navigate("/");
  };

  return !isEmpty(user) ? (
    <header>
      <div>
        <NavLink to="/dashboard">{user.email}</NavLink>
      </div>
      <div>
        <NavLink to="/profile">atualizar</NavLink>
        <button onClick={logout}>Deslogar</button>
      </div>
    </header>
  ) : (
    <header>
      <div>Por favor, inscreva-se</div>
      <div>
        <NavLink to="/">Conecte-se</NavLink>
        <NavLink to="/signup">inscrever-se</NavLink>
      </div>
    </header>
  );
}

export default Header;
