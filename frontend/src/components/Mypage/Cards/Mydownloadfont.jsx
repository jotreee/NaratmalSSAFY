import { useNavigate } from 'react-router-dom';
import React from "react";
import "../../../styles/MyPage/Card.scss";
import { BsFillStarFill } from "react-icons/bs";
import { FiDownload } from "react-icons/fi";
import { useEffect } from 'react';

const MyDownloadFont = ({ idx, fontData }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const fontDataDiv = document.getElementById(`mydownload_${idx}`);
    const fontDataTextArea = document.getElementById(
      `mydownload_textarea_${idx}`
    );
          // 서버에서 웹폰트 넘겨줄 경우 폰트 다운로드 후 적용

          let font = new FontFace(
            `${fontData.fontFamilyName}`,
            `url(${fontData.webFontPath}) format("woff2")`
          );
          font
            .load()
            .then(function (loadedFont) {
              document.fonts.add(loadedFont);
            })
            .catch(function (error) {
            });
      
          fontDataDiv.style.fontFamily = fontData.fontFamilyName;
          fontDataTextArea.style.fontFamily = fontData.fontFamilyName;
  }, []);
  return(
      <div className="fontData" id={`mydownload_${idx}`}>
        <link rel="stylesheet" type="text/css" href={fontData.webFontPath}/>
      <div className="textarea_box">
        <textarea className="textarea" id={`mydownload_textarea_${idx}`} defaultValue={fontData.description} readOnly></textarea>
      </div>
      <div 
        className="info_box"             
        onClick={() => {
              navigate(`/detail/${fontData.fontseq}`);
            }}>
        <div className="font_info">
          <div className="font_first_row_box">
            <div className="font_name">{fontData.fontName}</div>
            <div className="font_favorite_download_info">
              <div className="favorite_info">
                <span className="icon">{BsFillStarFill()}</span>
                <span className="num"> {fontData.favCount}</span>
              </div>
              <div className="download_info">
                <span className="icon">{FiDownload()}</span>
                <span className="num"> {fontData.downloadCount}</span>
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

export default MyDownloadFont;
