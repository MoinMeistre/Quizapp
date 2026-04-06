import { QuizModel } from './js/model.js';
import { QuizView } from './js/view.js';
import { QuizPresenter } from './js/presenter.js';

const app = new QuizPresenter(new QuizModel(), new QuizView());
app.init();

// Register Service Worker
   if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('sw.js').then(function(registration) {
                console.log('Service Worker registered with scope:', registration.scope);
            }).catch(function(error) {
                console.log('Service Worker registration failed:', error);
            });
        }