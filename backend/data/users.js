import bcrypt from 'bcryptjs'

const users = [
	{
		name: 'Admin',
		email: 'admin@example.com',
		password: bcrypt.hashSync('123456', 10),
		isAdmin: true
	},
	{
		name: 'Anita Plant',
		email: 'anita@example.com',
		password: bcrypt.hashSync('123456', 10)
	},
	{
		name: 'Curly Vines',
		email: 'curly@example.com',
		password: bcrypt.hashSync('123456', 10)
	},
	{
		name: 'Ima Annual',
		email: 'ima@example.com',
		password: bcrypt.hashSync('123456', 10)
	}
]

export default users