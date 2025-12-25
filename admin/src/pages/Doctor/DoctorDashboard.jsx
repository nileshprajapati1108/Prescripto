import React, { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";

const DoctorDashboard = () => {
  const {
    dToken,
    dashData,
    getDashData,
    completeAppointment,
    cancelAppointment,
  } = useContext(DoctorContext);

  const { currency, slotDateFormat } = useContext(AppContext);

  useEffect(() => {
    if (dToken) {
      getDashData();
    }
  }, [dToken]);

  if (!dashData) return null;

  return (
    <div className="m-5">
      {/* ===== Top Cards ===== */}
      <div className="flex flex-wrap gap-4">
        {/* Earnings */}
        <div className="flex items-center gap-3 bg-white p-5 min-w-[220px] rounded-xl border shadow-sm hover:scale-105 transition">
          <img className="w-14" src={assets.earning_icon} alt="" />
          <div>
            <p className="text-xl font-semibold text-gray-700">
              {currency} {dashData.earnings}
            </p>
            <p className="text-sm text-gray-400">Earnings</p>
          </div>
        </div>

        {/* Appointments */}
        <div className="flex items-center gap-3 bg-white p-5 min-w-[220px] rounded-xl border shadow-sm hover:scale-105 transition">
          <img className="w-14" src={assets.appointments_icon} alt="" />
          <div>
            <p className="text-xl font-semibold text-gray-700">
              {dashData.appointments}
            </p>
            <p className="text-sm text-gray-400">Appointments</p>
          </div>
        </div>

        {/* Patients */}
        <div className="flex items-center gap-3 bg-white p-5 min-w-[220px] rounded-xl border shadow-sm hover:scale-105 transition">
          <img className="w-14" src={assets.patients_icon} alt="" />
          <div>
            <p className="text-xl font-semibold text-gray-700">
              {dashData.patients}
            </p>
            <p className="text-sm text-gray-400">Patients</p>
          </div>
        </div>
      </div>

      {/* ===== Latest Appointments ===== */}
      <div className="bg-white mt-10 rounded-xl border shadow-sm">
        {/* Header */}
        <div className="flex items-center gap-3 px-5 py-4 border-b bg-gray-50 rounded-t-xl">
          <img src={assets.list_icon} className="w-5" alt="" />
          <p className="font-semibold text-gray-700">Latest Bookings</p>
        </div>

        {/* List */}
        <div className="divide-y">
          {dashData.latestAppointments.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-4 px-5 py-4 hover:bg-gray-50 transition"
            >
              {/* Patient Image */}
              <img
                className="w-12 h-12 rounded-full object-cover border"
                src={item.userData.image}
                alt=""
              />

              {/* Patient Info */}
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-800">
                  {item.userData.name}
                </p>
                <p className="text-xs text-gray-500">
                  {slotDateFormat(item.slotDate)}
                </p>
              </div>

              {/* Status / Actions */}
              {item.cancelled ? (
                <span className="px-3 py-1 text-xs rounded-full bg-red-100 text-red-600 font-medium">
                  Cancelled
                </span>
              ) : item.isCompleted ? (
                <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-600 font-medium">
                  Completed
                </span>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={() => cancelAppointment(item._id)}
                    className="w-9 h-9 flex items-center justify-center rounded-full border border-red-300 hover:bg-red-50 transition"
                  >
                    <img src={assets.cancel_icon} className="w-4" alt="" />
                  </button>

                  <button
                    onClick={() => completeAppointment(item._id)}
                    className="w-9 h-9 flex items-center justify-center rounded-full border border-green-300 hover:bg-green-50 transition"
                  >
                    <img src={assets.tick_icon} className="w-4" alt="" />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
