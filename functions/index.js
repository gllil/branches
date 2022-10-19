const functions = require("firebase-functions");
const admin = require("firebase-admin");
const sgMail = require("@sendgrid/mail");

admin.initializeApp();

sgMail.setApiKey(functions.config().sendgridemail.apikey);

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
    console.log(memberData);
    const msg = {
      to: memberData.headOfHouseHold.email, // Change to your recipient
      from: "No Reply <noreply@mybranches.app>", // Change to your verified sender
      subject: "Join Household Request",
      // text: "and easy to do anywhere, even with Node.js",
      html: `<div style="display: flex; justify-content: center">
      <h1>This is a Test</h1>
    </div>
    <div style="display: flex; justify-content: center">
    <h3>${memberData?.firstName} ${
        memberData?.lastName
      } wants to join your household!</h3>
    <a href="${
      process.env.FUNCTIONS_EMULATOR === true
        ? "http://localhost:3000/household"
        : "https://branches-5434a.web.app/household"
    }">Approve Request</a>
    </div>`,
    };
    if (memberData.relationship) {
      return sgMail
        .send(msg)
        .then(() => {
          console.log("Email sent");
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      return null;
    }
  });
