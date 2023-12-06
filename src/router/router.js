class Router {
  constructor(selector, routes) {
    this.selector = document.querySelector(selector);
    this.routes = routes;
    this.route = {};
    this.page = null;
    this.init();
  }

  init() {
    this.setRouteParams(window.location.href);
    window.addEventListener('hashchange', (event) => this.onChange(event));
  }

  setRouteParams(url) {
    this.selector.innerHTML = '';

    if (this.page) this.page.unmount?.();

    const match = url.match(/#(\w+)(?:\/(.*))?$/);

    this.route = {
      fullPath: url,
      params: match ? {
        to: match[1],
        id: match[2] || '',
      } : {},
    };

    const foundRoute = this.routes.find(({ path }) => path === (this.route.params.to || '/'));

    if (!foundRoute) {
      console.error('404 page not found');
      return;
    }

    this.page = foundRoute.component(this.route);

    this.selector.append(this.page.getRoot());
    this.page.init?.();
  }

  onChange(event) {
    this.setRouteParams(event.newURL);
  }

  unmount() {
    window.removeEventListener('hashchange', (event) => this.onChange(event));
  }
}

export const router = (selector, routes) => new Router(selector, routes);
