import fs from 'fs';

const firestoreKey = JSON.parse(fs.readFileSync('C:/Users/Gastón Rojas/Desktop/Backend/firestoreKey.json', 'utf-8'));
const mongoConectionStr = JSON.parse(fs.readFileSync('C:/Users/Gastón Rojas/Desktop/Backend/mongo.json', 'utf-8'));

const config = {
  dbPath: './public/db',
  firestore: firestoreKey,
  mongodb: mongoConectionStr,
  env: 'firebase',
};

export default config;
