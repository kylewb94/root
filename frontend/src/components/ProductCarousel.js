import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Carousel, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from './Loader'
import Message from './Message'
import Rating from './Rating'
import { listTopProducts } from '../actions/productActions'

const ProductCarousel = () => {
	const dispatch = useDispatch()

	const productTopRated = useSelector((state) => state.productTopRated)
	const { loading, error, products } = productTopRated

	useEffect(() => {
		dispatch(listTopProducts())
	}, [dispatch])
	
	return loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
		<>
			<Row className='justify-content-center mt-3'>
				<Col md={6} sm={8}>
					<h2>Top-Rated Products</h2>
				</Col>
			</Row>
			<Row className='justify-content-center mt-3'>
				<Col md={6} sm={8}>
					<Carousel pause='hover'>
						{products.map(product => (
							<Carousel.Item key={product._id}>
								<Link to={`/product/${product._id}`}>
									<Image src={product.image} alt={product.name} fluid />	
									<Carousel.Caption className='carousel-caption'>
										<h2>{product.name}</h2>
										<Rating
											value={product.rating}
											text={`${product.numReviews}`}
										/>
										<h3>${product.price}</h3>
									</Carousel.Caption>		
								</Link>
							</Carousel.Item>
						))}
					</Carousel>
				</Col>
			</Row>
		</>	
	)
}

export default ProductCarousel
