import React, { useState, useEffect } from "react";
import { convertToRaw, EditorState, ContentState, convertFromHTML } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "draft-js/dist/Draft.css";
import draftToHtml from "draftjs-to-html";
import {  Button } from '@material-ui/core';
import './styles.css'
import axios from "../../../_config/AxiosConfig";
const MyEditor = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  useEffect(() => {
    // Simulate fetching HTML content from the server
    const fetchHtmlContent = async () => {
      try {
        // Replace the following line with your actual API call to get HTML content from the server
        const response = await axios.get('auth/editcontent');
        const htmlContent = response.data.message;
        console.log(htmlContent)

        // Convert HTML to ContentState
        const blocksFromHTML = convertFromHTML(htmlContent);
        const contentState = ContentState.createFromBlockArray(
          blocksFromHTML.contentBlocks,
          blocksFromHTML.entityMap
        );

        // Update the editor state with the new content
        setEditorState(EditorState.createWithContent(contentState));
      } catch (error) {
        console.error("Error fetching HTML content:", error);
      }
    };

    // Fetch HTML content on component mount
    fetchHtmlContent();
  }, []);

  const handleSubmit = async()=>{
    try {
        console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())))
        const requestData = {content: draftToHtml(convertToRaw(editorState.getCurrentContent()))}
        const data = await axios.post('users/edit', requestData)
        alert("Thay đổi thành công")
        //console.log(result)
    } catch (error) {
        alert("Có lỗi xảy ra")
    }
   
  //  console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())))
  } 
  return (
    <div className="App">
     
      <Editor
        editorState={editorState}
        onEditorStateChange={setEditorState}
        wrapperClassName="wrapper-class"
        editorClassName="editor-class"
        toolbarClassName="toolbar-class"
        toolbar={{
      
            image: {
                previewImage: true,
                uploadCallback: async (file) => {
                    console.log(file)
                  const formData = new FormData();
                  formData.append("image", file);
                  try {
                    const response = await axios.post("/file-config/upload", formData, {
                      headers: {
                        "Content-Type": "multipart/form-data",
                      },
                    });
                    console.log(response.data.data)
                    // Trả về đường dẫn của ảnh từ server để hiển thị trong trình soạn thảo
                    return { data: { url: response.data.data } };
                  } catch (error) {
                    console.error("Error uploading image:", error);
                    throw error;
                  }
                },
                alt: { present: true, mandatory: true },
              },
          }}
      />
      <div>
      <Button variant="contained" color="primary" onClick={handleSubmit} size='30'>
              Submit
            </Button>
      </div>
    </div>
  );
};

export default MyEditor;
