import React from 'react';
import { FormPanel, RadioField, FieldSet } from '@extjs/ext-react';
import { vbox } from '@extjs/ext-react/layouts';

const radioProps = {
    name: 'radios'
};

export default function RadioFieldExample() {
    return (
        <FormPanel shadow layout={{type: vbox, align: 'left'}}>
            <RadioField {...radioProps} boxLabel="Checked" value="checked" checked/>
            <RadioField {...radioProps} boxLabel="Unchecked" value="unchecked"/>
            <RadioField {...radioProps} boxLabel="Disabled" value="disabled" disabled/>
        </FormPanel>
    )
}