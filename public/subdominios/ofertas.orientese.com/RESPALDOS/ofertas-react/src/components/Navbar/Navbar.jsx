import { Link } from "react-router-dom";

import "./Navbar.css";

function Navbar() {

    return (

        <nav>

            <ul className="menu">

                <li>

                    <Link to="/">Início</Link>

                </li>

                <li>

                    <Link to="/">Ofertas</Link>

                </li>

                <li>

                    <Link to="/">Categorias</Link>

                </li>

                <li>

                    <Link to="/">Contato</Link>

                </li>

            </ul>

        </nav>

    );

}

export default Navbar;