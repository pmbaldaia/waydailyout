import ActivityModel from '../models/ActivityModel.js'

export default class ActivityController {
    constructor() {
        this.activities = localStorage.activities ? JSON.parse(localStorage.activities) : [];
        this.currentActivity = sessionStorage.activity ? sessionStorage.activity : null

    }

    create(name, photo, categories, description) {
        if (!this.activities.some(activity => activity.name === name)) {
            this.activities.push(new ActivityModel(name, photo, categories, description));
            localStorage.setItem('activities', JSON.stringify(this.activities))
        } else {
            throw Error(`Essa atividade "${name}" já existe!`);
        }
    }

    remove(name) {
        this.activities = this.activities.filter(activity => activity.name != name)
        localStorage.setItem('activities', JSON.stringify(this.activities))
    }


    setCurrentActivity(name) {
        this.currentActivity = name
        sessionStorage.setItem("activity", name);
    }

    getCurrentActivity() {
        return this.activities.find(activity => activity.name == this.currentActivity)
    }

    getActivities(filterName = '', filterCategories = '', isSorted = false) {
        let filteredActivities = this.activities.filter(
            activity =>
                (activity.name.toLowerCase().includes(filterName.toLowerCase()) || filterName === '')
                &&
                (activity.categories == filterCategories || filterCategories === '')
        )

        filteredActivities = isSorted ? filteredActivities.sort(this.#compare) : filteredActivities

        return filteredActivities
    }

    #compare(activityA, activityB) {
        if (activityA.name > activityB.name)
            return 1;
        if (activityA.name < activityB.name)
            return -1;
        return 0;
    }

}

// export default class TasksController {
//     constructor() {
//         this.task = localStorage.task ? JSON.parse(localStorage.task) : [];
//         this.currenTask = sessionStorage.task ? sessionStorage.task : null

//     }

//     create(title, author, category, video, img) {
//         if (!this.task.some(task => task.title === title)) {
//             this.task.push(new TaskModel(task, author, category, video, img));
//             localStorage.setItem('task', JSON.stringify(this.task))
//         } else {
//             throw Error(`Essa atividade "${title}" já existe!`);
//         }
//     }

//     getTasks(filterName = '', filterCategories = '', isSorted = false) {
//         let filteredTasks = this.task.filter(
//             task =>
//                 (task.title.toLowerCase().includes(filterName.toLowerCase()) || filterName === '')
//                 &&
//                 (task.category == filterCategories || filterCategories === '')
//         )

//         filteredTasks = isSorted ? filteredTasks.sort(this.#compare) : filteredTasks

//         return filteredTasks
//     }

//     remove(name) {
//         this.task = this.task.filter(task => task.title != name)
//         localStorage.setItem('task', JSON.stringify(this.task))
//     }

//     setCurrentTask(name) {
//         this.currentTask = name
//         sessionStorage.setItem("task", name);
//     }


//     #compare(activityA, activityB) {
//         if (activityA.name > activityB.name)
//             return 1;
//         if (activityA.name < activityB.name)
//             return -1;
//         return 0;
//     }
// }