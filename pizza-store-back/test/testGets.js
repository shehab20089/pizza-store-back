var expect = require("chai").expect;
var request = require("request");

it("the status code of getting products", function(done) {
  request("https://pizza-big-store-back.herokuapp.com/api/product", function(
    error,
    response,
    body
  ) {
    expect(response.statusCode).to.equal(202);
    done();
  });
});

it("the status code error page", function(done) {
  request("https://pizza-big-store-back.herokuapp.com/api/anyThing", function(
    error,
    response,
    body
  ) {
    expect(response.statusCode).to.equal(404);
    done();
  });
});
