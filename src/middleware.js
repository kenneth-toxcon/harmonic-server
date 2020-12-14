const { verifyRole } = require("./userRoleValidator");

function userRoleVerificator(request, response, next) {
  const { role } = request.body;
  const isValidRole = verifyRole(role);

  if (!isValidRole) {
    return response
      .status(400)
      .send({ message: "Invalid User Role", code: "INVALID_USER_ROLE" });
  } else {
    next();
  }
}

module.exports = {
  userRoleVerificator,
};
