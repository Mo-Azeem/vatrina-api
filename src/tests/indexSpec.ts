import supertest from "supertest";
import app from '../index'

const request = supertest(app)

it('Should get a 200 response from GET /api/photos', async () =>{
    const response = await request.get('/api/photos')
    expect(response.status).toBe(200)
})

