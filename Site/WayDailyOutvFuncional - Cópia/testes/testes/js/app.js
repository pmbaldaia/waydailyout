import UserView from './views/UserView.js'
import AdminView from './views/AdminView.js'

class App {
    constructor() {
        this.routes = {
            '': [UserView],
            'index': [UserView],
            'admins': [AdminView]
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
                password: 'pass1',
                pontos: 50,
                type: 'admin',
                stade: 'regular',
                amigos: []
            },
            {
                id: 2,
                username: 'user2',
                password: 'pass2',
                pontos: 35,
                type: 'admin',
                stade: 'regular',
                amigos: []
            },
            {
                id: 3,
                username: 'user3',
                password: 'pass3',
                pontos: 20,
                type: 'user',
                stade: 'regular',
                amigos: []
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