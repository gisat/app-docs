import React from 'react';
import {withNamespaces} from '@gisatcz/ptr-locales';
import Page, {DocsToDo} from "../../Page";

const Applications = props => (
    <Page>
        <DocsToDo>
            <ul>
                <li>Application key - what is it (repository name, data type, relations to other data types)</li>
                <li>use of common data types, components, packages</li>
                <li>specific data types</li>
            </ul>
        </DocsToDo>
    </Page>
);

export default withNamespaces()(Applications);