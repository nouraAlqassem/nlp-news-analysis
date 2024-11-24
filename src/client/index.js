
import { handleSubmit } from './js/formHandler';
import './styles/resets.scss';
import './styles/base.scss';
import './styles/footer.scss';
import './styles/form.scss';
import './styles/header.scss';

document.getElementById('url-form').addEventListener('submit', handleSubmit);

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
      navigator.serviceWorker
          .register('/service-worker.js')
          .then((registration) => {
              console.log('Service Worker registered with scope:', registration.scope);
          })
          .catch((error) => {
              console.error('Service Worker registration failed:', error);
          });
  });
}

