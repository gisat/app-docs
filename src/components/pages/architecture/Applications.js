import React from 'react';
import {withNamespaces} from '@gisatcz/ptr-locales';
import Page, {DocsToDo, DocsToDoInline, InlineCodeHighlighter} from "../../Page";
import {Link} from "react-router-dom";

const Applications = props => (
    <Page title="Applications">
        <p><DocsToDoInline>What is panther application?</DocsToDoInline></p>

        <p>Panther framework is designed to relatively easily enable the development of various specific applications for specific use cases that address specific user problems.</p>

        <p>The applications share common logic from <Link to="/architecture/packages">panther packages</Link> (e.g. <Link to="/components">components</Link>) as well as <Link to="/architecture/storeDataTypes/common">common data types</Link>. On the other hand, each application can have it's own application-specific data types.</p>

        <p>Each application has a unique identifier - application key. The application key is at same time the name of the repository, the key of the application data type instance and it is used as a parameter of relations with other data types.</p>

        <h2>Examples</h2>
        <h3>Geoinvaze <span>(<a href="https://geoinvaze.czu.cz/" target="_blank" rel="noopener noreferrer">web</a>, <a href="https://github.com/gisat/app-tacrGeoinvaze" target="_blank" rel="noopener noreferrer">code</a>)</span></h3>
        <p>Geoportal focused on displaying the current and predicted expansion of invasive non-native species of plants and animals.</p>

        <h3>Agritas <span>(<a href="http://project.gisat.cz/agritas/" target="_blank" rel="noopener noreferrer">web</a>, <a href="https://github.com/gisat/app-tacr-agritas" target="_blank" rel="noopener noreferrer">code</a>)</span></h3>
        <p>Monitoring of the condition and changes of agricultural stands on selected Czech farms.</p>
    </Page>
);

export default withNamespaces()(Applications);