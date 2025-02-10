import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Alert from './alert';

const Admin = ({ classes, attendance }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [randomNo, setRandomNo] = useState(0);
  const [users, setUsers] = useState({});
  const [helps, setHelps] = useState({});
  const [students, setStudents] = useState({});
  const [pendingUsers, setPendingUsers] = useState({});
  const [selectedFromDate, setSelectedFromDate] = useState("");
  const [selectedToDate, setSelectedToDate] = useState("");
  const [editableAttendance, setEditableAttendance] = useState(attendance || []);

  const adminTabs = ["Manage Classes", "Manage Students", "Manage Attendance", "Manage Users", "Pending Approval", "Contacts"];
  const currentTab = adminTabs.find(tab => location.pathname.includes(tab.replace(/\s+/g, "-").toLowerCase()))
    || "Manage Classes";

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (tab) => {
    navigate(`/admin/${tab.replace(/\s+/g, "-").toLowerCase()}`);
    setIsOpen(false);
  };

  const handleStatusChange = (recordId, studentId, newStatus) => {
    setEditableAttendance((prevAttendance) =>
      prevAttendance.map((record) =>
        record._id === recordId
          ? {
            ...record,
            students: record.students.map((student) =>
              student._id === studentId ? { ...student, status: newStatus } : student
            ),
          }
          : record
      )
    );
  };

  const fetchusers = () => {
    fetch("https://yeasty-claribel-critic-coder-743a0cb5.koyeb.app/getuser/users")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching users:", error));
  }
  const fetchhelps = () => {
    fetch("https://yeasty-claribel-critic-coder-743a0cb5.koyeb.app/help/getall")
      .then((response) => response.json())
      .then((data) => setHelps(data))
      .catch((error) => console.error("Error fetching users:", error));
  }
  const fetchstudents = () => {
    fetch("https://yeasty-claribel-critic-coder-743a0cb5.koyeb.app/students/getall")
      .then((response) => response.json())
      .then((data) => setStudents(data))
      .catch((error) => console.error("Error fetching users:", error));
  }
  const fetchpendinguser = () => {
    fetch("https://yeasty-claribel-critic-coder-743a0cb5.koyeb.app/getuser/pendingusers")
      .then((response) => response.json())
      .then((data) => setPendingUsers(data))
      .catch((error) => console.error("Error fetching users:", error));
  }

  const saveUpdatedAttendance = async (recordId) => {
    const updatedRecord = editableAttendance.find((record) => record._id === recordId);

    try {
      const response = await fetch("https://yeasty-claribel-critic-coder-743a0cb5.koyeb.app/attendance/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedRecord),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      setMessage("Attendance updated successfully!");
    } catch (error) {
      setMessage("Error updating attendance");
    }
    setRandomNo(Math.floor(Math.random() * 11));
  };
  const Approval = async (pendingUserId) => {

    try {
      const response = await fetch("https://yeasty-claribel-critic-coder-743a0cb5.koyeb.app/getuser/approval", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pendingUserId }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      setMessage("approval updated successfully!");
    } catch (error) {
      setMessage("Error updating approval");
    }
    setRandomNo(Math.floor(Math.random() * 11));
  };
  const noApproval = async (pendingUserId) => {

    try {
      const response = await fetch("https://yeasty-claribel-critic-coder-743a0cb5.koyeb.app/getuser/disapproval", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pendingUserId }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      setMessage("approval updated successfully!");
    } catch (error) {
      setMessage("Error updating approval");
    }
    setRandomNo(Math.floor(Math.random() * 11));
  };

  const deleteAttendance = async (attendanceId) => {
    try {
      const response = await fetch("https://yeasty-claribel-critic-coder-743a0cb5.koyeb.app/attendance/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ attendanceId }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      setMessage("Attendance deleted successfully!");
    } catch (error) {
      setMessage("Error deleting attendance");
    }
    setRandomNo(Math.floor(Math.random() * 11));
  };
  const deleteClass = async (classId) => {
    try {
      const response = await fetch("https://yeasty-claribel-critic-coder-743a0cb5.koyeb.app/classes/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ classId }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      setMessage("Attendance deleted successfully!");
    } catch (error) {
      setMessage("Error deleting attendance:");
    }
    setRandomNo(Math.floor(Math.random() * 11));
  };
  const deleteStudent = async (studentId) => {
    try {
      const response = await fetch("https://yeasty-claribel-critic-coder-743a0cb5.koyeb.app/students/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentId }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      setMessage("student deleted successfully!");
    } catch (error) {
      setMessage("Error deleting student:");
    }
    setRandomNo(Math.floor(Math.random() * 11));
  };
  const deleteUser = async (userId) => {
    try {
      const response = await fetch("https://yeasty-claribel-critic-coder-743a0cb5.koyeb.app/getuser/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      setMessage("user deleted successfully!");
    } catch (error) {
      setMessage("Error deleting user:");
    }
    setRandomNo(Math.floor(Math.random() * 11));
  };
  const deleteHelp = async (helpId) => {
    try {
      const response = await fetch("https://yeasty-claribel-critic-coder-743a0cb5.koyeb.app/help/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ helpId }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      setMessage("user deleted help!");
    } catch (error) {
      setMessage("Error deleting help:");
    }
    setRandomNo(Math.floor(Math.random() * 11));
  };

  useEffect(() => {
    fetchusers();
    fetchstudents();
    fetchhelps();
    fetchpendinguser();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen w-full">
      <h2 className="text-2xl font-bold mb-6">Admin Settings</h2>

      <div className="relative inline-block" ref={dropdownRef}>
        <button
          className="text-light-black pr-9 md:w-[219px] bg-[#F6F7F9] hover:bg-gray-100 font-medium rounded-full text-sm px-5 py-2.5 text-center inline-flex items-center"
          type="button"
          onClick={toggleDropdown}>
          {currentTab}
          <svg className="w-2.5 h-2.5 absolute right-1 m-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
          </svg>
        </button>

        {isOpen && (
          <div className="absolute z-10 bg-white divide-y divide-gray-100 rounded-2xl border shadow-md md:w-[176px] mt-2">
            <ul className="py-2 text-sm text-light-black">
              {adminTabs.map((item) => (
                <li key={item}>
                  <button
                    className="block px-4 py-2 w-full text-left hover:bg-gray-100"
                    onClick={() => handleSelect(item)}>
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="mt-10 space-y-6">
      {message && <Alert message={message} bgcolor={'[#F6F7F9]'} newRandomNo={randomNo} />}
        {currentTab === "Manage Classes" && (
          <div className="p-6 bg-white shadow rounded-xl">
            <h3 className="text-lg font-semibold">Manage Classes</h3>
            <p className="text-sm text-gray-600 mt-2">Here you can manage class details.</p>
            {/* Display Classes Data */}
            {classes && classes.length ? (
              <ul className="mt-4">
                {classes.map((cls) => (
                  <li key={cls._id} className="p-2 border-b flex justify-between">{cls.name}
                    <button onClick={() => deleteClass(cls._id)} className="bg-red-500 text-white px-3 py-1 rounded text-sm" >
                      delete </button> </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No classes available.</p>
            )}
          </div>
        )}

        {currentTab === "Manage Students" && (
          <div className="p-6 bg-white shadow rounded-xl">
            <h3 className="text-lg font-semibold">Manage Students</h3>
            <p className="text-sm text-gray-600 mt-2">Here you can manage student details.</p>

            {students && students.length ? (
              <ul className="mt-4">
                {students.map((student) => (
                  <li key={student._id} className="p-2 border-b flex justify-between">
                    {student.name} - Class ID: {student.classid}
                    <button onClick={() => deleteStudent(student._id)} className="bg-red-500 text-white px-3 py-1 rounded text-sm">
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No students available.</p>
            )}
          </div>
        )}


        {currentTab === "Manage Attendance" && (
          <div className="p-6 bg-white shadow rounded-xl w-full">
            <h3 className="text-lg font-semibold">Manage Attendance</h3>
            <p className="text-sm text-gray-600 mt-2">Track and update attendance records.</p>

            {/* Date Range Select */}
            <div className="flex justify-end w-full space-x-4 my-4">
              <div className="flex items-center">
                <label className="text-gray-700 mr-2">From:</label>
                <input
                  type="date"
                  value={selectedFromDate}
                  onChange={(e) => setSelectedFromDate(e.target.value)}
                  className="border rounded p-2"
                />
              </div>
              <div className="flex items-center">
                <label className="text-gray-700 mr-2">To:</label>
                <input
                  type="date"
                  value={selectedToDate}
                  onChange={(e) => setSelectedToDate(e.target.value)}
                  className="border rounded p-2"
                />
              </div>
            </div>

            {/* Filtered Attendance Records */}
            {editableAttendance && editableAttendance.length ? (
              <div className="mt-4 space-y-4">
                {editableAttendance
                  .filter(record => {
                    const recordDate = new Date(record.date);
                    const fromDate = selectedFromDate ? new Date(selectedFromDate) : null;
                    const toDate = selectedToDate ? new Date(selectedToDate) : null;

                    return (!fromDate || recordDate >= fromDate) && (!toDate || recordDate <= toDate);
                  })
                  .map((record) => (
                    <div key={record._id} className="p-4 border rounded-lg bg-gray-50">
                      <div className="flex justify-between">
                        <h4 className="text-md font-medium">{record.subject}</h4>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => saveUpdatedAttendance(record._id)}
                            className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => deleteAttendance(record._id)}
                            className="bg-red-500 text-white px-3 py-1 rounded text-sm"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                      <p className="text-sm text-gray-500">Date: {new Date(record.date).toLocaleDateString()}</p>

                      <h5 className="mt-2 font-semibold">Students:</h5>
                      <ul className="list-disc pl-5 text-sm">
                        {record.students.map((student) => (
                          <li key={student._id} className="flex justify-between items-center">
                            <span>Student ID: {student.studentId}</span>
                            <select
                              value={student.status}
                              onChange={(e) => handleStatusChange(record._id, student._id, e.target.value)}
                              className="border rounded px-2 py-1"
                            >
                              <option value="present">Present</option>
                              <option value="absent">Absent</option>
                            </select>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
              </div>
            ) : (
              <p className="text-gray-500">No attendance records available.</p>
            )}
          </div>
        )}

        {currentTab === "Manage Users" && (
          <div className="p-6 bg-white shadow rounded-xl">
            <h3 className="text-lg font-semibold">Manage Users</h3>
            <p className="text-sm text-gray-600 mt-2">Here you can manage user details.</p>
            {/* Display Classes Data */}
            {users && users.length ? (
              <ul className="mt-4">
                {users
                  .filter((user) => user.name !== "Admin").map((user) => (
                    <li key={user._id} className="p-2 border-b flex justify-between">{user.name} - {user.email}
                      <button onClick={() => deleteUser(user._id)} className="bg-red-500 text-white px-3 py-1 rounded text-sm" >
                        delete </button> </li>
                  ))}
              </ul>
            ) : (
              <p className="text-gray-500">No classes available.</p>
            )}
          </div>
        )}

        {currentTab === "Pending Approval" && (
          <div className="p-6 bg-white shadow rounded-xl">
            <h3 className="text-lg font-semibold">Manage Users</h3>
            <p className="text-sm text-gray-600 mt-2">Here you can manage user details.</p>
            {/* Display Classes Data */}
            {pendingUsers && pendingUsers.length ? (
              <ul className="mt-4">
                {pendingUsers.map((pendingUser) => (
                  <li key={pendingUser._id} className="p-2 border-b flex justify-between">{pendingUser.name} - {pendingUser.email}
                    <div>
                      <button onClick={() => Approval(pendingUser._id)} className="bg-blue-500 mr-2 text-white px-3 py-1 rounded text-sm" >
                        Approve </button>
                      <button onClick={() => noApproval(pendingUser._id)} className="bg-red-500 text-white px-3 py-1 rounded text-sm" >
                        Not approved </button> </div></li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No Approvals pending.</p>
            )}
          </div>
        )}
        {currentTab === "Contacts" && (
          <div className="p-6 bg-white shadow rounded-xl">
            <h3 className="text-lg font-semibold">Contacts</h3>
            <p className="text-sm text-gray-600 mt-2">Here you can manage queries and problems.</p>
            {/* Display Classes Data */}
            {helps && helps.length ? (
              <ul className="mt-4">
                {helps.map((help) => (
                  <li key={help._id} className="p-2 border-b flex justify-between">{help.title} - {help.description}
                    <button onClick={() => deleteHelp(help._id)} className="bg-red-500 text-white px-3 py-1 rounded text-sm" >
                      delete </button></li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No contacts available.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;