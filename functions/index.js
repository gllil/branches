const functions = require("firebase-functions");
const admin = require("firebase-admin");
const cors = require("cors")({ origin: true });
admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
exports.addUserAddress = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    const userId = req.query.userId;
    const data = {
      address: {
        address1: req.query.address1,
        address2: req.query.address2,
        city: req.query.city,
        state: req.query.state,
        zip: req.query.zip,
      },
    };
    admin
      .auth()
      .admin.firestore()
      .doc(userId)
      .set(data, { merge: true })
      .then((result) => {
        console.log(result);
        return result;
      })
      .catch((err) => {
        return err;
      });
  });
});
