import React from 'react';
import {withNamespaces} from '@gisatcz/ptr-locales';
import Page, {DocsToDo} from "../../../../Page";
import {Link} from "react-router-dom";

const LayerTreeDoc = props => (
    <Page title="LayerTree">
        <DocsToDo/>
    </Page>
);

export default withNamespaces()(LayerTreeDoc);