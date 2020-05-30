import withLayout from '../../../../storybook/decorators/withLayout';

export default { title: 'Styleguide / List', decorators: [withLayout] };

export const component = () => `<list>
<list-item>Foo</list-item>
<list-item>Bar</list-item>
</list>`;

export const withButtons = () => `<list>
<list-item><btn facets='flat'>Foo</btn></list-item>
<list-item><btn facets='flat'>Bar</btn></list-item>
</list>`;
