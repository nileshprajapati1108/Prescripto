import React, { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";

const DoctorAppointments = () => {
  const {
    dToken,
    appointments,
    getAppointments,
    completeAppointment,
    cancelAppointment,
  } = useContext(DoctorContext);

  const { calculateAge, slotDateFormat, currency } =
    useContext(AppContext);

  useEffect(() => {
    if (dToken) getAppointments();
  }, [dToken]);

  return (
    <div className="w-full max-w-6xl mx-auto my-6 px-3">
      <p className="mb-4 text-2xl font-semibold">All Appointments</p>

      <div className="bg-white border rounded-xl overflow-hidden">

        {/* ===== TABLE HEADER (DESKTOP ONLY) ===== */}
        <div className="hidden sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] px-5 py-3 border-b font-semibold text-gray-600">
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p className="text-center">Action</p>
        </div>

        {/* ===== APPOINTMENTS ===== */}
        {appointments.length > 0 ? (
          appointments
            .slice()
            .reverse()
            .map((item, index) => (
              <div
                key={item._id}
                className="border-b last:border-b-0 p-4 sm:p-0"
              >
                {/* ===== MOBILE CARD ===== */}
                <div className="sm:hidden bg-gray-50 rounded-lg p-4 space-y-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.userData?.image}
                      className="w-12 h-12 rounded-full object-cover border"
                      alt=""
                    />
                    <div>
                      <p className="font-semibold">
                        {item.userData?.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        Age: {calculateAge(item.userData?.dob)}
                      </p>
                    </div>
                  </div>

                  <div className="text-sm space-y-1">
                    <p>
                      <span className="font-medium">Payment:</span>{" "}
                      <span
                        className={
                          item.payment
                            ? "text-green-600"
                            : "text-yellow-600"
                        }
                      >
                        {item.payment ? "Online" : "Cash"}
                      </span>
                    </p>

                    <p>
                      <span className="font-medium">Date:</span>{" "}
                      {slotDateFormat(item.slotDate)}, {item.slotTime}
                    </p>

                    <p>
                      <span className="font-medium">Fees:</span>{" "}
                      {currency} {item.amount}
                    </p>
                  </div>

                  <div className="flex gap-3 pt-2">
                    {item.isCompleted && (
                      <span className="text-green-600 font-semibold">
                        Completed
                      </span>
                    )}

                    {item.cancelled && (
                      <span className="text-red-600 font-semibold">
                        Cancelled
                      </span>
                    )}

                    {!item.isCompleted && !item.cancelled && (
                      <>
                        <button
                          onClick={() => cancelAppointment(item._id)}
                          className="flex-1 py-2 border border-red-300 rounded-lg text-red-600 hover:bg-red-50"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => completeAppointment(item._id)}
                          className="flex-1 py-2 border border-green-300 rounded-lg text-green-600 hover:bg-green-50"
                        >
                          Complete
                        </button>
                      </>
                    )}
                  </div>
                </div>

                {/* ===== DESKTOP ROW ===== */}
                <div className="hidden sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-3 px-5 py-4 items-center hover:bg-gray-50">
                  <p>{index + 1}</p>

                  <div className="flex items-center gap-3">
                    <img
                      src={item.userData?.image}
                      className="w-10 h-10 rounded-full object-cover border"
                      alt=""
                    />
                    <p className="font-medium">
                      {item.userData?.name}
                    </p>
                  </div>

                  <p
                    className={
                      item.payment
                        ? "text-green-600 font-medium"
                        : "text-yellow-600 font-medium"
                    }
                  >
                    {item.payment ? "Online" : "Cash"}
                  </p>

                  <p>{calculateAge(item.userData?.dob)}</p>

                  <p className="text-gray-600">
                    {slotDateFormat(item.slotDate)}, {item.slotTime}
                  </p>

                  <p className="font-medium">
                    {currency} {item.amount}
                  </p>

                  <div className="flex justify-center gap-3">
                    {item.isCompleted && (
                      <span className="text-green-600 font-semibold">
                        Completed
                      </span>
                    )}

                    {item.cancelled && (
                      <span className="text-red-600 font-semibold">
                        Cancelled
                      </span>
                    )}

                    {!item.isCompleted && !item.cancelled && (
                      <>
                        <button
                          onClick={() => cancelAppointment(item._id)}
                          className="w-10 h-10 border border-red-300 rounded-lg hover:bg-red-50"
                        >
                          <img
                            src={assets.cancel_icon}
                            className="w-5 mx-auto"
                            alt=""
                          />
                        </button>

                        <button
                          onClick={() => completeAppointment(item._id)}
                          className="w-10 h-10 border border-green-300 rounded-lg hover:bg-green-50"
                        >
                          <img
                            src={assets.tick_icon}
                            className="w-5 mx-auto"
                            alt=""
                          />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))
        ) : (
          <p className="text-center py-10 text-gray-500">
            No Appointments Found
          </p>
        )}
      </div>
    </div>
  );
};

export default DoctorAppointments;
