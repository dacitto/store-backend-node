import supertest from 'supertest'
import app from '../../server'
import { User } from '../../models/user.model'
import { Product } from '../../models/product.model'
import { generateAuthObject } from '../../services/auth.service'
import { generateUsername } from 'unique-username-generator'
const registeredUser: User = {
  id: 1,
  username: 'user1',
  first_name: 'test',
  last_name: 'test',
  password: `123@Test`,
}
const token = generateAuthObject(registeredUser).token

const registeredProduct: Product = {
  id: 1,
  product_name: 'product_1',
  price: 100,
}

const newProduct: Omit<Product, 'id'> = {
  product_name: generateUsername('', 0, 15),
  price: 500,
}
const request = supertest(app)

describe('Test product endpoints responses', async () => {
  it('get products', async () => {
    await request.get('/api/products').expect(200)
  })

  it('/api/products/show/1 -->  show a specific by product Id product', async () => {
    await request.get(`/api/products/show/${registeredProduct.id}`).expect(200) // OK
  })
  it('/api/products/show/3652 -->  show a specific  product by product Id not found', async () => {
    const res = await request.get('/api/products/show/3652')
    expect(res.body).toEqual({
      message: 'Not found',
    })
    expect(res.status).toBe(404) // Not Found
  })

  it('/api/products/create -->  create a new product (with Auth)', async () => {
    await request
      .post('/api/products/create')
      .set('Content-type', 'application/json')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send(newProduct)
      .expect(201) // Created
  })
  it('/api/products/create -->  check if product is already taken(with Auth)', async () => {
    const res = await request
      .post('/api/products/create')
      .set('Content-type', 'application/json')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send(newProduct)
    expect(res.status).toBe(422) // Unprocessable entity
    expect(res.body).toEqual({
      message: 'Unprocessable entity',
      errors: ['product_name is already taken'],
    })
  })
})
