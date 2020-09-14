import React from 'react';
import {withNamespaces} from '@gisatcz/ptr-locales';
import Page, {DocsToDo} from "../../../../Page";
import {Link} from "react-router-dom";

const AttributeSetDoc = props => (
    <Page title="Attribute set">
        <DocsToDo/>
    </Page>
);

export default withNamespaces()(AttributeSetDoc);