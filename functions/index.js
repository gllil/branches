const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

const setRelationship = (relationship) => {
  switch (relationship) {
    case "Aunt/Uncle":
      return "Niece/Nephew";
    case "Spouse":
      return "Spouse";
    case "Sibling":
      return "Sibling";
    case "Niece/Nephew":
      return "Aunt/Uncle";
    case "Cousin":
      return "Cousin";
    case "Parent":
      return "Children";
    case "Children":
      return "Parent";
    case "Grand Parent":
      return "Grand Children";
  }
};

exports.addHouseHold = functions.firestore
  .document("users/{userId}/household/{householdId}")
  .onCreate((snap, context) => {
    const houseHold = snap.data();
    if (!houseHold.isMember) {
      return;
    }
    admin
      .firestore()
      .collection("users")
      .doc(context.params.userId)
      .get()
      .then((doc) => {
        const userData = doc.data();
        admin
          .firestore()
          .collection("users")
          .doc(houseHold.id)
          .collection("household")
          .add({
            firstName: userData.firstName,
            lastName: userData.lastName,
            phone: userData.phone,
            email: userData.email,
            isMember: 1,
            relationship: setRelationship(houseHold.relationship),
            id: context.params.userId,
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  });
