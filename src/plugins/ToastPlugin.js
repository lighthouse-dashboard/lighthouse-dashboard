export default class ToastPlugin {
    static install(Vue, opt) {
        Vue.prototype.$toast = new ToastPlugin();
    }

    notify(html) {
        M.toast({ html });
    }

}
