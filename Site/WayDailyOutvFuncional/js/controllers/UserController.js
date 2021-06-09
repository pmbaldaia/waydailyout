import UserModel from '../models/UserModel.js'

export default class UserController {
    constructor() {
        this.users = localStorage.users ? JSON.parse(localStorage.users) : [];
    }

    register(username, password, type, email, genre, local) {
        if (!this.users.some(user => user.username === username)) {
            this.users.push(new UserModel(username, password, type, email, genre, local));
            localStorage.setItem('users', JSON.stringify(this.users))
        } else {
            throw Error(`user  "${username}" já existe!`);
        }
    }

    login(username, password) {
        if (this.users.some(user => user.username === username && user.password === password)) {
            sessionStorage.setItem('loggedUser', username)
        } else {
            throw Error('Username/Password inválidos!');
        }
    }

    logout() {
        sessionStorage.removeItem('loggedUser')
    }

    isLogged() {
        return sessionStorage.getItem('loggedUser') ? true : false
    }

    //?Tem como objetivo ir buscar os dados do user para meter no editar conta
    getUserData() {
        let users = localStorage.getItem('users')
        users = JSON.parse(users)
        for (let i = 0; i < users.length; i++) {
            if (users[i].username == this.isLogged()) {
                return users[i]
            }

        }
        // const user = sessionStorage.getItem('loggedUser')
        // return this.users(this.users.filter(name => name.username === user))

    }

    isAdmin() {
        const name = sessionStorage.getItem('loggedUser')
        return this.users.some(user => user.username == name && user.type == 'admin')
    }

    delete(name) {
        this.users(this.users.filter(username => username.name != name))
        localStorage.removeItem('users', JSON.stringify(this.users))
    }

    edit(username = '', password) {
        let user = sessionStorage['loggedUser']
        let novoPerfil = localStorage['users']
        novoPerfil = JSON.parse(novoPerfil)

        if (username == '') {
            username = user
        }

        for (let i = 0; i < novoPerfil.length; i++) {
            if (novoPerfil[i].username == user) {
                if (username != user) {
                    novoPerfil[i].username = username
                    sessionStorage.setItem('loggedUser', username)
                }
                if (password != '') {
                    novoPerfil[i].password = password
                }
                this.users[i] = novoPerfil[i]
                localStorage.setItem('users', JSON.stringify(this.users))
            }
        }
    }


    userType(nome) {
        let users = this.allUsers()
        for (let i = 0; i < users.length; i++) {
            if (users[i].username == nome) {
                let tipo = users[i].type

                if (tipo == 'admin') {
                    tipo = 'user'
                }
                else if (tipo == 'user') {
                    tipo = 'admin'
                }

                users[i].type = tipo
                this.users[i] = users[i]
                localStorage.setItem('users', JSON.stringify(this.users))
            }

        }
    }

    stades(nome) {
        let user = this.allUsers()
        for (let i = 0; i < user.length; i++) {
            if (user[i].username == nome) {
                const stade = user[i].stade

                return stade
            }
        }
    }

    allUsers() {
        let users = localStorage['users']
        users = JSON.parse(users)
        return users
    }


    //Mudar os dados do utilizador
    change(name, gender, email, date, local, password) {
        if (this.users.some(user => user.username === name)) {
            this.users.pop(UserModel(name, gender, email, date, local, password))
            this.users.push(new UserModel(name, gender, email, date, local, password));
            localStorage.setItem('users', JSON.stringify(this.users))
        }
    }

}

