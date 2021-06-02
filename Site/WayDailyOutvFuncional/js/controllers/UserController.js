import UserModel from '../models/UserModel.js'

export default class UserController {
    constructor() {
        this.users = localStorage.users ? JSON.parse(localStorage.users) : [];
    }

    register(username, local, password, type) {
        if (!this.users.some(user => user.username === username)) {
            this.users.push(new UserModel(username, local, password, type));
            localStorage.setItem('users', JSON.stringify(this.users))
        } else {
            throw Error(`Utilizador  "${username}" já existe!`);
        }
    }

    login(username, password) {
        if (this.users.some(user => user.username === username && user.password === password)) {
            sessionStorage.setItem('loggedUser', username)
        } else {
            throw Error('Erro login!');
        }
    }

    logout() {
        sessionStorage.removeItem('loggedUser')
    }

    isLogged() {
        return sessionStorage.getItem('loggedUser') ? true : false
    }

    isAdmin() {
        const name = sessionStorage.getItem('loggedUser')
        return this.users.some(user => user.username == name && user.type == 'admin')
    }
}