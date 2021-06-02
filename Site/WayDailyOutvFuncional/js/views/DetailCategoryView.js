import CategoryController from '../controllers/CategoryController.js'

export default class DetailCategoryView {

    constructor() {
        this.categoryController = new CategoryController()

        // Gestão dos detalhes da banda
        this.categoryName = document.querySelector('#categoryName')
        this.categoryCategories = document.querySelector('#categoryCategories')
        this.categoryDescription = document.querySelector('#categoryDescription')
        this.categoryPhoto = document.querySelector('#categoryPhoto')
        this.btnBack = document.querySelector("#btnBack")

        this.fillCategoryData()
        this.bindBackButton()
    }

    bindBackButton() {
        this.btnBack.addEventListener('click', () => {
            history.back();
        })
    }

    fillCategoryData() {
        const currentCategory = this.categoryController.getCurrentCategory()
        this.categoryName.innerHTML = currentCategory.name
        this.categoryCategories.innerHTML = currentCategory.categories
        this.categoryDescription.innerHTML = currentCategory.description
        this.categoryPhoto.src = currentCategory.photo
    }

}
