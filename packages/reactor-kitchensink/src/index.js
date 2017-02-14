import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'; // app components
import { install } from '@extjs/reactor';
import Data from './Data';

require('./index.css');

install({ viewport: true });

// launch the react app once Ext JS is ready
Ext.application({
    launch: () => {
        ReactDOM.render(<App/>, Ext.Viewport.el.dom);
    }
})