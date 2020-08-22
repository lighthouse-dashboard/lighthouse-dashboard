/**
 *
 * @param once
 * @return {{data: (function(): {observer: null, isInViewport: boolean}), methods: {handleIntersection(IntersectionObserverEntry[]): void}, mounted(): void}}
 */
export default function inViewMixin(once = false) {
    return {
        data: () => ({
            observer: null,
            isInViewport: false,
        }),
        methods: {
            /**
             * Handle intersection events
             * @param {IntersectionObserverEntry[]} entries
             */
            handleIntersection(entries) {
                this.isInViewport = entries.reduce((acc, entry) => {
                    if (acc) {
                        return acc;
                    }

                    return entry.isIntersecting;
                }, false);


                if (this.isInViewport && this.onIntersect) {
                    this.onIntersect();

                    if (once) {
                        this.destroy();
                    }
                }
            },

            destroy() {
                this.observer.disconnect();
            },
        },

        beforeDestroy() {
            this.destroy();
        },

        mounted() {
            const options = {
                root: null,
                rootMargin: '0px',
                threshold: [0, 1],
            };

            this.observer = new IntersectionObserver(this.handleIntersection, options);
            this.observer.observe(this.$el);
        },
    };
}
