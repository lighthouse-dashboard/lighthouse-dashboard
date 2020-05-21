import withLayout from '../../../storybook/decorators/withLayout';

export default {
    title: 'Components / Site Actions List',
    decorators: [withLayout],
};

export const component = () => '<site-actions-list url="http://foo.com"/>';
