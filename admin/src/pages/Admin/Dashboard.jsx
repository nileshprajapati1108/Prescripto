import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import { assets } from "../../assets/assets";
import { AppContext } from "../../context/AppContext";

const Dashboard = () => {
  const { aToken, getDashData, cancelAppointment, dashData } =
    useContext(AdminContext);
  const { slotDateFormat } = useContext(AppContext);

  useEffect(() => {
    if (aToken) {
      getDashData();
    }
  }, [aToken]);

  if (!dashData) return null;

  return (
    dashData && (
      <div className="p-6 bg-gray-50 min-h-screen">
        {/* ===== STATS CARDS ===== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Doctors */}
          <div className="flex items-center gap-4 bg-white p-5 rounded-xl shadow-sm border hover:shadow-md transition-all">
            <img src={assets.doctor_icon} alt="" className="w-14" />
            <div>
              <p className="text-2xl font-bold text-gray-700">
                {dashData.doctors}
              </p>
              <p className="text-gray-500 text-sm">Total Doctors</p>
            </div>
          </div>

          {/* Appointments */}
          <div className="flex items-center gap-4 bg-white p-5 rounded-xl shadow-sm border hover:shadow-md transition-all">
            <img src={assets.appointments_icon} alt="" className="w-14" />
            <div>
              <p className="text-2xl font-bold text-gray-700">
                {dashData.appointments}
              </p>
              <p className="text-gray-500 text-sm">Appointments</p>
            </div>
          </div>

          {/* Patients */}
          <div className="flex items-center gap-4 bg-white p-5 rounded-xl shadow-sm border hover:shadow-md transition-all">
            <img src={assets.patients_icon} alt="" className="w-14" />
            <div>
              <p className="text-2xl font-bold text-gray-700">
                {dashData.patients}
              </p>
              <p className="text-gray-500 text-sm">Total Patients</p>
            </div>
          </div>
        </div>

        {/* ===== LATEST BOOKINGS ===== */}
        <div className="bg-white mt-10 rounded-xl shadow-sm border">
          <div className="flex items-center gap-3 px-6 py-4 border-b">
            <img src={assets.list_icon} alt="" className="w-5" />
            <p className="font-semibold text-gray-700 text-lg">
              Latest Appointments
            </p>
          </div>

          <div>
            {dashData.latestAppointments.length === 0 && (
              <p className="text-center py-6 text-gray-400">
                No recent appointments
              </p>
            )}

            {dashData.latestAppointments.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-4 px-6 py-4 border-b last:border-b-0 hover:bg-gray-50 transition-all"
              >
                <img
                  src={item.docData.image}
                  className="w-11 h-11 rounded-full object-cover border"
                  alt=""
                />

                <div className="flex-1">
                  <p className="font-medium text-gray-800">
                    {item.docData.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {slotDateFormat(item.slotDate)}
                  </p>
                </div>

                {item.cancelled ? (
                  <p className="text-red-400 text-xs font-medium ">Cancelled</p>
                ) : item.isCompleted ? (
                  <p className="text-green-500 text-xs font-medium ">
                    Completed{" "}
                  </p>
                ) : (
                  <img
                    onClick={() => cancelAppointment(item._id)}
                    className="w-10 cursor-pointer"
                    src={assets.cancel_icon}
                    alt=""
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  );
};

export default Dashboard;
