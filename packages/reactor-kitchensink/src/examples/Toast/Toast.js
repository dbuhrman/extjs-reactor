import React, { Component } from 'react';
import { Container, Button } from '@extjs/ext-react';

export default function ToastExample() {
    return (
        <Button 
            ui="action" 
            handler={() => Ext.toast('Hello World!')}
            text="Show Toast"
        />
    )
}