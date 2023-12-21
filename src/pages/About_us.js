import React, { useEffect, useState } from "react";
import axios from "../_config/AxiosConfig";
import { useParams } from 'react-router-dom';
const Aboutus = () => {
  const [data, setData] = useState(null);
  

  const currentUrl = window.location.href;
  console.log(currentUrl)
  const modifiedUrl = currentUrl.replace(/#/g, '%23');
    //console.log(1111111111111111111)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(`auth/editcontent?url=${modifiedUrl}`);
        
        console.log(result)
       setData(result.data.message.content);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{margin:"200px auto", maxWidth:"1000px", }}>
    <div dangerouslySetInnerHTML={{ __html: data }} />
  </div>
  );
};

export default Aboutus;
