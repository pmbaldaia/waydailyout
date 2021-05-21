import UserController from '../controllers/UserController.js'

export default class UserView {
    constructor() {
        this.userController = new UserController();

        // register DOM
        this.registerUsername = document.getElementById('txtRegisterUsername');
        this.registerGender = document.querySelector('input[name="rdiRegisterGender"]:checked');
        this.registerEmail = document.getElementById('txtRegisterEmail');
        this.registerDate = document.getElementById('txtRegisterDate');
        this.registerLocal = document.getElementById('txtRegisterLocal');
        this.registerPassword = document.getElementById('txtRegisterPassword');
        this.registerPassword2 = document.getElementById('txtConfirmRegisterPassword');
        this.registerButton = document.getElementById('btnRegister')
        this.bindRegisterForm();

        this.messages = document.querySelector('#messages')
    }

    bindRegisterForm() {
        this.registerButton.addEventListener('click', () => {

            try {
                if (this.registerPassword.value !== this.registerPassword2.value) {
                    throw Error('Password and Confirm Password are not equal');
                }
                this.userController.register(this.registerUsername.value, this.registerGender.value, this.registerEmail.value,
                    this.registerDate.value, this.registerLocal.value, this.registerPassword.value);
                this.displayMessage('User registered with success!', 'success');
            } catch (e) {
                this.displayMessage(e, 'danger');
            }
        });
    }

    displayMessage(message, type) {
        this.messages.innerHTML =
            `<div class="alert alert-${type}" role="alert">${message}</div>`;
    }
}