import React from "react";
import "../../../styles/MyPage/Card.scss";
import { useEffect } from 'react';
import axios from 'axios'

const WaitingFont = ({ fontData }) => {
  console.log(fontData)
  useEffect(() => {
    const token = localStorage.getItem('token')
    axios({
        url: '/api/user',
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`, 
            'Content-Type':'application/json'
        } 
    })
    .then(res=> {
    })
    .catch(err => {
    })
}, [])
    return(
        <div className="fontData">
        <div className="textarea_box">
            {fontData.isCreating && <div className="hi"><div className="make">제작 중</div> 입니다.... (<div className='make'>약 15분</div> 소요예정...)</div>}
            {!fontData.isCreating && <div className="hi"><div className="make">제작 전</div> 입니다.... (<div>서버대기중...</div>)</div>}
        </div>
        <div className="info_box">
          <div className="font_info">
            <div className="font_first_row_box">
              <div className="font_name">{fontData.fontName}</div>
              <div className="font_favorite_download_info">
                <div className="favorite_info">
                </div>
                <div className="download_info">
                </div>
              </div>
            </div>
            <div className="font_user_info">
              <span style={{ fontSize: "10px" }}>Designed By.</span>
              <span style={{ fontWeight: "bold", fontSize: "12px" }}>
                {fontData.creator.location}_{fontData.creator.name}_{fontData.creator.nickname}
              </span>
            </div>
          </div>
        </div>
        </div>
    );
  };

export default WaitingFont;
