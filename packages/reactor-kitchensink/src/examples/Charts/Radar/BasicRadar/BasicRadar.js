import React, { Component } from 'react';
import { Container } from '@extjs/ext-react';
import { Polar } from '@extjs/ext-react-charts';
import { fit } from '@extjs/ext-react/layouts';
import { rotate } from '@extjs/ext-react/interactions';
import { numeric, category } from '@extjs/ext-react/axes';
import { radar } from '@extjs/ext-react/series';
import data from './data';
import ChartToolbar from '../../ChartToolbar';

export default class BasicScatterChartExample extends Component {
    
    store = Ext.create('Ext.data.Store', {
        data
    });

    state = {
        theme: 'default'
    };

    changeTheme = theme => this.setState({ theme })

    render() {
        const { theme } = this.state;

        return (
            <Container padding={!Ext.os.is.Phone && 10} layout={fit}>
                <ChartToolbar
                    onThemeChange={this.changeTheme}
                    theme={theme}
                />
                <Polar
                    shadow
                    insetPadding={25}
                    store={this.store}
                    theme={theme}
                    interactions={rotate}
                    axes={[{
                        type: numeric,
                        position: 'radial',
                        fields: 'data1',
                        renderer: (axis, label, layoutContext) => layoutContext.renderer(label) + '%',
                        grid: true,
                        minimum: 0,
                        maximum: 25,
                        majorTickSteps: 4
                    }, {
                        type: category,
                        position: 'angular',
                        grid: true
                    }]}
                    series={[{
                        type: radar,
                        angleField: 'month',
                        radiusField: 'data1',
                        style: {
                            opacity: 0.80
                        },
                        highlight: {
                            fillStyle: '#000',
                            lineWidth: 2,
                            strokeStyle: '#fff'
                        }
                    }]}
                />
            </Container>
        )
    }
}