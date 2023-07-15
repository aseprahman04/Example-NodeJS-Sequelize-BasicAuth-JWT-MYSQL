
const app = require("../server");
const db = require("../app/models");
const request = require("supertest");

require("dotenv").config();
jest.useFakeTimers()

afterEach(async () => {
    // await mongoose.connection.dropDatabase();
    await db.sequelize.close();
  });
describe("POST /v1/auth/login", () => {
  
    it("should return a successfully login", async () => {
        setTimeout(async () => {
                 const res = await request(app).post("/v1/auth/login").send({
            username: "arn04",
            password: "gikslab",
          });
          console.log(res)
          expect(res.statusCode).toBe(200);
          expect(res.body.profile).toBe("board");
        }, 30000)
    });
  });
  
  describe("GET /v1/auth/logout", () => {
   
        it("should return logout", async () => {
            setTimeout(async () => {
                const res = await request(app).get("/v1/auth/logout").auth('arn04', 'gikslab');
                expect(res.statusCode).toBe(200);
                expect(res.body.length).toBeGreaterThan(0);
         }, 30000)
        });
    
  });

  describe("POST /v1/user", () => {
   
    it("should success register", async () => {
        setTimeout(async () => {
            const res =  await request(app).post("/v1/auth/login").auth('arn04', 'gikslab').send({
                "username":"arn07",
                "password":"gikslab",
                "name": "Asep Rahman",
                "email": "aseprahmanurhakim04+4@gmail.com",
                "profile":"trainer",
                "skills":["Archer","Martial arts"]
          });
            expect(res.statusCode).toBe(200);
            expect(res.body.length).toBeGreaterThan(0);
     }, 30000)
    });

});
  
//   describe("PUT /api/products/:id", () => {
//     it("should update a product", async () => {
//       const res = await request(app)
//         .patch("/api/products/6331abc9e9ececcc2d449e44")
//         .send({
//           name: "Product 4",
//           price: 104,
//           description: "Description 4",
//         });
//       expect(res.statusCode).toBe(200);
//       expect(res.body.price).toBe(104);
//     });
//   });
  
//   describe("DELETE /api/products/:id", () => {
//     it("should delete a product", async () => {
//       const res = await request(app).delete(
//         "/api/products/6331abc9e9ececcc2d449e44"
//       );
//       expect(res.statusCode).toBe(200);
//     });
//   });