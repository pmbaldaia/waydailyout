import UserView from './views/UserView.js'

class App {
    constructor() {
        this.routes = {
            '': [UserView],
            'register': [UserView],
            'login': [UserView]
        };

        // import dummy data for testing purposes
        this.#importDataFixtures();

        // instantiate the views mapped in the routes object
        this.#instantiateViews();
    }

    #importDataFixtures() {
        const users = [
            {
                id: 1,
                username: 'user1',
                gender: 'female',
                email: '123@esmad.com',
                date: '12-03-1999',
                local: 'Porto',
                password: 'pass1'
            },
            {
                id: 2,
                username: 'user2',
                gender: 'male',
                email: '456@esmad.com',
                date: '10-11-2000',
                local: 'Lisboa',
                password: 'pass2'
            }
        ];

        // Load the fixtures in case there is no data in the local storage 
        if (!localStorage.users) {
            localStorage.setItem('users', JSON.stringify(users));
        }
    }

    #instantiateViews() {
        const path = window.location.pathname
        const file = path.substr(path.lastIndexOf('/') + 1);
        const route = file.split('.')[0];
        const views = this.#getViews(route);
        for (const view of views) {
            new view();
        }
    }

    #getViews(route) {
        return typeof this.routes[route] === 'undefined' ? [] : this.routes[route];
    }


}

new App();