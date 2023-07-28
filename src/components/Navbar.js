import React,{useState} from "react";
import { Link } from "react-router-dom";
import Badge from 'react-bootstrap/Badge';
import logo from "../screens/foodt2.png";
import Model from "../Model";
import Cart from "../screens/Cart";
import {useCart} from "./contextReducer";

export default function Navbar() {

  let data = useCart();
  const [cartView, setCartView] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <button
            className="navbar-toggler ms-auto"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse text-center"
            id="navbarSupportedContent"
          >
            <img
              style={{
                height: "3rem",
                width: "4rem",
                left: "0",
                margin: ".4rem",
              }}
              src={logo}
              alt="logo"
            />
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link
                  className="nav-link active text-muted"
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              {localStorage.getItem("authToken") ? (
                <li className="nav-item">
                  <Link
                    className="nav-link active text-muted"
                    aria-current="page"
                    to="/myOrder"
                  >
                    My Orders
                  </Link>
                </li>
              ) : (
                ""
              )}
              {!localStorage.getItem("authToken") ? (
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <Link
                      className="nav-link active text-muted"
                      aria-current="page"
                      to="/signup"
                    >
                      SignUp
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link active text-muted"
                      aria-current="page"
                      to="/login"
                    >
                      Login
                    </Link>
                  </li>{" "}
                </ul>
              ) : (
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <Link
                      className="nav-link active text-muted"
                      aria-current="page"
                      to="/"
                      onClick={()=>{setCartView(true)}}
                    >
                      My Cart {" "}
                      <Badge pill bg="danger">{data.length}</Badge>
                    </Link>
                  </li>
                  {cartView?<Model onClose={()=>setCartView(false)}><Cart></Cart></Model>:null}
                  <li className="nav-item">
                    <Link
                      className="nav-link active text-danger"
                      aria-current="page"
                      onClick={handleLogout}
                      to='/login'
                    >
                      Logout
                    </Link>
                  </li>
                </ul>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

