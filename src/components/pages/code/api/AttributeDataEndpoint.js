import React from 'react';
import Page, {DocsToDo, SyntaxHighlighter} from '../../../Page';

const AttributeDataEndpoint = props => (
	<Page title="Attribute data endpoint">
		<h2>Payload</h2>
		<SyntaxHighlighter language="json"></SyntaxHighlighter>

		<h2>Response</h2>
		<SyntaxHighlighter language="json"></SyntaxHighlighter>
	</Page>
);

export default AttributeDataEndpoint;
