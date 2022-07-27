const request = require('supertest')

let app

// morgan is an http request output with log messages. Let's silence it
const mockMorgan = jest.fn((req, res, next) => next())

beforeAll(() => {
  jest.mock('morgan', () => () => mockMorgan)
  app = request(require('../app'))
})

afterAll(() => {
  jest.unmock('morgan')
})

describe('GET', () => {
  it('should return the reservation form', async () => {
    const res = await app.get('/reservation')
      .expect('Content-Type', /html/)
      .expect(200)

    expect(res.text).toContain('To make reservations please fill out the following form')

  })
})
