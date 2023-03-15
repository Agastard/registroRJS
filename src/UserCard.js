import { useState } from "react"

export function UserCard({ gived_user }) {
  const [userdata, setUserData] = useState({
    username:  "",
    first_name:  "",
    last_name:  "",
    email: "",
    password: "",
    id: "",
  })
  const handleChange = (e) => {
    setUserData({ ...userdata, [e.target.name]: e.target.value })
  }
  const submitForm = (e) => {
    e.preventDefault()
    const sendData = {
      id: userdata.id,
      username: userdata.username,
      first_name: userdata.first_name,
      last_name: userdata.last_name,
      email: userdata.email,
      password: userdata.password
    }
    // TODO @al QUizá sólo enviar userdata si no está vacío
    console.log(sendData, userdata)
  }
  console.log('gived_user', gived_user, userdata)
  // TODO @Al comprobaciones
  if (userdata !== gived_user) {
    setUserData(gived_user)
  }
  return (
    <div className="-main-box">
      <form onSubmit={submitForm}>
        <div className="row">
          <div className="col-md-12 text-center">
            <h1>Datos de Usuario</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">Username</div>
          <div className="col-md-6">
            <input type="text" name="username" className="form-control" onChange={handleChange} value={userdata.username}/>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">Firt Name</div>
          <div className="col-md-6">
            <input type="text" name="first_name" className="form-control" onChange={handleChange} value={userdata.first_name}/>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">Last Name</div>
          <div className="col-md-6">
            <input type="text" name="last_name" className="form-control" onChange={handleChange} value={userdata.last_name}/>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">Email</div>
          <div className="col-md-6">
            <input type="email" name="email" className="form-control" onChange={handleChange} value={userdata.email}/>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">Password</div>
          <div className="col-md-6">
            <input type="password" name="password" className="form-control" onChange={handleChange} value={userdata.password}/>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <input type="submit" name="submit" value="Editar" />
          </div>
        </div>
      </form>
    </div>
  )
}