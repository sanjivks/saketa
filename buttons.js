

document.addEventListener("DOMContentLoaded", function () {
    // Generate buttons dynamically from A to Z
    const alphabetButtonsContainer = document.getElementById("alphabetButtons");

    for (let letter = 'A'.charCodeAt(0); letter <= 'Z'.charCodeAt(0); letter++) {
        const button = document.createElement("button");
        button.textContent = String.fromCharCode(letter);
        button.addEventListener("click", function () {
            showData(String.fromCharCode(letter));
        });
        alphabetButtonsContainer.appendChild(button);
    }
});

//-----------------------------------------------------------------SEARCH DATA BY FILTER DROPDOWN BOX----------------------------------------------------

function performSearch() {
    // Get the search input value
    var searchText = $('#searchInput').val().toLowerCase();

    // Get the selected filter criteria
    var selectedFilter = $('#searchDropdown').val();

    // Fetch existing data from localStorage
    var existingData = JSON.parse(localStorage.getItem('employeeData')) || [];

    // Filter data based on the selected criteria
    var filteredData = existingData.filter(employee => {
        switch (selectedFilter) {
            case 'option1': // Preferred Name
                return (
                    employee.firstName.toLowerCase().startsWith(searchText)
                    //employee.lastName.toLowerCase().startsWith(searchText)
                );
            case 'option2': // Department
                return employee.department.toLowerCase().startsWith(searchText);
            case 'option3': // Job Title
                return employee.jobTitle.toLowerCase().startsWith(searchText);
            default:
                return false;
        }
    });

    // Display filtered data
    displayEmployeeData(filteredData);
}

//---------------------------------------------------------------SEARCH EMPLOYEE DATA USING CREATED BUTTONS-----------------------------------------------------------------

function showData(startingLetter) {
    // Fetch existing data from localStorage
    var existingData = JSON.parse(localStorage.getItem('employeeData')) || [];

    // Filter data based on the starting letter
    //var filteredData = existingData.filter(employee => employee.firstName.startsWith(startingLetter));

    // Filter data based on the starting letter in lowercase
    // var filteredData = existingData.filter(employee => employee.firstName.toLowerCase().startsWith(startingLetter));

    var filteredData = existingData.filter(employee =>
        employee.firstName.startsWith(startingLetter.toUpperCase()) ||
        employee.firstName.startsWith(startingLetter.toLowerCase())
    );
    $('#searchInput').val('');
    // Display filtered data
    displayEmployeeData(filteredData);
}
