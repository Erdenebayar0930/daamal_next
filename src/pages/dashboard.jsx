import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getFirestore, collection, getDocs, setDoc, doc } from "firebase/firestore";
import { initFirebase } from "../initFirebase";
import { firebaseConfigs } from "../firebaseConfig";

export default function Dashboard() {
  const router = useRouter();
  const { company } = router.query;
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!company) return;

    const config = firebaseConfigs[company];
    if (!config) return;

    const { app } = initFirebase(config);
    const db = getFirestore(app);

    const fetchData = async () => {
      const snapshot = await getDocs(collection(db, "products")); // жишээ collection
      setData(snapshot.docs.map(doc => doc.data()));
    };

    // Шинэ doc нэмэх жишээ
    const addSampleDoc = async () => {
      await setDoc(doc(db, "products", "sampleProduct"), {
        name: "Test Product",
        price: 100
      });
    };

    addSampleDoc();
    fetchData();
  }, [company]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{company} Dashboard</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
