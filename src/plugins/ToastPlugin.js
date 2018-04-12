import showToast from 'show-toast';

export default class ToastPlugin {
    static install(Vue, opt) {
        Vue.prototype.$toast = new ToastPlugin();
    }

    notify(html) {
        showToast({
            str: html,
            time: 2000,
            position: 'top'
        })
    }

    error(e) {
        console.log(e)
        showToast({
            str: e.message || e.statusText,
            time: 2000,
            position: 'top'
        })
    }

}
