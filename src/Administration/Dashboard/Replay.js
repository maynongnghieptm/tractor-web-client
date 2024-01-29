import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import MapContainer1 from './Dashboard_realtime';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import PauseIcon from '@mui/icons-material/Pause';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import './style.css'
const Replay = () => {
    const [socketData, setSocketData] = useState([]);
    const [replay, setReplay] = useState(false);
    const token = localStorage.getItem('accessToken')
    const [offset, setOffSet] = useState(0);
    const [play, setPlay] = useState(true);
    const [intervalId, setIntervalId] = useState(null);
    const [line, setLine] = useState([]);
    const [file, setFile] = useState(null);
    const [slideValue, setSlideValue] = useState(0);
    function handleFileChange(event) {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = function (e) {
            const content = e.target.result;
            const lines = content.split(/\n/);
            let lineIndex = 0;
            const intervalId = setInterval(() => {
                console.log(lines.length)
                if (lineIndex < lines.length) {
                    const line = lines[lineIndex];
                    try {
                        const jsonData = JSON.parse(line);
                        setSocketData([jsonData]);
                    } catch (error) {
                        console.error('Error parsing JSON:', error);
                    }
                    lineIndex++;
                    console.log(lineIndex)
                } else {
                    // Stop the interval when all lines have been processed
                    clearInterval(intervalId);
                }
            }, 100); // Interval of 100 milliseconds (10Hz)
        };
        reader.readAsText(file);
    }


    function handleFileChange(event) {
        const file = event.target.files[0];
        // console.log(file)
        const reader = new FileReader();
        reader.onload = function (e) {
            const content = e.target.result;
            const lines = content.split(/\n/);
            setLine(lines)
        };
        reader.readAsText(file);
    }

    const handlePlay = () => {
        setPlay(!play)
    }

    useEffect(() => {
        if (play === true) {
            let lineIndex = offset
            const newIntervalId = setInterval(() => {
                if (lineIndex < line.length) {
                    const a = line[lineIndex];
                    console.log(true)
                    try {
                        const jsonData = JSON.parse(a);
                        //console.log(jsonData)
                        setSocketData([jsonData]);
                    } catch (error) {
                        console.error('Error parsing JSON:', error);
                    }
                    lineIndex++
                    setOffSet(lineIndex
                    );
                    setSlideValue(lineIndex / (line.length / 100))
                } else {
                    clearInterval(newIntervalId);
                    setFile(null);
                    setPlay(false);
                }
            }, 100);
            setIntervalId(newIntervalId);
        } else {
            console.log('pause')
            clearInterval(intervalId);
        }
    }, [play])
    const handleSliderChange = (event, newValue) => {
        setPlay(false)
        setSlideValue(newValue);
        const newOffset = Math.round((newValue / 100) * (line.length - 1));
        setOffSet(newOffset);
    };

    return (
        < > 
            <div className='control_slide' style={{ position: 'absolute', top: "10px", left: "50%", zIndex: 3000, display: "flex", flexDirection: "column", justifyItems: "center", alignItems: "center" }}>
                <input type='file' onChange={handleFileChange} />
            </div>
            <div lassName='control_slide_item' style={{position: 'absolute', bottom: "50px",width:"100%", zIndex: 3000,display:"flex",justifyContent:"center",  alignItems:"center"  }} >
                    <div style={{ width: "90%",display: "flex", alignItems: "center", justifyItems: "center", flexDirection: "column", backgroundColor:"white", borderRadius:"20px" }}>
                        <Box sx={{ width: "90%" }}>
                            <Slider defaultValue={0} value={slideValue} aria-label="Default" valueLabelDisplay="auto" onChange={handleSliderChange} color="secondary" />
                        </Box>
                        <div>
                        {!play ? (
                            <PlayCircleIcon
                                onClick={handlePlay}
                                fontSize='large'
                                
                            />
                        ) : (
                            <PauseIcon
                                onClick={handlePlay}
                                fontSize='large'
                            />
                        )}
                    </div>
                    </div>
                    
                </div>
            <MapContainer1 data={socketData} style={{ width: '100vw', height: '100vh', position: 'relative', zIndex: 2000 }} />
        </>
    );
}

export default Replay;
