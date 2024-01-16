import React, { useEffect, useState } from 'react';
import axios from '../../_config/AxiosConfig';
import { Checkbox } from '@material-ui/core';
import { Delete as DeleteIcon } from '@material-ui/icons';
import './Image.css'
import { LazyLoadImage, LazyLoadComponent } from 'react-lazy-load-image-component';
import { set } from 'lodash';
import copy from 'clipboard-copy';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
const ImageList = () => {
    const [images, setImages] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [isImageSelected, setIsImageSelected] = useState(false)
    const [imagePreviewSrc, setImagePreviewSrc] = useState('')
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [hoveredDateIndex, setHoveredDateIndex] = useState([]);
    const [selected, setSelected] = useState(false);
    const [filterOption, setFilterOption] = useState('date');
    const [selectedImages, setSelectedImages] = useState([]);
    const [deleteImage, setDeletaImage] = useState(true);
    const [confirmDelete, setConfirmDelete] = useState(false)
    const [isdelete, setisDelete] = useState(false)
    const [isCopy, setIsCopy] = useState(false)
    const [uploaded, setUploaded] = useState(null);
    const [freeSpace, setFreeSpace] = useState(null)
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
        const fetchFreeSpace = async () => {
            try {
                const data = await axios.get('/file-config/free_space')
                console.log(data.data.space)
                setFreeSpace(data.data.space)
            } catch (error) {
                console.error('Error fetching images:', error);
            }
        };
        fetchFreeSpace();
    }, [])
    const showImagePreview = (e) => {
        let selectedFile = e.target.files.item(0)
        console.log(selectedFile)
        if (selectedFile) {
            if (["image/jpeg", "image/png", "image/svg+xml", "video/mp4"].includes(selectedFile.type)) {
                let fileReader = new FileReader();
                fileReader.readAsDataURL(selectedFile);
                fileReader.addEventListener('load', (event) => {
                    setImagePreviewSrc(event.target.result)
                    setSelectedFile(selectedFile)
                    setIsImageSelected(true)
                })
            }
        } else {
            setIsImageSelected(false)
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                let response;
                if (filterOption === 'date') {
                    response = await axios.get('/file-config/file_image_by_date');
                } else if (filterOption === 'size') {
                    response = await axios.get('/file-config/file_image_by_size');
                }
                console.log(response.data.data);
                setImages(response.data.data);
            } catch (error) {
                console.error('Error fetching images:', error);
            }
        };
        fetchData();
    }, [filterOption]);

    const handleClickImage = async (name) => {
        const imageUrl = `http://tractorserver.myddns.me:8000/api/v1/file-config/get-image?filename=${name}`;
        window.open(imageUrl, '_blank');
    }
    const uploadImage = async () => {
        try {
            console.log(selectedFile.size)
            if (selectedFile.size >= freeSpace) {
                alert('Không đủ bộ nhớ để lưu trữ file này! Xin vui lòng xóa bớt')
                return
            }
            const formData = new FormData();
            formData.append('image', selectedFile)
           // formData.append('fileSize', selectedFile.size);

            let retryCount = 0;
            const maxRetries = 3;
            const retryInterval = 120000;
            const retryUpload = async (startByte = 0) => {
                try {
                    const response = await axios.post(`file-config/upload?filesize=${selectedFile.size}`, formData, {
                        onUploadProgress: (data) => {
                            setUploaded(Math.round((data.loaded / data.total) * 100));
                        },
                    });
                    retryCount = 0;
                    const imageUrl = response.data.data;
                    return imageUrl;
                } catch (error) {
                    console.error('Error uploading image:', error);
                    throw error;
                }
            };

            const retryUploadWithTimeout = async () => {
                try {
                    await retryUpload();
                } catch (error) {
                    if (retryCount < maxRetries) {
                        retryCount++;
                        console.log(`Retrying upload (attempt ${retryCount})...`);
                        setTimeout(retryUploadWithTimeout, retryInterval);
                    } else {
                        console.error(`Max retry attempts (${maxRetries}) reached. Upload failed.`);
                        setIsImageSelected(false);
                        setUploaded(null);
                        alert('upload fail');
                        throw error;
                    }
                }
            };
            await retryUploadWithTimeout();
        } catch (error) {
            console.error('Error uploading image:', error);
            throw error;
        }
    }; 
    const handleDeleteImage = async (id) => {
        // const response = await axios.delete(`/file-config/delete/${id}`);
        setConfirmDelete(true);
        setisDelete(true);

    }
    const handleConfirmDeleteImage = async (id) => {
        const rec = await axios.post(`/file-config/recycle/${id}`);
        console.log(rec)
        if (rec.status === 200) {
            alert('Xóa ảnh thành công')
            window.location.reload()
        }
        else if (rec.status === 201) {
            alert('Thùng rác đã đầy, Hãy xóa bớt!')
        }
        else {
            alert('Có lỗi xảy ra')
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
        //console.log(1111111)
        /* const response = await axios.delete('/file-config/delete/delete-multi', {
             data: { fileNames: selectedImages },
             headers: {
                 'Content-Type': 'application/json',
             },
         });
         */
        const rec = await axios.post('/file-config/recycle',
            { fileNames: selectedImages },
        );
        if (rec.status === 200) {
            alert('Xóa ảnh thành công')
            window.location.reload()
        }
        else if (rec.status === 201) {
            alert('Thùng rác đã đầy, Hãy xóa bớt!')
        }
        else {
            alert('Có lỗi xảy ra')
        }
    }
    const handleFilterChange = (event) => {
        setFilterOption(event.target.value);
    };
    const handleMouseDateEnter = (i, id) => {
        //setHoveredIndex(null)
        //setConfirmDelete(false)
        setHoveredDateIndex([i, id])
        setisDelete(false)
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
        setIsCopy(false)
    }
    const handleCopy = (filename) => {
        const url = `http://tractorserver.myddns.me:8000/api/v1/file-config/get-image?filename=${filename}`
        copy(url);
        setIsCopy(true)
        setisDelete(false)
    }
    useEffect(() => {
        console.log(uploaded)
        if (uploaded === 100) {
            const timeoutId = setTimeout(() => {
               alert('Upload thành công');
                window.location.reload()
            }, 500);
            return () => clearTimeout(timeoutId);
        }
    }, [uploaded])
    return (
        <div className='image-container'>
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <div className="upload-container" style={{ "width": "100%", "height": "100%" }}>
                            <div className="upload-item-preview" style={{ "width": "100%", "height": "100%" }}>
                                <div style={{ "width": "100%", "height": "100%" }}>
                                    {isImageSelected ?
                                        <>
                                            {selectedFile.type === 'video/mp4' ? (
                                                <video
                                                    src={imagePreviewSrc}
                                                    alt="..."

                                                    controls
                                                    style={{ "width": "200px", "height": "150px", "maxWidth": "100%", "maxHeight": "100%" }}
                                                />
                                            ) : (
                                                <img
                                                    src={imagePreviewSrc}
                                                    alt="..."
                                                    style={{ "width": "200px", "height": "150px", "maxWidth": "100%", "maxHeight": "100%" }}
                                                />
                                            )}
                                        </>
                                        :
                                        <svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" fill="currentColor"
                                            className=" " viewBox="0 0 16 16">
                                            <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                                            <path
                                                d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z" />
                                        </svg>
                                    }

                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="col-md-6">
                        <div className="upload-item-btn">
                            <div className="upload-item-input">
                                <h5 className="">Select an Image</h5>
                                <input type="file" className='mt-3' onChange={showImagePreview} />
                                {
                                isImageSelected && (
                                    <p className="mt-2">File Size: {formatFileSize(selectedFile.size)}</p>
                                )
                                }
                            </div>
                            <button style={{ "marginLeft": "0", "border": "0.8px solid", "borderRadius": "2px" }} onClick={uploadImage}>Upload</button>
                            {
                            freeSpace &&
                                <div>Dung lượng ổ đĩa còn lại: <span style={{ "fontWeight": "bold" }}>{formatFileSize(freeSpace)}</span></div>
                            }

                            {uploaded && (
                                <div className="progress mt-2">
                                    <div
                                        className="progress-bar"
                                        role="progressbar"
                                        aria-valuenow={uploaded}
                                        aria-valuemin="0"
                                        aria-valuemax="100"
                                        style={{ width: `${uploaded}%` }}
                                    >
                                        {`${uploaded}%`}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <button onClick={() => handleClickSelect()}>Chọn</button>
            {
                selected &&
                <button onClick={() => handMultiDelete()}>Xóa</button>
            }

            <select value={filterOption} onChange={handleFilterChange}>
                <option value="date">Sắp theo theo ngày</option>
                <option value="size">Sắp xếp theo kích thước ảnh</option>
            </select>
            {filterOption == "size" &&
                <div className="image-list-container">
                    {images.map((image, index) => (
                        <div
                            key={index}
                            className={`image-item `}
                            onMouseEnter={() => handleMouseSizeEnter(index)}
                            onMouseLeave={() => handleMouseLeave()}
                        >
                            <LazyLoadComponent>
                                {image.fileName?.endsWith('.mp4') ? (

                                    <video
                                        src={`http://tractorserver.myddns.me:8000/api/v1/file-config/get-image?filename=${image.fileName}`}
                                        preload="metadata"

                                        controls
                                        className="enlarge-hover"
                                    />
                                ) : (
                                    <img
                                        src={`http://tractorserver.myddns.me:8000/api/v1/file-config/get-image?filename=${image.fileName}`}
                                        alt={`Image ${index}`}
                                        effect="blur"
                                        className="enlarge-hover"
                                    />
                                )}
                            </LazyLoadComponent>


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
                                                        <ContentPasteIcon onClick={() => handleCopy(image.fileName)} />
                                                    </div>
                                                </div>
                                            )}
                                            {isCopy && (
                                                <div className="isCopy">
                                                    <span>Đã copy đường dẫn!</span>
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
            {filterOption == "date" &&
                <div>
                    {images.map((item, i) => (
                        <div key={i} className='image-date-container' style={{ "border": "1px solid #ccc", "marginBottom": "20px", "padding": '5px' }}>
                            <span style={{ "fontSize": "20px", "fontWeight": "bold" }}>{item.date}</span>
                            <div className="image-list-container" style={{ "border": "none" }}>
                                {item.images?.map((image, index) => (
                                    <div
                                        key={index}
                                        className={`image-item `}
                                        onMouseEnter={() => handleMouseDateEnter(i, index)}
                                        onMouseLeave={() => handleMouseLeave()}
                                    >
                                        <LazyLoadComponent>
                                            {image.fileName?.endsWith('.mp4') ? (
                                                <video
                                                    src={`http://tractorserver.myddns.me:8000/api/v1/file-config/get-image?filename=${image.fileName}`}
                                                    preload="metadata"
                                                    controls
                                                    className="enlarge-hover"
                                                />
                                            ) : (
                                                <img
                                                    src={`http://tractorserver.myddns.me:8000/api/v1/file-config/get-image?filename=${image.fileName}`}
                                                    alt={`Image ${index}`}
                                                    effect="blur"
                                                    className="enlarge-hover"
                                                />
                                            )}
                                        </LazyLoadComponent>

                                        <div className='checkbox'>
                                            {selected &&
                                                <Checkbox
                                                    checked={selectedImages.includes(image.fileName)}
                                                    onChange={() => toggleCheckbox(image.fileName)}
                                                />
                                            }
                                        </div>
                                        {
                                            deleteImage &&
                                            <>
                                                {
                                                    hoveredDateIndex && hoveredDateIndex[0] === i && hoveredDateIndex[1] === index &&
                                                    (
                                                        <div>
                                                            {isdelete == false && (
                                                                <div className="delete-button">
                                                                    <div className='delete_icon'>
                                                                        <DeleteIcon onClick={() => handleDeleteImage(image.fileName)} />
                                                                    </div>
                                                                    <div className='copy_icon'>
                                                                        <ContentPasteIcon onClick={() => handleCopy(image.fileName)} />
                                                                    </div>
                                                                </div>
                                                            )}
                                                            {isCopy && (
                                                                <div className="isCopy">
                                                                    <span>Đã copy đường dẫn!</span>
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
                                                    )
                                                }
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

export default ImageList;
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