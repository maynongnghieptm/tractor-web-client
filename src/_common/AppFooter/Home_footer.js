import React from 'react';
import { Typography, Hidden } from '@mui/material';
import Box from '@mui/material/Box';

import './Home_footer.css'
function Footer() {
    return (

        <Box mt={4} p={2} bgcolor="black" color="white" >
            <div className='footer-container'>
                <div className='up'>
                <Hidden mdUp>
                    <Typography variant="body1" className='footer-item'>
                        <div className='subscribe'>
                            Đăng kí nhận tin
                            <ul>
                                <li><input type="text" placeholder="Email của bạn" style={{ padding: '10px', width: '300px', fontSize: '1rem' }} /></li>
                                <li> <button type="button" style={{margin:"0"}}>Đăng kí</button></li>
                            </ul>
                        </div>
                    </Typography>                            
                   
                </Hidden>
                <Hidden mdDown>
                    <Typography variant="body1" className='footer-item'>
                        <div className='about-us-item'>
                            Về chúng tôi
                            <ul>
                                <li>Tin tức</li>
                                <li>Dịch vụ</li>
                                <li>Liên hệ</li>
                                <li>Hệ thống chi nhánh</li>
                            </ul>
                        </div>
                    </Typography>
                    <Typography variant="body1" className='footer-item'>
                        <div className='about-us-item'>
                            Sản phẩm
                            <ul>
                                <li>Máy nông nghiệp thông minh</li>
                                <li>Hệ thống IoT nông nghiệp</li>
                            </ul>
                        </div>
                    </Typography>
                    <Typography variant="body1" className='footer-item'>
                        <div>
                            Fanpage
                        </div>
                    </Typography>
                    <Typography variant="body1" className='footer-item'>
                        <div className='subscribe'>
                            Đăng kí nhận tin
                            <ul>
                                <li><input type="text" placeholder="Email của bạn" style={{ padding: '10px', width: '250px', fontSize: '1rem' }} /></li>
                                <li> <button type="button" style={{margin:"0"}}>Đăng kí</button></li>
                            </ul>
                        </div>
                    </Typography>
                </Hidden>
                </div>

                <Hidden mdDown>
                <div className='signature' style={{ color: 'darkgray' }}>
                    <div className='author'>
                        <Typography variant="body1" align="center">
                            © {new Date().getFullYear()} Designed by SMS Teams.
                        </Typography>
                    </div>
                    <div className='license' style={{ display: 'flex', flexDirection: 'row' }}>
                        <div className='fix' style={{ paddingRight: '20px', borderRight: '1px solid darkgray' }}>Dịch vụ sửa chữa bảo hành</div>
                        <div className='maintance' style={{ paddingLeft: '20px' }}>Điều khoản sử dụng</div>
                    </div>
                </div>
                </Hidden>
                 
                <Hidden mdUp>
                <div className='signature' style={{ color: 'darkgray', flexWrap: "wrap" }}>
                    <div className='author' style={{flexBasis:'100%'}}>
                        <Typography variant="body1" align="center">
                            © {new Date().getFullYear()} Designed by SMS Teams.
                        </Typography>
                    </div>
                    <div className='license' style={{ display: 'flex', flexDirection: 'row', marginTop:'10px' }}>
                        <div className='fix' style={{ paddingRight: '20px', borderRight: '1px solid darkgray' }}>Dịch vụ sửa chữa bảo hành</div>
                        <div className='maintance' style={{ paddingLeft: '20px' }}>Điều khoản sử dụng</div>
                    </div>
                </div>
                </Hidden>
            </div>
        </Box>
    );
}

export default Footer;
