import React from 'react';
import {withNamespaces} from '@gisatcz/ptr-locales';
import Page, {DocsToDo} from "../../../../Page";
import {Link} from "react-router-dom";

const AreaTreeDoc = props => (
    <Page title="AreaTree">
        <DocsToDo/>
    </Page>
);

export default withNamespaces()(AreaTreeDoc);