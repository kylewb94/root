import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Meta from '../components/Meta'
import { listUsers, deleteUser } from '../actions/userActions'

const UserListScreen = ({ history }) => {
	const dispatch = useDispatch()
	
	const userList = useSelector(state => state.userList)
	const { loading, error, users } = userList

	const userLogin = useSelector(state => state.userLogin)
	const { userInfo } = userLogin

	const userDelete = useSelector(state => state.userDelete)
	const { success: successDelete } = userDelete
	
	useEffect(() => {
		if(userInfo && userInfo.isAdmin) {
			dispatch(listUsers())
		} else {
			history.push('/login')
		}		
	}, [dispatch, history, successDelete, userInfo])

	const deleteHandler = (id) => {
		if(window.confirm('Are you sure?')) {
			dispatch(deleteUser(id))
		}
	}

	return (
		<>
			<h1>Users</h1>
			{loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
				<>
					<Meta title='Users | Roots' />	
					<Table striped bordered hover responsive className='table-sm'>
						<thead>
							<tr>
								<th>ID</th>
								<th>NAME</th>
								<th>EMAIL</th>
								<th className='text-center'>ADMIN</th>
								<th className='text-center'>EDIT</th>
								<th className='text-center'>DELETE</th>
							</tr>
						</thead>
						<tbody>
							{users.map(user => (
								<tr key={user._id}>
									<td>{user._id}</td>
									<td>{user.name}</td>
									<td><a href={`mailto:${user.email}`}>{user.email}</a></td>
									<td className='text-center'>
										{user.isAdmin ? (
											<i className='fas fa-check' style={{ color: '#02b875' }}></i>
										) : (
											<i className='fas fa-times' style={{ color: '#d9534f' }}></i>
										)}
									</td>
									<td className='text-center'>
										<LinkContainer to={`/admin/user/${user._id}/edit`}>
											<Button className='btn-sm' variant='outline-dark'>
												<i className='fas fa-edit'></i>
											</Button>
										</LinkContainer>
									</td>
									<td className='text-center'>	
										<Button variant='danger' className='btn-sm' onClick={() => deleteHandler(user._id)}>
											<i className='fas fa-trash'></i>
										</Button>
									</td>
								</tr>
							))}
						</tbody>
					</Table>
				</>	
			)}
		</>
	)
}

export default UserListScreen
