import NavBarView from './views/NavBarView.js'
import ActivitiesView from './views/ActivitiesView.js'
import DetailActivityView from './views/DetailActivityView.js'
import NewActivityView from './views/NewActivityView.js'

class App {
    constructor() {
        // Mapeamento entre os ficheiros HTML e as views que estes vão carregar
        this.routes = {
            '': [
                NavBarView,
                ActivitiesView
            ],
            'index': [
                NavBarView,
                ActivitiesView
            ],
            'detailActivity': [
                DetailActivityView
            ],
            'newActivity': [
                NewActivityView
            ]
        };

        // importa dados dummy para testes
        this.#importDataFixtures();

        // instancia as views mapeadas no objeto routes
        this.#instantiateViews();
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

    #importDataFixtures() {
        const activities = [
            {
                id: 1,
                name: 'Aprender',
                categories: 'Música',
                photo: '',
                description: 'The best band ever',
            },
            {
                id: 2,
                name: 'RadioHead',
                categories: 'Família',
                photo: 'https://ep01.epimg.net/elpais/imagenes/2017/05/17/icon/1495017818_647155_1495125183_noticia_normal.jpg',
                description: 'The best band ever',
            },
            {
                id: 3,
                name: 'James',
                categories: 'Aprender',
                photo: 'http://ksassets.timeincuk.net/wp/uploads/sites/55/2013/01/2012JamesBandPress181212-2.jpg',
                description: 'The best band ever',
            },
            {
                id: 4,
                name: 'Metallica',
                categories: 'Música',
                photo: 'https://images.impresa.pt/blitz/2016-08-19-metallica.jpg/original/mw-860',
                description: 'The best band ever',
            }
        ];

        const users = [
            {
                id: 1,
                username: 'user1',
                password: 'pass1'
            },
            {
                id: 2,
                username: 'user2',
                password: 'pass2'
            }

        ];

        if (!localStorage.activities) {
            localStorage.setItem('activities', JSON.stringify(activities));
        }
        if (!localStorage.users) {
            localStorage.setItem('users', JSON.stringify(users));
        }
    }
}

new App();
