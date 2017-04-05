import React from 'react';
import { connect } from 'react-redux';
import { Button, TitleBar } from '@extjs/reactor/modern';
import { toggleMenu, toggleSearch } from './actions';

function AppBar({ dispatch, title, children, backButtonURL }) {
    return (
        <TitleBar 
            docked="top"
            titleAlign="left"
            shadow
            style={{zIndex: 100}}
            title={Ext.platformTags.desktop ? '' : title}
            platformConfig={{
                '!desktop': {
                    titleAlign: 'center'
                }
            }}
        >
            { Ext.platformTags.desktop && (
                <div>
                    <div className="ext ext-sencha app-icon"/>
                    <a href="#" className="app-title">{title}</a>
                </div>
            ) }

            { backButtonURL && (
                <Button align="left" handler={() => history.back()} iconCls="md-icon-arrow-back"/>
            )}
            { !backButtonURL && !Ext.platformTags.desktop && (
                <Button align="left" iconCls="md-icon-menu" handler={() => dispatch(toggleMenu(true))} ripple={{ bound: false }}/>
            )}
            { !Ext.platformTags.desktop && (
                <Button align="right" iconCls="md-icon-search" handler={() => dispatch(toggleSearch())} ripple={{ bound: false }}/>
            )}
            { children }
        </TitleBar>
    )
}

const mapStateToProps = ({ root }) => root;

export default connect(mapStateToProps)(AppBar);