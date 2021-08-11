
const expect = require("chai").expect;
const request = require("supertest");
const app = require("../index");

describe("GET /api/kurs/:symbol?startdate=:startdate&enddate=:enddate", () => {
    it("should return all data", async () => {

        const res = await request(app).get("/api/kurs/USD?startDate=2021-01-01&endDate=2021-07-10");

        expect(res.body.result.length).to.equal(1);
        expect(res.status).to.equal(200);
    });
    it("should return error", async () => {

        const res = await request(app).get("/api/kurs/USD?startDate=2021-01-01");
        expect(res.body.message).to.equal('failed request');
        console.log(res.body);
        expect(res.status).to.equal(200);
    });
});

describe("GET /api/kurs?startdate=:startdate&enddate=:enddate", () => {
    it("should return all data", async () => {

        const res = await request(app).get("/api/kurs?startDate=2021-01-01&endDate=2021-07-10");

        expect(res.status).to.equal(200);
    });
});

describe("POST /", () => {
    it("should return user when the all request body is valid", async () => {
        const res = await request(app)
            .post("/api/kurs")
            .send({
                "symbol": "ZZL",
                "e_rate": {
                    "jual": 1803.55,
                    "beli": 177355
                },
                "tt_counter": {
                    "jual": 1803.55,
                    "beli": 177355
                },
                "bank_notes": {
                    "jual": 1803.55,
                    "beli": 177355
                },
                "date": "2018-05-16"
            });
        console.log(res.body);
        expect(res.status).to.equal(200);

    });
});

describe("PUT /", () => {
    it("should update the existing user and return 200", async () => {

        const res = await request(app)
            .put("/api/kurs/")
            .send({
                "symbol": "SGD",
                "e_rate": {
                    "jual": 1,
                    "beli": 177355
                },
                "tt_counter": {
                    "jual": 1803.55,
                    "beli": 177355
                },
                "bank_notes": {
                    "jual": 1803.55,
                    "beli": 177355
                },
                "date": "2021-07-09"
            });

        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal("This data has been updated");
        expect(res.body.result[0]).to.have.property("e_rate_beli", "177355");
    });
});

describe("DELETE /:date", () => {
    it("should delete requested id and return response 200", async () => {
     
      const res = await request(app).delete("/api/kurs/2021-07-09");
      expect(res.status).to.be.equal(200);
    });
  });
