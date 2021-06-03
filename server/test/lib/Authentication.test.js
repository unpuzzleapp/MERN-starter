const jwt = require("jsonwebtoken");
const Authentication = require("../../lib/Authentication");

const payload = {
  id: 1,
};
const role = "test";
let token;
describe("Authentication", () => {
  it("should return a token for some value", (done) => {
    token = Authentication.generateToken(role, payload);
    expect(token).toBeTruthy();
    done();
  });
  it("should match a for existing payload", async (done) => {
      const jwtSpy = jest.spyOn(jwt, 'verify');
        jwtSpy.mockReturnValue('Some decoded token');
    const validator = await Authentication.authenticate(token, role);
    expect(validator).toBe(payload);
    done();
  });
});
