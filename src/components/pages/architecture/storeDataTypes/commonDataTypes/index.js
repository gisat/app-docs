import React from 'react';
import {withNamespaces} from '@gisatcz/ptr-locales';
import Page, {DocsToDo} from "../../../../Page";
import {Link} from "react-router-dom";

const CommonDataTypes = props => (
    <Page title="Common data types">
        <DocsToDo>About common data types</DocsToDo>

        <h2>Modifiers</h2>
        <DocsToDo>About modifiers</DocsToDo>

        <ul>
            <li><Link to="./common/scope">Scope</Link></li>
            <li><Link to="./common/place">Place</Link></li>
            <li><Link to="./common/period">Period</Link></li>
            <li><Link to="./common/case">Case</Link></li>
            <li><Link to="./common/scenario">Scenario</Link></li>
        </ul>

        <h2>Templates</h2>
        <DocsToDo>About templates</DocsToDo>

        <ul>
            <li><Link to="./common/attribute">Attribute</Link></li>
            <li><Link to="./common/attributeSet">Attribute set</Link></li>
            <li><Link to="./common/layerTemplate">Layer template</Link></li>
        </ul>

        <h2>Data</h2>
        <DocsToDo>About data</DocsToDo>

        <ul>
            <li><Link to="./common/attributeDataSource">Attribute data source</Link></li>
            <li><Link to="./common/attributeRelation">Attribute relation</Link></li>
            <li><Link to="./common/spatialDataSource">Spatial data source</Link></li>
            <li><Link to="./common/spatialRelation">Spatial relation</Link></li>
            <li><Link to="./common/data">Data</Link></li>
        </ul>

        <h2>Other data types</h2>

        <ul>
            <li><Link to="./common/areaTree">Area tree</Link></li>
            <li><Link to="./common/areaTreeLevel">Area tree level</Link></li>
            <li><Link to="./common/layerTree">Layer tree</Link></li>
            <li><Link to="./common/selection">Selection</Link></li>
            <li><Link to="./common/style">Style</Link></li>
            <li><Link to="./common/tag">Tag</Link></li>
            <li><Link to="./common/user">User</Link></li>
            <li><Link to="./common/userGroup">User group</Link></li>
            <li><Link to="./common/view">View</Link></li>
        </ul>
    </Page>
);

export default withNamespaces()(CommonDataTypes);