export default class ToastPlugin {
    static install(Vue, opt) {
        Vue.prototype.$toast = new ToastPlugin();
    }

    notify(html) {
        M.toast({ html });
    }

    error(e) {
        console.error(e);
        M.toast({ html: e.message });
    }

}
