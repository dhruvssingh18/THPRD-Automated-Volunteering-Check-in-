document.addEventListener("DOMContentLoaded", function() {
    var myArray = JSON.parse(localStorage.getItem('myArray')) || [
        {"name": "John Doe", "time_slot": "9:00 AM - 10:00 AM", "job": "Manager", "attended": false},
        {"name": "Jane Smith", "time_slot": "10:00 AM - 11:00 AM", "job": "Developer", "attended": false},
        {"name": "Mike Johnson", "time_slot": "11:00 AM - 12:00 PM", "job": "Designer", "attended": false}
    ];

    document.getElementById('name').value = localStorage.getItem('name') || "";
    document.getElementById('slot').value = localStorage.getItem('slot') || "";
    document.getElementById('job').value = localStorage.getItem('job') || "";
    document.getElementById('attendance').value = localStorage.getItem('attendance') || "";
    
    buildTable(myArray);

    function buildTable(data) {
        var table = document.getElementById('myTable');
        table.innerHTML = ''; 
        for (var i = 0; i < data.length; i++) {
            var row = `<tr>
                <td>${data[i].name}</td>
                <td>${data[i].time_slot}</td>
                <td>${data[i].job}</td>
                <td><input type="checkbox" class="attendance-checkbox" ${data[i].attended ? 'checked' : ''}></td>
            </tr>`;
            table.innerHTML += row;
        }

        let checkboxes = document.querySelectorAll(".attendance-checkbox");
        checkboxes.forEach((checkbox, index) => {
            checkbox.addEventListener('change', function() {
                myArray[index].attended = checkbox.checked;
                localStorage.setItem('myArray', JSON.stringify(myArray));
            });
        });
    }

    $('#search-input').on('keyup', function() {
        var value = $(this).val().toLowerCase();
        var filteredData = searchTable(value, myArray);
        buildTable(filteredData);
    });

    function searchTable(value, data) {
        var filteredData = [];
        for (var i = 0; i < data.length; i++) {
            var name = data[i].name.toLowerCase();
            if (name.includes(value)) {
                filteredData.push(data[i]);
            }
        }
        return filteredData;
    }

    const submitButton = document.getElementById("submit");
  

    var form = document.getElementById('sheetdb-form');
    form.addEventListener("submit", e => {
    e.preventDefault();
    fetch(form.action, {
        method : "POST",
        body: new FormData(document.getElementById("sheetdb-form")),
   
});

document.getElementById("name").addEventListener("input", function() {
    localStorage.setItem('name', this.value);
});
document.getElementById("slot").addEventListener("input", function() {
    localStorage.setItem('slot', this.value);
});
document.getElementById("job").addEventListener("input", function() {
    localStorage.setItem('job', this.value);
});
document.getElementById("attendance").addEventListener("input", function() {
    localStorage.setItem('attendance', this.value);
});


    submitButton.addEventListener("click", function() {
        const registeredname = document.getElementById("name").value;
        const registeredslot = document.getElementById("slot").value;
        const registeredjob = document.getElementById("job").value;
        const registeredattendance = document.getElementById("attendance").value.toLowerCase();

        if (registeredname && registeredslot && registeredjob) {
            var userDetail = {
                "name": registeredname,
                "time_slot": registeredslot,
                "job": registeredjob,
                "attended": registeredattendance === "true"
            };

            localStorage.setItem('myArray', JSON.stringify(myArray));
            myArray.push(userDetail);
            buildTable(myArray);

            document.getElementById("name").value = "";
            document.getElementById("slot").value = "";
            document.getElementById("job").value = "";
            document.getElementById("attendance").value = "";
        }
        
       

        console.log(registeredname, registeredslot, registeredjob, registeredattendance)
        
    });

    document.getElementById("clear").addEventListener("click", function() {
        localStorage.clear();
        location.reload();
    });

    document.getElementById("copy-log").addEventListener("click", function() {
        const logData = printDataValues(myArray);
        document.getElementById("log-data").value = logData;
    });


    function printDataValues(data) {
        let logString = 'Name\tTime Slot\tJob\tAttended\n'; 
        data.forEach(entry => {
            logString += `${entry.name}\t${entry.time_slot}\t${entry.job}\t${entry.attended}\n`;
        });
        console.log(logString);
        return logString;
    }
    

    document.getElementById("copy-log").addEventListener("click", function() {
        const logData = printDataValues(myArray);
        document.getElementById("log-data").value = logData;
    });
    
});

}); 


