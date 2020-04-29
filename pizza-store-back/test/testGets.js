var expect = require("chai").expect;
var request = require("request");

it("the status code of getting products", function(done) {
  request("http://localhost:3000/api/product", function(error, response, body) {
    expect(response.statusCode).to.equal(202);
    done();
  });
});

it("the status code error page", function(done) {
  request("http://localhost:3000/api/anyThing", function(
    error,
    response,
    body
  ) {
    expect(response.statusCode).to.equal(404);
    done();
  });
});
