class App{
    constructor(){

        this.#importDataFixtures();

    }

    #importDataFixtures() {
                
        const users = [
            {
                id: 1,
                username: 'user',
                password: 'user',
                email: 'teste@teste.pt',
                birthday: '04/25/1998',
                genre: 'Male',
                local: 'Porto'
            },
            {
                id: 2,
                username: 'admin',
                password: 'admin',
                email: 'admin@teste.pt',
                birthday: '04/25/1989',
                genre: 'Female',
                local: 'Lisboa'
            },
            {
                id: 3,
                username: 'teste',
                password: 'teste',
                email: 'amanha@teste.pt',
                birthday: '04/25/1975',
                genre: 'Male',
                local: 'Maia'
            },
            
    
        ];
    
        if (!localStorage.users) {
            localStorage.setItem('users', JSON.stringify(users));
        }
    }
}



(function mounted() {
    getTableData();
    $("#birthday").datepicker({
        changeMonth: true,
        changeYear: true,
        yearRange: '1950:2020',
    });
    $("#edit_birthday").datepicker({
        changeMonth: true,
        changeYear: true,
        yearRange: '1950:2020',
    })
})();

/**
 * Gerar o id do utilizador
*/
function listuser() {
    return parseInt(Date.now() + Math.random());
}

/**
 * Criar e guardar utilizador
 */
function saveUserInfo() {
    var keys = ['username', 'password', 'email', 'birthday', 'genre', 'local'];
    var obj = {};

    keys.forEach(function (item, index) {
        var result = document.getElementById(item).value;
        if (result) {
            obj[item] = result;
        }
    })

    var users = getUsers();

    if (!users.length) {
        $('.show-table-info').addClass('hide');
    }

    if (Object.keys(obj).length) {
        var users = getUsers();
        obj.id = listuser();
        users.push(obj);
        var data = JSON.stringify(users);
        localStorage.setItem("users", data);
        clearFields();
        obj.birthday = calculateAge(obj.birthday);
        insertIntoTableView(obj, getTotalRowOfTable());
        $('#addnewModal').modal('hide')
    }
}

/**
 * Apagar dados
 */
function clearFields() {
    $('#input_form')[0].reset();
}

/** 
 * Listar Dados LocalStorage
*/
function getUsers() {
    var userRecord = localStorage.getItem("users");
    var users = [];
    if (!userRecord) {
        return users;
    } else {
        users = JSON.parse(userRecord);
        return users;
    }
}

/**
 * idade dos utilizadores
 */
function getFormattedUsers() {
    var users = getUsers();

    users.forEach(function (item, index) {
        item.birthday = calculateAge(item.birthday);
    });

    return users;

}


/**
 * Calcular a idade do utilizador
 * 
 * @param {string} date 
 */
function calculateAge(date) {
    var today = new Date();
    var birthDate = new Date(date);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}


/**
 * Listar dados
 */
function getTableData() {
    $("#user_table").find("tr:not(:first)").remove();

    var searchKeyword = $('#user_search').val();
    var users = getFormattedUsers();

    var filteredUsers = users.filter(function (item, index) {
        return item.username.toLowerCase().includes(searchKeyword.toLowerCase()) ||
            item.password.toLowerCase().includes(searchKeyword.toLowerCase()) ||
            item.email.toLowerCase().includes(searchKeyword.toLowerCase()) ||
            item.genre.toLowerCase().includes(searchKeyword.toLowerCase()) ||
            item.local.toLowerCase().includes(searchKeyword.toLowerCase()) 
    });

    if (!filteredUsers.length) {
        $('.show-table-info').removeClass('hide');
    } else {
        $('.show-table-info').addClass('hide');
    }

    filteredUsers.forEach(function (item, index) {
        insertIntoTableView(item, index + 1);
    })
}

/**
 * Inserir dados na database
 * 
 * @param {object} item 
 * @param {int} tableIndex 
 */
