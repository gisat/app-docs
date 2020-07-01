import React from 'react';
import {withNamespaces} from '@gisatcz/ptr-locales';
import Page, {DocsToDo} from "../../../Page";

const StoreDataTypes = props => (
    <Page>
        <DocsToDo>
            <ul>
                <li>Data types stored in DB</li>
                <li>Common & specific - differences</li>
                <li>Modifiers (scope, place, period, case, scenario), templates (attr, attrSet, layerTemplate), tags, styles, areaTree & levels, users & groups, views, layerTrees, selections, data (dataSource, data, relations)</li>
            </ul>
        </DocsToDo>
    </Page>
);

export default withNamespaces()(StoreDataTypes);