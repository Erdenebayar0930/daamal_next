import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { initFirebase } from "../initFirebase";          // ✅ зөв import

export default function CompanySelect() {
  const router = useRouter();
  const { uid } = router.query;
  const [companies, setCompanies] = useState([]); // default empty array

  useEffect(() => {
    if (!uid) return;

    const firebaseConfig = {
      apiKey: "AIzaSyCGroWVJfguuJE5bPVO5tTgVzCovBZrIMc",
      authDomain: "coach-14aee.firebaseapp.com",
      projectId: "coach-14aee",
      storageBucket: "coach-14aee.firebasestorage.app",
      messagingSenderId: "682145460799",
      appId: "1:682145460799:web:aa29016b56ac2719943e8a",
      measurementId: "G-ZS6LZW50G4"
    };

    const { app } = initFirebase(firebaseConfig);
    const db = getFirestore(app);

    const fetchCompanies = async () => {
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        // companies массив эсэхийг шалгах
        if (Array.isArray(data.companies)) {
          setCompanies(data.companies);
        } else if (typeof data.companies === "string") {
          setCompanies([data.companies]); // string бол array болгон хувиргах
        } else {
          setCompanies([]); // бусад тохиолдолд хоосон array
        }
      }
    };

    fetchCompanies();
  }, [uid]);

  const handleSelect = (company) => {
    router.push(`/dashboard?company=${encodeURIComponent(company)}`);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-10 rounded-2xl shadow-xl w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">Компаниа сонгоно уу</h1>
        <div className="flex flex-col space-y-4">
          {companies.length > 0 ? (
            companies.map((company) => (
              <button
                key={company}
                onClick={() => handleSelect(company)}
                className="bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600"
              >
                {company}
              </button>
            ))
          ) : (
            <p className="text-gray-500 text-center">No companies available</p>
          )}
        </div>
      </div>
    </div>
  );
}
