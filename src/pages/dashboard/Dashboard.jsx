import { useEffect, useMemo, useState } from "react";
import {
  Plus,
  Search,
  LogOut,
  Users,
  UserCheck,
  UserX,
  Printer,
  Edit2,
  Trash2,
} from "lucide-react";

import EmployeeFormModal from "../../components/EmployeeFormModal/EmployeeFormModal";
import ConfirmModal from "../../components/ConfirmModal/ConfirmModal";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);

  const [deleteId, setDeleteId] = useState(null);

  const navigate = useNavigate();

  // Filters
  const [search, setSearch] = useState("");
  const [genderFilter, setGenderFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const loadEmployees = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/employees");
      const data = await res.json();
      setEmployees(data);
    } catch (err) {
      console.error("Failed to load employees", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  const filteredEmployees = useMemo(() => {
    return employees.filter((emp) => {
      const matchName = emp.fullName
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchGender = genderFilter === "All" || emp.gender === genderFilter;

      const matchStatus = statusFilter === "All" || emp.status === statusFilter;

      return matchName && matchGender && matchStatus;
    });
  }, [employees, search, genderFilter, statusFilter]);

  const total = employees.length;
  const active = employees.filter((e) => e.status === "Active").length;
  const inactive = employees.filter((e) => e.status === "Inactive").length;

  const handleSubmit = (data) => {
    if (editingEmployee) {
      setEmployees((prev) => prev.map((e) => (e.id === data.id ? data : e)));
    } else {
      setEmployees((prev) => [...prev, data]);
    }

    setShowModal(false);
    setEditingEmployee(null);
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    await fetch(`/api/employees/${deleteId}`, { method: "DELETE" });
    setEmployees((prev) => prev.filter((e) => e.id !== deleteId));
    setDeleteId(null);
  };

  const toggleStatus = async (emp) => {
    const newStatus = emp.status === "Active" ? "Inactive" : "Active";

    await fetch(`/api/employees/${emp.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...emp, status: newStatus }),
    });

    setEmployees((prev) =>
      prev.map((e) => (e.id === emp.id ? { ...e, status: newStatus } : e))
    );
  };

  return (
    <div className="dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-left">
          <div className="logo">
            <Users />
          </div>
          <h1>Assignment</h1>
        </div>

        <div className="header-right">
          <div className="user-info">
            <p>admin@assignment.com</p>
            <span>Live Mock Environment</span>
          </div>
          <button
            className="logout-btn"
            onClick={() => {
              localStorage.clear();
              navigate("/login");
            }}
          >
            <LogOut />
          </button>
        </div>
      </header>

      {/* Stats */}
      <section className="stats">
        <div className="stat-card">
          <Users />
          <div>
            <p>Total Employees</p>
            <h3>{total}</h3>
          </div>
        </div>

        <div className="stat-card green">
          <UserCheck />
          <div>
            <p>Active Members</p>
            <h3>{active}</h3>
          </div>
        </div>

        <div className="stat-card orange">
          <UserX />
          <div>
            <p>Inactive Members</p>
            <h3>{inactive}</h3>
          </div>
        </div>
      </section>

      {/* Actions */}
      <section className="actions">
        <div className="search-box">
          <Search />
          <input
            placeholder="Search employees by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="action-buttons">
          <select
            value={genderFilter}
            onChange={(e) => setGenderFilter(e.target.value)}
          >
            <option value="All">All Genders</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>

          <button className="icon-btn" onClick={() => window.print()}>
            <Printer />
          </button>

          <button
            className="primary-btn"
            onClick={() => {
              setEditingEmployee(null);
              setShowModal(true);
            }}
          >
            <Plus /> Add Employee
          </button>
        </div>
      </section>

      {/* Table */}
      <section className="table-wrapper">
        {loading ? (
          <p className="state-text">Loading employees...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Employee</th>
                <th>Gender</th>
                <th>DOB</th>
                <th>State</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredEmployees.map((emp) => (
                <tr key={emp.id}>
                  <td>{emp.id}</td>
                  <td className="employee-cell">
                    <img src={emp.profileImage} alt={emp.fullName} />
                    {emp.fullName}
                  </td>
                  <td>{emp.gender}</td>
                  <td>{new Date(emp.dob).toLocaleDateString()}</td>
                  <td>{emp.state}</td>

                  {/* Slider Toggle */}
                  <td>
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={emp.status === "Active"}
                        onChange={() => toggleStatus(emp)}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </td>

                  <td className="table-actions">
                    <Edit2
                      onClick={() => {
                        setEditingEmployee(emp);
                        setShowModal(true);
                      }}
                    />
                    <Trash2 onClick={() => setDeleteId(emp.id)} />
                  </td>
                </tr>
              ))}

              {filteredEmployees.length === 0 && (
                <tr>
                  <td colSpan="7" className="empty">
                    No employees found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </section>

      {/* Add / Edit Modal */}
      {showModal && (
        <EmployeeFormModal
          employee={editingEmployee}
          onClose={() => {
            setShowModal(false);
            setEditingEmployee(null);
          }}
          onSubmit={handleSubmit}
        />
      )}

      {/* Delete Confirm Modal */}
      {deleteId && (
        <ConfirmModal
          title="Delete Employee"
          message="Are you sure you want to delete this employee? This action cannot be undone."
          onConfirm={handleDelete}
          onClose={() => setDeleteId(null)}
        />
      )}
    </div>
  );
};

export default Dashboard;
