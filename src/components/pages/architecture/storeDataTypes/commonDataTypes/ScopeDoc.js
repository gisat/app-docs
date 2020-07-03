import React from 'react';
import {withNamespaces} from '@gisatcz/ptr-locales';
import Page, {DocsToDo} from "../../../../Page";
import {Link} from "react-router-dom";

const ScopeDoc = props => (
    <Page title="Scope">
        <DocsToDo/>
    </Page>
);

export default withNamespaces()(ScopeDoc);