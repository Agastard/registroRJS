import axios from "axios"
import { useState } from "react"
//import { Navigate } from "react-router-dom"
//import { useHistory } from 'react-router-dom'
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useUserContext, useUserToggleContext } from "./UserProvider";
import MyToastr from "./utils/myToastr";
import { Spinner } from "./utils/spinner";

export default function Login() {
  const user = useUserContext();
  const cambiaLogin = useUserToggleContext();
  let history = useNavigate()
  const [isLoading, setIsloading] = useState(false);
  const [data, setData] = useState({
    //Used default values for developing
    username: "",//can be a email
    password: ""
  })
  const handleChange = (e) => {
    console.log('handleChange')
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const submitForm = (e) => {
    setIsloading(true);
    console.log('submitForm data',data)
    e.preventDefault()
    const sendData = {
      //Forced data
      //username: "primero",
      //password: "contraseña",
      

      //username: data.username ?? "primero",
      //password: data.password ?? "contraseña",
      //password: data.password ?? "contraseña",
      ...data,
      action:"login"
    }
    axios.post("http://localhost/cosas-reactjs/servidores/login/select.php", sendData).then(
      (result) => {
        console.log('result chek',result)
        console.log('after', user)
        if (result.data?.success && !user) {
          //localStorage.setItem('auth', JSON.stringify({"objeto":"guardaremos el password (mejor hasheado)"}))
          //history("/", { auth: true })//redirecconamos
          
          cambiaLogin(result.data?.data)
        }
        // Se logueó
        if (result.data?.success >=1) {
          history("/")//redirecconamos
        }
        var message = result.data?.success > 0 ? "Se ha logueado" : "No hemos podido loeguarle.";
        message = result.data?.message ? result.data?.message : message
        // Si no hay ssuccess, es posible que no haya servidor
        MyToastr({ message: message, type: result.data?.success ?? -1 })
        setIsloading(false);
      }
    ).catch(function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
      //console.log(error.config);
      MyToastr(
        { message: "Problemas en el servidor",type: "error"}
      )
      setIsloading(false);
    });
  }
  if (isLoading) {
    return <Spinner />
  } 
  return (
    <div className="-main-box">
      <form onSubmit={submitForm}>
        <div className="row">
          <div className="col-md-12 text-center">
            <h1>Login</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">Username</div>
          <div className="col-md-6">
            <input type="text" name="username" className="form-control" value={data.username} placeholder="Su Nombre de usuario" onChange={handleChange} required />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">Password</div>
          <div className="col-md-6">
            <input type="password" name="password" className="form-control" placeholder="Su password" onChange={handleChange} value={data.password} required />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <input type="submit" name="submit" value="Login" />
          </div>
        </div>
      </form>
      <div className="row">
        <div className="col-md-12">
          <p className="pLink">If you haven't an account, create one <Link className="nav-link" to="/register"><b>here</b></Link></p>
        </div>
      </div>
    </div>
  )
}