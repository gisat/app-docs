import React from 'react';
import {withNamespaces} from '@gisatcz/ptr-locales';
import Page, {DocsToDo} from "../../../../Page";
import {Link} from "react-router-dom";

const AttributeDoc = props => (
    <Page title="Attribute">
        <DocsToDo/>
    </Page>
);

export default withNamespaces()(AttributeDoc);