import Toastify from 'toastify-js';

/**
 * Handle error
 * @param {Error} e
 */
export const catchError = (e) => {
    Toastify({
        text: e.message,
        className: 'error',
    })
        .showToast();
};

export default catchError;
