window.onload = function CreateTableFromJSON () {
    
    //placeholder JSON
    var memories = [
        {
            'Park Name': 'Park 1',
            'Date': '1/1/21',
            'Notes': 'My pup loves the dog run here!'
        },
        {
            'Park Name': 'Park 2',
            'Date': '1/28/21',
            'Notes': 'There is a beautiful monument at this park.'
        },
        {
            'Park Name': 'Park 3',
            'Date': '2/12/21',
            'Notes': 'It started raining when I got there, so I will have to come back!'
        },
        {
            'Park Name': 'Park 4',
            'Date': '2/28/21',
            'Notes': 'I love sitting by the pond here.'
        },
        {
            'Park Name': 'Park 5',
            'Date': '3/6/21',
            'Notes': 'We thought it would be a nice day for a picnic since the weather warmed up. The wind blew our blanket into the river. Maybe next time.'
        }
    ]
    
    console.log(memories);

    //extract Values for table header
    var col = [];
    for (var i = 0; i < memories.length; i++) {
        for (var key in memories[i]) {
            if (col.indexOf(key) === -1) {
                col.push(key);
            }
        }
    }

    console.log(col);

    //create table
    var table = document.createElement("table");

    //create header row using extracted data
    var tr = table.insertRow(-1);

    for (var i = 0; i < col.length; i++) {
        var th = document.createElement("th");
        th.innerHTML = col[i];
        tr.appendChild(th);
    }

    //add JSON data to table as individual rows
    for (var i = 0 ; i < memories.length; i++) {

        tr = table.insertRow(-1);

        for (var j = 0; j < col.length; j++) {
            var tabCell = tr.insertCell(-1);
            tabCell.innerHTML = memories[i][col[j]];
        }
    }

    console.log(table);

    //displays data in body
    var divShowData = document.getElementById("showData");
    divShowData.innerHTML = "";
    divShowData.appendChild(table);

};

