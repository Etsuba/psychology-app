import React, { useEffect, useState } from "react";
import API from "../api/axiosConfig";

const WeeklyReport = () => {
  const [report, setReport] = useState(null);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const res = await API.get("/emotions/weekly/advice");
        setReport(res.data);
      } catch (err) {
        console.error("Error fetching weekly report:", err);
      }
    };
    fetchReport();
  }, []);

  if (!report) return <p className="text-center mt-10">Loading weekly report...</p>;

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold text-center mb-4">Weekly Emotion Report</h2>

        {/* Daily emotions with day names + emojis */}
        <ul className="space-y-2">
          {report.weeklyEntries.map((entry, idx) => (
            <li key={idx} className="flex justify-between border-b py-1">
              <span className="font-medium">{entry.day}</span>
              <span>{entry.emoji} {entry.emotion}</span>
            </li>
          ))}
        </ul>

        {/* Advice */}
        <div className="mt-4 p-3 bg-blue-50 rounded">
          <h3 className="font-semibold">Advice for You:</h3>
          <p>{report.advice}</p>
        </div>
      </div>
    </div>
  );
};

export default WeeklyReport;