import ActivityController from '../controllers/ActivityController.js'
import UserController from '../controllers/UserController.js'

export default class ActivityView {

    constructor() {
        this.activityController = new ActivityController()
        this.userController = new UserController()

        // Catálogo: filtro
        this.txtActivity = document.querySelector("#txtActivity")
        this.categories = document.querySelector("#categories")
        this.btnFilter = document.querySelector("#btnFilter")
        this.bindFilter()

        // Catálogo: ordenação
        this.btnSort = document.querySelector("#btnSort")
        this.bindSort() 

        // Catálogo: adição de atividade
        this.btnAdd = document.querySelector("#btnAdd")
        this.bindAdd()

        // Catálogo: listagem de atividades
        this.catalog = document.querySelector("#catalog")
        this.renderCatalog(this.activityController.getActivities())
    }

    bindFilter() {
        this.btnFilter.addEventListener('click', () => {
            this.renderCatalog(this.activityController.getActivities(this.txtActivity.value, this.categories.value))
        })
    }

    bindSort() {
        this.btnSort.addEventListener('click', () => {
            this.renderCatalog(this.activityController.getActivities(this.txtActivity.value, this.categories.value, true))
        })
    }

    bindAdd() {
        this.btnAdd.addEventListener('click', () => {
            location.href = 'html/newActivity.html';
        })
    }

    renderCatalog(activities = []) {
        // Gerir a visualização do botão Add
        this.userController.isAdmin() ?
            this.btnAdd.style.visibility = 'visible' :
            this.btnAdd.style.visibility = 'hidden';

        // Gerir o catálogo
        let result = '<div class="row row-cols-3">'
        for (const activity of activities) {
            result += this.generateActivityCard(activity)
        }
        result += '</div>'
        this.catalog.innerHTML = result

        // Gerir botões Add e See more
        this.bindAddRemoveEvent()
        this.bindAddSeeMoreEvent()
    }

    generateActivityCard(activity) {
        let html = `
        <div class="col-3" >
            <div class="card" style="background-color:#D4E1E8">
                <img class="card-img-top" src="${activity.photo}" alt="">
                <div class="card-body">
                    <h4 class="card-title">${activity.name}</h4>
                    <p class="card-text">${activity.categories}</p>
                    
            `
        if (this.userController.isAdmin()) {
            html +=`<button id="${activity.name}" class="btn btn-primary edit">Editar</buttons>`
            html += `<button id="${activity.name}" class="btn btn-danger remove">Remover</button>`
        }else {
            html += `<button id="${activity.name}" class="btn btn-primary see">Ver Mais</button>`
        }

        html += `
                </div>
            </div>
        </div>        
        `
        return html
    }

    bindAddRemoveEvent() {
        for (const btnRemove of document.getElementsByClassName("remove")) {
            btnRemove.addEventListener('click', event => {
                this.ActivityController.remove(event.target.id)
                this.renderCatalog(this.ActivityController.getActivities(this.txtActivity.value, this.categories.value))
            })
        }
    }

    bindAddSeeMoreEvent() {
        for (const btnSee of document.getElementsByClassName("see")) {
            btnSee.addEventListener('click', event => {
                this.activityController.setCurrentActivity(event.target.id)
                location.href = 'html/detailActivity.html';
            })
        }
    }

}
