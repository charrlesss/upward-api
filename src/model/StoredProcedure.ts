import { PrismaClient } from "@prisma/client";
import { hashSync } from "bcrypt";

const prisma = new PrismaClient();

export function getYear() {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  return (currentYear % 100).toString();
}

export function getMonth() {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  return currentMonth.toString().padStart(2, "0");
}

export async function createIdSequence() {
  const user = await prisma.id_Sequence.createMany({
    data: [
      {
        last_count: "000",
        month: getMonth(),
        type: "entry client",
        year: getYear(),
      },
      {
        last_count: "000",
        month: getMonth(),
        type: "entry employee",
        year: getYear(),
      },
      {
        last_count: "000",
        month: getMonth(),
        type: "entry agent",
        year: getYear(),
      },
      {
        last_count: "000",
        month: getMonth(),
        type: "entry fixed assets",
        year: getYear(),
      },
      {
        last_count: "000",
        month: getMonth(),
        type: "entry supplier",
        year: getYear(),
      },
      {
        last_count: "000",
        month: getMonth(),
        type: "entry others",
        year: getYear(),
      },
    ],
  });
  console.log("new user : ", user);
}

export async function IDGenerator(sign: string, type: string) {
  const lastSeq = await prisma.id_Sequence.findFirst({ where: { type } });
  const newCount = incrementLastCount(lastSeq?.last_count as string);
  const newMonth = getMonth();
  const newYear = getYear();
  return `${sign}-${newMonth}${newYear}-${newCount}`;
}
export async function UpdateId(
  type: string,
  newCount: string,
  newMonth: string,
  newYear: string
) {
  await prisma.id_Sequence.update({
    where: {
      type,
    },
    data: {
      last_count: {
        set: newCount,
      },
      month: {
        set: newMonth,
      },
      year: {
        set: newYear,
      },
    },
  });
}

export function getAcronym(inputText: string) {
  const exclusionList = ["and", "the", "in", "of", "for", "with"];
  inputText = inputText.trim().toLowerCase();
  const words = inputText.split(" ");
  let acronym = "";
  for (const word of words) {
    if (!exclusionList.includes(word)) {
      acronym += word[0];
    }
  }
  return acronym.toUpperCase();
}

export function incrementLastCount(str: string) {
  let num = parseInt(str, 10);
  num++;
  return num.toString().padStart(str.length, "0");
}

export async function testJoin() {
  return await prisma.entry_Client.findMany({
    include: {
      contact_details: true,
    },
    where: {
      entry_client_id: "b4f346b7-c007-434e-9180-a24a0ca7ed15",
    },
  });
}

export async function creatSampleUser() {
  const password1 = hashSync("charles", 12);
  const password2 = hashSync("buboy", 12);
  const user = await prisma.users.createMany({
    data: [
      {
        AccountType: "ACCOUNTING",
        Password: password1,
        Username: "charles",
      },
      {
        AccountType: "ACCOUNTING",
        Password: password2,
        Username: "buboy",
      },
    ],
  });
  console.log("new user : ", user);
}

export async function creatSampleSubAccount() {
  const data = [
    { Acronym: "All", ShortName: "All", Description: "A" },
    {
      Acronym: " BO",
      ShortName: "Baguio Office",
      Description: "Baguio Office",
    },
    {
      Acronym: " CO",
      ShortName: "Calasiao Office",
      Description: "Calasiao Office",
    },
    { Acronym: "CSB", ShortName: "CSB", Description: "CASH BOND" },
    { Acronym: " EO", ShortName: "Edsa Office", Description: "" },
    { Acronym: " EV", ShortName: "EV", Description: "EDEN VILLASAN" },
    { Acronym: " HO", ShortName: "Head Office", Description: "H" },
    { Acronym: " IO", ShortName: "ISABELA OFFICE", Description: "" },
    { Acronym: "MCC", ShortName: "MACHINE COMPLETE CORP.", Description: "MCC" },
    { Acronym: " ML", ShortName: "ML", Description: "MALALALALALALA" },
    {
      Acronym: " SC",
      ShortName: "SANCARLOS OFFICE",
      Description: "SANCARLOS OFFICE",
    },
    { Acronym: "TAR", ShortName: "TAR", Description: "TARLAC OFFICE" },
    {
      Acronym: " TO",
      ShortName: "Tarlac Office",
      Description: "Tarlac Office",
    },
    { Acronym: "UIA", ShortName: "UPWARD INSURANCE CORP.", Description: "UIA" },
    {
      Acronym: " UO",
      ShortName: "Urdaneta Office",
      Description: "Urdaneta Office",
    },
  ];
  const subaccount = await prisma.sub_Account.createMany({
    data,
  });
  console.log("new subaccount : ", subaccount);
}

