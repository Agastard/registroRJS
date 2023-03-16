import { useEffect, useState } from "react";
//import { UserCard } from "./UserCard";
import UserTemplate from "./UserTemplate";
import { get } from "./utils/httpClient";
import MyToastr from "./utils/myToastr";
import './ListUsers.css';
import { Spinner } from "./utils/spinner";

export default function ListUsers() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  const [noUserInBD, setNoUserInBD] = useState(false);
  //const [isLoading, setIsloading] = useState(true);
  useEffect(() => {
    console.log("Usuario seleccionado", selectedUser, noUserInBD)
    if (noUserInBD && selectedUser) {
      console.log("Entré", selectedUser)
      setUsers([selectedUser])
      //console.log(users)
      setNoUserInBD(false);
    } else if (selectedUser?.isNew) {
      var tempUsers = users
      tempUsers.push(selectedUser)
      console.log('tempUsers', tempUsers)
      setUsers(tempUsers);
      setNoUserInBD(false)
    }
  }, [selectedUser])
  const getUser = (event) => {
    setIsloading(true)
    //setData({ ...data, [e.target.name]: e.target.value })
    //console.log(e.target)
    //const selectedIndex = e.target.options.selectedIndex;
    //console.log(event.target.getAttribute('user-id'));
    //setSelectedUser()
    //console.log(event.target.getAttribute("user-id"), event.target.className)
    
    let canContinue = true
    // Si clico
    if (event.target.className.search(/selected/i) >= 0) {
      canContinue = false
    }
    // Eliminamos clases 'edited' en caso de cambiar de user
    const editingItmes = document.querySelectorAll(".editing");
    if (editingItmes?.length > 0 && canContinue) {
      var answer = window.confirm("Tiene datos editados ¿Quiere cambiar de usuario?");
      if (answer) {
        // Eliminamos cambios
        canContinue = true;
        editingItmes.forEach((element) => {
          element.classList.remove('editing');
        });
        const editedItmes = document.querySelectorAll(".success_edited");
        editedItmes.forEach((element) => {
          element.classList.remove('success_edited');
        });
        const errorItmes = document.querySelectorAll(".error_edited");
        errorItmes.forEach((element) => {
          element.classList.remove('error_edited');
        });
      }
      else {
        canContinue = false;
        //some code
      }
    }
    if (canContinue) {
      const selectedItmes = document.querySelectorAll("li.selected");
      if (selectedItmes) {
        selectedItmes.forEach((element) => {
          element.classList.remove('selected');
        });
      }

      event.target.className = event.target.className + " selected"
      //console.log(event.target.className)
      const searchUrl = "/select.php"
      get(searchUrl, { action: "getUser", user_id: event.target.getAttribute('user-id') }).then((results) => {
        
        console.log('getUser', results)
        if (!(results?.success) && results.success <= 0) {
          MyToastr({ message: "Usuario no encontrado", type: results?.success })
          setSelectedUser([]);
        } else if (results?.data) {
          setSelectedUser(results.data);
        } else  {
          MyToastr({ message: "Algo ha ocurrido, contacte con soporte si el problema persiste", type: "error" })
          setSelectedUser([]);
        }
        setIsloading(false)
      }).catch(function (error) {
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
        console.log(error.config);
        setSelectedUser([]);
        setIsloading(false)
      });
    }

  }
  console.log('¿no hay users in bd?', noUserInBD)
  if (!noUserInBD && (!users || users?.length <= 0)) {
    console.log("No usewrs", users)
    console.log("searching....")
    //setIsloading(true)
    const searchUrl = "/select.php"
    get(searchUrl, { action: "getUsers" }).then((results) => {
      //console.log('seteamos esto',results.data)
      if (results.data?.length > 0) {
        console.log('seteamos esto', results.data)
        // @HACk
        var tempUsers = results.data;
        for (var i = 0; i < 9; i++) {
          //tempUsers.push(tempUsers[0])
        }
        //setUsers(results.data);
        setUsers(tempUsers);
      } else {
        console.log('no hay', results.data)
        setNoUserInBD(true);
      }
      setIsloading(false)
    }).catch(function (error) {
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
      console.log(error.config);
      setIsloading(false)
    });
  } else {
    console.log("Sí usewrs", users)

  }
  // Sin implementar
  if (isLoading) {
    console.log("return spinner");
    return <Spinner />
  } 

  if (selectedUser || selectedUser?.username?.length <= 0) {
    
  }
  //console.log('users listUser', users)
  
  return (
    <div id="divUsers">
      <ul id="ulUsers" >
        <li user-id={'nuevo'} key={'nuevo'} user={[]} onClick={() => { setSelectedUser(); }}>{"Nuevo Usuario"}</li>
        {users?.length > 0 ? users.map((user) => (
          <li user-id={user.user_id} key={user.user_id} user={user} onClick={getUser}>{user?.username ?? "No name"}</li>
          /*REAL NO HECHp<UserCard key={movie.id} movie={movie} />*/
        )) : <div>Sin usuarios en el sistema, pruebe a crear alguno</div> }
      </ul>
      <div>
        {(selectedUser?.username?.length > 0) 
          ? <UserTemplate title={"Cuenta de:" + selectedUser?.username ?? "No name"} buttonText={"Actualizar"} servidor={"update"} gived_user={selectedUser} markAsEdited={true} afterDoFunction={(editedUser) => {
            console.log('editedUser',editedUser)
            setSelectedUser(editedUser);
          }} /> 
          : <UserTemplate title={"Nueva cuenta"} buttonText={"Crear"} servidor={"insert"} gived_user={selectedUser} markAsEdited={false} 
          afterDoFunction={(newUser) => {
            console.log(newUser)
            setSelectedUser(newUser);
          }} />}
      </div>
    </div>
  )
}