import { useEffect, useState } from "react";
import { io } from "socket.io-client";
const Video = ({ id }) => {
    //var url = "ws://192.168.1.7:4649/Echo";
    const token = localStorage.getItem("accessToken")
    const [socket1, setSocket1] = useState({})
    const [Mode, setMode] = useState(0)
    const [So_cang, setSo_cang] = useState(0)
    const [Max_rpm, setMax_rpm] = useState(0)
    const [Min_rpm, setMin_rpm] = useState(0)
    const [Tam_de, setTam_de] = useState(0)
    const [Chinh_nghieng, setChinh_nghieng] = useState(0)
    const [Led, setLed] = useState(0)
    const [So_phu_max, setSo_phu_max] = useState(0)
    const [Reset_Err, setReset_Err] = useState(0)
    const [isUserInput, setIsUserInput] = useState(false);
    const [stateInput, setStateInput] = useState(0);
    const [isInputEvent, setIsInputEvent] = useState(true)
    const [state, setState] = useState({
        Mode: 0,
        So_cang: 0,
        Max_rpm: 0,
        Min_rpm: 0,
        Tam_de: 0,
        Chinh_nghieng: 0,
        Led: 0,
        So_phu_max: 0,
        Reset_Err: 0,
    })

    useEffect(() => {
        const socket = io('http://tractorserver.myddns.me:3001', {
            extraHeaders: {
                // tractorid: '64e2241bf3ea921e3f7855bb',
                token: token,
            },
        });
        setSocket1(socket)
        // console.log(`${id}`)
        socket.on(`${id}-state`, (log) => {
             console.log(log);
            const parseData = JSON.parse(log);

            //

            //console.log(parseData.data.led1)
            setMode(parseInt(parseData.data.mode_run_c))
            setSo_cang(parseInt(parseData.data.so_cang_max))
            setMax_rpm(parseInt(parseData.data.max_rpm_c))
            setMin_rpm(parseInt(parseData.data.min_rpm_c))
            setTam_de(parseInt(parseData.data.tam_de))
            setChinh_nghieng(parseInt(parseData.data.nghieng))
            setLed(parseInt(parseData.data.led1))
            setSo_phu_max(parseInt(parseData.data.phumax))
            setReset_Err(parseInt(parseData.data.reset_er_c))
            // setState(parseData.data)
            // setData(parseData);

        });

        return () => {
            socket.off(`state-tractor`);
        };
    }, []);


    var url =
        "ws://tractorserver.myddns.me:8080/echo";
    //"ws://tractorserver.myddns.me:4649/";
    var output;
    const CUSTOM_TOPIC = Math.floor(Math.random() * 1000);
    function millis() {
        return Date.now();
    }

    function init() {
        output = document.getElementById("output");
        doWebSocket();
    }

    var intervalId_reconnect = null;
    function doWebSocket() {
        if (intervalId_reconnect != null) {
            intervalId_reconnect = null;
        }
        lasttime_receive_data = 0;
        if (intervalId_reconnect == null) {
            intervalId_reconnect = setInterval(reconnect, 200);
        }
    }

    var lasttime_receive_data = 0;
    var websocket = null;
    var CONNECTED_OK = false;

    function reconnect() {
        // Thử kết nối lại sau khoảng thời gian nhất định
        if (
            websocket == null ||
            (millis() > lasttime_receive_data)) {
            if (websocket != null) {
                websocket.close();
                websocket = null;
                CONNECTED_OK = false;
            }
            lasttime_receive_data = millis() + 3000;
            if (websocket == null) {
                //  console.log('Đang thử kết nối lại...');
                websocket = new WebSocket(url); // Thay thế bằng URL của máy chủ WebSocket mới
                websocket.binaryType = 'arraybuffer';
                websocket.onopen = function (e) {
                    {
                        console.log('Kết nối WebSocket đã được thiết lập (kết nối lại).');
                        //    websocket = newSocket; // Cập nhật đối tượng WebSocket với kết nối mới
                        onOpen(e);
                        CONNECTED_OK = true;
                    };
                    websocket.onmessage = function (e) {
                        onMessage(e);
                    };
                    websocket.onerror = function (e) {
                        CONNECTED_OK = false;
                        onError(e);
                        websocket = null;
                    };
                    websocket.onclose = function (e) {
                        CONNECTED_OK = false;
                        onClose(e);
                        websocket = null;
                    };
                }
            }
        }

    }
    var count = 0;
    var intervalId = null;
    var speed_bytes_per_s = 0;
    function tick() {
        let mang_du_lieu = [];
        for (let i = 0; i < 5; i++) {
            mang_du_lieu[i] = 'a';
        }
        var date = new Date();
        var seconds = date.getSeconds();
        var timeString = seconds.toString().padStart(2, '0');
        // var textarea = document.getElementById("myTextarea");
        var duLieu = 0;
        send(JSON.stringify({ topic: "123" + duLieu, speed: timeString + "-" + speed_bytes_per_s }));
        //send ("abcd123efgh" ); 
        count++;

    }
    function onOpen(event) {
        writeToScreen("CONNECTED");
        if (intervalId != null) {
            clearInterval(intervalId);
            intervalId = null;
        }
        if (intervalId == null) {
            // Bắt đầu vòng lặp tick
            intervalId = setInterval(tick, 1000);
        }
    }

    var last_time = 0;
    var count_size_rev = 0;
    var count_rec = 0;
    function onMessage(event) {
        //document.getElementById("demo_TPOCI").innerHTML = ("REV_" + count_rec + ":" +event.data);
        count_rec++;
        //console.log("data RECEIVE="+ event.data);
        var bytearray = new Uint8Array(event.data);
        lasttime_receive_data = millis() + 3000;
        console.log("lengh=" + bytearray.length);
        if (bytearray != null && bytearray.length > 1) {
            decodeArrayBuffer(bytearray);//event.data);
            let denta_time = millis() - last_time;
            count_size_rev += bytearray.length;
            if (denta_time >= 2000) {
                last_time = millis();
                speed_bytes_per_s = Math.floor((1000 * count_size_rev) / denta_time);
                count_size_rev = 0;
                let inputElement = document.getElementById("echo_message");
                // Set the value of the input element
                //  inputElement.innerHTML  = '<span style="color: blue;">RESPONSE: ' + speed_bytes_per_s + '</span>';
            }
        }
        //websocket.close ();
    }

    function onError(event) {
        writeToScreen('<span style="color: red;">ERROR: ' + event.data + '</span>');
        if (intervalId != null) {
            clearInterval(intervalId);
            intervalId = null;
        }
    }

    function onClose(event) {
        writeToScreen("DISCONNECTED");

        if (intervalId != null) {
            clearInterval(intervalId);
            intervalId = null;
        }
    }

    function send(message) {
        if (websocket != null && CONNECTED_OK) {
            // console.log("senddd")
            websocket.send(message);
        }
    }

    function writeToScreen(message) {
        /*
          var pre = document.createElement ("p");
          pre.style.wordWrap = "break-word";
          pre.innerHTML = message;
          output.appendChild (pre);
          */
    }
    //window.addEventListener ("load", init, false);
    function decodeArrayBuffer(buffer) {
        var mime;
        var a = new Uint8Array(buffer);
        var nb = a.length;
        if (nb < 4)
            return null;
        var b0 = a[0];
        var b1 = a[1];
        var b2 = a[2];
        var b3 = a[3];
        if (b0 == 0x89 && b1 == 0x50 && b2 == 0x4E && b3 == 0x47)
            mime = 'image/png';
        else if (b0 == 0xff && b1 == 0xd8)
            mime = 'image/jpeg';
        else if (b0 == 0x47 && b1 == 0x49 && b2 == 0x46)
            mime = 'image/gif';
        else
            return null;
        var binary = "";
        for (var i = 0; i < nb; i++) {
            binary += String.fromCharCode(a[i]);
        }
        const canvas_div = document.getElementById('canvas_div');
        var base64 = window.btoa(binary);
        var image = new Image();
        image.onload = () => {
            // Get a reference to the canvas element
            const canvas = document.getElementById('canvas');
            canvas.width = canvas_div.offsetWidth
            canvas.height = canvas_div.offsetHeight
            // Get the 2D rendering context of the canvas
            const context = canvas.getContext('2d');
            // Draw the image on the canvas
            context.drawImage(image, 0, 0, canvas.width, canvas.height);
        };;//onLoad;
        image.src = 'data:' + mime + ';base64,' + base64;
        return image;
    }

    function layDuLieu() {
        doWebSocket();
    }

    useEffect(() => {
        layDuLieu()
    }, [])



    const handleChange = (e) => {
        if (isInputEvent) {
            console.log("onChange event");

        }
    };

    const handleInputMode = (e) => {
        setIsInputEvent(false);
        setMode(e.target.value);
        let string = '{"data":{   "reset_er_c":"' + Reset_Err
        + '" ,"min_rpm_c":"' + Min_rpm
        + '" ,"max_rpm_c":"' + Max_rpm 
        + '" ,"mode_run_c":"' + e.target.value
        + '" ,"so_cang_max":"' +So_cang 
        + '" ,"tam_de":"' + Tam_de 
        + '" ,"nghieng":"' + Chinh_nghieng 
        + '" ,"led1":"' + Led 
        + '" ,"phumax":"' +So_phu_max 
        + '"  }}'
       
        const data = {
            tractorId: id,
            state: string
        }
        socket1.emit(`sate-tractor-all`, data);
        //console.log(e.target.value);
        //setIsInputEvent(false);
    };
    const handleInputMax_rpm = (e) => {
        setIsInputEvent(false);
        setMax_rpm(e.target.value);
       // console.log(e.target.value);
        let string = '{"data":{   "reset_er_c":"' + Reset_Err
        + '" ,"min_rpm_c":"' + Min_rpm
        + '" ,"max_rpm_c":"' + e.target.value 
        + '" ,"mode_run_c":"' + Mode
        + '" ,"so_cang_max":"' +So_cang 
        + '" ,"tam_de":"' + Tam_de 
        + '" ,"nghieng":"' + Chinh_nghieng 
        + '" ,"led1":"' + Led 
        + '" ,"phumax":"' +So_phu_max 
        + '"  }}'
       
        const data = {
            tractorId: id,
            state: string
        }
        socket1.emit(`sate-tractor-all`, data);
        //setIsInputEvent(false);
    };
    const handleInputMin_rpm = (e) => {
        setIsInputEvent(false);
        setMin_rpm(e.target.value);
       
        let string = '{"data":{   "reset_er_c":"' + Reset_Err
        + '" ,"min_rpm_c":"' + e.target.value
        + '" ,"max_rpm_c":"' + Max_rpm
        + '" ,"mode_run_c":"' + Mode
        + '" ,"so_cang_max":"' +So_cang 
        + '" ,"tam_de":"' + Tam_de 
        + '" ,"nghieng":"' + Chinh_nghieng 
        + '" ,"led1":"' + Led 
        + '" ,"phumax":"' +So_phu_max 
        + '"  }}'
       
        const data = {
            tractorId: id,
            state: string
        }
        socket1.emit(`sate-tractor-all`, data);
        //setIsInputEvent(false);
    };
    const handleInputSo_cang = (e) => {
        setIsInputEvent(false);
        setSo_cang(e.target.value);
        
        let string = '{"data":{   "reset_er_c":"' + Reset_Err
        + '" ,"min_rpm_c":"' + Min_rpm
        + '" ,"max_rpm_c":"' + Max_rpm
        + '" ,"mode_run_c":"' + Mode
        + '" ,"so_cang_max":"' + e.target.value
        + '" ,"tam_de":"' + Tam_de 
        + '" ,"nghieng":"' + Chinh_nghieng 
        + '" ,"led1":"' + Led 
        + '" ,"phumax":"' +So_phu_max 
        + '"  }}'
       
        const data = {
            tractorId: id,
            state: string
        }
        socket1.emit(`sate-tractor-all`, data);
        //setIsInputEvent(false);
    };
    const handleInputTam_de = (e) => {
        setIsInputEvent(false);
        setTam_de(e.target.value);
        console.log(e.target.value);
        let string = '{"data":{   "reset_er_c":"' + Reset_Err
        + '" ,"min_rpm_c":"' + Min_rpm
        + '" ,"max_rpm_c":"' + Max_rpm
        + '" ,"mode_run_c":"' + Mode
        + '" ,"so_cang_max":"' + So_cang
        + '" ,"tam_de":"' + e.target.value 
        + '" ,"nghieng":"' + Chinh_nghieng 
        + '" ,"led1":"' + Led 
        + '" ,"phumax":"' +So_phu_max 
        + '"  }}'
       
        const data = {
            tractorId: id,
            state: string
        }
        socket1.emit(`sate-tractor-all`, data);
        //setIsInputEvent(false);
    };
    const handleInputDen = (e) => {
        setIsInputEvent(false);
        setLed(e.target.value);
        console.log(e.target.value);
        let string = '{"data":{   "reset_er_c":"' + Reset_Err
        + '" ,"min_rpm_c":"' + Min_rpm
        + '" ,"max_rpm_c":"' + Max_rpm
        + '" ,"mode_run_c":"' + Mode
        + '" ,"so_cang_max":"' + So_cang
        + '" ,"tam_de":"' + Tam_de
        + '" ,"nghieng":"' + Chinh_nghieng 
        + '" ,"led1":"' + e.target.value 
        + '" ,"phumax":"' +So_phu_max 
        + '"  }}'
       
        const data = {
            tractorId: id,
            state: string
        }
        socket1.emit(`sate-tractor-all`, data);
        //setIsInputEvent(false);
    };
    const handleInputSophu = (e) => {
        setIsInputEvent(false);
        setSo_phu_max(e.target.value);
        console.log(e.target.value);
        let string = '{"data":{   "reset_er_c":"' + Reset_Err
        + '" ,"min_rpm_c":"' + Min_rpm
        + '" ,"max_rpm_c":"' + Max_rpm
        + '" ,"mode_run_c":"' + Mode
        + '" ,"so_cang_max":"' + So_cang
        + '" ,"tam_de":"' + Tam_de
        + '" ,"nghieng":"' + Chinh_nghieng 
        + '" ,"led1":"' + Led 
        + '" ,"phumax":"' + e.target.value 
        + '"  }}'
       
        const data = {
            tractorId: id,
            state: string
        }
        socket1.emit(`sate-tractor-all`, data);
        //setIsInputEvent(false);
    };
    const handleInputReset_Err = (e) => {
        setIsInputEvent(false);
        setReset_Err(e.target.value);
        console.log(e.target.value);
        let string = '{"data":{   "reset_er_c":"' + e.target.value
        + '" ,"min_rpm_c":"' + Min_rpm
        + '" ,"max_rpm_c":"' + Max_rpm
        + '" ,"mode_run_c":"' + Mode
        + '" ,"so_cang_max":"' + So_cang
        + '" ,"tam_de":"' + Tam_de
        + '" ,"nghieng":"' + Chinh_nghieng 
        + '" ,"led1":"' + Led 
        + '" ,"phumax":"' + So_phu_max
        + '"  }}'
       
        const data = {
            tractorId: id,
            state: string
        }
        socket1.emit(`sate-tractor-all`, data);
        //setIsInputEvent(false);
    };
    const handleInputNghieng = (e) => {
        setIsInputEvent(false);
        setChinh_nghieng(e.target.value);
        console.log(e.target.value);
        let string = '{"data":{   "reset_er_c":"' + Reset_Err
        + '" ,"min_rpm_c":"' + Min_rpm
        + '" ,"max_rpm_c":"' + Max_rpm
        + '" ,"mode_run_c":"' + Mode
        + '" ,"so_cang_max":"' + So_cang
        + '" ,"tam_de":"' + Tam_de
        + '" ,"nghieng":"' + e.target.value
        + '" ,"led1":"' + Led 
        + '" ,"phumax":"' + So_phu_max
        + '"  }}'
       
        const data = {
            tractorId: id,
            state: string
        }
        socket1.emit(`sate-tractor-all`, data);
        //setIsInputEvent(false);
    };
    return (


        <div id="canvas_div" style={{ width: "100%", height: "100%" }}>
            <canvas id="canvas" width="100%" height="100%"></canvas>
            <div>
                <span>Mode</span>
                <select value={Mode} onChange={handleChange}
                    onInput={handleInputMode} >
                    <option value="1">Pause</option>
                    <option value="2">Continue</option>
                </select>

            </div>
            <div>
                <span>Max rpm</span>
                <input
                    type="number"
                    min={0}
                    max={2700}
                    step={100}
                    value={Max_rpm}
                    onChange={handleChange}
                    onInput={handleInputMax_rpm}
                />
            </div>

            <div>
                <span>Min rpm</span>
                <input
                    type="number"
                    min={0}
                    max={2700}
                    step={100}
                    value={Min_rpm}
                    onChange={handleChange}
                    onInput={handleInputMin_rpm}
                />



            </div>

            <div>
                <span>Số càng</span>
                <input
                    type="number"
                    min={0}
                    max={49}
                    step={1}
                    value={So_cang}
                    onChange={handleChange}
                    onInput={handleInputSo_cang}
                />

            </div>

            <div>
                <span>Tấm dè</span>
                <input
                    type="number"
                    min={0}
                    max={49}
                    step={1}
                    value={Tam_de}
                    onChange={handleChange}
                    onInput={handleInputTam_de}
                />
            </div>

            <div>
                <span>Đèn</span>
                <select value={Led} onChange={handleChange}
                    onInput={handleInputDen} >

                    <option value="0">Off</option>
                    <option value="1">On</option>
                </select>
            </div>

            <div>
                <span>Số phụ</span>
                <select value={So_phu_max} onChange={handleChange}
                    onInput={handleInputSophu}>
                    <option value="0">NO</option>
                    <option value="1">Normal</option>
                    <option value="2">Fast</option>
                </select>


            </div>
            <div>
                <span>Reset ERR</span>
                <select value={Reset_Err} onChange={handleChange}
                    onInput={handleInputReset_Err} >
                    <option value="0">NO</option>
                    <option value="1">RESET</option>
                </select>
            </div>
            <div>
                <span>Độ nghiêng</span>
                <select value={Chinh_nghieng} onChange={handleChange}
                    onInput={handleInputNghieng}>
                    <option value="0">NO</option>
                    <option value="1">Nghiêng 1 trục</option>
                    <option value="2">Nghiêng 2 trục</option>
                    <option value="3">Nghiêng 3 trục</option>
                </select>
            </div>
        </div>



    )
}

export default Video

