import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./header.css";

function Header() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="header">
      <img
        src="https://static.vecteezy.com/system/resources/thumbnails/014/455/901/small/transparent-dog-paw-icon-transparent-background-free-png.png"
        alt="logo"
        className="logo"
        onClick={() => {
          navigate("/");
        }}
      />
      <div className="logo-hamburger-menu" onClick={() => setMenuOpen(true)}>
        ☴
      </div>
      <nav className={`hamburger-menu ${menuOpen ? "active" : ""}`}>
        <div className="close-btn" onClick={() => setMenuOpen(false)}>
          ✖
        </div>
        <ul>
          <li
            onClick={() => {
              navigate("/login");
              setMenuOpen(false);
            }}
          >
            Iniciar sesión
          </li>
          <li
            onClick={() => {
              navigate("/personal-data");
              setMenuOpen(false);
            }}
          >
            Mis datos
          </li>
          <li>Reportes cercanos</li>
          <li>Mis reportes</li>
          <li>Reportar mascota</li>
        </ul>
      </nav>
      <div className="menu">
        <ul>
          <li
            onClick={() => {
              navigate("/login");
            }}
          >
            Iniciar sesión
          </li>
          <li
            onClick={() => {
              navigate("/personal-data");
            }}
          >
            Mis datos
          </li>
          <li>Reportes cercanos</li>
          <li>Mis reportes</li>
          <li>Reportar mascota</li>
        </ul>
      </div>
    </header>
  );
}

export { Header };
