export const createElementProps = (data, comp) => ({
    attrs: {
        ...comp.$attrs,
        ...data,
    },
    props: {
        ...comp.$props,
        ...data,
    },
    on: comp.$listeners,
});
