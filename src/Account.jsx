import { useUserContext } from "./UserProvider";
import UserTemplate from "./UserTemplate";

export default function Account() {
  const logged_user = useUserContext();//Logueado
  //{ title, buttonText = "Registrar",submitForm, handleChange }
  console.log('Account logged_user',logged_user)
  return (
    <UserTemplate 
      title={"Su cuenta"} buttonText={"Actualizar"} servidor={"update"} gived_user={logged_user}
    />
  ) 
}