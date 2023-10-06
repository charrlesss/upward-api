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
