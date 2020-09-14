import React from 'react';
import {withNamespaces} from '@gisatcz/ptr-locales';
import Page, {DocsToDo} from "../../../Page";

const SystemDataTypes = props => (
    <Page>
        <DocsToDo>
            <ul>
                <li>Not stored on BE</li>
                <li>layers, map view</li>
                <li>windows, screens, ... ?</li>
            </ul>
        </DocsToDo>
    </Page>
);

export default withNamespaces()(SystemDataTypes);