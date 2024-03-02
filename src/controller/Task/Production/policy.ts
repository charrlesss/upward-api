import express from "express";
import {
  getAgents,
  getClients,
  getSubAccount,
  getMortgagee,
  getPolicyAccount,
  getRates,
  getPolicyType,
} from "../../../model/Task/Production/policy";
import { getRateType } from "../../../model/Task/Production/fire-policy";
const Policy = express.Router();

Policy.get("/get-clients", async (req, res) => {
  try {
    const { clientSearch } = req.query;
    res.send({
      message: "successfully get client",
      success: true,
      clients: await getClients(clientSearch as string),
    });
  } catch (err: any) {
    res.send({ message: "SERVER:ERROR", success: false, clients: [] });
  }
});

Policy.get("/get-agents", async (req, res) => {
  try {
    const { agentSearch } = req.query;

    res.send({
      message: "successfully get agents",
      success: true,
      agents: await getAgents(agentSearch as string),
    });
  } catch (err: any) {
    res.send({ message: "SERVER:ERROR", success: false, agents: [] });
  }
});

Policy.get("/get-sub_account", async (req, res) => {
  try {
    res.send({
      message: "successfully get sub account",
      success: true,
      sub_account: await getSubAccount(),
    });
  } catch (err: any) {
    res.send({ message: "SERVER:ERROR", success: false, sub_account: [] });
  }
});

Policy.get("/get-policy-account", async (req, res) => {
  try {
    res.send({
      message: "successfully get policy account",
      success: true,
      policy_account: {
        COM: await getPolicyAccount("COM"),
        TPL: await getPolicyAccount("TPL"),
      },
    });
  } catch (err: any) {
    res.send({
      message: "SERVER:ERROR",
      success: false,
      policy_account: { COM: [], TPL: [] },
    });
  }
});

// Policy.get("/get-rates", async (req, res) => {
//   try {
//     res.send({
//       message: "successfully get rates",
//       success: true,
//       rates: {
//         COM: await getRates("COM", req.body.Account),
//         TPL: await getRates("TPL", req.body.Account),
//       },
//     });
//   } catch (err: any) {
//     res.send({
//       message: "SERVER:ERROR",
//       success: false,
//       rates: {
//         COM: [],
//         TPL: [],
//       },
//     });
//   }
// });

Policy.get("/get-rates", async (req, res) => {
  try {
    const Type = (req.query.Type as string).trim();
    const Account = (req.query.Account as string).trim();
    setTimeout(async () => {
      res.send({
        message: "successfully get rates",
        success: true,
        rates: await getRates(Type, Account),
      });
    }, 2000);
  } catch (err: any) {
    res.send({
      message: "SERVER:ERROR",
      success: false,
      rates: {
        COM: [],
        TPL: [],
      },
    });
  }
});

Policy.get("/get-mortgagee", async (req, res) => {
  try {
    res.send({
      message: "successfully get mortgagee",
      success: true,
      mortgagee: {
        COM: await getMortgagee("COM"),
        TPL: await getMortgagee("TPL"),
      },
    });
  } catch (err: any) {
    res.send({
      message: "SERVER:ERROR",
      success: false,
      mortgagee: { COM: [], TPL: [] },
    });
  }
});

Policy.get("/search-policy-account", async (req, res) => {
  try {
    const { policyAccountSearch } = req.query;
    res.send({
      message: "successfully get policy account",
      success: true,
      policy_account: await getPolicyAccount(policyAccountSearch as string),
    });
  } catch (err: any) {
    res.send({
      message: "SERVER:ERROR",
      success: false,
      policy_account: { COM: [], TPL: [] },
    });
  }
});

Policy.get("/search-rates", async (req, res) => {
  try {
    const { ratesSearch } = req.query;

    res.send({
      message: "successfully get rates",
      success: true,
      rates: await getRateType(ratesSearch as string),
    });
  } catch (err: any) {
    res.send({
      message: "SERVER:ERROR",
      success: false,
      rates: {
        COM: [],
        TPL: [],
      },
    });
  }
});

Policy.get("/search-mortgagee", async (req, res) => {
  try {
    const { mortgageeSearch } = req.query;

    res.send({
      message: "successfully get mortgagee",
      success: true,
      mortgagee: await getMortgagee(mortgageeSearch as string),
    });
  } catch (err: any) {
    res.send({
      message: "SERVER:ERROR",
      success: false,
      mortgagee: { COM: [], TPL: [] },
    });
  }
});

Policy.get("/bond-policy-account", async (req, res) => {
  try {
    res.send({
      message: "successfully get bond policy account",
      success: true,
      policy_account: {
        G02: await getPolicyAccount("G02"),
        G13: await getPolicyAccount("G13"),
        G16: await getPolicyAccount("G16"),
      },
    });
  } catch (err: any) {
    res.send({
      message: "SERVER:ERROR",
      success: false,
      policy_account: {
        G02: [],
        G13: [],
        G16: [],
      },
    });
  }
});

Policy.get("/policy-type", async (req, res) => {
  try {
    res.send({
      message: "successfully get Bonds",
      success: true,
      policy_type: await getPolicyType("Bonds"),
    });
  } catch (err: any) {
    res.send({
      message: "SERVER:ERROR",
      success: false,
      policy_type: [],
    });
  }
});

export default Policy;
