import React, { useState, useEffect } from "react";
import { Line, Bar } from "react-chartjs-2";
import { Link } from "react-router-dom";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import NavBar from "../components/NavBar";
import { getPartners } from "../utils/supabase"; // Corrected import path
import { processPartnershipDataForDashboard } from "../features/partnership/utils/partnershipUtils"; // Import the processing function

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  // State for time filter (Weekly, Monthly, Yearly, All Times)
  const [timeFilter, setTimeFilter] = useState("Monthly");
  // State for college filter
  const [collegeFilter, setCollegeFilter] = useState("All Colleges");
  const [allPartners, setAllPartners] = useState([]); // Store all fetched partners
  const [processedData, setProcessedData] = useState({
    collegeStats: {},
    timeSeriesData: { active: [], expired: [], expiringSoon: [] },
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // List of AAU colleges (can be dynamic in future if needed)
  const colleges = [
    "All Colleges",
    "College of Business and Economics",
    "College of Social Science, Arts and Humanities",
    "College of Veterinary Medicine and Agriculture",
    "School of Law",
    "College of Technology and Built Environment",
    "College of Natural and Computational Sciences",
    "College of Education and Language Studies",
    "College of Health Science",
  ];

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        setLoading(true);
        const { data, error: fetchError } = await getPartners(); // Renamed error to avoid conflict
        if (fetchError) {
          throw fetchError;
        }
        setAllPartners(data || []);
        setError(null);
      } catch (err) {
        console.error("Error fetching partners:", err);
        setError(err.message || "Failed to fetch partners");
        setAllPartners([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPartners();
  }, []);

  useEffect(() => {
    if (allPartners.length > 0) {
      const processed = processPartnershipDataForDashboard(
        allPartners,
        colleges
      );
      setProcessedData(processed);
    }
    // If allPartners is empty (e.g. after an error or initial load),
    // set processedData to a default empty structure to avoid errors in rendering.
    else {
      setProcessedData({
        collegeStats: colleges.reduce((acc, college) => {
          acc[college] = {
            active: 0,
            expiringSoon: 0,
            expired: 0,
            prospect: 0,
            total: 0,
          };
          return acc;
        }, {}),
        timeSeriesData: {
          active: Array(12).fill(0),
          expired: Array(12).fill(0),
          expiringSoon: Array(12).fill(0),
        },
      });
    }
  }, [allPartners, colleges]);

  // Data for the Bar Chart (Units Per Status)
  const selectedCollegeStats = processedData.collegeStats[collegeFilter] || {
    active: 0,
    expiringSoon: 0,
    expired: 0,
    prospect: 0,
    total: 0,
  };

  const barData = {
    labels: ["Active Partners", "Expiring Soon", "Expired", "Prospect"],
    datasets: [
      {
        label: "Units",
        data: [
          selectedCollegeStats.active,
          selectedCollegeStats.expiringsoon, // Note: key from processPartnershipDataForDashboard is lowercase and no space
          selectedCollegeStats.expired,
          selectedCollegeStats.prospect,
        ],
        backgroundColor: ["#1F2A44", "#3B82F6", "#93C5FD", "#D1D5DB"],
        borderRadius: 10,
      },
    ],
  };

  const barOptions = {
    indexAxis: "y",
    scales: {
      x: { beginAtZero: true, max: 200, ticks: { stepSize: 50 } },
      y: { ticks: { font: { size: 14 } } },
    },
    plugins: { legend: { display: false } },
  };

  // Mock line chart data for colleges
  const collegeLineData = {
    "All Colleges": {
      active: [30, 40, 35, 50, 45, 60, 55, 70, 65, 60, 50, 45],
      expired: [10, 15, 20, 25, 30, 35, 30, 25, 20, 15, 10, 5],
      expiringSoon: [5, 10, 15, 20, 25, 30, 35, 30, 25, 20, 15, 10],
    },
    "College of Business and Economics": {
      active: [15, 20, 18, 25, 22, 30, 28, 35, 32, 30, 25, 22],
      expired: [2, 3, 4, 5, 6, 7, 6, 5, 4, 3, 2, 1],
      expiringSoon: [3, 4, 5, 6, 7, 8, 7, 6, 5, 4, 3, 2],
    },
    "College of Social Science, Arts and Humanities": {
      active: [12, 15, 14, 20, 18, 25, 22, 30, 28, 25, 20, 18],
      expired: [2, 3, 4, 5, 6, 7, 6, 5, 4, 3, 2, 1],
      expiringSoon: [2, 3, 4, 5, 6, 7, 6, 5, 4, 3, 2, 1],
    },
    "College of Veterinary Medicine and Agriculture": {
      active: [3, 4, 3, 5, 4, 6, 5, 7, 6, 5, 4, 3],
      expired: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      expiringSoon: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    },
    "School of Law": {
      active: [6, 8, 7, 10, 9, 12, 11, 14, 13, 12, 10, 8],
      expired: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      expiringSoon: [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1],
    },
    "College of Technology and Built Environment": {
      active: [10, 12, 11, 15, 13, 18, 16, 20, 18, 16, 14, 12],
      expired: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      expiringSoon: [2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2],
    },
    "College of Natural and Computational Sciences": {
      active: [30, 35, 32, 50, 45, 60, 55, 70, 65, 60, 50, 45],
      expired: [5, 6, 7, 8, 9, 10, 9, 8, 7, 6, 5, 4],
      expiringSoon: [6, 7, 8, 9, 10, 11, 10, 9, 8, 7, 6, 5],
    },
    "College of Education and Language Studies": {
      active: [7, 9, 8, 12, 10, 14, 13, 16, 15, 14, 12, 10],
      expired: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      expiringSoon: [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1],
    },
    "College of Health Science": {
      active: [20, 25, 22, 30, 28, 35, 32, 40, 38, 35, 30, 28],
      expired: [2, 3, 4, 5, 6, 7, 6, 5, 4, 3, 2, 1],
      expiringSoon: [4, 5, 6, 7, 8, 9, 8, 7, 6, 5, 4, 3],
    },
  };

  const lineData = {
    labels: [
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MAY",
      "JUN",
      "JUL",
      "AUG",
      "SEP",
      "OCT",
      "NOV",
      "DEC",
    ],
    datasets: [
      {
        label: "Active",
        data: processedData.timeSeriesData.active,
        borderColor: "#3B82F6",
        fill: false,
      },
      {
        label: "Expired",
        data: processedData.timeSeriesData.expired,
        borderColor: "#A855F7",
        fill: false,
      },
      {
        label: "Expiring Soon",
        data: processedData.timeSeriesData.expiringSoon,
        borderColor: "#F59E0B",
        fill: false,
      },
    ],
  };

  const lineOptions = {
    scales: {
      y: {
        beginAtZero: true,
        max:
          Math.max(
            ...(processedData.timeSeriesData.active || []),
            ...(processedData.timeSeriesData.expired || []),
            ...(processedData.timeSeriesData.expiringSoon || []),
            10
          ) + 5,
        ticks: { stepSize: 10 },
      }, // Dynamic max with fallback for empty arrays
      x: { ticks: { font: { size: 12 } } },
    },
    plugins: { legend: { position: "bottom" } },
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading dashboard...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <NavBar />

      {/* Main Content */}
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Partnership Statistics
          </h1>
          <div className="flex space-x-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search Partners"
                className="pl-4 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="absolute right-3 top-2.5 text-gray-400">×</span>
            </div>
            <select
              value={collegeFilter}
              onChange={(e) => setCollegeFilter(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            >
              {colleges.map((college) => (
                <option key={college} value={college}>
                  {college}
                </option>
              ))}
            </select>
            <Link
              to="/add-partnership"
              className="bg-[#004165] hover:bg-[#00334e] text-white rounded-full px-6 py-2 flex items-center transition-colors"
            >
              + New Partner
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Total Partners */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-4xl font-bold text-gray-800">
              {selectedCollegeStats.total} Partners
            </h2>
            <p className="text-gray-600 mt-2">Units Per Status</p>
            <div className="mt-4">
              <Bar data={barData} options={barOptions} height={100} />
            </div>
          </div>

          {/* Active Partners and Pending Applications */}
          <div className="flex flex-col space-y-6">
            {/* Active Partners */}
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h2 className="text-3xl font-bold text-gray-800">
                {selectedCollegeStats.active} Partners
              </h2>
              <div className="flex justify-between mt-2">
                <p className="text-gray-600">Active Partners</p>
                {/* Placeholder for percentage change - requires historical data */}
                {/* <p className="text-green-500 font-semibold">+15%</p> */}
              </div>
              {/* Simplified display for ongoing/closing - can be enhanced */}
              {/* <div className="flex justify-between text-sm text-gray-500 mt-2">
                <span>
                  Ongoing: {Math.round(selectedCollegeStats.active * 0.9)}
                </span>
                <span>
                  Closing: {Math.round(selectedCollegeStats.active * 0.1)}
                </span>
              </div> */}
            </div>

            {/* Pending Applications / Prospects */}
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h2 className="text-3xl font-bold text-gray-800">
                {selectedCollegeStats.prospect}
              </h2>
              <div className="flex justify-between mt-2">
                <p className="text-gray-600">Prospects</p>
                {/* Placeholder for percentage change */}
                {/* <p className="text-red-500 font-semibold">-5%</p> */}
              </div>
              <div className="flex justify-between text-sm text-gray-500 mt-2">
                <span>Total Partners: {selectedCollegeStats.total}</span>
                {/* Placeholder for deals - requires more data */}
                {/* <span>
                  Deals: {Math.round(selectedCollegeStats.expiringsoon * 0.5)}
                </span> */}
              </div>
            </div>
          </div>

          {/* Graph Description and Expiring/Expired */}
          <div className="flex flex-col space-y-6">
            {/* Expiring Soon */}
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h2 className="text-3xl font-bold text-gray-800">
                {selectedCollegeStats.expiringsoon}
              </h2>
              <p className="text-gray-600 mt-2">Expiring Soon</p>
              {/* Color key can be simplified or made dynamic */}
              <div className="flex items-center mt-2">
                <span className="w-4 h-4 bg-[#F59E0B] rounded mr-2"></span>
                <span>Partnerships ending within 3 months</span>
              </div>
            </div>

            {/* Expired Partners */}
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h2 className="text-3xl font-bold text-gray-800">
                {selectedCollegeStats.expired}
              </h2>
              <p className="text-gray-600 mt-2">Expired Partners</p>
              <div className="flex items-center mt-2">
                <span className="w-4 h-4 bg-[#A855F7] rounded mr-2"></span>
                <span>Partnerships past their end date</span>
              </div>
            </div>
          </div>
        </div>

        {/* Partnership Status Line Graph */}
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-medium text-gray-800">
              Partnership Status
            </h2>
            <div className="flex space-x-1">
              <button
                onClick={() => setTimeFilter("Weekly")}
                className={`px-3 py-1 rounded-md text-sm ${
                  timeFilter === "Weekly"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-600"
                } cursor-pointer`}
              >
                Weekly
              </button>
              <button
                onClick={() => setTimeFilter("Monthly")}
                className={`px-3 py-1 rounded-md text-sm ${
                  timeFilter === "Monthly"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-600"
                } cursor-pointer`}
              >
                Monthly
              </button>
              <button
                onClick={() => setTimeFilter("Yearly")}
                className={`px-3 py-1 rounded-md text-sm ${
                  timeFilter === "Yearly"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-600"
                } cursor-pointer`}
              >
                Yearly
              </button>
              <button
                onClick={() => setTimeFilter("All Times")}
                className={`px-3 py-1 rounded-md text-sm ${
                  timeFilter === "All Times"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-600"
                } cursor-pointer`}
              >
                All Times
              </button>
            </div>
          </div>
          <Line data={lineData} options={lineOptions} height={80} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
