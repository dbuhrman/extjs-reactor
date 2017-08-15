import React, { Component } from 'react';
import { Container } from '@extjs/ext-react';
import { Cartesian } from '@extjs/ext-react-charts';
import { fit } from '@extjs/ext-react/layout';
import { numeric3d, category3d } from '@extjs/ext-react-charts/axis';
import { bar3d } from '@extjs/ext-react-charts/series';
import ChartToolbar from '../../ChartToolbar';
import createData from './createData';

export default class Basic3DColumnChartExample extends Component {

    constructor() {
        super();
        this.refresh();
    }

    store = Ext.create('Ext.data.Store', {
        fields: ['id', 'g0', 'g1', 'g2', 'g3', 'g4', 'g5', 'g6', 'name']
    });

    state = {
        theme: 'default'
    };

    refresh = () => {
        this.store.loadData(createData(15));
    }

    changeTheme = theme => this.setState({theme})

    render() {
        const { theme } = this.state;

        return (
            <Container padding={!Ext.os.is.Phone && 10} layout={fit}>
                <ChartToolbar
                    onThemeChange={this.changeTheme}
                    onRefreshClick={this.refresh}
                    theme={theme}
                />
                <Cartesian
                    shadow
                    store={this.store}
                    theme={theme}
                    series={{
                        type: bar3d,
                        xField: 'name',
                        yField: ['g1', 'g2', 'g3']
                    }}
                    axes={[{
                        type: numeric3d,
                        position: 'left',
                        fields: ['g1', 'g2', 'g3'],
                        grid: true,
                        label: {
                            rotate: {
                                degrees: -30
                            }
                        }
                    }, {
                        type: category3d,
                        position: 'bottom',
                        fields: 'name'
                    }]}
                />
            </Container>
        )
    }
}