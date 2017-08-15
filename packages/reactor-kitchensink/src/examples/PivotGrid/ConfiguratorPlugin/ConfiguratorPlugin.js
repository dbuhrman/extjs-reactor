import React, { Component } from 'react';
import { Container, PivotGrid, Toolbar, Button } from '@extjs/reactor/modern';
import { fit, hbox } from '@extjs/ext-react/layout';
import { pivotconfigurator } from '@extjs/ext-react-pivot/plugin';
import SaleModel from '../SaleModel';
import { generateData } from '../generateSaleData';

Ext.require(['Ext.pivot.plugin.Configurator']);

export default class ConfiguratorPlugin extends Component {

    store = Ext.create('Ext.data.Store', {
        model: SaleModel,
        data: generateData()
    })

    coloredRenderer = (v, record, dataIndex, cell, column) => {
        cell.setStyle( Ext.String.format('color: {0};', v > 500 ? 'green' : 'red') );

        return Ext.util.Format.number(v, '0,000.00');
    }

    showConfigurator = () => { this.refs.pivotgrid.showConfigurator() }

    render() {
        return (
            <Container layout={fit} padding={10}>
                <PivotGrid
                    shadow
                    ref="pivotgrid"
                    plugins={[{
                        type: pivotconfigurator,
                        // It is possible to configure a list of fields that can be used to
                        // configure the pivot grid
                        // If no fields list is supplied then all fields from the Store model
                        // are fetched automatically
                        fields: [{
                            dataIndex: 'quantity',
                            header: 'Qty',
                            // You can even provide a default aggregator function to be used
                            // when this field is dropped
                            // on the agg dimensions
                            aggregator: 'min',
                            formatter: 'number("0")',
                            settings: {
                                // Define here in which areas this field could be used
                                allowed: ['aggregate'],
                                // Set a custom style for this field to inform the user that it
                                // can be dragged only to "Values"
                                style: {
                                    fontWeight: 'bold'
                                },
                                // Define here custom formatters that ca be used on this dimension
                                formatters: {
                                    '0': 'number("0")',
                                    '0%': 'number("0%")'
                                }
                            }
                        }, {
                            dataIndex: 'value',
                            header: 'Value',
                            settings: {
                                // Define here in which areas this field could be used
                                allowed: 'aggregate',
                                // Define here what aggregator functions can be used when this
                                // field is used as an aggregate dimension
                                aggregators: ['sum', 'avg', 'count'],
                                // Set a custom style for this field to inform the user that it
                                // can be dragged only to "Values"
                                style: {
                                    fontWeight: 'bold'
                                },
                                // Define here custom renderers that can be used on this dimension
                                renderers: {
                                    'Colored 0,000.00': this.coloredRenderer
                                },
                                // Define here custom formatters that ca be used on this dimension
                                formatters: {
                                    '0': 'number("0")',
                                    '0.00': 'number("0.00")',
                                    '0,000.00': 'number("0,000.00")',
                                    '0%': 'number("0%")',
                                    '0.00%': 'number("0.00%")'
                                }
                            }
                        }, {
                            dataIndex: 'company',
                            header: 'Company',
                            settings: {
                                // Define here what aggregator functions can be used when this
                                // field is used as an aggregate dimension
                                aggregators: ['count']
                            }
                        }, {
                            dataIndex: 'country',
                            header: 'Country',
                            settings: {
                                // Define here what aggregator functions can be used when this
                                // field is used as an aggregate dimension
                                aggregators: ['count']
                            }
                        }, {
                            dataIndex: 'person',
                            header: 'Person',
                            settings: {
                                // Define here what aggregator functions can be used when this
                                // field is used as an aggregate dimension
                                aggregators: 'count'
                            }
                        }, {
                            dataIndex: 'year',
                            header: 'Year',
                            settings: {
                                // Define here the areas in which this field is fixed and cannot
                                // be moved from
                                fixed: ['topAxis']
                            }
                        }, {
                            dataIndex: 'month',
                            header: 'Month',
                            labelRenderer: value => Ext.Date.monthNames[value],
                            settings: {
                                // Define here what aggregator functions can be used when this
                                // field is used as an aggregate dimension
                                aggregators: ['count'],
                                // Define here in which areas this field could be used
                                allowed: ['leftAxis', 'topAxis']
                            }
                        }]
                    }]}
                    matrix={{
                        type: 'local',
                        store: this.store,
                        // Configure the aggregate dimensions. Multiple dimensions are supported.
                        aggregate: [{
                            dataIndex: 'value',
                            header: 'Value',
                            aggregator: 'avg',
                            width: 120
                        }],
                        // Configure the left axis dimensions that will be used to generate the
                        // grid rows
                        leftAxis: [{
                            dataIndex: 'person',
                            header: 'Person',
                            width: 120
                        }, {
                            dataIndex: 'company',
                            header: 'Company',
                            sortable: false
                        }],
                        /**
                        * Configure the top axis dimensions that will be used to generate
                        * the columns.
                        *
                        * When columns are generated the aggregate dimensions are also used.
                        * If multiple aggregation dimensions are defined then each top axis
                        * result will have in the end a column header with children columns
                        * for each aggregate dimension defined.
                        */
                        topAxis: [{
                            dataIndex: 'year',
                            header: 'Year',
                            labelRenderer: value => `Year ${value}`
                        }]
                    }}
                />
                <Toolbar
                    shadow={false}
                    docked="top"
                    ui="app-transparent-toolbar"
                    padding="5 8"
                    layout={{
                        type: hbox,
                        align: 'stretch'
                    }}
                >
                    <Button shadow ui="action" text="Configurator" handler={this.showConfigurator}/>
                </Toolbar>
            </Container>
        )
    }
}