import React from 'react';
import {withNamespaces} from '@gisatcz/ptr-locales';

import Page, {DocsToDo} from "../../Page";

const Architecture = props => (
    <Page>
        <DocsToDo>
            <ul>
                <li>Panther framework components overview - FE, BE, Geoserver, PG, Docker, ...</li>
                <li>FE - apps, packages, React + Redux</li>
            </ul>
        </DocsToDo>
    </Page>
);

export default withNamespaces()(Architecture);