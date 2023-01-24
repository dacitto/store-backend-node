import supertest from 'supertest'
import app from '../../server'
import { User } from '../../models/user.model'
import { generateAuthObject } from '../../services/auth.service'
import { Order } from '../../models/order.model'
const registeredUser: User = {
  id: 1,
  username: 'user1',
  first_name: 'test',
  last_name: 'test',
  password: `123@Test`,
}

const newOrder: Omit<Order, 'id'> = {
  user_id: registeredUser.id,
  status_of_order: 'active',
}
const request = supertest(app)

const token = generateAuthObject(registeredUser).token

describe('Test order endpoints responses', async () => {
  it('get orders Unauthorized', async () => {
    const response = await request.get('/api/orders')
    expect(response.status).toBe(401) // Unauthorized
  })
  it('get orders Unauthorized', async () => {
    const response = await request.get('/api/orders')
    expect(response.status).toBe(401) // Unauthorized
  })

  it('/api/orders get all orders (with Auth)', async () => {
    await request
      .get('/api/orders')
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .expect(200) // OK
  })
  it('/api/orders/show/1 -->  show a specific  order by an order id (with Auth)', async () => {
    await request
      .get('/api/orders/show/1')
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .expect(200) // OK
  })
  it('/api/orders/show/3652 -->  show a specific by order by Id (with Auth) not found', async () => {
    const res = await request
      .get('/api/orders/show/3652')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
    expect(res.body).toEqual({
      message: 'Not found',
    })
    expect(res.status).toBe(404) // Not Found
  })

  it('/api/orders/create -->  create a new order (with Auth)', async () => {
    await request
      .post('/api/orders/create')
      .set('Content-type', 'application/json')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send(newOrder)
      .expect(201) // Created
  })

  it('api/orders/ordersByUser/:userId get active Orders by  a user ', async () => {
    await request
      .get(`/api/orders/ordersByUser/${registeredUser.id}`)
      .set('Content-type', 'application/json')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
  })
})
