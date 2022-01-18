const dbConnection = require("../database/connections");
const sql = require("../database/connectionsMSSQL");
const getConnection = require("../database/connectionsMSSQL");

const controllerUsers = {};

// feed Clients
controllerUsers.feed = async (req, res) => {
  const userBody = req.body.users;

  try {
    dbConnection.query(
      "INSERT INTO `emall-users`( `user_identification`, `user_name`, `user_email`, `user_password`, `user_role`, `user_status`, `client_code`, `client_rep`, `client_address`, `client_country`, `client_state`, `client_city`, `client_municipality`, `client_zopCode`, `client_phone1`, `client_phone2`, `client_phone3`, `client_date_birth`, `client_gender`, `client_type_rif`, `created_at`, `last_visit`, `last_update`) VALUES ?",
      [userBody],
      async (err, result) => {
        if (err) {
          res.status(400).json({
            status: 400,
            success: false,
            msg: err,
            message: err.sqlMessage,
          });
          return;
        }

        res.status(200).json({
          status: 200,
          success: true,
          data: result,
          message: "ok",
        });
      }
    );
  } catch (err) {
    console.log(err);
  }
};

// feed Paises from Saint SAPAIS
controllerUsers.feedpaises = async (req, res) => {
  const pool = await getConnection();

  const feedOneCountry = async (country) => {
    try {
      const data = await dbConnection.query(
        "INSERT INTO paises( pais_id, pais_name)  VALUE( ?,? )",
        [country.Pais, country.Descrip],
        (err, result) => {
          if (err) {
            console.log("error grabando", err);
            return;
          }
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  const result = await pool.request().query("select * from sapais");

  const paisesSaint = result.recordset;

  let cant = 0;

  paisesSaint.map(async (pais) => {
    // console.log(pais);
    await feedOneCountry(pais);
    cant++;
  });

  res.status(200).json({
    status: 200,
    success: true,
    cant,
    message: "ok",
  });

  console.log("cant de paises =", cant);
};

// feed Paises from Saint SAESTADOS
controllerUsers.feedestados = async (req, res) => {
  const pool = await getConnection();

  const feedOneState = async (state) => {
    try {
      const data = await dbConnection.query(
        "INSERT INTO estados (estado_id, estado_name, pais_id) VALUE( ?,?,? )",
        [state.Estado, state.Descrip, state.Pais],
        (err, result) => {
          if (err) {
            console.log("error grabando", err);
            return;
          }
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  const result = await pool.request().query("select * from saestado");

  const estados = result.recordset;

  let cant = 0;

  estados.map(async (estado) => {
    // console.log(estado);
    await feedOneState(estado);
    cant++;
  });

  console.log("cant de estados =", cant);

  res.status(200).json({
    status: 200,
    success: true,
    cant,
    message: "ok",
    table: "estados",
  });
};

// feed Paises from Saint SACIUDADES
controllerUsers.feedciudades = async (req, res) => {
  const pool = await getConnection();

  const feedOneCity = async (city) => {
    try {
      const data = await dbConnection.query(
        "INSERT INTO ciudades (ciudad_id, ciudad_name, estado_id, pais_id) VALUE( ?,?,?,? )",
        [city.Ciudad, city.Descrip, city.Estado, city.Pais],
        (err, result) => {
          if (err) {
            console.log("error grabando", err);
            return;
          }
          return 1;
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  const result = await pool.request().query("select * from saciudad");

  const ciudades = result.recordset;

  let cant = ciudades.length;

  ciudades.map(async (city) => {
    // console.log(city);
    return await feedOneCity(city);
  });

  console.log("cant de ciudades =", cant);

  res.status(200).json({
    status: 200,
    success: true,
    cant,
    message: "ok",
    table: "ciudades",
  });
};

// feed Paises from Saint SAMUNICIPO
controllerUsers.feedmunicipios = async (req, res) => {
  const pool = await getConnection();

  const feedOneMunicipality = async (municipality) => {
    try {
      const data = await dbConnection.query(
        "INSERT INTO municipios (municipio_id, municipio_name, pais_id, estado_id, ciudad_id) VALUE( ?,?,?,?,? )",
        [
          municipality.Municipio,
          municipality.Descrip,
          municipality.Pais,
          municipality.Estado,
          municipality.Ciudad,
        ],
        (err, result) => {
          if (err) {
            console.log("error grabando", err);
            return;
          }
          return 1;
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  const result = await pool.request().query("select * from samunicipio");

  const municipios = result.recordset;

  let cant = 0;

  await municipios.map(async (municipality) => {
    // console.log(municipios);
    cant++;
    return await feedOneMunicipality(municipality);
  });

  console.log("cant de municipios =", municipios.length, cant);

  res.status(200).json({
    status: 200,
    success: true,
    cant,
    message: "ok",
    table: "municipios",
  });
};

// feed Paises from Saint SACLIE
controllerUsers.feedusuarios = async (req, res) => {
  const pool = await getConnection();

  const feedOneUser = async (user) => {
    const defaultEmail = user.Email === "" ? null : user.Email;

    try {
      const data = await dbConnection.query(
        "INSERT INTO usuarios ( cod_clie, identification, name, represent_name, email, address, country, state, city, municipality, zip_code, phone1, phone2, phone3, user_password, Saldo) VALUE( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? )",
        [
          user.CodClie,
          user.ID3,
          user.Descrip,
          user.Represent,
          defaultEmail,
          user.Direc1?.trim() + " " + user.Direc2?.trim(),
          user.Pais,
          user.Estado,
          user.Ciudad,
          user.Municipio,
          user.ZipCode,
          user.Telef,
          user.Movil,
          user.Fax,
          "$2b$10$L7DbgfYqnLDdRm2qdHqRd.vqBzCQyOVWQq6vzuZnIxYjcMVkYY33W",
          user.Saldo,
        ],
        (err, result) => {
          if (err) {
            console.log("error grabando", err);
            return;
          }
          return 1;
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  const result = await pool.request().query("select * from saclie");

  const usuarios = result.recordset;

  let cant = 0;

  await usuarios.map(async (user) => {
    cant++;
    return await feedOneUser(user);
  });

  console.log("cant de usuarios =", usuarios.length, cant);

  res.status(200).json({
    status: 200,
    success: true,
    cant,
    message: "ok",
    table: "usuarios",
  });
};

// feed Clients Saint
controllerUsers.feedsaint = async (req, res) => {
  const pool = await getConnection();

  const feedOneClient = async (client) => {
    try {
      const data = await dbConnection.query(
        "INSERT INTO Clientes(CodClie, Descrip, ID3, Represent, Direc1, Direc2, Activo, Pais, Estado, Ciudad, Email, Telef, Movil, Fax, Municipio, ZipCode)  VALUE( ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,? )",
        [
          client.CodClie,
          client.Descrip,
          client.ID3,
          client.Represent,
          client.Direc1,
          client.Direc2,
          client.Activo,
          client.Pais,
          client.Estado,
          client.Ciudad,
          client.Email,
          client.Telef,
          client.Movil,
          client.Fax,
          client.Municipio,
          client.ZipCode,
        ],
        (err, result) => {
          if (err) {
            console.log("error grabando", err);
            return;
          }
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  const feedOneCity = async (ciudad) => {
    try {
      const data = await dbConnection.query(
        "INSERT INTO Ciudades (Descrip, Ciudad, Estado, Pais) VALUE( ?,?,?,? )",
        [ciudad.Descrip, ciudad.Ciudad, ciudad.Estado, ciudad.Pais],
        (err, result) => {
          if (err) {
            console.log("error grabando", err);
            return;
          }
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  const result = await pool.request().query("select * from saclie");

  const userBody = result.recordset;

  let cant = 0;

  userBody.map((client) => {
    // console.log(client);
    feedOneClient(client);
    // feedOneCity(client);
    cant++;
  });

  console.log("cant de cliente =", cant);
};

module.exports = controllerUsers;
