import UserModel from '../models/UserModel.js'

export default class UserController {

    constructor() {
        this.users = localStorage.users ? JSON.parse(localStorage.users) : []
    }

    register(username, gender, email, date, local, password) {
        if (this.users.find(user => user.username === username)) {
            throw Error(`Utilizador "${username}" já existe!`);
        } else {
            const newId = this.users.length > 0 ? this.users[this.users.length - 1].id + 1 : 1
            this.users.push(new UserModel(newId, username, gender, email, date, local, password));
            localStorage.setItem('users', JSON.stringify(this.users));
        }
    }

    login(username, password) {
        if (this.users.some(user => user.username === username && user.password === password)) {
            sessionStorage.setItem('loggedUser', username);
            return true;
        } else {
            throw Error('Invalid login!');
        }
    }

    // logout() {
    //     sessionStorage.removeItem('loggedUser');
    // }

    isLogged() {
        return sessionStorage.getItem('loggedUser') !== null ? true : false;
    }
}