function insertIntoTableView(item, tableIndex) {
    var table = document.getElementById('user_table');
    var row = table.insertRow();
    var idCell = row.insertCell(0);
    var usernameCell = row.insertCell(1);
    var passwordCell = row.insertCell(2);
    var emailCell = row.insertCell(3);
    var dateOfBirthCell = row.insertCell(4);
    var genreCell = row.insertCell(5);
    var localCell = row.insertCell(6);
    var actionCell = row.insertCell(7);
    
    idCell.innerHTML = tableIndex;
    usernameCell.innerHTML = item.username;
    passwordCell.innerHTML = item.password;
    emailCell.innerHTML = item.email;
    dateOfBirthCell.innerHTML = item.birthday;
    genreCell.innerHTML = '<a class="tag">'+item.genre+'</a>'
    localCell.innerHTML = item.local;
    var listuser = item.id;

    actionCell.innerHTML = '<button class="btn btn-sm btn-warning" onclick="showUserData(' + listuser + ')">Ver Dados</button> ' +
        '<button class="btn btn-sm btn-primary" onclick="showEditModal(' + listuser + ')">Editar</button> ' +
        '<button class="btn btn-sm btn-danger" onclick="showDeleteModal(' + listuser + ')">Apagar</button>';
}


/**
 * Total
 */
function getTotalRowOfTable() {
    var table = document.getElementById('user_table');
    return table.rows.length;
}

/**
 * Mostrar dados 1 utilizador
 * 
 * @param {string} id 
 */
function showUserData(id) {
    var allUsers = getUsers();
    var user = allUsers.find(function (item) {
        return item.id == id;
    })

    $('#show_username').val(user.username);
    $('#show_password').val(user.password);
    $('#show_email').val(user.email);
    $('#show_birthday').val(user.birthday);
    $('#show_genre').val(user.genre);
    $('#show_local').val(user.local);

    $('#showModal').modal();

}


/**
 * Editar um utilizador
 * 
 * @param {string} id 
 */
function showEditModal(id) {
    var allUsers = getUsers();
    var user = allUsers.find(function (item) {
        return item.id == id;
    })

    $('#edit_username').val(user.username);
    $('#edit_password').val(user.password);
    $('#edit_email').val(user.email);
    $('#edit_birthday').val(user.birthday);
    $('#edit_genre').val(user.genre);
    $('#edit_local').val(user.local);

    $('#user_id').val(id);

    $('#editModal').modal();
}


/**
 * Guardar Editar Dados do utilizador
*/
function updateUserData() {

    var allUsers = getUsers();
    var userId = $('#user_id').val();

    var user = allUsers.find(function (item) {
        return item.id == userId;
    })

    user.username = $('#edit_username').val();
    user.password = $('#edit_password').val();
    user.email = $('#edit_email').val();
    user.birthday = $('#edit_birthday').val();
    user.genre = $('#edit_genre').val();
    user.local = $('#edit_local').val();

    var data = JSON.stringify(allUsers);
    localStorage.setItem('users', data);

    $("#user_table").find("tr:not(:first)").remove();
    getTableData();
    $('#editModal').modal('hide')
}

/**
 * Apagar utilizador
 * 
 * @param {int} id 
 */
function showDeleteModal(id) {
    $('#deleted-user-id').val(id);
    $('#deleteDialog').modal();
}

/**
 * Apagar um utilizador
*/
function deleteUserData() {
    var id = $('#deleted-user-id').val();
    var allUsers = getUsers();

    var storageUsers = JSON.parse(localStorage.getItem('users'));

    var newData = [];

    newData = storageUsers.filter(function (item, index) {
        return item.id != id;
    });

    var data = JSON.stringify(newData);

    localStorage.setItem('users', data);
    $("#user_table").find("tr:not(:first)").remove();
    $('#deleteDialog').modal('hide');
    getTableData();

}

/**
 * Ordenar utilizadores
 * 
 * @param {string} type 
 */
function sortBy(type)
{
    $("#user").find("tr:not(:first)").remove();

    var totalClickOfType = parseInt(localStorage.getItem(type));
    if(!totalClickOfType) {
        totalClickOfType = 1;
        localStorage.setItem(type, totalClickOfType);
    } else {
        if(totalClickOfType == 1) {
            totalClickOfType = 2;
        } else {
            totalClickOfType = 1;
        }
        localStorage.setItem(type, totalClickOfType);
    }

    var searchKeyword = $('#user_search').val();
    var users = getFormattedUsers();

    var sortedUsers = users.sort(function (a, b) {
        return (totalClickOfType == 2) ? a[type] > b[type] : a[type] < b[type];
    });

    sortedUsers.forEach(function (item, index) {
        insertIntoTableView(item, index + 1);
    })
}



new App();