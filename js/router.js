// import goToHome from './main';

class Router {
  /**
   * Metodo inicial.
   *
   * @return {void}.
   */
  constructor(paths) {
    this.paths = paths;
    this.initRouter();
  }

  /**
   * Permite inicializar el router
   *
   * @return {void}.
   */
  initRouter() {
    const {
      location: { pathname = '/' },
    } = window;
    const URI = pathname === '/' ? 'home' : pathname.replace('/', '');
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const pageActive = urlParams.get('page');
    this.load(pageActive); // || 'home');
  }

  /**
   * Permite iniciar la carga de paginas.
   *
   * @return {void}.
   */
  load(page = 'home') {
    const { paths } = this;
    console.log(paths[page] || paths.error);

    // const { path, template } = paths[page] || paths.error;
    const $CONTAINER = document.querySelector('#content');
    $CONTAINER.innerHTML = page;
    // document.querySelector('#content').innerHTML = template;

    window.history.pushState({}, 'Genial', page);
    // window.history.pushState({}, 'Genial', '?page=' + page);

    // history.pushState(body, "titulo", page)

    if (page === 'home') {
      //   goToHome();
    }
  }
}
