import React from 'react';
import {withNamespaces} from '@gisatcz/ptr-locales';
import Page, {DocsToDo} from "../../Page";

const Components = props => (
    <Page>
        <DocsToDo>
            <ul>
                <li>container vs. presentational component</li>
                <li>connected, controlled components, components outside ptr</li>
            </ul>
        </DocsToDo>
    </Page>
);

export default withNamespaces()(Components);