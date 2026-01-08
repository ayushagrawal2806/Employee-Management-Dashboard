import React, { useEffect, useRef, useState } from "react";
import { X, Upload } from "lucide-react";
import "./EmployeeFormModal.css";

const STATES = [
  "Karnataka",
  "Maharashtra",
  "Delhi",
  "Tamil Nadu",
  "Uttar Pradesh",
  "Madhya Pradesh",
];

const EmployeeFormModal = ({ employee, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    gender: "",
    dob: "",
    state: "",
    status: "Active",
    profileImage: "",
  });

  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (employee) {
      setFormData(employee);
    }
  }, [employee]);

  const validate = () => {
    const errs = {};
    if (!formData.fullName.trim()) errs.fullName = "Full name is required";
    if (!formData.gender) errs.gender = "Gender is required";
    if (!formData.dob) errs.dob = "Date of birth is required";
    if (!formData.state) errs.state = "State is required";
    if (!formData.profileImage) errs.profileImage = "Profile image is required";

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const url = employee ? `/api/employees/${employee.id}` : "/api/employees";

    const method = employee ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const savedEmployee = await res.json();

    onSubmit(savedEmployee);
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () =>
      setFormData({ ...formData, profileImage: reader.result });
    reader.readAsDataURL(file);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        {/* Header */}
        <div className="modal-header">
          <div>
            <h2>{employee ? "Edit Employee" : "Add Employee"}</h2>
            <p>Fill in all required employee details</p>
          </div>
          <button className="icon-btn" onClick={onClose}>
            <X />
          </button>
        </div>

        <form className="modal-body" onSubmit={handleSubmit}>
          {/* Image */}
          <div className="image-section">
            <div className="image-wrapper">
              {formData.profileImage ? (
                <img src={formData.profileImage} alt="Preview" />
              ) : (
                <></>
              )}
            </div>

            <input
              type="file"
              ref={fileInputRef}
              hidden
              accept="image/*"
              onChange={handleImageChange}
            />

            <button
              type="button"
              className="link-btn"
              onClick={() => fileInputRef.current.click()}
            >
              <Upload /> Upload Image
            </button>

            {errors.profileImage && (
              <div className="error-message">{errors.profileImage}</div>
            )}
          </div>

          {/* Fields */}
          <div className="form-grid">
            {/* Full Name */}
            <div>
              <label>Full Name</label>
              <input
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
                placeholder="Enter your name"
              />
              {errors.fullName && (
                <div className="error-message">{errors.fullName}</div>
              )}
            </div>

            {/* Gender */}
            <div>
              <label>Gender</label>
              <div className="gender-buttons">
                {["Male", "Female", "Other"].map((g) => (
                  <button
                    type="button"
                    key={g}
                    className={formData.gender === g ? "active" : ""}
                    onClick={() => setFormData({ ...formData, gender: g })}
                  >
                    {g}
                  </button>
                ))}
              </div>
              {errors.gender && (
                <div className="error-message">{errors.gender}</div>
              )}
            </div>

            {/* DOB */}
            <div>
              <label>Date of Birth</label>
              <input
                type="date"
                value={formData.dob}
                onChange={(e) =>
                  setFormData({ ...formData, dob: e.target.value })
                }
              />
              {errors.dob && <div className="error-message">{errors.dob}</div>}
            </div>

            {/* State */}
            <div>
              <label>State</label>
              <select
                value={formData.state}
                onChange={(e) =>
                  setFormData({ ...formData, state: e.target.value })
                }
              >
                <option value="">Select State</option>
                {STATES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              {errors.state && (
                <div className="error-message">{errors.state}</div>
              )}
            </div>

            {/* Status */}
            <div>
              <label>Status</label>
              <div className="gender-buttons">
                {["Active", "Inactive"].map((s) => (
                  <button
                    type="button"
                    key={s}
                    className={formData.status === s ? "active" : ""}
                    onClick={() => setFormData({ ...formData, status: s })}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="modal-footer">
          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
          <button className="submit-btn" onClick={handleSubmit}>
            {employee ? "Update Employee" : "Create Employee"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeFormModal;
