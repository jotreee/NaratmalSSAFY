import React, { useEffect, useState } from "react";
import "../../styles/FontSearchPage/FontSearchItem.scss";
import { BsFillStarFill } from "react-icons/bs";
import { FiDownload } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const FontSearchItem = ({ idx, fontData, fontEditorText }) => {
  const [subFontEditorText, setSubFontEditorText] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    setSubFontEditorText(fontEditorText);
  }, [fontEditorText]);

  useEffect(() => {
    const fontDataDiv = document.getElementById(`fontData_${idx}`);
    const fontDataTextArea = document.getElementById(
      `fontData_textarea_${idx}`
    );

    // 서버에서 웹폰트 넘겨줄 경우 폰트 다운로드 후 적용
    let font = new FontFace(
      `${fontData.fontFamilyName}`,
      `url(${fontData.webFontPath}) format("woff")`
    );
    font
      .load()
      .then(function (loadedFont) {
        document.fonts.add(loadedFont);
        //do something after the font is loaded
        // console.log(loadedFont);
      })
      .catch(function (error) {
        // error occurred
      });
    fontDataDiv.style.fontFamily = fontData.fontFamilyName;
    // fontDataDiv.style.fontFamily = "지홍체";
    fontDataTextArea.style.fontFamily = fontData.fontFamilyName;
  }, [fontData]);

  return (
    <div className="fontData" id={`fontData_${idx}`}>
      <link rel="stylesheet" type="text/css" href={fontData.webFontPath} />
      <div className="textarea_box">
        <textarea
          id={`fontData_textarea_${idx}`}
          className="textarea"
          value={subFontEditorText}
          placeholder={fontData.description}
          onChange={(e) => {
            setSubFontEditorText(e.target.value);
          }}
        ></textarea>
      </div>
      <div
        className="info_box"
        onClick={() => {
          navigate(`/detail/${fontData.fontSeq}`);
        }}
      >
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
            <span style={{ fontSize: "10px", fontFamily: "GongGothicMedium" }}>
              Designed By{" "}
            </span>
            <span style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
              {fontData.creator?.location +
                "_" +
                fontData.creator?.name +
                "_" +
                fontData.creator?.nickname}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FontSearchItem;
