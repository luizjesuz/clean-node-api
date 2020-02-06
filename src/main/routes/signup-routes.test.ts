import request from 'supertest'

import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import app from '../config/app'

describe('SignUp Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    const accountCollection = MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  test('Sould return an account on success', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        name: 'Kandrus',
        email: 'kandrus@kw13.com.br',
        password: '123456',
        passwordConfirmation: '123456'
      })
      .expect(200)
  })
})