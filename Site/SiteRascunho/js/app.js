import NavBarView from './views/NavBarView.js'
import ActivitiesView from './views/ActivitiesView.js'
import DetailActivityView from './views/DetailActivityView.js'
import NewActivityView from './views/NewActivityView.js'
import AdminView from './views/AdminView.js'
import ProfileView from './views/ProfileView.js'
import TasksView from './views/TasksView.js'

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
                ActivitiesView,
                TasksView
            ],
            'detailActivity': [
                DetailActivityView
            ],
            'activities': [
                TasksView
            ],
            'newActivity': [
                NewActivityView
            ],
            'admin': [
                AdminView
            ],
            'editProfile': [
                ProfileView
            ],
            'profile': [
                ProfileView
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
                name: 'Artes e Ofícios',
                categories: 'art',
                photo: './img/imagens/5218.png',
                description: 'Aqui podes aprender artes',
            },
            {
                id: 2,
                name: 'Música',
                categories: 'music',
                photo: './img/imagens/6954.png"',
                description: 'Irás ter aulas de música',
            },
            {
                id: 3,
                name: 'Comida',
                categories: 'food',
                photo: './img/imagens/252.png',
                description: 'Podes aprender a cozinhar',
            },
            {
                id: 4,
                name: 'Aprender',
                categories: 'learn',
                photo: './img/imagens/5514.png',
                description: 'Aprender a aprender',
            }
        ];

        const task = [
            {
                id: 1,
                title: 'Como tocar piano primeira lição!',
                author: 'Dylan Laine',
                category: 'music',
                img: '../img/imagens/Musica/10079.png',
                video: 'https://www.youtube.com/watch?v=EPxqPw1N1Qk'
            },
            {
                id: 2,
                title: 'Karaoke- Whenever, Wherever- Shakira',
                author: 'KaraFun',
                category: 'music',
                img: '../img/imagens/Musica/3.png',
                video: 'https://www.youtube.com/watch?v=gqYFhzRHB50'
            },
            {
                id: 3,
                title: 'Reflections of Calm',
                author: 'Bob Ross',
                category: 'art',
                img: '../img/imagens/5218 - Cópia.png',
                video: 'https://www.youtube.com/watch?v=kJFB6rH3z2A'
            },
            {
                id: 4,
                title: 'Bolo de iogurte',
                author: 'Made by Choices',
                category: 'food',
                img: '../img/imagens/cozinhar.PNG',
                video: 'https://www.youtube.com/watch?v=DeHnUDG9zuM'
            },
            {
                id: 5,
                title: 'Aula de Francês #01',
                author: 'Francês Básico',
                category: 'learn',
                img: '../img/imagens/5514.png',
                video: 'https://www.youtube.com/watch?v=LWNvubHRIkQ'
            }
        ];

        const users = [
            {
                id: 1,
                username: 'user',
                password: 'user',
                type: 'user'
            },
            {
                id: 2,
                username: 'admin',
                password: 'admin',
                type: 'admin'
            },
            {
                id: 3,
                username: 'Pedro',
                password: 'mic',
                type: 'admin'
            },
            {
                id: 4,
                username: 'user2',
                password: 'pass2',
                email: 'user2@gmail.com',
                genre: 'feminino',
                local: 'Porto',
                type: 'user'
            }

        ];

        if (!localStorage.activities) {
            localStorage.setItem('activities', JSON.stringify(activities));
        }
        if (!localStorage.task) {
            localStorage.setItem('tasks', JSON.stringify(task));
        }
        if (!localStorage.users) {
            localStorage.setItem('users', JSON.stringify(users));
        }
    }
}

new App();
