import UserController from '../controllers/UserController.js'

export default class AdminView{
    constructor(){
        this.admin = new UserController()
        this.renderTable()

        this.changedatabase()
    }

    renderTable(){
        let utilizadores = this.admin.allUsers()
        let table = document.querySelector('table')
        let result = ''
        
        table.innerHTML = `<thead>
                                <tr>
                                    <th>Nome</th>
                                    <th>Password</th>
                                    <th>Tipo</th>
                                    <th>Alterar tipo</th>
                                    <th>Editar</th>
                                    <th>Remover</th>
                                </tr>
                            </thead>`
        for (let i = 0; i < utilizadores.length; i++){
            let stade = this.admin.stades(utilizadores[i].username)

            result += `<td>${utilizadores[i].username}</td>
                          <td>${utilizadores[i].password}</td>
                          <td>${utilizadores[i].type}</td>
                          <td><button id="${utilizadores[i].username}" class="btn btn-info alterar">Alterar tipo</button></td>
                          <td><button id="${utilizadores[i].username}" class="btn btn-warning edit">Editar</button></td>
                          <td><button id="${utilizadores[i].username}" class="btn btn-danger delete">Apagar</button></td>
                        </tr>`
        }

        table.innerHTML += result
        this.bindRemoveEvent()
    }

    bindRemoveEvent() {
        for (const btnRemove of document.getElementsByClassName("delete")) {
            btnRemove.addEventListener('click', event => {
                this.UserController.delete(event.target.id)
                this.renderTable(this.UserController.getUsers(this.txtUsername.value))
            })
        }
    }

    changedatabase(){
        for (const btnAlterar of document.querySelectorAll('.alterar')){
            btnAlterar.addEventListener('click', event => {
                this.admin.userType(event.target.id)
                this.renderTable()
                location.reload()
            })
        }
    }


}