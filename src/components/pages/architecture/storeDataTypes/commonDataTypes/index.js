import React from 'react';
import {withNamespaces} from '@gisatcz/ptr-locales';
import Page, {DocsToDo} from "../../../../Page";

const CommonDataTypes = props => (
    <Page>
        <DocsToDo>
            <ul>
                <li>List of common data types - setup a single doc page for each of them?</li>
            </ul>
        </DocsToDo>
    </Page>
);

export default withNamespaces()(CommonDataTypes);