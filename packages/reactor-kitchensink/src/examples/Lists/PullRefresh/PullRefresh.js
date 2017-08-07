import React, { Component } from 'react';
import { List } from '@extjs/ext-react';
import { ajax } from '@extjs/ext-react/proxy';
import { json } from '@extjs/ext-react/reader';
import { pullrefresh } from '@extjs/ext-react/plugin';

require('../stocks');

export default class PullRefreshListExample extends Component {

    store = Ext.create('Ext.data.Store', {
        fields: ['name'],
        autoLoad: true,
        proxy: {
            type: ajax,
            url: '/KitchenSink/Company',
            reader: {
                type: json,
                rootProperty: 'data',
                // Do not attempt to load orders inline.
                // They are loaded through the proxy
                implicitIncludes: false
            },
            extraParams: {
                shuffle: true
            }
        }
    });

    render() {
        return (
            <List
                shadow
                itemTpl="{name}"
                store={this.store}
                plugins={[
                    { type: pullrefresh, mergeData: false }
                ]}
                platformConfig={{
                    '!phone': {
                        height: 450,
                        width: 300
                    }
                }}
            />
        )
    }

}