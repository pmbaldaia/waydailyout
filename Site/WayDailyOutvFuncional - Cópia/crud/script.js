var selectedRow = null

function onFormSubmit() {
    if (validate()) {
        var formData = readFormData();
        if (selectedRow == null)
            insertNewRecord(formData);
        else
            updateRecord(formData);
        resetForm();
    }
}

function readFormData() {
    var formData = {};
    formData["aName"] = document.getElementById("aName").value;
    formData["aCode"] = document.getElementById("aCode").value;
    formData["aSalary"] = document.getElementById("aSalary").value;
    formData["aCity"] = document.getElementById("aCity").value;
    return formData;
}

function insertNewRecord(data) {
    var table = document.getElementById("aList").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.aName;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.aCode;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.aSalary;
    cell4 = newRow.insertCell(3);
    cell4.innerHTML = data.aCity;
    cell4 = newRow.insertCell(4);
    cell4.innerHTML = `<a onClick="onEdit(this)">Editar</a>
                       <a onClick="onDelete(this)">Apagar</a>`;
}

function resetForm() {
    document.getElementById("aName").value = "";
    document.getElementById("aCode").value = "";
    document.getElementById("aSalary").value = "";
    document.getElementById("aCity").value = "";
    selectedRow = null;
}

function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("aName").value = selectedRow.cells[0].innerHTML;
    document.getElementById("aCode").value = selectedRow.cells[1].innerHTML;
    document.getElementById("aSalary").value = selectedRow.cells[2].innerHTML;
    document.getElementById("aCity").value = selectedRow.cells[3].innerHTML;
}
function updateRecord(formData) {
    selectedRow.cells[0].innerHTML = formData.aName;
    selectedRow.cells[1].innerHTML = formData.aCode;
    selectedRow.cells[2].innerHTML = formData.aSalary;
    selectedRow.cells[3].innerHTML = formData.aCity;
}

function onDelete(td) {
    if (confirm('Are you sure to delete this record ?')) {
        row = td.parentElement.parentElement;
        document.getElementById("aList").deleteRow(row.rowIndex);
        resetForm();
    }
}
function validate() {
    isValid = true;
    if (document.getElementById("aName").value == "") {
        isValid = false;
        document.getElementById("aNameValidationError").classList.remove("hide");
    } else {
        isValid = true;
        if (!document.getElementById("aNameValidationError").classList.contains("hide"))
            document.getElementById("aNameValidationError").classList.add("hide");
    }
    return isValid;
}