export default function MyToastr({message, type = "error", position}) {
  // Get the snackbar DIV
  var x = document.getElementById("snackbar");//Está en el index

  // TODO @al Comprobaciones
  console.log('MyToastr', message, type)
  x.innerHTML = message

  if (typeof type == 'number'){
    switch (type) {
      case -1:
        type = "error"
        break;
      case 0:
        type = "warning"
        break;
      case 1:
        type = "success"
        break;
      default:
        type = "info"
        break;
    }
  } else if (typeof type == 'undefined') {
    type = "error"
  }

  // Add the "show" class to DIV
  x.className = "show " + type;

  // After 3 seconds, remove the show class from DIV
  setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
}