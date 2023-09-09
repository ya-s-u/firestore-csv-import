import { Command } from "commander";
import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { readFileSync } from "fs";
import { parse } from "csv-parse/sync";

const program = new Command();

program.argument("<path>", "csv file path");
program.requiredOption(
  "-c, --collection <collection>",
  "firestore collection name"
);
program.requiredOption("-p, --path <path>", "firebase certification file path");
program.option("-k, --key <key>", "firestore id field");
program.option(
  "-t, --timestamp <timestamp>",
  "firestore timestamp field",
  false
);
program.option("-i, --ignore <ignore>", "ignore fields *commma separated");
program.parse();

const [csvPath] = program.args;
const {
  collection: collectionName,
  path: keyPath,
  key,
  timestamp,
  ignore,
} = program.opts();

initializeApp({
  credential: cert(JSON.parse(readFileSync(keyPath).toString())),
});

const file = readFileSync(csvPath);
const csv = parse(file, { cast: true, columns: true });

const bulkWriter = getFirestore().bulkWriter();
const collection = getFirestore().collection(collectionName);
const ignoreFields = ignore ? ignore.split(",") : [];

csv.forEach((record: { [field: string]: any }) => {
  const ref = key ? collection.doc(`${record[key]}`) : collection.doc();
  const filtered = Object.fromEntries(
    Object.entries(record).filter(([key]) => !ignoreFields.includes(key))
  );
  const data = timestamp ? { ...filtered, [timestamp]: new Date() } : filtered;
  bulkWriter.create(ref, data);
});

await bulkWriter.close();

console.info(`✅ Write ${csv.length} records in ${collectionName}`);