export async function createSublineLine() {
  const line = await prisma.subline_line.createMany({
    data: [
      {
        Line: "Vehicle",
      },
      {
        Line: "Fire",
      },
      {
        Line: "Marine",
      },
      {
        Line: "Bonds",
      },
      {
        Line: "MSPR",
      },
      {
        Line: "PA",
      },
      {
        Line: "CGL",
      },
    ],
  });

  console.log("new user : ", line);
}

export async function createPrefix() {
  await prisma.ctplprefix.createMany({
    data: [
      { prefixName: "CV" },
      { prefixName: "PC" },
      { prefixName: "MC" },
      { prefixName: "TRT" },
    ],
  });
}
export async function createCTPLType() {
  await prisma.ctpltype.createMany({
    data: [
      { typeName: "ligth" },
      { typeName: "heavy" },
      { typeName: "trailer" },
      { typeName: "motorcycle" },
    ],
  });
}
export async function getUserById(UserId: string) {
  return await prisma.users.findUnique({
    where: { UserId },
  });
}
interface PolicyAccountType {
  Account: string;
  Description: string;
  AccountCode: string;
  COM: boolean;
  TPL: boolean;
  MAR: boolean;
  FIRE: boolean;
  G02: boolean;
  G13: boolean;
  G16: boolean;
  MSPR: boolean;
  PA: boolean;
  CGL: boolean;
  Inactive: boolean;
}
export async function createPolicyAccount() {
  const sss = [
    { Account: "Alpha", AccountCode: "Alpha Insurance", Description: "ALPHA" },
    {
      Account: "Centennial",
      AccountCode: "Centennial Guarantee Assurance Corp.",
      Description: "CGAC",
    },
    {
      Account: "Monarch",
      AccountCode: "Monarch Insurance Co.",
      Description: "MIC",
    },
    {
      Account: "Plaridel",
      AccountCode: "Plaridel Surety & Insurance Co.",
      Description: "PSIC",
    },
    { Account: "PLife", AccountCode: "Pru-Life", Description: "PLIFE" },
    { Account: "Revest", AccountCode: "Revest Insurance", Description: "REVI" },
    {
      Account: "SecPacific",
      AccountCode: "Security Pacific Assurance Corp.",
      Description: "SPAC",
    },
    {
      Account: "Sici",
      AccountCode: "Stronghold Insurance Company, Inc.",
      Description: "SICI",
    },
    { Account: "SLife", AccountCode: "Sun Life", Description: "SLIFE" },
    {
      Account: "Vilcar",
      AccountCode: "Vilcar Insurance",
      Description: "VILCA",
    },
    {
      Account: "Commonwealth",
      AccountCode: "Insuran	Commonwealth Insurance Company",
      Description: "CIC",
    },
    {
      Account: "TPISC",
      AccountCode: "THE PREMIER INSURANCE & SURETY CORPORATION",
      Description: "TPISC",
    },
    { Account: "MILESTONE GUARANTEE", AccountCode: "", Description: "MGAC" },
    { Account: "ML", AccountCode: "ML", Description: "ML" },
    { Account: "LIBERTY INSURANCE CO", AccountCode: "", Description: "LIC" },
    {
      Account: "FEDERAL PHOENIX ",
      AccountCode: "FEDERAL PHENIX ASSURANCE CO., INC.",
      Description: "FPACI",
    },
    { Account: "LIBERTY - FLOMEN", AccountCode: "", Description: "CTPL" },
    {
      Account: "FLOMEN-LIC",
      AccountCode: "FLOMEN-Liberty Insurance Corp",
      Description: "TPL",
    },
    { Account: "Liberty", AccountCode: "Liberty TPL", Description: "LIB" },
    {
      Account: "TP MILESTONE",
      AccountCode: "TEMPORARY POLICY-MILESTONE GUARANTY",
      Description: "TP",
    },
    {
      Account: "BETHEL",
      AccountCode: "BETHEL INSURANCE",
      Description: "BETH1",
    },
  ];

  const ff: Array<PolicyAccountType> = sss.map((d: any) => {
    d = {
      ...d,
      CGL: false,
      COM: false,
      FIRE: false,
      G02: false,
      G13: false,
      G16: false,
      Inactive: false,
      MAR: false,
      MSPR: false,
      PA: false,
      TPL: false,
    };
    return d;
  });
  return await prisma.policy_account.createMany({
    data: ff,
  });
}

