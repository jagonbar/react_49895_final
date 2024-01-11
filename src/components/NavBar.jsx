import CartWidget from "./CartWidget.jsx";
import { Link } from "react-router-dom";
export default function NavBar() {
    const newLocal = (
        <img
            src="/multimedia/img/joystick-rojo-lado-back.png"
            alt="joystick ps5 rojo"
        />
    );
    return (
        <header>
            <div className="menu header-child">
                <i className="fa fa-bars" aria-hidden="true"></i>
                <div className="menu-float">
                    <Link to="/">
                        <i className="fa fa-home" aria-hidden="true"></i>
                        Home
                    </Link>
                    <Link to="/category/games">
                        <i className="fa fa-gamepad" aria-hidden="true"></i>
                        Juegos
                    </Link>
                    <Link to="/category/console">
                        <i className="fa fa-laptop" aria-hidden="true"></i>
                        Consolas
                    </Link>
                    <Link to="/category/component">
                        <i className="fa fa-users" aria-hidden="true"></i>
                        Periféricos
                    </Link>
                    <Link to="/contact">
                        <i className="fa fa-envelope" aria-hidden="true"></i>
                        Contacto
                    </Link>
                    <Link to="/cart">
                        <i
                            className="fa fa-shopping-cart"
                            aria-hidden="true"
                        ></i>
                        Carrito compra
                    </Link>
                </div>
            </div>

            <Link className="nav-link" to="/" style={{"textDecoration":"none"}}>
                <div className="title header-child">
                    <div className="title-text">POWER GAMES</div>
                    <div className="title-image">{newLocal}</div>
                </div>
            </Link>
            <nav className="header-child">
                <Link className="nav-link" to="/">
                    <i className="fa fa-home" aria-hidden="true"></i>
                    Home
                </Link>
                <Link className="nav-link" aria-current="page" to="/category/games">
                    <i className="fa fa-gamepad" aria-hidden="true"></i>
                    Juegos
                </Link>
                <Link className="nav-link" aria-current="page" to="/category/console">
                    <i className="fa fa-laptop" aria-hidden="true"></i>
                    Consolas
                </Link>
                <Link className="nav-link" to="/category/component">
                    <i className="fa fa-laptop" aria-hidden="true"></i>
                    Periféricos
                </Link>
                <Link className="nav-link" to="/contact">
                    <i className="fa fa-envelope" aria-hidden="true"></i>
                    Contacto
                </Link>
                <Link className="nav-link" to="/cart">
                    <CartWidget />
                </Link>
            </nav>
        </header>
    );
}
