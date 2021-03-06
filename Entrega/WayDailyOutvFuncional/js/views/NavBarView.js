import UserController from '../controllers/UserController.js'

export default class UserView {
    constructor() {
        this.userController = new UserController();

        // Gestão do form de login
        this.frmLogin = document.querySelector('#frmLogin');
        this.loginUsername = document.querySelector('#txtUsername');
        this.loginPassword = document.querySelector('#txtPassword');
        this.loginMessage = document.querySelector('#loginMessage')
        this.bindLoginForm()


        // Gestão do form de registo
        this.frmRegister = document.querySelector('#frmRegister');
        this.registerUsername = document.querySelector('#txtUsernameRegister');
        this.registerPassword = document.querySelector('#txtPasswordRegister');
        this.registerPassword2 = document.querySelector('#txtPasswordRegister2');
        this.registerEmail = document.querySelector('#txtEmail')
        this.registerGenre= document.querySelector('#txtGenre')
        this.registerLocal = document.querySelector('#txtLocal')
        this.registerMessage = document.querySelector('#registerMessage')
        this.bindRegisterForm();

        // Gestão dos botões da navbar
        this.gameButton = document.querySelector('#btnGame')
        this.userWelcome = document.querySelector('#btnUserWelcome')
        this.loginButton = document.querySelector('#btnLogin');
        this.registerButton = document.querySelector('#btnRegister');
        this.profileButton = document.querySelector('#btnProfile')
        this.adminButton = document.querySelector('#btnAdmin')
        this.logoutButton = document.querySelector('#btnLogout');
        this.bindLogout();


        // Atualiza botões tendo em conta se o user está autenticado ou não
        this.updateStatusUI();
    }

    /**
     * Função que define um listener para o botão de registo
     */
    bindRegisterForm() {
        this.frmRegister.addEventListener('submit', event => {
            event.preventDefault();
            try {
                if (this.registerPassword.value !== this.registerPassword2.value) {
                    throw Error('Password e Repetir Password não são iguais');
                }
                this.userController.register(this.registerUsername.value, this.registerPassword.value, this.registerEmail.value, this.registerGenre.value, this.registerLocal.value ,'user');
                this.displayMessage('register', 'Utilizador registado com sucesso!', 'success');
                // Espera 1 seg. antes de fazer refresh à pagina
                // Assim o utilizador pode ver a mensagem na modal antes de a mesma se fechar
                setTimeout(() => { location.reload() }, 1000);
            } catch (err) {
                this.displayMessage('register', err, 'danger');
            }
        })
    }

    /**
     * Função que define um listener para o botão de login
     */
    bindLoginForm() {
        this.frmLogin.addEventListener('submit', event => {
            event.preventDefault();
            try {
                this.userController.login(this.loginUsername.value, this.loginPassword.value);
                this.displayMessage('login', 'Iniciou sessão com sucesso!', 'success');
                // Espera 1 seg. antes de fazer refresh à pagina
                // Assim o utilizador pode ver a mensagem na modal antes de a mesma se fechar
                setTimeout(() => { location.reload() }, 1000);
            } catch (err) {
                this.displayMessage('login', err, 'danger');
            }
        });

    }

    /**
     * Função que define um listener para o botão de logout
     */
    bindLogout() {
        this.logoutButton.addEventListener('click', () => {
            this.userController.logout();
            location.reload()
        })
    }

    /**
     * Função que atualiza a visibilidade dos botões de acordo com a autenticação
     */
    updateStatusUI() {
        if (this.userController.isLogged()) {
            this.loginButton.style.visibility = 'hidden'
            this.registerButton.style.visibility = 'hidden'
            this.gameButton.style.visibility = 'visible'
            this.userWelcome.style.visibility = 'visible'
            this.profileButton.style.visibility = 'visible'
            this.logoutButton.style.visibility = 'visible'
        } else {
                this.loginButton.style.visibility = 'visible'
                this.registerButton.style.visibility = 'visible'
                this.userWelcome.style.visibility = 'hidden'
                this.profileButton.style.visibility = 'hidden'
                this.adminButton.style.visibility = 'hidden'
                this.logoutButton.style.visibility = 'hidden' 
        }  if (this.userController.isAdmin()){
            this.loginButton.style.visibility = 'hidden'
            this.registerButton.style.visibility = 'hidden'
            this.profileButton.style.visibility = 'hidden'
            this.userWelcome.style.visibility = 'visible'
            this.logoutButton.style.visibility = 'visible'
            this.adminButton.style.visibility = 'visible'
        }
    }



    /**
     * Função que define e exibe uma mensagem de sucesso ou de erro
     * @param {string} event tipo de evento (login ou register)
     * @param {string} text mensagem a ser exibida 
     * @param {string} type danger - caso seja uma mensagem de erro; success - caso seja uma mensagem de sucesso
     */
    displayMessage(event, text, type) {
        const message = `<div class="alert alert-${type}" role="alert">${text}</div>`;
        event == 'login' ? this.loginMessage.innerHTML = message : this.registerMessage.innerHTML = message
    }
}
