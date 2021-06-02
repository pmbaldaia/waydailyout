export default class UserModel {
    constructor(id, username, gender, email, birthDate, local, password, type) {
        this.id = id
        this.username = username
        this.gender = gender
        this.email = email
        this.birthDate = birthDate
        this.local = local
        this.password = password
        this.type = type
    }
}