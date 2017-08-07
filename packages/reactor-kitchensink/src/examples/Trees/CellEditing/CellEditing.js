import React, { Component } from 'react';
import { Tree, TreeColumn } from '@extjs/ext-react-treegrid';
import { gridcellediting } from '@extjs/ext-react/plugin';
import store from './Store';

export default class CellEditingTreeExample extends Component {

    render(){
        return (
            <Tree 
                title="Cell Editing Tree"
                store={store}
                plugins={gridcellediting}
            >
                <TreeColumn
                    text="Name"
                    dataIndex="text"
                    flex="1"
                    editable
                />
            </Tree>
        )
    }
}