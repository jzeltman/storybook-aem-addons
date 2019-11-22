import React from 'react';
import addons from '@storybook/addons';
import Panel from './src/panel';
import { ADDON_ID, PANEL_ID, PARAM_KEY } from './constants';

console.log('register');

const registerStyleSystem = () => {
    addons.register(ADDON_ID, api => {
        addons.addPanel(PANEL_ID, {
            title: 'AEM Style System',
            render: ({ active, key }) => <Panel api={api} key={key} active={active} />,
            paramKey: PARAM_KEY,
        });
    })
};

export default registerStyleSystem();