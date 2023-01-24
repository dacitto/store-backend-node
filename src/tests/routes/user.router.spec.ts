import supertest from 'supertest'
import app from '../../server'
import { User } from '../../models/user.model'
import { generateAuthObject } from '../../services/auth.service'
import { generateUsername } from 'unique-username-generator'
const registeredUser: User = {
  id: 1,
  username: 'user1',
  first_name: 'test',
  last_name: 'test',
  password: `123@Test`,
}

const newUser = {
  username: generateUsername('', 0, 15),
  first_name: 'salah',
  last_name: 'daci',
  password: '123@Daci',
}
const request = supertest(app)

const token = generateAuthObject(registeredUser).token

describe('Test user endpoints responses', async () => {
  it('get users Unauthorized', async () => {
    const response = await request.get('/api/users')
    expect(response.status).toBe(401) // Unauthorized
  })
  it('get users Unauthorized', async () => {
    const response = await request.get('/api/users')
    expect(response.status).toBe(401) // Unauthorized
  })

  it('/api/users get all users (with Auth)', async () => {
    await request
      .get('/api/users')
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .expect(200) // OK
  })
  it('/api/users/show/1 -->  show a specific by user Id user (with Auth)', async () => {
    await request
      .get('/api/users/show/1')
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .expect(200) // OK
  })
  it('/api/users/show/3652 -->  show a specific by user Id user (with Auth) not found', async () => {
    const res = await request
      .get('/api/users/show/3652')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
    expect(res.body).toEqual({
      message: 'Not found',
    })
    expect(res.status).toBe(404) // Not Found
  })

  it('/api/users/create -->  create a new user (with Auth)', async () => {
    await request
      .post('/api/users/create')
      .set('Content-type', 'application/json')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send(newUser)
      .expect(201) // Created
  })
  it('/api/users/create -->  if Username is already taken(with Auth)', async () => {
    const res = await request
      .post('/api/users/create')
      .set('Content-type', 'application/json')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send(newUser)
    expect(res.status).toBe(422) // Unprocessable entity
    expect(res.body).toEqual({
      message: 'Unprocessable entity',
      errors: ['Username is already taken'],
    })
  })
})
