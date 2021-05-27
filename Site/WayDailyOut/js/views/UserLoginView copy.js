import UserController from '../controllers/UserController.js'

export default class UserView {
    constructor() {
        this.userController = new UserController();

        // login DOM
        this.loginUsername = document.getElementById('txtUsername');
        this.loginPassword = document.getElementById('txtPassword');
        this.loginButton = document.getElementById('btnLogin');
        this.bindLoginForm();

        this.messages = document.querySelector('#messages')
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
    }

    displayMessage(message, type) {
        this.messages.innerHTML =
            `<div class="alert alert-${type}" role="alert">${message}</div>`;
    }
}