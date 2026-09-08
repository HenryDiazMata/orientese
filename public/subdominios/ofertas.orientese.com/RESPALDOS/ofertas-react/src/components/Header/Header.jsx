import "./Header.css";
import Navbar from "../Navbar/Navbar";

console.log("HEADER CARGADO");

function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <h1>Orientese</h1>
          <span>Portal de Ofertas</span>
        </div>

        <Navbar />
      </div>
    </header>
  );
}

export default Header;