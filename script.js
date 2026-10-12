const employeeForm =
  document.querySelector("#employeeForm");

const fullNameInput =
  document.querySelector("#fullName");

const emailInput =
  document.querySelector("#email");

const phoneInput =
  document.querySelector("#phone");

const departmentInput =
  document.querySelector("#department");

const positionInput =
  document.querySelector("#position");

const employeeTypeInput =
  document.querySelector("#employeeType");

const salaryInput =
  document.querySelector("#salary");

const employeeTableBody =
  document.querySelector("#employeeTableBody");

const employeeCount =
  document.querySelector("#employeeCount");

const errorMessage =
  document.querySelector("#errorMessage");


let employees =
  JSON.parse(localStorage.getItem("employees")) || [];


employeeForm.addEventListener("submit", function (event) {

  event.preventDefault();

  const fullName = fullNameInput.value.trim();

  const email = emailInput.value.trim();

  const phone = phoneInput.value.trim();

  const department = departmentInput.value;

  const position = positionInput.value.trim();

  const employeeType = employeeTypeInput.value;

  const salary = salaryInput.value;


  if (
    fullName === "" ||
    email === "" ||
    phone === "" ||
    department === "" ||
    position === "" ||
    employeeType === "" ||
    salary === ""
  ) {

    errorMessage.textContent =
      "Please complete all fields.";

    return;

  }


  const id = Date.now();


  const employee = {

    id,

    fullName,

    email,

    phone,

    department,

    position,

    employeeType,

    salary: Number(salary)

  };


  employees.push(employee);


  saveEmployees();


  displayEmployees();


  employeeForm.reset();


  errorMessage.textContent = "";

});


function saveEmployees() {

  localStorage.setItem(
    "employees",
    JSON.stringify(employees)
  );

}


function displayEmployees() {

  employeeTableBody.innerHTML = "";


  employees.forEach(function (employee) {

    const row =
      document.createElement("tr");


    row.innerHTML = `

      <td>${employee.id}</td>

      <td>${employee.fullName}</td>

      <td>${employee.email}</td>

      <td>${employee.phone}</td>

      <td>${employee.department}</td>

      <td>${employee.position}</td>

      <td>${employee.employeeType}</td>

      <td>
        GHS ${employee.salary.toFixed(2)}
      </td>

      <td>

        <button
          class="delete-btn"
          onclick="deleteEmployee(${employee.id})"
        >
          Delete
        </button>

      </td>

    `;


    employeeTableBody.appendChild(row);

  });


  employeeCount.textContent =
    employees.length;

}


function deleteEmployee(id) {

  employees =
    employees.filter(function (employee) {

      return employee.id !== id;

    });


  saveEmployees();


  displayEmployees();

}


displayEmployees();