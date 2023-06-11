import axios from "axios";
import React, { useEffect, useState } from "react";
import "../../../styles/Padlet/Card.scss";
import swal from "sweetalert";

const PostGumiItem = ({ idx, postData }) => {
    const [subFontEditorText, setSubFontEditorText] = useState(postData.content);
    const [isowner, setIsowner] = useState(false)

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
        .then((res) => {
          if (postData.userNickname === res.data.userNickname){
            setIsowner(true)
          }
        });
    })

    useEffect(() => {
      setSubFontEditorText(postData.content);
    }, [postData.content]);
  
    useEffect(() => {
      const fontDataDiv = document.getElementById(`gumi_${idx}`);
      const fontDataTextArea = document.getElementById(
        `gumi_textarea_${idx}`
      );
      const postColor = document.getElementById(`gumi_color_${idx}`)
          // 서버에서 웹폰트 넘겨줄 경우 폰트 다운로드 후 적용

          let font = new FontFace(
            `${postData.fontFamilyName}`,
            `url(${postData.fontPath}) format("woff2")`
          );
          font
            .load()
            .then(function (loadedFont) {
              document.fonts.add(loadedFont);
            })
            .catch(function (error) {
            });
      
      
          fontDataDiv.style.fontFamily = postData.fontFamilyName
          fontDataTextArea.style.fontFamily = postData.fontFamilyName;
          postColor.style.backgroundColor = postData.color
    }, []);
    
    const handleDelete = () =>{
      axios({
        url: '/api/padlet',
        method: 'DELETE',
        headers: {
            'Content-Type':'application/json'
        },
        data: {
          'seq' : postData.seq
        } 
    })
    .then(res => {
      swal({
        text: "패들릿이 성공적으로 삭제되었습니다.",
        icon: "success",
        button: "확인",
      }).then(() => {
        window.location.href='/post/gumi'
      });
    })
    .catch(err => {
      swal({
        text: "패들릿 삭제를 실패하였습니다.",
        icon: "error",
        button: "확인",
      }).then(() => {
        window.location.href='/post/gumi'
      });
    })
    }
    return (
      <div className="fontData" id={`gumi_${idx}`}>
        <link
          rel="stylesheet"
          type="text/css"
          href={postData.webFontPath}
        />
        <div
          className="info_box" id={`gumi_color_${idx}`}
        >
          <div className="deleteTitle">
          <div className="deleteTitle__Title">{postData.title}</div>
          { isowner && <div className="deleteTitle__deleteButton"onClick={handleDelete}>삭제</div>}
          </div>
          <div className="font_info">
            <div className="font_first_row_box">
            </div>
            <div className="font_user_info">
              <span style={{ fontSize: "10px" }}>Created By.</span>
              <span style={{ fontWeight: "bold", fontSize: "16px" }}>
              {postData.userLocation}_{postData.userName}_{postData.userNickname}
              </span>
            </div>
          </div>
        </div>
        <div className="textarea_box">
          <textarea
            id={`gumi_textarea_${idx}`}
            className="textarea"
            value={subFontEditorText}
            readOnly
          ></textarea>
        </div>
      </div>
    );
  };
export default PostGumiItem;
