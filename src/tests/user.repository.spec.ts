import { User } from './../models/user.model'
import UserRepository from '../repositories/user.repository'
const _repo = new UserRepository()
let user_id: number | undefined

describe('User repository', () => {
  beforeAll(async () => {
    const user = await _repo.createAsync({
      first_name: 'Test',
      last_name: 'User',
      username: 'testuser1',
      password: '$2b$10$px9.YtJb2iQH.vMSPR1sve2u4x7xJ5giCN9UyNyxSi93XVhi9qKk2', // Passw0rd@123
    })

    user_id = Number(user.id)
  })
  it('test', () => {
    expect(user_id).toBeDefined()
  })
})
