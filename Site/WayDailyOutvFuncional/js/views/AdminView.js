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
        let resultado = ''
        
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

            resultado += `<td>${utilizadores[i].username}</td>
                          <td>${utilizadores[i].password}</td>
                          <td>${utilizadores[i].type}</td>
                          <td><button id="${utilizadores[i].username}" class="alterar">Alterar tipo</button></td>
                          <td><button id="${utilizadores[i].username}" class="bloquear">Editar</button></td>
                          <td><button id="${utilizadores[i].username}" class="banir">Remover</button></td>
                        </tr>`
        }

        table.innerHTML += resultado
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