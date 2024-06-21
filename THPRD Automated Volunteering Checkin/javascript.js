document.addEventListener("DOMContentLoaded", function() {
    var myArray = [
        {"name": "John Doe", "time_slot": "9:00 AM - 10:00 AM", "job": "Manager", "attended": false},
        {"name": "Jane Smith", "time_slot": "10:00 AM - 11:00 AM", "job": "Developer", "attended": false},
        {"name": "Mike Johnson", "time_slot": "11:00 AM - 12:00 PM", "job": "Designer", "attended": false}
        
    ];
    
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
            });
        });
    }

    $('#search-input').on('keyup', function(){
        var value = $(this).val().toLowerCase();
        var filteredData = searchTable(value, myArray);
        buildTable(filteredData);
    });

    function searchTable(value, data){
        var filteredData = [];
        for (var i = 0; i < data.length; i++){
            var name = data[i].name.toLowerCase();
            if (name.includes(value)){
                filteredData.push(data[i]);
            }
        }
        return filteredData;
    }

    const btnDownloadCsv = document.getElementById("btnDownloadCsv");

    btnDownloadCsv.addEventListener("click", () => {
       
        let checkboxes = document.querySelectorAll(".attendance-checkbox");
        checkboxes.forEach((checkbox, index) => {
            myArray[index].attended = checkbox.checked;
        });

        const csv = json2csv.parse(myArray);
        downloadCsv("checkin_meetname.csv", csv);
    });

    function downloadCsv(filename, csvData) {
        const element = document.createElement("a");
        element.setAttribute("href", `data:text/csv;charset=utf-8,${encodeURIComponent(csvData)}`);
        element.setAttribute("download", filename);
        element.style.display = "none";
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    }

    const submitButton = document.getElementById("submit");

    submitButton.addEventListener("click", function() {
        const registeredname = document.getElementById("name").value;
        const registeredslot = document.getElementById("slot").value;
        const registeredjob = document.getElementById("job").value;
    
        console.log("Name:", registeredname);
        console.log("Time Slot:", registeredslot);
        console.log("Job:", registeredjob);
    

        if (registeredname && registeredslot && registeredjob) {
            var userDetail = {
                "name": registeredname,
                "time_slot": registeredslot,
                "job": registeredjob
            };
            myArray.push(userDetail);

            buildTable(myArray);
            console.log(userDetail);

            document.getElementById("name").value = "";
            document.getElementById("slot").value = "";
            document.getElementById("job").value = "";

         
        
        } else {
            alert("Please fill in all fields.");
        }
        
    });

    $('th').on('click', function() {
        var column = $(this).data('column');
        var order = $(this).data('order');
        var text = $(this).html();
        text = text.substring(0, text.length - 1);

        if (order == 'desc') {
            $(this).data('order', "asc");
            myArray.sort((a, b) => a[column] > b[column] ? 1 : -1);
            text += '&#9650';
        } else {
            $(this).data('order', "desc");
            myArray.sort((a, b) => a[column] < b[column] ? 1 : -1);
            text += '&#9660';
        }
        $(this).html(text);
        buildTable(myArray);
    });


});
