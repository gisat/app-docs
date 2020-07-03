import React from 'react';
import {withNamespaces} from '@gisatcz/ptr-locales';
import Page, {DocsToDo} from "../../../../Page";
import {Link} from "react-router-dom";

const PlaceDoc = props => (
    <Page title="Place">
        <DocsToDo/>
    </Page>
);

export default withNamespaces()(PlaceDoc);