import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link
} from "react-router-dom";
import { useUserContext, useUserToggleContext } from "./UserProvider";
import MyToastr from "./utils/myToastr";
export default function Header(){
  const user = useUserContext();
  const cambiaLogin = useUserToggleContext();
  useEffect(()=>{
    if (user) {
      console.log('Hay usuario')
    } else {
      console.log('No hay usuario')
    }
   
  },[user])
  const handleDisconect= (e) => {
    console.log("handleDisconect")
    cambiaLogin([])
    MyToastr({ message: "Desconectado" })
  }
  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">SimpleLogin</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="">Home</Link>
            </li>
            {/*En el futuro se mostrará sólo si es admin || o quizá sólo pueda editar un admin, ya veré*/}
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/listusers">Lista Usuarios</Link>
            </li>
            {user ?
              <li className="nav-item">
                <Link className="nav-link" to="/account">Account</Link>
              </li>
              : ""
            }
            {user ? 
            <li className="nav-item">
                <Link className="nav-link" onClick={handleDisconect}>Disconect</Link>
            </li>
            : 
            <li className="nav-item">
              <Link className="nav-link" to="/login">Login</Link>
            </li>
            }
          </ul>
        </div>
      </div>
    </nav>

  )
}