import React, { useEffect, useState } from 'react';
import axios from '../../_config/AxiosConfig';
import {  Checkbox,   } from '@material-ui/core';
import {  Delete as DeleteIcon } from '@material-ui/icons';
//import './Image.css'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import SettingsBackupRestoreIcon from '@mui/icons-material/SettingsBackupRestore';
// /import { Edit as EditIcon, Delete as DeleteIcon } from '@material-ui/icons';
const Recycle = () => {
    const [images, setImages] = useState([]);
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [hoveredDateIndex, setHoveredDateIndex] = useState([]);
    const [selected, setSelected] = useState(false);
    const [filterOption, setFilterOption] = useState('date');
    const [selectedImages, setSelectedImages] = useState([]);
    const [deleteImage, setDeletaImage] = useState(true);
    const [size, setSize] = useState(0)
    const [confirmDelete, setConfirmDelete] = useState(false)
    const [isdelete, setisDelete] = useState(false)

    const toggleCheckbox = (index) => {
        const isSelected = selectedImages.includes(index);
        const newSelectedImages = isSelected
            ? selectedImages.filter((selected) => selected !== index)
            : [...selectedImages, index];
        setSelectedImages(newSelectedImages);
        //console.log(selectedImages)
    };
    useEffect(() => {
        console.log(selectedImages)
    }, [selectedImages])

    useEffect(() => {
        const fetchData = async () => {
            try {
                let response;
                if (filterOption === 'date') {
                    response = await axios.get('/file-config/recycle_by_date');
                } else if (filterOption === 'size') {
                    response = await axios.get('/file-config/recycle_by_size');
                }
                //console.log(response.data.size);
                setImages(response.data.data);
                setSize(response.data.size)
            } catch (error) {
                console.error('Error fetching images:', error);
            }
        };
        fetchData();
    }, [filterOption]);

    const handleDeleteImage = async (id) => {
        // const response = await axios.delete(`/file-config/delete/${id}`);
        setConfirmDelete(true)
        setisDelete(true)
    }
    const handleConfirmDeleteImage = async (id) => {
        // const isConfirmed = window.confirm('Bạn có chắc chắn muốn xóa ảnh này?');
        try {
            const response = await axios.delete(`/file-config/delete/${id}`);
            console.log(response);
            if (response.status === 200) {
                alert('Xóa ảnh thành công');
                window.location.reload();
            } else {
                alert('Có lỗi xảy ra');
            }
        } catch (error) {
            console.error('Lỗi khi xóa ảnh:', error);
            alert('Có lỗi xảy ra');
        }
    }
    const handleUnconfirmDelete = () => {
        setConfirmDelete(false)
        setisDelete(false)
    }
    const handleClickSelect = () => {
        setDeletaImage(!deleteImage)
        setSelected(!selected)
    }
    const handMultiDelete = async () => {
        const response = await axios.delete('/file-config/delete/delete-multi', {
            data: { fileNames: selectedImages },
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.status === 200) {
            alert('Xóa ảnh thành công')
            window.location.reload()
        }
        else {
            alert('Có lỗi xảy ra')
        }
    };

    const handleFilterChange = (event) => {
        setFilterOption(event.target.value);
    };

    const handleRestore = async (id) => {
        const response = await axios.post(`/file-config/restore/${id}`);
        //const rec = await axios.post(`/file-config/recycle/${id}`);
        console.log(response)
        if (response.status === 200) {
            alert('Khôi phục ảnh thành công')
            window.location.reload()
        }
        else {
            alert('Có lỗi xảy ra')
        }
    }

    const handleMultiRestore = async () => {
        const response = await axios.post('/file-config/restore',
            { fileNames: selectedImages },
        );
        if (response.status === 200) {
            alert('Khôi phục ảnh thành công')
            window.location.reload()
        }
        else {
            alert('Có lỗi xảy ra')
        }
    }
    const handleMouseDateEnter = (i, id) => {
        //setHoveredIndex(null)
        //setConfirmDelete(false)
        setHoveredDateIndex([i, id])
    }
    const handleMouseSizeEnter = (id) => {
        setHoveredIndex(id)
        setisDelete(false)
        //setConfirmDelete(false)
        //setHoveredDateIndex(null)
    }
    const handleMouseLeave = () => {
        setHoveredIndex(null)
        setConfirmDelete(false)
        setHoveredDateIndex(null)
    }

    return (
        <div className='image-container'>
            <div className='header-tool'>
                <div>
                    <button onClick={() => handleClickSelect()}>Chọn</button>
                    {
                        selected &&
                        <>
                            <button onClick={() => handMultiDelete()}>Xóa</button>
                            <button onClick={() => handleMultiRestore()}>Khôi phục</button>
                        </>
                    }
                    <select value={filterOption} onChange={handleFilterChange}>
                        <option value="date">Sắp theo theo ngày</option>
                        <option value="size">Sắp xếp theo kích thước ảnh</option>
                    </select>
                </div>
                <div>
                    Dung lượng thùng rác: <span style={{ "fontWeight": "bold", "fontSize": "20px" }}> {formatFileSize(size)}</span>
                </div>
            </div>

            {filterOption == "size" &&
                <div className="image-list-container">
                    {images.map((image, index) => (
                        <div
                            key={index}
                            className={`image-item ${hoveredIndex === index ? 'blurred' : ''}`}
                            onMouseEnter={() => handleMouseSizeEnter(index)}
                            onMouseLeave={() => handleMouseLeave}
                        >
                            {image.fileName?.endsWith('.mp4') ? (
                                <video
                                    src={`http://tractorserver.myddns.me:8000/api/v1/file-config/get-recycle?filename=${image.fileName}`}
                                    controls
                                    className="enlarge-hover"
                                />
                            ) : (
                                <LazyLoadImage
                                    src={`http://tractorserver.myddns.me:8000/api/v1/file-config/get-recycle?filename=${image.fileName}`}
                                    alt={`Image ${index}`}
                                    effect="blur"
                                    className="enlarge-hover"
                                />
                            )}
                            <div className='checkbox'>
                                {selected &&
                                    <Checkbox
                                        checked={selectedImages.includes(image.fileName)}
                                        onChange={() => toggleCheckbox(image.fileName)}
                                    />
                                }
                            </div>
                            {deleteImage &&
                                <>
                                    {hoveredIndex === index && (
                                        <div>
                                            {isdelete == false && (
                                                <div className="delete-button">
                                                    <div className='delete_icon'>
                                                        <DeleteIcon onClick={() => handleDeleteImage(image.fileName)} />
                                                    </div>
                                                    <div className='copy_icon'>
                                                        <SettingsBackupRestoreIcon onClick={() => handleRestore(image.fileName)} />
                                                    </div>
                                                </div>
                                            )}
                                            {confirmDelete && (
                                                <div className="confirm-delete">
                                                    <div className="confirmation-container">
                                                        <div>
                                                            <span style={{ "fontWeight": "bold" }}>Xác nhận xóa ảnh này?</span>
                                                        </div>
                                                        <div>
                                                            <button style={{ "border": "1px solid", "borderRadius": "5px", }} onClick={() => handleConfirmDeleteImage(image.fileName)}>Xóa</button>
                                                            <button style={{ "border": "1px solid", "borderRadius": "5px", }} onClick={() => handleUnconfirmDelete()}>Hủy</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </>
                            }
                        </div>
                    ))}
                </div>
            }

            {
                filterOption == "date" &&
                <div>
                    {images.map((item, i) => (
                        <div key={i} className='image-date-container' style={{ "border": "1px solid #ccc", "marginBottom": "20px", "padding": '5px' }}>
                            <span style={{ "fontSize": "20px", "fontWeight": "bold" }}>{item.date}</span>
                            <div className="image-list-container" style={{ "border": "none" }}>
                                {item.images?.map((image, index) => (
                                    <div
                                        key={index}
                                        className={`image-item ${hoveredIndex === index ? 'blurred' : ''}`}
                                        onMouseEnter={() => handleMouseDateEnter(i, index)}
                                        onMouseLeave={() => handleMouseLeave}
                                    >
                                        {
                                        image.fileName?.endsWith('.mp4') ? (
                                            <video
                                                src={`http://tractorserver.myddns.me:8000/api/v1/file-config/get-recycle?filename=${image.fileName}`}
                                                controls
                                                className="enlarge-hover"
                                            />
                                        ) : (
                                            <LazyLoadImage
                                                src={`http://tractorserver.myddns.me:8000/api/v1/file-config/get-recycle?filename=${image.fileName}`}
                                                alt={`Image ${index}`}
                                                effect="blur"
                                                className="enlarge-hover"
                                            />
                                        )
                                        }
                                        <div className='checkbox'>
                                            {selected &&
                                                <Checkbox
                                                    checked={selectedImages.includes(image.fileName)}
                                                    onChange={() => toggleCheckbox(image.fileName)}
                                                />
                                            }
                                        </div>
                                        {deleteImage &&
                                            <>
                                                {hoveredDateIndex && hoveredDateIndex[0] === i && hoveredDateIndex[1] === index && (
                                                    <div>
                                                        {isdelete == false && (
                                                            <div className="delete-button">
                                                                <div className='delete_icon'>
                                                                    <DeleteIcon onClick={() => handleDeleteImage(image.fileName)} />
                                                                </div>
                                                                <div className='copy_icon'>
                                                                    <SettingsBackupRestoreIcon onClick={() => handleRestore(image.fileName)} />
                                                                </div>
                                                            </div>
                                                        )}

                                                        {confirmDelete && (
                                                            <div className="confirm-delete">
                                                                <div className="confirmation-container">
                                                                    <div>
                                                                        <span style={{ "fontWeight": "bold" }}>Xác nhận xóa ảnh này?</span>
                                                                    </div>
                                                                    <div>
                                                                        <button style={{ "border": "1px solid", "borderRadius": "5px", }} onClick={() => handleConfirmDeleteImage(image.fileName)}>Xóa</button>
                                                                        <button style={{ "border": "1px solid", "borderRadius": "5px", }} onClick={() => handleUnconfirmDelete()}>Hủy</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                )}
                                            </>
                                        }
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            }
        </div>
    );
};

export default Recycle;
const formatFileSize = (sizeInBytes) => {
    const kilobyte = 1024;
    const megabyte = kilobyte * 1024;
    const gigabyte = megabyte * 1024;

    if (sizeInBytes < kilobyte) {
        return sizeInBytes + ' B';
    } else if (sizeInBytes < megabyte) {
        return (sizeInBytes / kilobyte).toFixed(2) + ' KB';
    } else if (sizeInBytes < gigabyte) {
        return (sizeInBytes / megabyte).toFixed(2) + ' MB';
    } else {
        return (sizeInBytes / gigabyte).toFixed(2) + ' GB';
    }
};