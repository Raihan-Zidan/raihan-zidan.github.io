function submit() {
  hasil = document.getElementById("hasil").innerHTML = "";
  var val = searchInput.value;
  var newElement = document.createElement('script');
  newElement.src = `https://www.googleapis.com/customsearch/v1?key=AIzaSyD69KZdQRASdg0QxpOA74adD4HeFRgHwx8&cx=e5dbd697a8e464044&q=${val}&callback=hndlr`;
  newElement.id = "mainscript";
  document.body.appendChild(newElement);
}
