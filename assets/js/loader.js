var loader;
var startLoad = document.getElementById("go");

startLoad.addEventListener("click", loader());

function loader() {
  loader = setTimeout(showPage, 3000);
}

function showPage() {
  document.getElementById("loader").style.display = "none";
  document.getElementById("load").style.display = "block";
}