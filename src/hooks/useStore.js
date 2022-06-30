import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  query,
  setDoc,
} from "firebase/firestore";
import { createEffect, createSignal } from "solid-js";
import { auth, db } from "../../firebase/config";

const [user, setUser] = createSignal(null);
const [users, setUsers] = createSignal(null);
const [houseHoldMembers, setHouseHoldMembers] = createSignal(null);

const useStore = () => {
  const userRef = doc(db, "users", auth?.currentUser?.uid);
  const houseHoldRef = collection(
    db,
    "users",
    auth?.currentUser?.uid,
    "household"
  );

  createEffect(() => {
    const unSub = onSnapshot(userRef, (doc) => {
      setUser(doc.data());
    });

    return () => unSub();
  });

  createEffect(() => {
    const q = query(collection(db, "users"));
    onSnapshot(q, (querySnap) => {
      let userList = [];
      querySnap.forEach((doc) => {
        userList.push({ ...doc.data(), id: doc.id });
      });
      setUsers(userList);
    });
  });

  createEffect(() => {
    const q = query(houseHoldRef);
    onSnapshot(q, (querySnap) => {
      let houseHoldList = [];
      querySnap.forEach((member) => {
        houseHoldList.push(member.data());
      });
      setHouseHoldMembers(houseHoldList);
    });
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

  return {
    user,
    updateUserData,
    addHouseHold,
    users,
    houseHoldMembers,
  };
};

export default useStore;
