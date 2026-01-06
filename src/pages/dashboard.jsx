import { useEffect, useState } from "react";

export default function Dashboard() {
  const [companyConfig, setCompanyConfig] = useState(null);

  useEffect(() => {
    const config = localStorage.getItem("companyFirebase");
    if (config) setCompanyConfig(JSON.parse(config));
  }, []);

  if (!companyConfig) return <p className="text-center mt-20">Loading...</p>;

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">
        {companyConfig.name} Dashboard
      </h1>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white p-4 shadow rounded">Module 1</div>
        <div className="bg-white p-4 shadow rounded">Module 2</div>
        <div className="bg-white p-4 shadow rounded">Module 3</div>
      </div>
    </div>
  );
}
