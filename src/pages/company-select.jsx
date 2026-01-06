import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function CompanySelect() {
  const router = useRouter();
  const [company, setCompany] = useState("");

  const companies = [
    { name: "Company A", firebaseConfig: "COMPANY_A_CONFIG" },
    { name: "Company B", firebaseConfig: "COMPANY_B_CONFIG" },
    { name: "Company C", firebaseConfig: "COMPANY_C_CONFIG" }
  ];

  const handleSelect = () => {
    if (!company) {
      alert("Please select a company");
      return;
    }
    localStorage.setItem(
      "companyFirebase",
      JSON.stringify(companies.find((c) => c.name === company))
    );
    router.push("/dashboard");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-6">Select Your Company</h1>
      <select
        className="border p-2 mb-4 rounded w-64"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      >
        <option value="">Select a company</option>
        {companies.map((c) => (
          <option key={c.name} value={c.name}>
            {c.name}
          </option>
        ))}
      </select>
      <button
        className="bg-green-500 text-white py-2 px-4 rounded w-64"
        onClick={handleSelect}
      >
        Go to Dashboard
      </button>
    </div>
  );
}
