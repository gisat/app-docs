import React from 'react';
import {withNamespaces} from '@gisatcz/ptr-locales';
import Page, {DocsToDo} from "../../../../Page";
import {Link} from "react-router-dom";

const AreaTreeLevelDoc = props => (
    <Page title="AreaTreeLevel">
        <DocsToDo/>
    </Page>
);

export default withNamespaces()(AreaTreeLevelDoc);