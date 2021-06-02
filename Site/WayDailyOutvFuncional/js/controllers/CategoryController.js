import CategoryModel from '../models/CatergoryModel.js'

export default class CategoryController {
    constructor() {
        this.categories = localStorage.categories ? JSON.parse(localStorage.categories) : [];
        this.currentCategory = sessionStorage.category ? sessionStorage.category : null

    }

    create(name, model, photo,  description) {
        if (!this.categories.some(category => category.name === name)) {
            this.categories.push(new CategoryModel(name, model, photo, description));
            localStorage.setItem('categories', JSON.stringify(this.categories))
        } else {
            throw Error(`Essa categoria "${name}" já existe!`);
        }
    }

    remove(name) {
        this.categories = this.categories.filter(category => category.name != name)
        localStorage.setItem('categories', JSON.stringify(this.categories))
    }

    setCurrentCategory(name) {
        this.currentCategory = name
        sessionStorage.setItem("category", name);
    }

    getCurrentCategory() {
        return this.categories.find(category => category.name == this.currentCategory)
    }

    getCategory(filterName = '', filterModel= '', isSorted = false) {
        let filteredCategories = this.Categories.filter(
            category =>
                (category.name.toLowerCase().includes(filterName.toLowerCase()) || filterName === '')
                &&
                (activity.model == filterModel|| filterModel=== '')
        )

        filteredCategories = isSorted ? filteredCategories.sort(this.#compare) : filteredCategories

        return filteredCategories
    }

    #compare(categoryA, categoryB) {
        if (categoryA.name > categoryB.name)
            return 1;
        if (categoryA.name < categoryB.name)
            return -1;
        return 0;
    }

}
