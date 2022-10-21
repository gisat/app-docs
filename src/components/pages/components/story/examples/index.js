import Page, { SyntaxHighlighter } from '../../../../Page';
import React from 'react';
import ComponentPropsTable, { Prop, Section } from '../../../../ComponentPropsTable/ComponentPropsTable';

const AppStoryExamples = () => {
	return (
		<Page title="More examples">
				<ComponentPropsTable>
				</ComponentPropsTable>
			<h2>Code example</h2>
			<SyntaxHighlighter language="jsx">
{``}
			</SyntaxHighlighter>
		</Page>
	);
};

AppStoryExamples.propTypes = {};

export default AppStoryExamples;
