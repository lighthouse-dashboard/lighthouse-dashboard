/**
 * In View mixin
 * @param {boolean} once
 * @return {object}
 */
export default function inViewMixin(once = false) {
    return {
        data: () => ({
            observer: null,
            isInViewport: false,
        }),

        methods: {
            /**
             * Check if any entry is  intersecting
             * @param {IntersectionObserverEntry[]} entries
             * @return {boolean}
             */
            hasIntersectingEntries(entries) {
                return entries.reduce((acc, entry) => {
                    if (acc) {
                        return acc;
                    }

                    return entry.isIntersecting;
                }, false);
            },

            /**
             * Handle intersection events
             * @param {IntersectionObserverEntry[]} entries
             */
            handleIntersection(entries) {
                const isInViewport = this.isInViewport = this.hasIntersectingEntries(entries);

                const intersects = isInViewport && this.onIntersect;

                if (intersects) {
                    this.onIntersect();
                }

                if (intersects && once) {
                    this.destroy();
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
