export default class Router {
  /**
   * Metodo inicial.
   *
   * @return {void}.
   */
  constructor(paths) {
    this.paths = paths;
  }

  /**
   * Permite extraer el destino desde la URL
   *
   * @return {void}.
   */
  getRoute() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const pageActive = urlParams.get('page');

    console.log('getRoute:', pageActive);

    return pageActive ? pageActive : 'landing';
  }

  /**
   * Permite iniciar la carga de paginas.
   *  page: qué pantalla mostrar
   *  fromHistory: para incluirla o no en el historial (evitar doble inclusion)
   * @return {void}.
   */
  goToRoute(page, fromHistory = false) {
    const { paths } = this;
    console.log('goToRoute:', page);

    if (!(page in paths)) {
      page = 'error';
    }
    const { refFunc, path } = paths[page];
    refFunc();
    if (!fromHistory) {
      history.pushState({}, page, path);
    }

    console.log('goToRoute:', path);
  }
}
