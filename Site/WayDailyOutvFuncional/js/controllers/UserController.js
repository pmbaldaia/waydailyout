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

    isAdmin(){
        const name = sessionStorage.getItem('loggedUser')
        return this.users.some(user=>user.username == name && user.type=='admin')
    }

    delete(name) {
        this.users (this.users.filter(username => username.name != name))
        localStorage.removeItem('users', JSON.stringify(this.users))
    }
    
    edit(username = '', password){
        let user = sessionStorage['loggedUser']
        let update = localStorage['users']
        update = JSON.parse(update)

        if (username == '') {
            username = user
        }

        for (let i = 0; i < update.length; i++){
            if(update[i].username == user){
                if (username != user){
                    update[i].username = username
                    sessionStorage.setItem('loggedUser', username)
                }
                if (password != ''){
                    update[i].password = password
                }
                this.users[i] = update[i]
                localStorage.setItem('users', JSON.stringify(this.users))
            }
        }
    }
    

    userType(nome){
        let users = this.allUsers()
        for (let i = 0; i < users.length; i++){
            if(users[i].username == nome){
               let tipo = users[i].type

                if (tipo == 'admin'){
                    tipo = 'user'
                }
                else if (tipo == 'user'){
                    tipo = 'admin'
                }

                users[i].type = tipo
                this.users[i] = users[i]
                localStorage.setItem('users', JSON.stringify(this.users)) 
            }
            
        }
    }

    stades(nome){
        let user = this.allUsers()
        for (let i = 0; i < user.length; i++){
            if (user[i].username == nome){
                const stade = user[i].stade
                
                return stade
            }
        }
    }

        allUsers(){
            let users = localStorage['users']
            users = JSON.parse(users)
            return users
        }

}

