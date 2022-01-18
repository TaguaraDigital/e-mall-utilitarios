-- SAFACT
SELECT CodClie, NumeroD, NroUnico, NroCtrol, TipoDev, DATE_FORMAT(FechaT, "%d/%m/%Y") AS Fec_Tran, DATE_FORMAT(FechaR, "%d/%m/%Y") AS Fec_Rete, DATE_FORMAT(FechaI, "%d/%m/%Y") AS Fec_Emi, DATE_FORMAT(FechaE, "%d/%m/%Y") AS Fec_Post, DATE_FORMAT(FechaV, "%d/%m/%Y") AS Fec_Venc, FORMAT(MontoMEx,2) AS MtoUSD, FORMAT(MtoTax,2) AS IVAUSD, FORMAT(Monto,2) AS Monto,  FORMAT(MtoTotal,2) AS MtoTotal, FORMAT(MtoExtra,2) AS MtoExtra, FORMAT(SaldoAct,2) AS SaldoAct	 
FROM `invoices_safact` 

WHERE CodClie = "V000" ORDER BY NroUnico


-- SAACXC
SELECT CodClie, NroUnico, NroRegi, NumeroD, NumeroN, NroCtrol, DATE_FORMAT(FechaI, "%d/%m/%Y") AS Fec_I, DATE_FORMAT(FechaE, "%d/%m/%Y") AS Fec_E, DATE_FORMAT(FechaV, "%d/%m/%Y") AS Fec_V, DATE_FORMAT(FechaT, "%d/%m/%Y") AS Fec_TI, DATE_FORMAT(FechaR, "%d/%m/%Y") AS Fec_R, FromTran, TipoCxc, Factor, FORMAT(MontoMEx,2) AS MtoUSD,  FORMAT(SaldoMEx,2) AS SaldoMEx, Document, FORMAT(Monto,2) AS Monto, FORMAT(MontoNeto,2) AS MtoNeto, FORMAT(MtoTax,2) AS MtoTax, FORMAT(RetenIVA,2) AS RetenIVA, FORMAT(Saldo,2) AS Saldo, FORMAT(SaldoOrg,2) AS SaldoOrg, FORMAT(SaldoAct,2) AS SaldoAct, EsUnPago, AfectaVta, EsReten, TipoReg FROM saacxc WHERE CodClie = "J403140812" ORDER BY NroUnico


-- SAACXC WITH PAYMENT CONFIRM
SELECT p._id, p.CodClie,FORMAT(p.MontoBs,2) AS MontoBs, FORMAT(p.MtoTaqVirBs,2) AS TaqVir, FORMAT(p.MtoTotalBs,2) AS Total, DATE_FORMAT(p.payment_date, "%d/%m/%Y") AS "F.Pago", DATE_FORMAT(p.register_date,"%d/%m/%Y") AS "F.Reg", p.payment_reference, p.payment_method, p.status, DATE_FORMAT(p.confirm_date, "%d/%m/%Y") AS "F.Conf", i.NumeroD, i.NumeroN, FORMAT(i.MontoMEx,2) AS MtoRecUSD, FORMAT(i.SaldoMEx,2) AS SaldoUSD, FORMAT(i.Monto,2) AS MontoPago, FORMAT(i.Saldo,2) AS Saldo

FROM `payments_to_confirm` AS p

LEFT JOIN saacxc AS i 
	ON p._id = i.paymentId