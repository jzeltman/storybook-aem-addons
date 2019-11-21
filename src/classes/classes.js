export const label = "CSS Classes";
export let defaultValue = [];
export let group = 'CSS Classes';

export default {
    label: label,
    defaultValue: defaultValue.join(' '),
    group: group
}

export const getClasses = config => {
    defaultValue = [];
    if (config.component) defaultValue.push(config.component);

    return {
        label: label,
        defaultValue: defaultValue.join(' '),
        group: group
    }
}