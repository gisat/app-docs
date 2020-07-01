import React from 'react';
import {withNamespaces} from '@gisatcz/ptr-locales';
import Page, {DocsToDo} from "../../Page";

const Packages = props => (
    <Page>
        <DocsToDo>
            <ul>
                <li>List of packages with description - links to npm, github, code in app-docs</li>
            </ul>
        </DocsToDo>
    </Page>
);

export default withNamespaces()(Packages);