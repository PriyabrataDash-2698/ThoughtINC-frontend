// toastService.js
let toastRef;

export const setToastRef = (ref) => {
  toastRef = ref;
};

export const showToast = (options) => {
  toastRef?.show(options);
};