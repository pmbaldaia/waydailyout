import CategoryController from '../controllers/CategoryController.js'
import UserController from '../controllers/UserController.js'

export default class NewCategoryView {
    constructor() {
        this.categoryController = new CategoryController();
        this.userController = new UserController();

        // Gestão do formulário de adição de banda
        this.userLoggedOutContent = document.getElementById('userLoggedOutContent');
        this.userLoggedInContent = document.getElementById('userLoggedInContent');
        this.newCategoryForm = document.getElementById('frmNewCategory');
        this.categoryName = document.getElementById('txtName');
        this.categoryCategories = document.getElementById('categories');
        this.categoryPhoto = document.getElementById('txtPhoto');
        this.categoryDescription = document.getElementById('txtDescription');
        this.newCategoryMessage = document.getElementById('newCategoryMessage');

        // Gere a visulização do conteúdo da página tendo em conta se o user está ou não autenticado 
        this.renderAddCategoryForm();

    }

    renderAddCategoryForm() {
        if (this.userController.isLogged()) {
            this.userLoggedOutContent.style.visibility = 'hidden';
            this.userLoggedInContent.style.visibility = 'visible';
            this.bindNewCategoryForm()
        } else {
            this.userLoggedOutContent.style.visibility = 'visible';
            this.userLoggedInContent.style.visibility = 'hidden';
        }
    }

    bindNewCategoryForm() {
        this.newCategoryForm.addEventListener('submit', event => {
            event.preventDefault();

            try {
                this.activityController.create(
                    this.categoryName.value,
                    this.categoryCategories.value,
                    this.categoryPhoto.value,
                    this.categoryDescription.value,
                );
                this.displayMessage('Categoria adicionada com sucesso!', 'success');

                // Espera 1 seg. antes de fazer refresh à pagina
                // Assim o utilizador pode ver a mensagem na modal antes de a mesma se fechar
                setTimeout(() => { location.href = "../index.html" }, 1000);
            } catch (err) {
                this.displayMessage(err, 'danger');
            }
        });
    }

    displayMessage(message, type) {
        this.newCategoryMessage.innerHTML =
            `<div class="alert alert-${type}" role="alert">${message}</div>`;
    }
}
