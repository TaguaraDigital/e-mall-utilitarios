const dbConnection = require("../database/connections");
const getConnection = require("../database/connectionsMSSQL");

const controllerInvoices = {};

/// feed Saint SAFACT
controllerInvoices.feedInvoicesSafact = async (req, res) => {
  const pool = await getConnection();

  const feedOneInvoiceSafact = async (invoice) => {
    try {
      const data = await dbConnection.query(
        "INSERT INTO `invoices_safact`( `TipoFac`, `NumeroD`, `NroUnico`, `NroCtrol`, `CodUsua`, `Signo`, `FechaT`, `TipoDev`, `NumeroR`, `Factor`, `MontoMEx`, `CodClie`, `CodVend`, `Descrip`, `ID3`, `Monto`, `MtoTax`, `TGravable`, `TGravable0`, `TExento`, `RetenIVA`, `FechaR`, `FechaI`, `FechaE`, `FechaV`, `MtoTotal`, `Contado`, `Credito`, `MtoExtra`, `SaldoAct`, `Nota1`, `Nota2`, `Nota3`, `Nota4`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
        [
          invoice.TipoFac,
          invoice.NumeroD,
          invoice.NroUnico,
          invoice.NroCtrol,
          invoice.CodUsua,
          invoice.Signo,
          invoice.FechaT,
          invoice.TipoDev,
          invoice.NumeroR,
          invoice.Factor,
          invoice.MontoMEx,
          invoice.CodClie,
          invoice.CodVend,
          invoice.Descrip,
          invoice.ID3,
          invoice.Monto,
          invoice.MtoTax,
          invoice.TGravable,
          invoice.TGravable0,
          invoice.TExento,
          invoice.RetenIVA,
          invoice.FechaR,
          invoice.FechaI,
          invoice.FechaE,
          invoice.FechaV,
          invoice.MtoTotal,
          invoice.Contado,
          invoice.Credito,
          invoice.MtoExtra,
          invoice.SaldoAct,
          invoice.Nota1,
          invoice.Nota2,
          invoice.Nota3,
          invoice.Nota4,
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

  // .query(
  //   "select  i.NumeroD, i.NroUnico, i.NroCtrol, c.NroUnico, c.Saldo from safact AS i LEFT JOIN saacxc AS c ON i.NumeroD = c.NumeroD WHERE i.CodClie = 'J403140812' AND i.numeroD = '002138' AND i.TipoFac != 'G' "
  // );
  // .query("SELECT * FROM  safact WHERE NroUnico = 92 OR NroUnico = 130");
  const result = await pool
    .request()
    .query("SELECT * FROM  safact ORDER BY NroUnico");

  const invoices = result.recordset;

  let cant = 0;

  await invoices.map(async (invoice) => {
    // console.log(JSON.stringify(invoice));
    if (
      invoice.NroUnico === 92 ||
      invoice.NroUnico === 128 ||
      invoice.NroUnico === 130
    ) {
      console.log("aqui los datos errados ", invoice.NroUnico, invoice.FechaV);
      invoice.FechaV = null;
    }
    cant++;
    return await feedOneInvoiceSafact(invoice);
  });

  console.log("cant de facturas =", invoices.length, cant);

  res.status(200).json({
    status: 200,
    success: true,
    cant,
    message: "ok",
    table: "safact",
  });
};

/// feed C X C from Saint SAACXC
controllerInvoices.feedInvoicesSaacxc = async (req, res) => {
  const pool = await getConnection();

  const feedOneInvoiceSaacxc = async (invoice) => {
    // console.log(JSON.stringify(invoice));
    try {
      const data = await dbConnection.query(
        "INSERT INTO saacxc (CodClie, NroUnico, NroRegi, FechaI, FechaE, FechaV, FechaT, FechaR, NumeroD, NumeroF, NumeroP, NumeroT, NumeroN, NroCtrol, FromTran, TipoCxc, TipoTraE, AutSRI, NroEstable, PtoEmision, Moneda, Factor, MontoMEx, SaldoMEx, Document, Notas1, Notas2, Notas10, Monto, Debitos, Creditos, MontoNeto, MtoTax, RetenIVA, OrgTax, Saldo, SaldoOrg, SaldoAct, BaseImpo, TExento, CancelI, CancelA, CancelE, CancelC, CancelT, CancelG, CancelP, CancelD, EsUnPago, AfectaVta, EsReten, TipoReg) VALUES (?,?,?,?,?,?,?,?,?,?, ?,?,?,?,?,?,?,?,?,?, ?,?,?,?,?,?,?,?,?,?, ?,?,?,?,?,?,?,?,?,?, ?,?,?,?,?,?,?,?,?,?, ?,?) ",
        [
          invoice.CodClie,
          invoice.NroUnico,
          invoice.NroRegi,
          invoice.FechaI,
          invoice.FechaE,
          invoice.FechaV,
          invoice.FechaT,
          invoice.FechaR,
          invoice.NumeroD,
          invoice.NumeroF,
          invoice.NumeroP,
          invoice.umeroT,
          invoice.NumeroN,
          invoice.NroCtrol,
          invoice.FromTran,
          invoice.TipoCxc,
          invoice.TipoTraE,
          invoice.AutSRI,
          invoice.NroEstable,
          invoice.PtoEmision,
          invoice.Moneda,
          invoice.Factor,
          invoice.MontoMEx,
          invoice.SaldoMEx,
          invoice.Document,
          invoice.Notas1,
          invoice.Notas2,
          invoice.Notas10,
          invoice.Monto,
          invoice.Debitos,
          invoice.Creditos,
          invoice.MontoNeto,
          invoice.MtoTax,
          invoice.RetenIVA,
          invoice.OrgTax,
          invoice.Saldo,
          invoice.SaldoOrg,
          invoice.SaldoAct,
          invoice.BaseImpo,
          invoice.TExento,
          invoice.CancelI,
          invoice.CancelA,
          invoice.CancelE,
          invoice.CancelC,
          invoice.CancelT,
          invoice.CancelG,
          invoice.CancelP,
          invoice.CancelD,
          invoice.EsUnPago,
          invoice.AfectaVta,
          invoice.EsReten,
          invoice.TipoReg,
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

  const result = await pool
    .request()
    .query("SELECT* from saacxc ORDER BY NroUnico");

  const invoices = result.recordset;

  let cant = 0;

  await invoices.map(async (invoice) => {
    cant++;
    return await feedOneInvoiceSaacxc(invoice);
  });

  console.log("cant de facturas =", invoices.length, cant);

  res.status(200).json({
    status: 200,
    success: true,
    cant,
    message: "ok",
    table: "saacxc",
  });
};
/// feed DETAILS OF C X C from Saint SAPAGCXC
controllerInvoices.feedInvoicesSapagcxc = async (req, res) => {
  const pool = await getConnection();

  const feedOneInvoiceSapagcxc = async (invoice) => {
    // console.log(JSON.stringify(invoice));
    try {
      const data = await dbConnection.query(
        "INSERT INTO invoices_sapagcxc (CodClie, NroUnico, NroPpal, NroRegi, TipoCxc, MontoDocA, Monto, Comision, NumeroD, Descrip, FechaE, FechaO, EsReten, BaseReten, CodOper, CodRete, BaseImpo, TExento, MtoTax, RetenIVA) VALUES (?,?,?,?,?,?,?,?,?,?, ?,?,?,?,?,?,?,?,?,?)",
        [
          invoice.CodClie,
          invoice.NroUnico,
          invoice.NroPpal,
          invoice.NroRegi,
          invoice.TipoCxc,
          invoice.MontoDocA,
          invoice.Monto,
          invoice.Comision,
          invoice.NumeroD,
          invoice.Descrip,
          invoice.FechaE,
          invoice.FechaO,
          invoice.EsReten,
          invoice.BaseReten,
          invoice.CodOper,
          invoice.CodRete,
          invoice.BaseImpo,
          invoice.TExento,
          invoice.MtoTax,
          invoice.RetenIVA,
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

  const result = await pool.request().query("select * from sapagcxc");

  const invoices = result.recordset;
  // console.log("INVOICE SAPAGCXC", invoices);

  let cant = 0;

  await invoices.map(async (invoice) => {
    cant++;
    return await feedOneInvoiceSapagcxc(invoice);
  });

  console.log("cant de facturas =", invoices.length, cant);

  res.status(200).json({
    status: 200,
    success: true,
    cant,
    message: "ok",
    table: "sapagcxc",
  });
};

module.exports = controllerInvoices;
