// ============================
//  Port
// ============================
process.env.PORT = process.env.PORT || 3000;

// ============================
//  Environment
// ============================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// ============================
//  Authentication SEED 
// ============================
process.env.SEED = 'hello-world';

// ============================
//  Token Expiration
// ============================
process.env.TOKEN_CADUCITY = '48h';

// ============================
//  Data base
// ============================
let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/afuentesdb';
} else {
    urlDB = process.env.MONGO_URI;
}
process.env.URLDB = urlDB;