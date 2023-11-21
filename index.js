document.addEventListener('DOMContentLoaded', function () {
    loadUserData();
    document.getElementById('registrationForm').addEventListener('submit', function (event) {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const dob = document.getElementById('dob').value;
        const acceptedTerms = document.getElementById('acceptedTerms').checked;
        saveUserData(name, email, password, dob, acceptedTerms);
        displayUserData();
        document.getElementById('registrationForm').reset();
    });

    function saveUserData(name, email, password, dob, acceptedTerms) {
        let userData = JSON.parse(localStorage.getItem('userData')) || [];
        userData.push({ name, email, password, dob, acceptedTerms });
        localStorage.setItem('userData', JSON.stringify(userData));
    }

    function loadUserData() {
        let userData = JSON.parse(localStorage.getItem('userData')) || [];
        const tableBody = document.getElementById('userData').getElementsByTagName('tbody')[0];
        userData.forEach(user => {
            const newRow = document.createElement('tr');
            newRow.innerHTML = `
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.password}</td>
                <td>${user.dob}</td>
                <td>${user.acceptedTerms ? 'Yes' : 'No'}</td>
            `;
            tableBody.appendChild(newRow);
        });
    }

    function displayUserData() {
        const tableBody = document.getElementById('userData').getElementsByTagName('tbody')[0];
        tableBody.innerHTML = '';
        loadUserData();
    }
});
