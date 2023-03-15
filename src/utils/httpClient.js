import MyToastr from "./myToastr";

const API = "http://localhost/cosas-reactjs/servidores/login";

// TODO @Al mejorar este sistema, en realidad podría usar sólo una función
// En alguno ssitios invoco esto y entro s axios
export function get(path, getOptionjs) {
  let apiPath = API + path
  return fetch(apiPath, {
    headers: {
      Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZmQwOTAwZWU3MTFjNzUwZTRhOGQyOGQ4M2UxNDc4NyIsInN1YiI6IjYzZDBkZjNjOWU0NTg2MDA4NWNkNTI0ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._5vWOnQM9GD24OzTrtAIrGZrkSI00SkxH8oUnDfc0g0",
      "Content-Type": "application/json;charset=utf-8",
    },
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    body: JSON.stringify(getOptionjs)
  }).then((result) => result.json()).catch(function (error) {
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
    MyToastr({ message: "Error detectado", type: "error"})
    console.log("Error detectado");
  });
}
export function set(path, getOptionjs) {
  let apiPath = API + path
  return fetch(apiPath, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZmQwOTAwZWU3MTFjNzUwZTRhOGQyOGQ4M2UxNDc4NyIsInN1YiI6IjYzZDBkZjNjOWU0NTg2MDA4NWNkNTI0ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._5vWOnQM9GD24OzTrtAIrGZrkSI00SkxH8oUnDfc0g0",
      "Content-Type": "application/json;charset=utf-8",
    },
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    body: JSON.stringify(getOptionjs)
  }).then((result) => result.json());
}