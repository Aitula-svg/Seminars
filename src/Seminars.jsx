import axios from "axios";
import { useEffect, useState } from "react";

export const Seminars = () => {
  const [seminars, setSeminars] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/seminars")
      .then((response) => {
        setSeminars(response.data);
      })
      .catch((error) => {
        console.error("Error fetching seminars:", error);
      });
  }, []);

  const handleDelete = (id) => {
    console.log("Deleting seminar with ID:", id);
    axios
      .delete(`http://localhost:5000/seminars/${id}`)

      .then(() => {
        setSeminars((prevSeminars) =>
          prevSeminars.filter((seminar) => seminar.id !== id)
        );
      })
      .catch((error) => {
        console.error("Error deleting seminar:", error);
      });
  };

  return (
    <div>
      <h1>Семинары</h1>
      <ul>
        {seminars.map((seminar) => (
          <li key={seminar.id}>
            <h3>{seminar.title}</h3>
            <p>{seminar.name}</p>
            <span>{seminar.date}</span>
            <button onClick={() => handleDelete(seminar.id)}>Удалить</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
