import React from 'react';
import {withNamespaces} from '@gisatcz/ptr-locales';
import Page, {DocsToDo} from "../../../Page";

const Index = props => (
    <Page>
        <DocsToDo>
            <ul>
                <li></li>
            </ul>
        </DocsToDo>
    </Page>
);

export default withNamespaces()(Index);