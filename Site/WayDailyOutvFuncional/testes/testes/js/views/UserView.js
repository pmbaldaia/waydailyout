import UserController from '../controllers/UserController.js'

export default class UserView {
    constructor() {
        this.userController = new UserController();

        // register DOM
        this.registerUsername = document.getElementById('txtRegisterUsername');
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

        // editar DOM
        this.editarUsername = document.querySelector('#txtUsernameEditar')
        this.editarPassword = document.querySelector('#txtPasswordEditar')
        this.editarButton = document.querySelector('#btnEditar')
        this.bindEditarForm()

        // pontos DOM
        this.pontosUsername = document.querySelector('#usuario')
        this.pontos = document.querySelector('#pontos')
        this.pontosBTN = document.querySelector('#adcionar')
        this.bindPontosForm()

        this.messages = document.querySelector('#messages')
        this.checkLoginStatus();

        this.radion = document.querySelectorAll('input[name="test"]')
        this.testebtn = document.querySelector('#test')
        this.testeRadion()

        this.amigo = document.querySelector('#amigo')
        this.amigoBTN = document.querySelector('#adicionarAmigo')
        this.adicionarAmigo()
    }

    bindRegisterForm() {
        this.registerButton.addEventListener('click', () => {

            try {
                if (this.registerPassword.value !== this.registerPassword2.value) {
                    throw Error('Password and Confirm Password are not equal');
                }
                this.userController.register(this.registerUsername.value, this.registerPassword.value);
                this.displayMessage('User registered with success!', 'success');
            } catch (e) {
                this.displayMessage(e, 'danger');
            }
        });
    }

    bindLoginForm() {
        this.loginButton.addEventListener('click', () => {
            try {
                this.userController.login(this.loginUsername.value, this.loginPassword.value);
                this.displayMessage('User logged in with success!', 'success');

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

    bindEditarForm() {
        this.editarButton.addEventListener('click', () => {
            this.userController.editar(this.editarUsername.value, this.editarPassword.value)
            this.displayMessage('Edição com sucesso!')
        })
            
    }

    bindPontosForm(){
        this.pontosBTN.addEventListener('click', () => {
            this.userController.setPontos(this.pontosUsername.value, +this.pontos.value)
            this.displayMessage(`O ${this.pontosUsername.value} agora tem ${this.pontos.value}`)
        })
    }

    checkLoginStatus() {
        if (this.userController.isLogged()) {
            this.updateButtons('login');
        } else {
            this.updateButtons('logout');
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

    testeRadion(){
        this.testebtn.addEventListener('click', () => {
            for (let i = 0; i < this.radion.length; i++){
                if (this.radion[i].checked){
                    alert(this.radion[i].value)
                }
            }
        })
    }

    adicionarAmigo(){
        this.amigoBTN.addEventListener('click', () => {
            try {
                this.userController.adicionarAmigo(this.amigo.value)
            }
            catch(e){
                alert(e)
            }
        })
    }
}