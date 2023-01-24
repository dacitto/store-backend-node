import { generateUsername } from 'unique-username-generator'
import supertest from 'supertest'
import app from '../../server'
import { User } from '../../models/user.model'
const request = supertest(app)

const newUser: Omit<User, 'id'> = {
  username: generateUsername('', 0, 15),
  first_name: 'Med',
  last_name: 'Daci',
  password: '123@Test',
}

describe('Test Auth endpoints responses', () => {
  it('Unauthorized', async () => {
    const response = await request.get('/api/users')
    expect(response.status).toBe(401) // Unauthorized
  })

  it('api/auth/register', async () => {
    await request
      .post('/api/auth/register')
      .set('Accept', 'application/json')
      .send(newUser)
      .expect(201) // created
  })
  it('auth/login', async () => {
    await request
      .post('/api/auth/login')
      .send({ username: newUser.username, password: newUser.password })
      .expect(200) // Ok
  })
})
