import React from 'react';
import {withNamespaces} from '@gisatcz/ptr-locales';

import Page, {DocsToDo} from "../../Page";
import {Link} from "react-router-dom";

const Architecture = props => (
    <Page title="Architecture">
        <p>The Panther framework consists of components developed as a part of the framework itself (FrontEnd, BackEnd) and external solutions (Docker, PostgreSQL, Geoserver, Nginx, ...?).</p>

        <h2>FrontEnd</h2>
        <p>Frontend is a modular solution written in Javascript. It is based on React and Redux technologies. The essential principle of the FrontEnd solution is that for specific use case should exist specific application. The <Link to="/architecture/applications">applications</Link> share core (general, common?) functionality which is divided to several reusable Node.js <Link to="/architecture/packages">packages</Link>. This solution enables to encapsulate application-specific logic in the application itself.</p>

        <h2>BackEnd</h2>
        <h2>Docker</h2>
        <h2>Geoserver</h2>
        <h2>PostgreSQL</h2>
        <h2>Nginx</h2>

        <DocsToDo>
            <ul>
                <li>Panther framework components overview - FE, BE, Geoserver, PG, Docker, ...</li>
                <li>FE - apps, packages, React + Redux</li>
            </ul>
        </DocsToDo>
    </Page>
);

export default withNamespaces()(Architecture);