import axios from "axios"
import { useState } from "react"

//Redirect
import { useNavigate } from "react-router";
import { useUserContext, useUserToggleContext } from "./UserProvider";
import MyToastr from "./utils/myToastr";
import './UserTemplate.css';

export default function UserTemplate({ title, buttonText = "Registrar", servidor = "select", gived_user = [], edicionEnCurso = false, markAsEdited = true, afterDoFunction=()=>{}}) {
  /* const user = useUserContext();//Logueado
  let history = useNavigate() 
  const cambiaLogin = useUserToggleContext();*/
  console.log('UserTemplate', gived_user)
  if (!gived_user || gived_user?.length <= 0) {
    console.log('Sin usuario, redireccionaoms', gived_user)
    //cambiaLogin([])
    //history("/")//redirecconamos
  }
  //gived_user => el que será editado
  const [userData, setUserData] = useState({
    user_id:  "",
    username:  "",
    first_name: "",
    last_name:  "",
    email:"",
    password: ""
  })
  /* const [userData, setUserData] = useState({
    user_id: gived_user?.id ?? "",
    username: gived_user?.username ?? "",
    first_name: gived_user?.first_name ?? "",
    last_name: gived_user?.last_name ?? "",
    email: gived_user?.email ?? "",
    password: gived_user?.password ?? ""
  }) */

  //console.log('isEditing', isEditing, userData, gived_user)
  if (gived_user && gived_user?.user_id !== userData?.user_id) {
    console.log('seteamos gived_user', gived_user)
    setUserData(gived_user)
  }
  //console.log(userData)
  const handleChange=(e)=> {
    
    //console.log(gived_user?.[e.target.name])
    //console.log("UNO handleChange en usertemplate", userData)
    setUserData({ ...userData, [e.target.name]: e.target.value})
    console.log(markAsEdited, gived_user?.[e.target.name] !== e.target.value, e.target.className.search(/editing/i))
    if (markAsEdited 
      && gived_user?.[e.target.name] !== e.target.value) {
      if (e.target.className.search(/editing/i) < 0) {
        e.target.className = e.target.className + " editing"
      }
      
    } else {
      e.target.classList.remove('editing');
    }
    //console.log("DOS handleChange en usertemplate", userData)
  }
  const submitForm=(e)=>{
    e.preventDefault()
    const sendData = {
      user_id: userData.user_id,
      username: userData.username,
      first_name: userData.first_name,
      last_name: userData.last_name,
      email: userData.email,
      password: userData.password
    }
    console.log("submitForm usertemplate", sendData)
    //servidor => [select, insert, update]

    axios.post("http://localhost/cosas-reactjs/servidores/login/" + servidor +".php", sendData).then(
      (result)=>{
        if (result.data.Status == 'Invalid') {
          //alert("Invalid User")
        } else {
          //Navigate(`/login`)
        }
        var message = result.data?.success ? "Acción ejecutada satisfactoriamente" : "Algo ha fallado.";
        if (result.data?.message) {
          message = result.data?.message
        }
        //console.log(message)
        //alert(message)
        MyToastr(
          { message: message, type: result.data?.success }
        )
        if (servidor === 'insert') {
          console.log("Was an insert", { ...userData, user_id: result.data?.data?.user_id });
          afterDoFunction({ ...userData, user_id: parseInt(result.data?.data?.user_id),isNew:true })
        }
        //setUserData({ ...userData, [e.target.name]: e.target.value })

      }
    )
  }
  return (
    <div className="-main-box">
      <form onSubmit={submitForm}>
      <div className="row">
        <div className="col-md-12 text-center">
            <h1>{title ?? "Datos"}</h1>
        </div>
      </div>
        <div className="row">
          <div className="col-md-6">Username</div>
          <div className="col-md-6">
            <input type="text" name="username" className="form-control"  placeholder="Su Nombre de usuario" value={userData?.username ?? ""}  onChange={handleChange}  required/>
          </div>
        </div>
      <div className="row">
        <div className="col-md-6">Firt Name</div>
        <div className="col-md-6">
            <input type="text" name="first_name" className="form-control"  placeholder="Su Nombre" value={userData?.first_name ?? ""} onChange={handleChange}/>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">Last Name</div>
        <div className="col-md-6">
            <input type="text" name="last_name" className="form-control"  placeholder="Su/s apellido/s" value={userData?.last_name ?? ""} onChange={handleChange}/>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">Email</div>
        <div className="col-md-6">
            <input type="email" name="email" className="form-control"  placeholder="Su email" value={userData?.email ?? ""} onChange={handleChange} required/>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">Password</div>
        <div className="col-md-6">
            <input type="text" name="password" className="form-control"  placeholder="Su contraseña" value={userData?.password ?? ""} onChange={handleChange} required/>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
            <input type="submit" name="submit" value={buttonText ?? "Enviar" }/>
            <input type="hidden" name="user_id" className="form-control" value={userData?.user_id ?? ""} onChange={handleChange} />
        </div>
      </div>
      </form>
    </div>
    
  )
}