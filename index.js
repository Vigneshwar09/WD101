
function formatDate(inputDate) {
    

    const parts = inputDate.split('/');
    if (parts.length !== 3) {
        return 'Invalid date format';
    }

    const day = parseInt(parts[1], 10);
    const month = parseInt(parts[0], 10) - 1;
    const year = parseInt(parts[2], 10);


    const date = new Date(year, month, day);

    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    return formattedDate;
}

function restrict() {

    var dateInput = document.getElementById("dob");
    var selectedDate = new Date(dateInput.value);

    var maxD = new Date(dateInput.max); 
    var minD = new Date(dateInput.min); 

    if (selectedDate < minD) {
        document.getElementById('dob').textContent = "Age should be lessthan" + maxformattedDate;
    } else if (selectedDate > maxD) {
        document.getElementById('dob').textContent = "Age should be lessthan" + minformattedDate;
    }
}

function initialState() {
    var dateInput = document.getElementById("dob");
    var today = new Date();
    var maxDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());

    var minDate = new Date(today.getFullYear() - 55, today.getMonth(), today.getDate());
    const inputMaxDate = maxDate.toLocaleDateString();
    const inputMinDate = minDate.toLocaleDateString();
    const maxformattedDate = formatDate(inputMaxDate);
    const minformattedDate = formatDate(inputMinDate);
    var maxD = new Date(maxformattedDate); // Replace with your minimum date
    var minD = new Date(minformattedDate); // Replace with your maximum date
    dateInput.setAttribute("min", minD.toISOString().split('T')[0]);
    dateInput.setAttribute("max", maxD.toISOString().split('T')[0]);
}


 window.onload = initialState

document.addEventListener("DOMContentLoaded", function () {
    const registrationForm = document.getElementById("registrationForm");
    const userTableBody = document.getElementById("userTableBody");

    
    loadUserEntries();

    registrationForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const pwd = document.getElementById("password").value;
        const terms = document.getElementById("terms").checked;
        const dob = document.getElementById("dob").value;

        const newRow = userTableBody.insertRow();
        newRow.innerHTML = `<td>${name}</td><td>${email}</td><td>${pwd}</td><td>${dob}</td><td>${terms}</td>`;
        clearFormFields();

    
        saveUserEntry(name, email, pwd, dob, terms);

    });

    function clearFormFields() {
        registrationForm.reset();
    }

    function loadUserEntries() {
        const userEntries = JSON.parse(localStorage.getItem("userEntries")) || [];
        userEntries.forEach(({ name, email, pwd, dob, terms }) => {
            const newRow = userTableBody.insertRow();
            newRow.innerHTML = `<td>${name}</td><td>${email}</td><td>${pwd}</td><td>${dob}</td><td>${terms}</td>`;
        });
    }

    function saveUserEntry(name, email, pwd, dob, terms) {
        const userEntries = JSON.parse(localStorage.getItem("userEntries")) || [];
        userEntries.push({ name, email, pwd, dob, terms });
        localStorage.setItem("userEntries", JSON.stringify(userEntries));
    }
});
