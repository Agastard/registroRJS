import axios from "axios"
import { useState } from "react"
import { Link, Navigate } from "react-router-dom"
import UserTemplate from "./UserTemplate"
import './Register.css';

export default function Register() {
  const [data, setData] = useState({
    first_name:"",
    last_name:"",
    email:"",
    password:""
  })
  return (
    <UserTemplate title={"Regístrese"} servidor={"insert"} buttonText={"Enviar"} markAsEdited={false} />
  )
}