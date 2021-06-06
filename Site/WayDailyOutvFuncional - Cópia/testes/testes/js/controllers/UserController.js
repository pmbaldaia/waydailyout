import UserModel from '../models/UserModel.js'

export default class UserController {

    constructor() {
        this.users = localStorage.users ? JSON.parse(localStorage.users) : []
    }

    register(username, password) {
        if (this.users.find(user => user.username === username)) {
            throw Error(`User with username "${username}" already exists!`);
        } else {
            const newId = this.users.length > 0 ? this.users[this.users.length - 1].id + 1 : 1
            let pontos = 0
            let type = 'user'
            let stade = 'regular'
            this.users.push(new UserModel(newId, username, password, pontos, type, stade));
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

    logout() {
        sessionStorage.removeItem('loggedUser');
    }

    isLogged() {
        return sessionStorage.getItem('loggedUser') !== null ? true : false;
    }

    editar(username = '', password){
        let user = sessionStorage['loggedUser']
        let novoPerfil = localStorage['users']
        novoPerfil = JSON.parse(novoPerfil)

        if (username == '') {
            username = user
        }

        for (let i = 0; i < novoPerfil.length; i++){
            if(novoPerfil[i].username == user){
                if (username != user){
                    novoPerfil[i].username = username
                    sessionStorage.setItem('loggedUser', username)
                }
                if (password != ''){
                    novoPerfil[i].password = password
                }
                this.users[i] = novoPerfil[i]
                localStorage.setItem('users', JSON.stringify(this.users))
            }
        }
}


    // admin.html
    userType(nome){
        let utilizadores = this.allUtilizadores()
        for (let i = 0; i < utilizadores.length; i++){
            if(utilizadores[i].username == nome){
               let tipo = utilizadores[i].type

                if (tipo == 'admin'){
                    tipo = 'user'
                }
                else if (tipo == 'user'){
                    tipo = 'admin'
                }

                utilizadores[i].type = tipo
                this.users[i] = utilizadores[i]
                localStorage.setItem('users', JSON.stringify(this.users)) 
            }
            
        }
    }

    stades(nome){
        let utilizador = this.allUtilizadores()
        for (let i = 0; i < utilizador.length; i++){
            if (utilizador[i].username == nome){
                const stade = utilizador[i].stade
                
                return stade
            }
        }
    }

    allUtilizadores(){
        let utilizadores = localStorage['users']
        utilizadores = JSON.parse(utilizadores)
        return utilizadores
    }
}