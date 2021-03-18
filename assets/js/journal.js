//if storage is empty changes null value to empty string
while (savedMem === null) {
    var savedMem = [];
}

//save function that activates upon save button click
function handleSave(event) {
    event.preventDefault();

    //returns user to form if not park name and visit date are not filled out
    var parkName = document.querySelector("#park-name")
    var dateVisited = document.querySelector("#date-visited")
    var notes = document.querySelector("#saving-notes")

    while (parkName.value === "" || dateVisited.value === ""){
        alert("Please enter a park name and visit date.")
        return;
    }

    while (notes.value ===""){
        notes.value = "No notes.";
    }
  
    //FormData API submission
    const data = new FormData(event.target);
  
    const value = Object.fromEntries(data.entries());

    //logs form data to console
    console.log(value);

    //appends the memories object pulled from storage with new form data
    savedMem.push(value);

    //sends appended memories object back to storage as JSON
    localStorage.setItem("memories", JSON.stringify(savedMem));

    //reloads page on submission to update table
    location.reload();
  }
  
  //signals save function to run on save button click
  const form = document.querySelector('form');
  form.addEventListener('submit', handleSave);