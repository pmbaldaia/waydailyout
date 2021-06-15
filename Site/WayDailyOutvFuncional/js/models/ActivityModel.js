export default class ActivityModel {

    constructor(name, photo, categories, description) {
        this.name = name,
            this.photo = photo,
            this.categories = categories,
            this.description = description
    }
}

export class TaskModel {
    constructor(title, author, category, video, img) {
        this.title = title,
            this.author = author,
            this.img = img,
            this.category = category,
            this.video = video
    }
}