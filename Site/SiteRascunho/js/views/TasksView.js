import TasksController from '../controllers/TaskController.js'
import UserController from '../controllers/UserController.js'

export default class TasksView {

    constructor() {
        this.taskController = new TasksController()
        this.userController = new UserController()

        // Catálogo: filtro
        this.txtActivities = document.querySelector("#txtActivities")
        this.categories = document.querySelector("#categories")
        this.btnFiltr = document.querySelector("#btnFiltr")
        this.bindFilt()

        // Catálogo: ordenação
        this.btnSt = document.querySelector("#btnSort")
        this.bindSt()


        // Catálogo: listagem de atividades
        this.catalogs = document.querySelector("#catalogs")
        this.renderCatalogs(this.taskController.getTasks())
    }

    bindFilt() {
        this.btnFiltr.addEventListener('click', function () {
            this.renderCatalogs(this.taskController.geTasks(this.txtActivities.value, this.categories.value))
        })

        // this.btnFiltr.addEventListener('click', () => {
        //     this.renderCatalogs(this.taskController.getTasks(this.txtActivities.value, this.categories.value))
        // })
    }

    bindSt() {
        this.btnSt.addEventListener('click', () => {
            this.renderCatalogs(this.taskController.getTasks(this.txtActivities.value, this.categories.value, true))
        })
    }


    renderCatalogs(tasks = []) {
        // Gerir a visualização do botão Add
        this.userController.isAdmin() ?
            this.btnAdd.style.visibility = 'visible' :
            this.btnAdd.style.visibility = 'hidden';

        // Gerir o catálogo
        let result = '<div class="row row-cols-3">'
        for (const task of tasks) {
            result += this.generateTaskCard(task)
        }
        result += '</div>'
        this.catalogs.innerHTML = result

        // Gerir botões Add e See more
        this.bindAddRemoveEvent()
        this.bindAddSeeMoreEvent()
    }

    generateTaskCard(task) {
        let html = `
        <div class="col-3" >
            <div class="card" style="background-color:#D4E1E8">
                <img class="card-img-top" src="${task.img}" alt="">
                <div class="card-body">
                    <h4 class="card-title">${task.title}</h4>
                    <p class="card-text">${task.category}</p>
                    
            `
        if (this.userController.isAdmin()) {
            html += `<button id="${task.name}" class="btn btn-primary edit">Editar</buttons>`
            html += `<button id="${task.name}" class="btn btn-danger delete">Remover</button>`
        } else {
            html += `<button id="${task.name}" class="btn btn-primary view">Consultar mais informação</button>`
        }

        html += `
                </div>
            </div>
        </div>        
        `
        return html
    }

    bindAddRemoveEvent() {
        for (const btnDelete of document.getElementsByClassName("delete")) {
            btnDelete.addEventListener('click', event => {
                this.taskController.delete(event.target.id)
                this.renderCatalog(this.taskController.getTasks(this.txtActivity.value, this.categories.value))
            })
        }
    }

    bindAddSeeMoreEvent() {
        for (const btnView of document.getElementsByClassName("view")) {
            btnView.addEventListener('click', event => {
                this.taskController.setCurrentTask(event.target.id)
                location.href = 'html/detailActivity.html';
            })
        }
    }

}
