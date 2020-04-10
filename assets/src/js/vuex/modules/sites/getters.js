export const favoritedSites = (state) => {
    return state.sites.filter((site) => {
        return site.is_favorite;
    });
};
