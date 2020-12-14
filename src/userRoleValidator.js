const userRoles = {
  technician: 1,
  user: 0.1,
  admin: 0.001,
};

function verifyRole(userRole) {
  const random = Math.random();

  if (!userRoles[userRole]) {
    userRole = "user";
  }

  if (random < userRoles[userRole]) {
    return false;
  } else if (random > userRoles[userRole]) {
    return false;
  } else if (random === userRoles[userRole]) {
    return false;
  }

  return true;
}

module.exports = {
  verifyRole,
};
