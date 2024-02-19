$(document).ready(function () {
    $('#employee_form').hide();

    $('#add_Employee').click(function () {
        // $('.mainPannel').hide();
        $('#employee_form').show();
    });

    $('#btcancle').click(function (event) {
        event.preventDefault();
        $('.mainPannel').show();
        $('#employee_form').hide();
    });

    // Fetch existing data from localStorage
    var existingData = JSON.parse(localStorage.getItem('employeeData')) || [];

    //------------------------------------------------------------DiSPLAY DATA IN MAINPANNEL---------------------------------------------------------------------
    var filteredEmployeeData;

    // Function to display employee data
    function displayEmployeeData(data) {
        filteredEmployeeData = data; // Store the filtered data

        let mainPannel = $('.mainPannel');
        let htmlStr = "";

        data.forEach((element, index) => {
            if (index % 4 === 0) {
                // Start a new row
                if (index !== 0) {
                    htmlStr += `</div>`; // Close the previous row
                }
                htmlStr += `<div class="row">`; // Start a new row
            }

            htmlStr += `<div class="Employee_info" data-index="${index}">
                     <div class="empolyee_img">
                         <img class="img_employee-img" src="./Image/employee.png">
                     </div>
                     <div class="employee_data">
                         <span>
                             <h4>${element.firstName}</h4>
                             <h4 style="margin-left: 4px">${element.lastName}</h4>
                         </span>
                         <span class="job_title">${element.jobTitle}</span>
                         <span class="develpoer">${element.department}</span>
                     </div>
                 </div>`;

            // If this is the last employee, close the row
            if (index === data.length - 1) {
                htmlStr += `</div>`;
            }
        });

        mainPannel.html(htmlStr);
    }
    window.displayEmployeeData = displayEmployeeData;

    // Display existing data
    displayEmployeeData(existingData);
    generateDepartmentButtons(existingData);
    generateJobTitleButtons(existingData);
    generateOfficeButtons(existingData);


    var currentIndex = 1;

    //--------------------------------------------------------ADD EMPOYEE DATA-------------------------------------------------------------------------

    $('#btnadd').click(function (event) {
        event.preventDefault();

        // Get form values
        var firstName = $('#fname').val();
        var lastName = $('#lname').val();
        var email = $('#email').val();
        var jobTitle = $('#job_title').val();
        var office = $('#office').val();
        var department = $('#Department').val();
        var phoneNumber = $('#phone_number').val();
        var skypeID = $('#Skype').val();

        // Create an object with the form data
        var employeeData = {
            index: currentIndex,
            firstName: firstName,
            lastName: lastName,
            email: email,
            jobTitle: jobTitle,
            office: office,
            department: department,
            phoneNumber: phoneNumber,
            skypeID: skypeID
        };

        currentIndex++;

        // Add the new data to the array
        existingData.push(employeeData);

        // Save the updated array back to localStorage
        localStorage.setItem('employeeData', JSON.stringify(existingData));

        // Display updated data
        displayEmployeeData(existingData);

        // alert('Employee data added successfully');

        // Reset the form
        $('#employee_form')[0].reset();
        $('.mainPannel').show();
        $('#employee_form').hide();
        displayEmployeeData(existingData);
        generateDepartmentButtons(existingData);
        generateJobTitleButtons(existingData);
        generateOfficeButtons(existingData);
    });

    //-----------------------------------------------------------WHEN CLICK ON CANCLE IMG -------------------------------------------------------------------

    $('.btncancle').click(function () {

        $('#employee_form').hide();
        // Show the main panel
        $('.mainPannel').show();

    });

    //---------------------------------------------GET THE INDEX OF THE CLICKED EMPLOYEE INFO------------------------------------------------------

    $('.mainPannel').on('click', '.Employee_info', function () {
        // Get the index from the data attribute
        var selectedIndex = $(this).data('index');

        // If selectedIndex is not set using data attribute, try to retrieve it using index
        if (selectedIndex === undefined) {
            selectedIndex = $(this).index();
        }

        var selectedEmployee = filteredEmployeeData[selectedIndex];

        $('#fname').val(selectedEmployee.firstName);
        $('#lname').val(selectedEmployee.lastName);
        $('#email').val(selectedEmployee.email);
        $('#job_title').val(selectedEmployee.jobTitle);
        $('#office').val(selectedEmployee.office);
        $('#Department').val(selectedEmployee.department);
        $('#phone_number').val(selectedEmployee.phoneNumber);
        $('#Skype').val(selectedEmployee.skypeID);

        // Show the form
        $('#employee_form').show();

        // Show update and delete buttons
        $('#btnupdate').show();
        $('#btndelete').show();
        $('#btnadd').hide();
        $('#btcancle').hide();

        // Set a data attribute to store the index of the selected employee
        $('#employee_form').attr('data-index', selectedIndex);
    });

    //--------------------------------------------------UPDATE EMPLOYEE DATA--------------------------------------------------------------------

    $('#btnupdate').click(function (event) {
        event.preventDefault();

        // Get the index from the data attribute
        var selectedIndex = $('#employee_form').attr('data-index');

        // Get form values
        var firstName = $('#fname').val();
        var lastName = $('#lname').val();
        var email = $('#email').val();
        var jobTitle = $('#job_title').val();
        var office = $('#office').val();
        var department = $('#Department').val();
        var phoneNumber = $('#phone_number').val();
        var skypeID = $('#Skype').val();

        // Update the selected employee's data
        existingData[selectedIndex] = {
            index: existingData[selectedIndex].index,
            firstName: firstName,
            lastName: lastName,
            email: email,
            jobTitle: jobTitle,
            office: office,
            department: department,
            phoneNumber: phoneNumber,
            skypeID: skypeID
        };

        // Save the updated array back to localStorage
        localStorage.setItem('employeeData', JSON.stringify(existingData));

        // Display updated data
        displayEmployeeData(existingData);
        generateDepartmentButtons(existingData);
        generateJobTitleButtons(existingData);
        generateOfficeButtons(existingData);

        // Reset the form
        $('#employee_form')[0].reset();
        $('.mainPannel').show();
        $('#employee_form').hide();
        // Hide update and delete buttons after update
        $('#btnupdate').hide();
        $('#btndelete').hide();
    });
    //----------------------------------------------------------------DELETE EMPLOYEE DATA-----------------------------------------------------------------

    $('#btndelete').click(function (event) {
        event.preventDefault();

        // Get the index from the data attribute
        var selectedIndex = $('#employee_form').attr('data-index');

        // Remove the selected employee's data
        existingData.splice(selectedIndex, 1);

        // Save the updated array back to localStorage
        localStorage.setItem('employeeData', JSON.stringify(existingData));

        // Display updated data
        displayEmployeeData(existingData);
        generateDepartmentButtons(existingData);
        generateJobTitleButtons(existingData);
        generateOfficeButtons(existingData);

        // Reset the form
        $('#employee_form')[0].reset();
        $('.mainPannel').show();
        $('#employee_form').hide();
        // Hide update and delete buttons after delete
        $('#btnupdate').hide();
        $('#btndelete').hide();
    });

    //---------------------------------------------------------------CREATE DEPARTMENT BUTTON ---------------------------------------------------------------

    function generateDepartmentButtons(data) {
        // Get unique departments from employee data
        var departments = [...new Set(data.map(employee => employee.department))];

        // Get the container for department buttons
        var departmentButtonsContainer = $('#departmentButtonsContainer');

        // Clear existing buttons
        departmentButtonsContainer.empty();

        // Generate buttons for each department
        departments.forEach(department => {
            const button = document.createElement("button");
            var departmenetdCount = data.filter(employee => employee.department === department).length;

            button.textContent = `${department} (${departmenetdCount})`;
            button.addEventListener("click", function () {
                filterByDepartment(department);
            });
            departmentButtonsContainer.append(button);
        });
    }
    function filterByDepartment(selectedDepartment) {
        // Filter data based on the selected department
        var filteredData = existingData.filter(employee => employee.department === selectedDepartment);

        // Display filtered data
        displayEmployeeData(filteredData);
    }

    //--------------------------------------------------------------- CREATE JOB TITLE BUTTON---------------------------------------------------------------

    function generateJobTitleButtons(data) {
        var jobTitles = [...new Set(data.map(employee => employee.jobTitle))];
        var jobTitleButtonsContainer = $('#jobTitleButtonsContainer');

        jobTitleButtonsContainer.empty();

        jobTitles.forEach(jobTitle => {
            const button = document.createElement("button");
            var jobRecordCount = data.filter(employee => employee.jobTitle === jobTitle).length;
            

            button.textContent = `${jobTitle} (${jobRecordCount})`;
            
            button.addEventListener("click", function () {
                filterByJobTitle(jobTitle);
            });
            jobTitleButtonsContainer.append(button);
        });
    }
    function filterByJobTitle(selectedJobTitle) {
        var filteredData = existingData.filter(employee => employee.jobTitle === selectedJobTitle);
        displayEmployeeData(filteredData);
    }

    //---------------------------------------------------------------CREATE OFFICES  BUTTON---------------------------------------------------------------
    

    function generateOfficeButtons(data) {
        var offices = [...new Set(data.map(employee => employee.office))];
        var officeButtonsContainer = $('#officeButtonsContainer');

        officeButtonsContainer.empty();

        offices.forEach(office => {
            const button = document.createElement("button");
            var officeRecordCount = data.filter(employee => employee.office === office).length;

            button.textContent = `${office} (${officeRecordCount})`;
            button.addEventListener("click", function () {
                filterByOffice(office);
            });
            officeButtonsContainer.append(button);
        });
    }




    function filterByOffice(selectedOffice) {
        var filteredData = existingData.filter(employee => employee.office === selectedOffice);
        displayEmployeeData(filteredData);
    }

});

