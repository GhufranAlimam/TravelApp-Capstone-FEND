// const app = require("../server/serverTest"); // Link to your server file
import { app } from '../../server/server'
const supertest = require("supertest");
const request = supertest(app);
require("regenerator-runtime");
require("regenerator-runtime/runtime");
require("regenerator-runtime/path").path


it("gets the trip endpoint", async done => {
    const response = await request.get('/trip');
    expect(response.status).toBe(200);
    done();
  });

  
