import PAGES from '../../../config/sites';

const getConfigForPage = (id) => PAGES.find((page) => page.id === id);
export default getConfigForPage;
