import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";

export const Seminars = () => {
  const [seminars, setSeminars] = useState([]); // состояние массива
  const [isEdit, setIsEdit] = useState(false); //при редактирование показывает
  const [editTitle, setEditTitle] = useState(""); //инпуты
  const [editDescription, setEditDescription] = useState("");
  const [editDate, setEditDate] = useState("");
  const [selectedSeminar, setSelectedSeminar] = useState(null); //при редактирование

  useEffect(() => {
    axios
      .get("http://localhost:5000/seminars") //получем данние от сервера
      .then((response) => {
        setSeminars(response.data);
      })
      .catch((error) => {
        console.error("Error", error);
      });
  }, []);

  const handleEdit = (seminar) => {
    setSelectedSeminar(seminar);
    setEditTitle(seminar.title);
    setEditDescription(seminar.description);
    setEditDate(seminar.date);
    setIsEdit(true);
  };

  const handleEditTitleChange = (e) => {
    setEditTitle(e.target.value);
  };

  const handleEditDescriptionChange = (e) => {
    setEditDescription(e.target.value);
  };

  const handleEditDateChange = (e) => {
    setEditDate(e.target.value);
  };

  const saveHandleClick = (e) => {
    e.preventDefault();

    axios
      .put(`http://localhost:5000/seminars/${selectedSeminar.id}`, {
        //изменить данные
        ...selectedSeminar,
        title: editTitle,
        description: editDescription,
        date: editDate,
      })
      .then(() => {
        setSeminars((prevSeminars) =>
          prevSeminars.map((seminar) =>
            seminar.id === selectedSeminar.id
              ? {
                  ...seminar,
                  title: editTitle,
                  description: editDescription,
                  date: editDate,
                }
              : seminar
          )
        );
        setIsEdit(false);
      })
      .catch((error) => {
        console.error("Error", error);
        setIsEdit(false);
      });
  };

  const cancelEditHandler = () => {
    setIsEdit(false);
    setEditTitle(selectedSeminar.title);
    setEditDescription(selectedSeminar.description);
    setEditDate(selectedSeminar.date);
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/seminars/${id}`) //удаление с сервера

      .then(() => {
        setSeminars((prevSeminars) =>
          prevSeminars.filter((seminar) => seminar.id !== id)
        );
      })

      .catch((error) => {
        console.error("Error", error);
      });
  };

  return (
    <StyledContainer>
      <h1>Семинары</h1>
      {isEdit ? ( //это показывает при редактировании
        <StyleForm>
          <Style>
            <StyleLabel>
              <label>Название:</label>
              <input
                value={editTitle}
                type="text"
                onChange={handleEditTitleChange}
              />
            </StyleLabel>
            <StyleLabel>
              <label>Описание:</label>
              <input
                value={editDescription}
                type="text"
                onChange={handleEditDescriptionChange}
              />
            </StyleLabel>
            <StyleLabel>
              <label>Дата:</label>
              <input
                value={editDate}
                type="date"
                onChange={handleEditDateChange}
              />
            </StyleLabel>
            <StyleFromButton>
              <button type="submit" onClick={saveHandleClick}>
                Сохранить
              </button>
              <button onClick={cancelEditHandler} type="button">
                Отмена
              </button>
            </StyleFromButton>
          </Style>
        </StyleForm>
      ) : (
        <StyleList>
          {seminars.map(
            (
              seminar //сам семинар
            ) => (
              <List key={seminar.id}>
                <h3>{seminar.title}</h3>
                <p>{seminar.description}</p>
                <StyleDiv>
                  <span>{seminar.date}</span>
                  <span>{seminar.time}</span>
                </StyleDiv>
                <img src={seminar.photo} alt={seminar.title} />
                <StyleButtons>
                  <button onClick={() => handleDelete(seminar.id)}>
                    Удалить
                  </button>
                  <button onClick={() => handleEdit(seminar)}>
                    Редактировать
                  </button>
                </StyleButtons>
              </List>
            )
          )}
        </StyleList>
      )}
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 15px;
  gap: 30px;
`;

const List = styled.li`
  border: 1px solid #62b5d3;
  list-style-type: none;
  width: 370px;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 10px;

  gap: 15px;
  padding: 30px 10px;

  img {
    width: 320px;
    border-radius: 10px;
  }
  p {
    width: 320px;
  }
  h3 {
    font-weight: 700;
  }
`;

const StyleList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

const StyleDiv = styled.div`
  display: flex;
  width: 280px;
  justify-content: space-between;
`;

const StyleButtons = styled.div`
  display: flex;
  width: 280px;

  justify-content: space-between;

  button {
    padding: 10px 18px;
    border-radius: 10px;
    border: 1px solid #62b5d3;
    background-color: #80a3c5;
    color: #000000;
    font-size: 1rem;
    cursor: pointer;
  }
`;

const StyleForm = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 420px;
  height: auto;
  padding: 20px 0;
  border: 1px solid #62b5d3;
  border-radius: 10px;
`;

const Style = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const StyleLabel = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  input {
    width: 270px;
    border-radius: 5px;
    border: 1px solid #62b5d3;
    padding: 5px;
  }
`;

const StyleFromButton = styled.div`
  display: flex;
  justify-content: space-between;
  button {
    padding: 10px 18px;
    border-radius: 10px;
    border: 1px solid #62b5d3;
    background-color: #80a3c5;
    color: #000000;
    font-size: 1rem;
    cursor: pointer;
  }
`;
