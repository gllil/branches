import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { createEffect, createSignal } from "solid-js";
import { auth, db } from "../../firebase/config";

const [user, setUser] = createSignal(null);
const [users, setUsers] = createSignal(null);
const [householdDetails, setHouseholdDetails] = createSignal(null);
const [houseHoldMembers, setHouseHoldMembers] = createSignal(null);
const [activeButton, setActiveButton] = createSignal(1);
const [headsOfHouseHold, setHeadsOfHouseHold] = createSignal(null);

const useStore = () => {
  const userRef = doc(db, "users", auth?.currentUser?.uid);
  const houseHoldRef = collection(db, "households");
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

  createEffect(() => {
    const unSub = onSnapshot(userRef, (doc) => {
      setUser({ ...doc.data(), id: doc.id });
    });

    return () => unSub();
  });

  createEffect(() => {
    const q = query(collection(db, "users"));
    const unSub = onSnapshot(q, (querySnap) => {
      let userList = [];
      querySnap.forEach((doc) => {
        userList.push(doc.data());
      });
      setUsers(userList);
    });
    return () => unSub();
  });
  createEffect(() => {
    const q = query(
      collection(db, "users"),
      where("headOfHouseHold", "==", true)
    );
    const unSub = onSnapshot(q, (querySnap) => {
      let userList = [];
      querySnap.forEach((doc) => {
        userList.push(doc.data());
      });
      setHeadsOfHouseHold(userList);
    });
    return () => unSub();
  });

  createEffect(() => {
    if (user()?.household) {
      const houseHoldMemberRef = collection(
        db,
        "households",
        user().household,
        "members"
      );
      const q = query(houseHoldMemberRef);
      onSnapshot(q, (querySnap) => {
        let houseHoldList = [];
        querySnap.forEach((member) => {
          houseHoldList.push(member.data());
        });
        setHouseHoldMembers(houseHoldList);
      });

      return () => unSub();
    }
  });

  createEffect(() => {
    if (user()?.household) {
      const houseHoldMemberRef = doc(db, "households", user().household);

      onSnapshot(houseHoldMemberRef, (doc) => {
        setHouseholdDetails(doc.data());
      });

      return () => unSub();
    }
  });

  const updateUserData = async (userData) => {
    const res = await setDoc(userRef, userData, { merge: true });
    return res;
  };

  const addHouseHold = async (houseHoldMember) => {
    const user1 = await addDoc(houseHoldRef, houseHoldMember, {
      merge: true,
    });
    return user1;
  };

  const joinHouseHold = async (householdId, newMem, relationship) => {
    const houseHoldMemberRef = collection(
      db,
      "households",
      householdId,
      "members"
    );
    const newMember = await addDoc(
      houseHoldMemberRef,
      {
        id: newMem.id,
        firstName: newMem.firstName,
        lastName: newMem.lastName,
        email: newMem.email,
        phone: newMem.phone,
        relationship: setRelationship(relationship),
      },
      { merge: true }
    );
    return newMember;
  };

  const addHouseHoldMember = async (householdId, userId) => {
    const houseHoldMemberRef = doc(
      db,
      "households",
      householdId,
      "members",
      userId
    );

    const member = await setDoc(houseHoldMemberRef, user(), { merge: true });
    return member;
  };

  return {
    user,
    updateUserData,
    addHouseHold,
    users,
    houseHoldMembers,
    addHouseHoldMember,
    activeButton,
    setActiveButton,
    householdDetails,
    headsOfHouseHold,
    joinHouseHold,
  };
};

export default useStore;
