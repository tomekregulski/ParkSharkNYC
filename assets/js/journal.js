while (savedMem === null) {
    savedMem = [];
};

var parkName = document.querySelector("#parkInput")
var dateVisited = document.querySelector("#date-visited")
var notes = document.querySelector("#textarea")


  $(document).ready(function(){
    $("#saveForm").click(function(event){
        event.preventDefault();
        if (parkName.value === "" || dateVisited.value === ""){
            $('#inputModal').modal();
        } else {
                while (notes.value ===""){
                    notes.value = "No notes.";
                };
                
                //FormData API submission
                const data = new FormData(document.getElementById("myForm"));
                
                const value = Object.fromEntries(data.entries()); //{Park: parkName, Date: dateVisited, Notes: notes};
            
                //logs form data to console
                console.log(value);
            
                //appends the memories object pulled from storage with new form data
                savedMem.push(value);
            
                //sends appended memories object back to storage as JSON
                localStorage.setItem("memories", JSON.stringify(savedMem));
            
                //reloads page on submission to update table
                location.reload();
              };
        });
    });