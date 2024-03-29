import React, { useRef, useEffect, useState } from 'react'
import axios from '../../../_config/AxiosConfig'
import EmailEditor, { EditorRef, EmailEditorProps } from 'react-email-editor'
import { Button } from '@material-ui/core'
import { useHistory, useParams } from 'react-router-dom'
import { TextField } from '@material-ui/core'
interface RouteParams {
  idEdit: string; // Assuming 'idEdit' is a string, adjust the type accordingly
}
const Editor: React.FC = () => {
  const emailEditorRef = useRef<EditorRef>(null)
  const headerRef = useRef<EditorRef>(null)
  const history = useHistory()
  const [url, setUrl] = useState('')
  const { idEdit } = useParams<RouteParams>();

  console.log(idEdit)
  const exportHtml = async () => {
    try {
      const unlayer = emailEditorRef.current?.editor
      console.log(unlayer)
      unlayer?.exportHtml(async (htmlData) => {
        const { html } = htmlData
        const requestData = { content: html }
        unlayer?.saveDesign(async (designData: any) => {
          const designJSON = { designJSON: JSON.stringify(designData) }
          let filterUrl = url || ''
          if (filterUrl.endsWith('/')) {
            filterUrl = filterUrl.slice(0, -1)
          }
          const link = { url: filterUrl }
          const mergedData = { ...link, ...requestData, ...designJSON }
          console.log(mergedData)
          await axios.post(`users/update?id=${idEdit}`, mergedData)
          alert('Thay đổi thành công')
        })
      })
    } catch (error) {
      alert('Có lỗi xảy ra')
    }
  }
  

  const onLoad = async () => {
    try {
      const response = await axios.get(`auth/admin_edit?id=${idEdit}`)
      //console.log(htmlContent);
      console.log(response.data.message.url)
      emailEditorRef.current?.editor?.loadDesign(
        JSON.parse(response.data.message.designJSON),
      )
      setUrl(response.data.message.url)
    } catch (error) {
      console.error('Error fetching HTML content:', error)
    }
  }
  return (
    <div
      style={{ width: '100%', height: '100vh', display: 'flex', flexDirection: 'column' }}
    >
      <div>
        <Button variant="contained" color="primary" onClick={exportHtml}>
          Save Design
        </Button>
      </div>
      <div>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="username"
          value={url}
          onChange={(e) => {
            setUrl(e.target.value)
          }}
        />
      </div>
      <div style={{ flex: 1 }}>
        <EmailEditor ref={emailEditorRef} onLoad={onLoad} style={{ height: '90vh' }} />
      </div>
    </div>
  )
}

export default Editor
