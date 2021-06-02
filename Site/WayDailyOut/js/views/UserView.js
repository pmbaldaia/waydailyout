import UserController from '../controllers/UserController.js'

export default class UserView {
    constructor() {
        this.userController = new UserController();

        // register DOM
        this.registerUsername = document.getElementById('txtRegisterUsername');
        this.registerGender = document.getElementById('txtRegisterGender');
        this.registerEmail = document.getElementById('txtRegisterEmail');
        this.registerBirthDate = document.getElementById('txtRegisterDateBirth');
        this.registerLocal = document.getElementById('txtRegisterLocal');
        this.registerPassword = document.getElementById('txtRegisterPassword');
        this.registerPassword2 = document.getElementById('txtConfirmRegisterPassword');
        this.registerButton = document.getElementById('btnRegister');
        this.bindRegisterForm();

        // login/logout DOM
        this.loginUsername = document.getElementById('txtUsername');
        this.loginPassword = document.getElementById('txtPassword');
        this.loginButton = document.getElementById('btnLogin');
        this.logoutButton = document.getElementById('btnLogout');
        this.bindLoginForm();

        this.messages = document.querySelector('#messages')
        this.checkLoginStatus();

        this.adminLogged();
    }

    bindRegisterForm() {
        this.registerButton.addEventListener('click', () => {

            try {
                if (this.registerPassword.value !== this.registerPassword2.value) {
                    throw Error('Password e o Confirmar Password não são iguais ');
                }
                this.userController.register(this.registerUsername.value, this.registerGender.value, this.registerEmail.value, this.registerBirthDate.value,
                    this.registerLocal.value, this.registerPassword.value, 'user');
                this.displayMessage('Utilizador registado com sucesso!', 'success');
            } catch (e) {
                this.displayMessage(e, 'danger');
            }
        });
    }

    bindLoginForm() {
        this.loginButton.addEventListener('click', () => {
            try {
                this.userController.login(this.loginUsername.value, this.loginPassword.value);
                this.displayMessage('Iniciou sessão!', 'success');

                // Wait 1 second before reloading, so the user can see the login success message
                setTimeout(() => {
                    this.updateButtons('login');
                    location.reload()
                },
                    1000);

            } catch (e) {
                this.displayMessage(e, 'danger');
            }
        });

        this.logoutButton.addEventListener('click', () => {
            this.userController.logout();
            this.updateButtons('logout');
            location.reload()
        });
    }



    checkLoginStatus() {
        if (this.userController.isLogged()) {
            this.updateButtons('login');
        } else {
            this.updateButtons('logout');
        }
    }

    adminLogged() {
        if (this.userController.isAdmin()) {
            location.href = 'html/admin.html'
        }

    }


    displayMessage(message, type) {
        this.messages.innerHTML =
            `<div class="alert alert-${type}" role="alert">${message}</div>`;
    }

    updateButtons(event) {
        switch (event) {
            case 'login':
                this.loginButton.style.visibility = 'hidden'
                this.logoutButton.style.visibility = 'visible'
                break;
            case 'logout':
                this.loginButton.style.visibility = 'visible'
                this.logoutButton.style.visibility = 'hidden'
        }
    }
}