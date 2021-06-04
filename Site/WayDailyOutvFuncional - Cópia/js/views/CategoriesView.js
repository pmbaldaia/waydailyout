import CategoryController from '../controllers/CategoryController.js'
import UserController from '../controllers/UserController.js'

export default class CategoriesView {

    constructor() {
        this.categoryController = new CategoryController()
        this.userController = new UserController()

        // Catálogo: filtro
        this.txtCategory = document.querySelector("#txtCategory")
        this.catalogcategories = document.querySelector("#catalogcategories")
        this.btnFilter = document.querySelector("#btnFilter")
        this.bindFilter()

        // Catálogo: ordenação
        this.btnSort = document.querySelector("#btnSort")
        this.bindSort() 

        // Catálogo: adição de categorias
        this.btnAdd = document.querySelector("#btnAdd")
        this.bindAdd()

        // Catálogo: listagem de categorias
        this.catalogs = document.querySelector("#catalogs")
        this.renderCatalog(this.activityController.getCategories())
    }

    bindAdd() {
        this.btnAdd.addEventListener('click', () => {
            location.href = 'html/Category.html';
        })
    }

    renderCatalog(categories = []) {
        // Gerir a visualização do botão Add
        this.userController.isAdmin() ?
            this.btnAdd.style.visibility = 'visible' :
            this.btnAdd.style.visibility = 'hidden';

        // Gerir o catálogo
        let result = '<div class="row row-cols-3">'
        for (const category of categories) {
            result += this.generateCategoryCard(category)
        }
        result += '</div>'
        this.catalogcategories.innerHTML = result

        // Gerir botões Add e See more
        this.bindAddRemoveEvent()
        this.bindAddSeeMoreEvent()
    }

    generateCategoryCard(category) {
        let html = `
        <div class="col-3" >
            <div class="card" style="background-color:#D4E1E8">
                <img class="card-img-top" src="${category.photo}" alt="">
                <div class="card-body">
                    <h4 class="card-title">${category.name}</h4>
                    <p class="card-text">${category.model}</p>
                    <button id="${category.name}" class="btn btn-primary see">Ver Mais</button>
            `
        if (this.userController.isAdmin()) {
            html += `<button id="${category.name}" class="btn btn-danger remove">Remover</button>`
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
