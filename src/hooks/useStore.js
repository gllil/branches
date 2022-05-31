import {
  arrayUnion,
  collection,
  doc,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { createEffect, createSignal } from "solid-js";
import { auth, db } from "../../firebase/config";

const [user, setUser] = createSignal(null);
const [users, setUsers] = createSignal(null);

const useStore = () => {
  const userRef = doc(db, "users", auth?.currentUser?.uid);
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

  const updateUserData = async (userData) => {
    const res = await setDoc(userRef, userData, { merge: true });
    return res;
  };

  const addHouseHold = async (houseHoldMember) => {
    const res = await updateDoc(userRef, {
      household: arrayUnion(houseHoldMember),
    });
    return res;
  };

  return {
    user,
    updateUserData,
    addHouseHold,
    users,
  };
};

export default useStore;
