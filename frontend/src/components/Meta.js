import React from 'react'
import { Helmet } from 'react-helmet'

const Meta = ({ title, description, keywords }) => {
	return (
		<Helmet>
			<title>{title}</title>
			<meta name='description' content={description} />
			<meta name='keywords' content={keywords} />
		</Helmet>
	)
}

Meta.defaultProps = {
	title: 'Roots',
	description: 'Beautiful plants for the home, cared for by our expert gardeners. Sew more roots.',
	keywords: 'plants, flowers, gardening, annuals, perennials'
}

export default Meta
