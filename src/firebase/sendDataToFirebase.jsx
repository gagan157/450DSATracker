import {getDatabase, ref, child, get ,push, update  } from "firebase/database";
import {database} from '../firebase/firebaseConfig'


export default async function ReadDataFirebase() {
  const dbRef = ref(getDatabase());
  return await get(child(dbRef, `dsaQuestions/data`)).then((snapshot) => {
    if (snapshot.exists()) {
      return snapshot.val()
    } else {
      console.log("No data available");
    }
  }).catch((error) => {
    console.error(error);
  });
}

export function UpdateDataFirebase(updatedData) {
  const db = getDatabase();
  const updates = {};
  updates['/dsaQuestions/data/'+updatedData.cardidx +'/'+updatedData.name+ '/'+ (updatedData.id-1) +'/checked' ] = updatedData.checked;
  return update(ref(db), updates);
}