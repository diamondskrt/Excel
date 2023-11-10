import './css/main.css';

const component = () => {
  const element = document.createElement('div');

  element.innerHTML = 'Hello, world!';

  return element;
};

const app = document.querySelector('#app');

app.appendChild(component());
