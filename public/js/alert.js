



export const hideAlert = () => {
  const el = document.querySelector('.alert');
  if (el) el.parentElement.removeChild(el);
};
export const alertt = (status, message) => {
  // console.log("called");

  hideAlert()

  const markup = `<div class="alert alert-${status} fixed-top" role="alert">
    ${message}
  </div>`;
  document.querySelector('body').insertAdjacentHTML('afterbegin', markup);
  window.setTimeout(hideAlert, 6000)
}













