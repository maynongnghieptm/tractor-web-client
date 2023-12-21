import React, { useRef, useEffect, useState } from 'react';
import axios from '../../../_config/AxiosConfig';
import EmailEditor, { EditorRef, EmailEditorProps } from 'react-email-editor';
import {  Button } from '@material-ui/core';
import { useHistory,useParams  } from 'react-router-dom'
import {TextField} from '@material-ui/core'
const NewContent: React.FC = () => {
  const emailEditorRef = useRef<EditorRef>(null);
  const headerRef = useRef<EditorRef>(null);
  const history = useHistory()
  const [url, setUrl] = useState('')
 // const receivedData = location.state?.data || "Không có dữ liệu";
 //const { idEdit } = useParams();
//console.log(idEdit)
  const exportHtml = async () => {
    try {
      const unlayer = emailEditorRef.current?.editor;
      console.log(unlayer)
      unlayer?.exportHtml(async (htmlData) => {
        const { html } = htmlData;
        const requestData = { content: html };
        unlayer?.saveDesign(async (designData) => {
          const designJSON = { designJSON: JSON.stringify(designData) };
          const link = { url:url }
          const mergedData = { ...link,...requestData, ...designJSON };
          console.log(mergedData)
          await axios.post('users/edit', mergedData)
          alert('Thay đổi thành công');
        });   
      });
    } catch (error) {
      alert('Có lỗi xảy ra');
    }
  };
  return (
    <div style={{ width: '100%', height: '100vh', display: 'flex', flexDirection: 'column' }}>
       <div>
      <Button variant="contained" color="primary"  size='30' onClick={exportHtml}>Save Design</Button>
    </div>
    <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="url"
          defaultValue={'http://192.168.1.2:3000/#/about_us/'}
          onChange={(e)=>{
            setUrl(e.target.value)
          }}
        />
    <div style={{ flex: 1 }}>
      <EmailEditor ref={emailEditorRef}  style={{height:'90vh'}} />
    </div>
   
  </div>
  );
};

export default NewContent;
