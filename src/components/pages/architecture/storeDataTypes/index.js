import React from 'react';
import {withNamespaces} from '@gisatcz/ptr-locales';
import Page, {DocsToDo} from "../../../Page";

const StoreDataTypes = props => (
    <Page>
        <DocsToDo>
            <ul>
                <li>Data types stored in DB</li>
                <li>Common & specific - differences</li>
            </ul>
        </DocsToDo>
    </Page>
);

export default withNamespaces()(StoreDataTypes);