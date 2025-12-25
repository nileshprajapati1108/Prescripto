import React, { useContext, useEffect, useState } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const DoctorProfile = () => {
  const { dToken, profileData, setProfileData, getProfileData, backendUrl } =
    useContext(DoctorContext);
  const { currency } = useContext(AppContext);

  const [isEdit, setIsEdit] = useState(false);

  const updateProfile = async () => {
    try {
      const updateData = {
        address: profileData.address,
        fees: profileData.fees,
        available: profileData.available,
      };

      const { data } = await axios.post(
        backendUrl + "/api/doctor/update-profile",
        updateData,
        { headers: { dToken } }
      );

      if (data.success) {
        toast.success(data.message);
        setIsEdit(false);
        getProfileData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (dToken) getProfileData();
  }, [dToken]);

  return (
    profileData && (
      <div className="p-4 sm:p-6 max-w-5xl">
        <div className="bg-white border rounded-lg shadow-sm p-6 flex flex-col sm:flex-row gap-6">

          {/* ===== LEFT IMAGE ===== */}
          <div className="flex-shrink-0">
            <img
              src={profileData.image}
              alt=""
              className="w-40 h-40 object-cover rounded-lg border bg-[var(--primary)]"
            />
          </div>

          {/* ===== RIGHT CONTENT ===== */}
          <div className="flex-1">
            {/* Name */}
            <h2 className="text-2xl font-semibold text-gray-800">
              {profileData.name}
            </h2>

            <p className="text-gray-600 mt-1">
              {profileData.degree} -  {profileData.speciality}
              <span className="ml-2 px-2 py-0.5 text-xs border rounded-full">
                {profileData.experience}
              </span>
            </p>

            {/* About */}
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-700">About</p>
              <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                {profileData.about}
              </p>
            </div>

            {/* Fees */}
            <div className="mt-4 flex items-center gap-2">
              <p className="text-sm font-medium text-gray-700">
                Appointment Fee:
              </p>
              {isEdit ? (
                <input
                  type="number"
                  value={profileData.fees}
                  onChange={(e) =>
                    setProfileData((prev) => ({
                      ...prev,
                      fees: e.target.value,
                    }))
                  }
                  className="border px-2 py-1 rounded w-24 text-sm"
                />
              ) : (
                <p className="text-sm font-semibold text-gray-800">
                  {currency} {profileData.fees}
                </p>
              )}
            </div>

            {/* Address */}
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-700">Address</p>
              {isEdit ? (
                <div className="flex flex-col gap-2 mt-1">
                  <input
                    className="border px-3 py-1 rounded text-sm"
                    value={profileData.address.line1}
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        address: {
                          ...prev.address,
                          line1: e.target.value,
                        },
                      }))
                    }
                  />
                  <input
                    className="border px-3 py-1 rounded text-sm"
                    value={profileData.address.line2}
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        address: {
                          ...prev.address,
                          line2: e.target.value,
                        },
                      }))
                    }
                  />
                </div>
              ) : (
                <p className="text-sm text-gray-600 mt-1">
                  {profileData.address.line1}
                  <br />
                  {profileData.address.line2}
                </p>
              )}
            </div>

            {/* Availability */}
            <div className="mt-4 flex items-center gap-2">
              <input
                type="checkbox"
                checked={profileData.available}
                onChange={() =>
                  isEdit &&
                  setProfileData((prev) => ({
                    ...prev,
                    available: !prev.available,
                  }))
                }
              />
              <span className="text-sm text-gray-700">Available</span>
            </div>

            {/* Buttons */}
            <div className="mt-6">
              {isEdit ? (
                <button
                  onClick={updateProfile}
                  className="px-6 py-2 text-sm rounded-md bg-[var(--primary)] text-white hover:opacity-90 transition"
                >
                  Save Changes
                </button>
              ) : (
                <button
                  onClick={() => setIsEdit(true)}
                  className="px-6 py-2 text-sm rounded-md border border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white transition"
                >
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default DoctorProfile;
