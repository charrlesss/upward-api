import express from "express";
import {
  getClientCheckedList,
  getTransactionBanksDetails,
  getTransactionDescription,
} from "../../../model/Task/Accounting/collection.model";

const Collection = express.Router();

Collection.get("/get-client-checked-by-id", async (req, res) => {
  const { PNo, searchCheckedList } = req.query;

  try {
    const data1 = await getClientCheckedList(
      searchCheckedList as string,
      PNo as string
    );
    res.send({
      message: "get Data Successfully",
      success: true,
      clientCheckedList: JSON.parse(
        JSON.stringify(data1, (key, value) =>
          typeof value === "bigint" ? value.toString() : value
        )
      ),
    });
  } catch (error: any) {
    res.send({ message: error.message, success: false, clientCheckedList: [] });
  }
});

Collection.get("/get-transaction-code-title", async (req, res) => {
  try {
    res.send({
      message: "Get Data Successfully",
      success: true,
      banktransaction: await getTransactionBanksDetails(),
      transactionDesc: await getTransactionDescription(),
    });
  } catch (error: any) {
    res.send({
      message: error.message,
      success: false,
      banktransaction: [],
      transactionDesc: [],
    });
  }
});

export default Collection;
