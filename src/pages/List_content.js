import React, { useEffect, useState } from "react";
import axios from "../_config/AxiosConfig";
import "./Listcontent.css";
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Edit as EditIcon, Delete as DeleteIcon } from '@material-ui/icons';
import {  Button } from '@material-ui/core';
const Listcontent = ({ url,id, content, date }) => {
  console.log(url)
  const [confirmDelete, setConfirmDelete] = useState(false);
  const isAdmin = useSelector((state) => state.authStatus.isAdmin);
  const history = useHistory();
  const parser = new DOMParser();
  const doc = parser.parseFromString(content, 'text/html');
  const dateObject = new Date(date);
  const day = dateObject.getDate();
  const month = dateObject.getMonth() + 1;
  const year = dateObject.getFullYear();
  const formattedDate = `${day < 10 ? '0' : ''}${day}/${month < 10 ? '0' : ''}${month}/${year}`;

  const firstH1WithContent = Array.from(doc.querySelectorAll('h1')).find(
    (h1Element) => h1Element.textContent.trim() !== ''
  );

  const title = firstH1WithContent?.textContent.trim() || 'No Title';
  const img = doc.querySelector('img')?.getAttribute('src') || 'No Image';
  const description = doc.querySelector('p')?.textContent.trim() || 'No Description';

  const handleClickDetail = () => {
    window.location.replace(url)
  };

  const handleClickEdit = () => {
    history.push({
      pathname: `/administration/edit/${id}`,
    });
  };

  const handleConfirmDelete = () => {
    setConfirmDelete(!confirmDelete); // Toggle the value of confirmDelete
  };

  const handleCancelDelete = () => {
    setConfirmDelete(false);
  };
 
  const handleDelete = async () => {
    try {
      await axios.delete(`users/delete/${id}`);
      alert('Xóa bài viết thành công');
      window.location.reload();
    } catch (error) {
      alert('Có lỗi xảy ra!');
    }
  };

  return (
    <div className="news-container">
      <div className="title-row">
        <h1 onClick={handleClickDetail}>{title}</h1>
        {isAdmin && (
          <div className="editIcon">
            <div>
              <EditIcon onClick={handleClickEdit} />
            </div>
            <div>
              <DeleteIcon onClick={handleConfirmDelete} />
            </div>
          </div>
        )}
      </div>
      <div className="content-row">
        <div className="image-column">
          <img src={img} alt="News Image" />
        </div>
        <div className="description-column">
          <p>{description}</p>
        </div>
      </div>
      <div className="date">
      <p>{formattedDate}</p>
      </div>
      {confirmDelete && (
        <div className="delete-confirmation">
          <p style={{fontSize:20}}>Xác nhận xóa nội dung này?</p>
          <div className="confirmButton">
            <div >
            <Button className="btn_confirm" variant="contained" color="primary"  size='20' onClick={handleDelete}>OK</Button>
            </div>
            <div>
            <Button  className="btn_confirm" variant="contained" color="secondary"  size='20' onClick={handleCancelDelete}>Cancel</Button>
            </div>
          </div>
          
        </div>
      )}
    </div>
  );
};

export default Listcontent;
