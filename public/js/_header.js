export function onLoadHeaderConfig(whichPage) {
  // layout references:
  const uiHeaderIcon = document.querySelector('.header__icon');

  switch (whichPage) {
    case 'products':
      uiHeaderIcon.innerHTML = '<i class="fas fa-chevron-left"></i>';
      break;

    case 'home':
      uiHeaderIcon.innerHTML = '<i class="fas fa-bars"></i>';
      break;

    case 'about':
      uiHeaderIcon.innerHTML = '<i class="fas fa-chevron-left"></i>';
      break;

    default:
      break;
  }
}
