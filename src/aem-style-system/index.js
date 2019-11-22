import addons, { makeDecorator } from '@storybook/addons';
import { FORCE_RE_RENDER } from '@storybook/core-events';

let classes = 'testing-style-system';

const StyleSystem = (value) => {
    classes = value || classes;
    console.log('StyleSystem, classes:', classes)
    return classes;
}

export default StyleSystem;