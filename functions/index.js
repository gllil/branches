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

exports.createNewHouseHold = functions.firestore
  .document("households/{householdId}")
  .onCreate(async (snap, context) => {
    const householdData = snap.data();
    const householdId = snap.id;
    return admin
      .firestore()
      .collection("users")
      .doc(householdData.headOfHousehold)
      .get()
      .then((doc) => {
        const user = doc.data();
        admin
          .firestore()
          .collection("users")
          .doc(householdData.headOfHousehold)
          .set(
            {
              household: context.params.householdId,
              headOfHouseHold: true,
            },
            { merge: true }
          )
          .then(() => {
            admin
              .firestore()
              .collection("households")
              .doc(householdId)
              .collection("members")
              .add({
                id: householdData.headOfHousehold,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                phone: user.phone,
              })
              .catch((err) => console.log(err));
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  });
exports.joinNewHousehold = functions.firestore
  .document("households/{householdId}/members/{membersId}")
  .onCreate(async (snap, context) => {
    const memberData = snap.data();
    
    if (memberData.relationship) {
      return admin
            .firestore()
            .collection("users")
            .doc(memberData.id)
            .set(
              {
                household: context.params.householdId,
              },
              { merge: true }
            )
            .catch((err) => console.log(err));
    } else {
      return null
    }
    
  });
