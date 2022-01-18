module.exports = (req, res, next) => {
  const { users } = req.body;

  function toUpper(str) {
    const palabras = str
      .split(" ")
      .map(
        (palabra) =>
          palabra.charAt(0).toUpperCase() + palabra.slice(1).toLowerCase()
      )
      .join(" ");
    return palabras;
  }

  const newUsers = [];
  users.map((user) => {
    newUsers.push([
      user.client_CI.toUpperCase().replace(".", ""),
      toUpper(user.client_name),
      user.client_email.toLowerCase(),
      "$2b$10$L7DbgfYqnLDdRm2qdHqRd.vqBzCQyOVWQq6vzuZnIxYjcMVkYY33W",
      "VI",
      "ACTIVO",
      user.client_code,
      toUpper(user.client_name),
      user.client_address1 + " " + user.client_address2,
      "VE",
      null,
      null,
      null,
      null,
      user.client_phone1,
      user.client_phone2,
      user.client_phone3,
      null,
      null,
      "Ordinario",
      new Date(),
      null,
      null,
    ]);
  });

  req.body.users = newUsers;
  next();
};
