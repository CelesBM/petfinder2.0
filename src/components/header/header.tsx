import React, { useState } from "react";
import "./header.css";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="header">
      <img
        src="https://static.vecteezy.com/system/resources/thumbnails/014/455/901/small/transparent-dog-paw-icon-transparent-background-free-png.png"
        alt="logo"
        className="logo"
      />
      <div className="logo-hamburger-menu" onClick={() => setMenuOpen(true)}>
        ☴
      </div>
      <nav className={`hamburger-menu ${menuOpen ? "active" : ""}`}>
        <div className="close-btn" onClick={() => setMenuOpen(false)}>
          ✖
        </div>
        <ul>
          <li>Iniciar sesión</li>
          <li>Mis datos</li>
          <li>Reportes cercanos</li>
          <li>Mis reportes</li>
          <li>Reportar mascota</li>
        </ul>
      </nav>
      <div className="menu">
        <ul>
          <li>Iniciar sesión</li>
          <li>Mis datos</li>
          <li>Reportes cercanos</li>
          <li>Mis reportes</li>
          <li>Reportar mascota</li>
        </ul>
      </div>
    </header>
  );
}

export { Header };
