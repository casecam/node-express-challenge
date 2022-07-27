const { signedCookie } = require('cookie-parser');
const { invalid } = require('joi');
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
    const res = await app.get('/reservations')
      .expect('Content-Type', /html/)
      .expect(200)

    expect(res.text).toContain('To make reservations please fill out the following form')
  })
})

describe('POST', () => {
  it('should reject an invalid reservation request', async () => {
    const res = await app.post('/reservations')
      .type('form')
      signedCookie({
        date: '2017, 04, 10',
        time: '06:02 AM',
        party: 'bananas',
        name: 'Family',
        email: 'username@example.com'
      })

      expect(res.text).toContain('sorry, there was a problem with your booking request')
      expect(res.status).toBe(400)
  })
})