export async function creatCTPLRegistration() {
  return await prisma.ctplregistration.createMany({
    data: [
      {
        Prefix: "CV",
        NumSeriesFrom: 2999150,
        NumSeriesTo: 2999200,
        Cost:' 937.31',
        CreatedBy: "ryanm",
      },
      {
        Prefix: "CV",
        NumSeriesFrom: 10248401,
        NumSeriesTo: 10248500,
        Cost:' 937.31',
        CreatedBy: "ryanm",
      },
      {
        Prefix: "MC",
        NumSeriesFrom: 4981812,
        NumSeriesTo: 4981900,
        Cost: '309.72',
        CreatedBy: "ryanm",
      },
      {
        Prefix: "PC",
        NumSeriesFrom: 10380265,
        NumSeriesTo: 10380400,
        Cost: '519.92',
        CreatedBy: "ryanm",
      },
      {
        Prefix: "TRT",
        NumSeriesFrom: 2713264,
        NumSeriesTo: 2713300,
        Cost: '309.72',
        CreatedBy: "ryanm",
      },
      {
        Prefix: "TRT",
        NumSeriesFrom: 10305401,
        NumSeriesTo: 10305500,
        Cost: '309.72',
        CreatedBy: "ryanm",
      },
      {
        Prefix: "PC",
        NumSeriesFrom: 10055351,
        NumSeriesTo: 10055400,
        Cost: '519.92',
        CreatedBy: "jewel",
      },
      {
        Prefix: "PC",
        NumSeriesFrom: 10510301,
        NumSeriesTo: 10510400,
        Cost: '519.92',
        CreatedBy: "jewel",
      },
      {
        Prefix: "PC",
        NumSeriesFrom: 10522057,
        NumSeriesTo: 10522081,
        Cost: '519.92',
        CreatedBy: "jewel",
      },
      {
        Prefix: "CV",
        NumSeriesFrom: 10548401,
        NumSeriesTo: 10548500,
        Cost:' 937.31',
        CreatedBy: "jewel",
      },
      {
        Prefix: "PC",
        NumSeriesFrom: 10544176,
        NumSeriesTo: 10544200,
        Cost: '519.92',
        CreatedBy: "jewel",
      },
      {
        Prefix: "PC",
        NumSeriesFrom: 10822001,
        NumSeriesTo: 10822100,
        Cost: '519.92',
        CreatedBy: "jewel",
      },
      {
        Prefix: "PC",
        NumSeriesFrom: 10822101,
        NumSeriesTo: 10822200,
        Cost: '519.92',
        CreatedBy: "jewel",
      },
      {
        Prefix: "PC",
        NumSeriesFrom: 10910701,
        NumSeriesTo: 10910800,
        Cost: '519.92',
        CreatedBy: "jewel",
      },
      {
        Prefix: "PC",
        NumSeriesFrom: 10910801,
        NumSeriesTo: 10910900,
        Cost: '519.92',
        CreatedBy: "jewel",
      },
      {
        Prefix: "PC",
        NumSeriesFrom: 11048801,
        NumSeriesTo: 11048900,
        Cost: '519.92',
        CreatedBy: "JMANUEL",
      },
      {
        Prefix: "PC",
        NumSeriesFrom: 11048901,
        NumSeriesTo: 11049000,
        Cost: '519.92',
        CreatedBy: "JMANUEL",
      },
      {
        Prefix: "PC",
        NumSeriesFrom: 11139001,
        NumSeriesTo: 11139100,
        Cost: '519.92',
        CreatedBy: "jewel",
      },
      {
        Prefix: "PC",
        NumSeriesFrom: 11139101,
        NumSeriesTo: 11139200,
        Cost: '519.92',
        CreatedBy: "jewel",
      },
      {
        Prefix: "PC",
        NumSeriesFrom: 11485901,
        NumSeriesTo: 11486000,
        Cost: '519.92',
        CreatedBy: "jewel",
      },
      {
        Prefix: "PC",
        NumSeriesFrom: 11486001,
        NumSeriesTo: 11486100,
        Cost: '519.92',
        CreatedBy: "jewel",
      },
      {
        Prefix: "PC",
        NumSeriesFrom: 11571201,
        NumSeriesTo: 11571300,
        Cost: '519.92',
        CreatedBy: "jewel",
      },
      {
        Prefix: "PC",
        NumSeriesFrom: 11571301,
        NumSeriesTo: 11571400,
        Cost: '519.92',
        CreatedBy: "jewel",
      },
      {
        Prefix: "PC",
        NumSeriesFrom: 11722101,
        NumSeriesTo: 11722200,
        Cost: '519.92',
        CreatedBy: "jewel",
      },
      {
        Prefix: "CV",
        NumSeriesFrom: 11123701,
        NumSeriesTo: 11123800,
        Cost:' 937.31',
        CreatedBy: "jewel",
      },
      {
        Prefix: "PC",
        NumSeriesFrom: 11722201,
        NumSeriesTo: 11722300,
        Cost: '519.92',
        CreatedBy: "jewel",
      },
      {
        Prefix: "	",
        NumSeriesFrom: 0,
        NumSeriesTo: 0,
        Cost: '0.0',
        CreatedBy: "jewel",
      },
      {
        Prefix: "E",
        NumSeriesFrom: 200500,
        NumSeriesTo: 200599,
        Cost: '519.92',
        CreatedBy: "jewel",
      },
      {
        Prefix: "E",
        NumSeriesFrom: 227800,
        NumSeriesTo: 227899,
        Cost: '519.92',
        CreatedBy: "jewel",
      },
      {
        Prefix: "E",
        NumSeriesFrom: 227900,
        NumSeriesTo: 227999,
        Cost: '519.92',
        CreatedBy: "jewel",
      },
      {
        Prefix: "E",
        NumSeriesFrom: 870550,
        NumSeriesTo: 870649,
        Cost: '519.92',
        CreatedBy: "jewel",
      },
      {
        Prefix: "E",
        NumSeriesFrom: 871950,
        NumSeriesTo: 871999,
        Cost: '519.92',
        CreatedBy: "jewel",
      },
      {
        Prefix: "E",
        NumSeriesFrom: 872500,
        NumSeriesTo: 872549,
        Cost: '519.92',
        CreatedBy: "jewel",
      },
      {
        Prefix: "E",
        NumSeriesFrom: 872550,
        NumSeriesTo: 872649,
        Cost: '519.92',
        CreatedBy: "jewel",
      },
      {
        Prefix: "F",
        NumSeriesFrom: 471500,
        NumSeriesTo: 471599,
        Cost: '519.92',
        CreatedBy: "jewel",
      },
      {
        Prefix: "E",
        NumSeriesFrom: 877444,
        NumSeriesTo: 877445,
        Cost: '0.0',
        CreatedBy: "jewel",
      },
      {
        Prefix: "F",
        NumSeriesFrom: 457750,
        NumSeriesTo: 457799,
        Cost: '519.92',
        CreatedBy: "jewel",
      },
      {
        Prefix: "F",
        NumSeriesFrom: 457800,
        NumSeriesTo: 457849,
        Cost: '519.92',
        CreatedBy: "jewel",
      },
      {
        Prefix: "G",
        NumSeriesFrom: 135000,
        NumSeriesTo: 135099,
        Cost: '519.92',
        CreatedBy: "jewel",
      },
      {
        Prefix: "F",
        NumSeriesFrom: 670250,
        NumSeriesTo: 670349,
        Cost:' 937.31',
        CreatedBy: "jewel",
      },
      {
        Prefix: "G",
        NumSeriesFrom: 160350,
        NumSeriesTo: 160449,
        Cost: '519.92',
        CreatedBy: "jewel",
      },
      {
        Prefix: "G",
        NumSeriesFrom: 410550,
        NumSeriesTo: 410649,
        Cost: '519.92',
        CreatedBy: "jewel",
      },
      {
        Prefix: "G",
        NumSeriesFrom: 438750,
        NumSeriesTo: 438849,
        Cost: '519.92',
        CreatedBy: "jewel",
      },
      {
        Prefix: "G",
        NumSeriesFrom: 624400,
        NumSeriesTo: 624499,
        Cost: '519.92',
        CreatedBy: "jewel",
      },
      {
        Prefix: "	",
        NumSeriesFrom: 711601,
        NumSeriesTo: 711700,
        Cost: '519.92',
        CreatedBy: "jewel",
      },
    ]
  });
}


