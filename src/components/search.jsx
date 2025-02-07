import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../index.css";

const Search = ({searchque}) => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetch(`https://yeasty-claribel-critic-coder-743a0cb5.koyeb.app/students/name?name=${encodeURIComponent(searchque)}`)
      .then((response) => response.json())
      .then((data) => setStudents(data))
      .catch((error) => console.error("Error fetching students:", error));
  }, [searchque]);

  return (
    <div id="Class" className="w-full pl-1 md:pl-4 pr-1.5 pt-4 md:pt-9">
      <div className="text-2xl font-bold flex flex-col">
        <span>Search result for: {searchque}</span>
      </div>
      <div className="text-xl font-bold flex flex-col">
        <span>Students</span>
        {students.length > 0 ? (
          students.map((student) => (
            <Link key={student._id} to={`/student/${student._id}`}>
              <span>{student.name}</span>
            </Link>
          ))
        ) : (
          <div>No students with this name found</div>
        )}
      </div>

    </div>
  );
};

export default Search;
