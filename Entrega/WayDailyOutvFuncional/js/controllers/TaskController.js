import TaskModel from '../models/ActivityModel.js'

export default class TasksController {
    constructor() {
        this.task = localStorage.task ? JSON.parse(localStorage.task) : [];
        this.currenTask = sessionStorage.task ? sessionStorage.task : null

    }

    create(title, author, category, video, img) {
        if (!this.task.some(task => task.title === title)) {
            this.task.push(new TaskModel(task, author, category, video, img));
            localStorage.setItem('task', JSON.stringify(this.task))
        } else {
            throw Error(`Essa atividade "${title}" já existe!`);
        }
    }

    getTasks(filterName = '', filterCategories = '', isSorted = false) {
        let filteredTasks = this.task.filter(
            task =>
                (task.title.toLowerCase().includes(filterName.toLowerCase()) || filterName === '')
                &&
                (task.category == filterCategories || filterCategories === '')
        )

        filteredTasks = isSorted ? filteredTasks.sort(this.#compare) : filteredTasks

        return filteredTasks
    }

    delete(name) {
        this.tasks = this.tasks.filter(task => task.title != name)
        localStorage.setItem('task', JSON.stringify(this.task))
    }

    setCurrentTask(name) {
        this.currentTask = name
        sessionStorage.setItem("task", name);
    }


    #compare(activityA, activityB) {
        if (activityA.name > activityB.name)
            return 1;
        if (activityA.name < activityB.name)
            return -1;
        return 0;
    }
}