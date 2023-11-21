document.addEventListener('DOMContentLoaded', function () {
    // Load data from localStorage on page load
    loadUserData();

    // Event listener for form submission
    document.getElementById('registrationForm').addEventListener('submit', function (event) {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const dob = document.getElementById('dob').value;
        const acceptedTerms = document.getElementById('acceptedTerms').checked;

        // Check if the user is between 18 and 55 years old
        if (!isValidAge(dob)) {
            alert("Sorry, you must be between 18 and 55 years old to register.");
            return;
        }

        // Check if the email is valid
        if (!isValidEmail(email)) {
            alert("Please enter a valid email address.");
            return;
        }

        // Save data to localStorage
        saveUserData(name, email, password, dob, acceptedTerms);

        // Display data in the table
        displayUserData();

        // Clear the form inputs
        document.getElementById('registrationForm').reset();
    });

    function isValidAge(dob) {
        const currentDate = new Date();
        const birthDate = new Date(dob);
        const age = currentDate.getFullYear() - birthDate.getFullYear();

        // Check if the user is between 18 and 55 years old
        return age >= 18 && age <= 55;
    }

    function isValidEmail(email) {
        // Use a simple email validation regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function saveUserData(name, email, password, dob, acceptedTerms) {
        // Retrieve existing data from localStorage or initialize an empty array
        let userData = JSON.parse(localStorage.getItem('userData')) || [];

        // Add new user data
        userData.push({ name, email, password, dob, acceptedTerms });

        // Save the updated data back to localStorage
        localStorage.setItem('userData', JSON.stringify(userData));
    }

    function loadUserData() {
        // Retrieve data from localStorage
        let userData = JSON.parse(localStorage.getItem('userData')) || [];

        // Display data in the table
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
        // Clear existing data in the table
        const tableBody = document.getElementById('userData').getElementsByTagName('tbody')[0];
        tableBody.innerHTML = '';

        // Load and display updated data
        loadUserData();
    }
});
