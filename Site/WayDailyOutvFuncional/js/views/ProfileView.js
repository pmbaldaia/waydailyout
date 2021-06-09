import UserController from '../controllers/UserController.js'

export default class ProfileView {

    constructor() {
        this.userController = new UserController()

        // Dados do formulario de editar conta
        this.usernameEdit = document.querySelector("#txtUsernameEdit")
        this.genderEdit = document.querySelector("#txtGenderEdit")
        this.emailEdit = document.querySelector("#txtEmailEdit")
        this.dateEdit = document.querySelector("#txtDateEdit")
        this.localEdit = document.querySelector("#txtLocalEdit")
        this.passwordEditRegister = document.querySelector("#txtPasswordRegister")
        this.editUserMessage = document.getElementById('registerMessage');


        this.renderEditForm()
        this.renderNewPersonalData()
    }

    renderEditForm() {
        let userEdit = this.userController.getUserData()

        for (let i = 0; i < userEdit; i++) {
            this.txtUsernameEdit = userEdit[i].username

            // result += `<td>${utilizadores[i].username}</td>
            //               <td>${utilizadores[i].password}</td>
            //               <td>${utilizadores[i].type}</td>
            //               <td><button id="${utilizadores[i].username}" class="btn btn-info alterar">Alterar tipo</button></td>
            //               <td><button id="${utilizadores[i].username}" class="btn btn-warning edit">Editar</button></td>
            //               <td><button id="${utilizadores[i].username}" class="btn btn-danger delete">Apagar</button></td>
            //             </tr>`
        }

        // const userEdit = this.userController.getUserData()
        // txtUsernameEdit.value = userEdit.username

    }


    renderNewPersonalData() {
        this.frmEditProfile.addEventListener('submit', event => {
            event.preventDefault();

            try {
                this.userController.change(
                    this.usernameEdit.value,
                    this.genderEdit.value,
                    this.emailEdit.value,
                    this.dateEdit.value,
                    this.localEdit.value,
                    this.passwordEditRegister.value
                );
                this.displayMessage('Dados alterados com sucesso!', 'success');

                // Espera 1 seg. antes de fazer refresh à pagina
                // Assim o utilizador pode ver a mensagem na modal antes de a mesma se fechar
                setTimeout(() => { location.href = "../html/profile.html" }, 1000);
            } catch (err) {
                this.displayMessage(err, 'danger');
            }
        });
    }

    displayMessage(message, type) {
        this.editUserMessage.innerHTML =
            `<div class="alert alert-${type}" role="alert">${message}</div>`;
    }
}
