import React, { useEffect, useState } from "react";
import axios from "../_config/AxiosConfig";
import Listcontent from "./List_content";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Add as AddIcon} from '@material-ui/icons';
import { useHistory } from "react-router-dom";
import './index.css'
import { useSelector } from 'react-redux'
const Info = () => {
    const [data, setData] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const history = useHistory()
    const isAdmin = useSelector((state) => state.authStatus.isAdmin);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios.get('auth/infomation');
                setData(result.data.message);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data?.slice(indexOfFirstItem, indexOfLastItem);
    console.log(currentItems)
    const totalPages = Math.ceil(data?.length / itemsPerPage);
    console.log(totalPages)
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    const renderPreviousIcon = () => {
        if (currentPage === 1) {
            return null;
        }
        return (
            <div onClick={() => paginate(currentPage - 1)} style={{ cursor: 'pointer' }}>
                <ArrowBackIosNewIcon />
            </div>
        );
    };

    const renderNextIcon = () => {
        if (currentPage === totalPages) {
            return null;
        }
        return (
            <div onClick={() => paginate(currentPage + 1)} style={{ cursor: 'pointer' }}>
                <ArrowForwardIosIcon />
            </div>
        );
    };
    const handleAddcontent = ()=>{
        history.push('/administration/edit')
    }

    return (
        <div className="parent_container">
            <div className="info_container" >
                {currentItems && (
                    <ul >
                        {currentItems.map((item) => (
                            <li key={item.id} style={{ color: 'black' }}>
                                <Listcontent url={item.url} id={item._id} content={item.content} date ={item.createdAt} />
                            </li>
                        ))}
                    </ul>
                )}

             {isAdmin&&(
             <div className="addIcon" onClick={handleAddcontent}>
                    <AddIcon/>
                </div>
                )}
                
            </div>
            <div className="footer_container">
                <div className="page-info"> {currentPage} / {totalPages}</div>
                <div className="page-icons">
                    {renderPreviousIcon()}

                    {renderNextIcon()}
                </div>

            </div>
        </div>
    );
};

export default Info;
