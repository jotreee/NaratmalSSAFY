import React, { useState } from "react";
import "../styles/FontMakePage/FontMakePage.scss";
import ready_1 from "../assets/font_make/ready_1.png";
import ready_2 from "../assets/font_make/ready_2.png";
import ready_3 from "../assets/font_make/ready_3.png";
import ready_4 from "../assets/font_make/ready_4.png";
import handWritingExample from "../assets/font_make/hand_writing_example.png";

import { useEffect } from "react";
import { useRef } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import axios from "axios";
import { useMediaQuery } from "@mui/material";

const FontMakePage = () => {
  const navigate = useNavigate();

  const isMobile760 = useMediaQuery("(max-width:760px)");

  const [currentStep, setCurrentStep] = useState(1);
  const [uploadImage, setUploadImage] = useState(null);
  const [introduction, setIntroduction] = useState("");
  const [fontName, setFontName] = useState("");

  const [fontNameCheck, setFontNameCheck] = useState(false);

  const [cropStep, setCropStep] = useState(0);

  const [crop, setCrop] = useState({
    aspect: 1280 / 300,
    x: 0,
    y: 0,
    width: 100,
    height: 100,
    unit: "px",
  });
  const [completedCrop, setCompletedCrop] = useState({
    aspect: 1280 / 300,
    x: 0,
    y: 0,
    width: 504,
    height: 118,
    unit: "px",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      swal({
        title: "필요",
        text: "로그인이 필요합니다!",
        icon: "warning",
        button: "확인",
      }).then(() => {
        navigate("/login");
      });
    }

    if (isMobile760) {
      swal({
        title: "에러",
        text: "760px 이하의 모바일 환경에서는 제작이 불가능합니다!",
        icon: "warning",
        button: "확인",
      }).then(() => {
        navigate(-1);
      });
    }
  }, []);

  const [croppedImageUrl, setCroppedImageUrl] = useState([]);

  const imgRef = useRef();

  const inputImageRef = useRef();

  const selectedWords = [
    "다",
    "람",
    "쥐",
    "헌",
    "쳇",
    "바",
    "퀴",
    "에",
    "타",
    "고",
    "파",
  ];

  let nowImage = null;

  useEffect(() => {
    const makeProgressDiv = document.getElementsByClassName("make_progress");
    const currentNumDiv = document.getElementsByClassName("current_num");
    for (let index = 0; index < makeProgressDiv.length; index++) {
      const element = makeProgressDiv[index];
      element.classList.remove("current_state_display");
      currentNumDiv[index].classList.remove("current_state_num_display");
    }

    if (currentStep <= 4) {
      makeProgressDiv[0].classList.add("current_state_display");
      currentNumDiv[0].classList.add("current_state_num_display");
    } else if (currentStep <= 6) {
      makeProgressDiv[1].classList.add("current_state_display");
      currentNumDiv[1].classList.add("current_state_num_display");
    } else if (currentStep <= 8) {
      makeProgressDiv[2].classList.add("current_state_display");
      currentNumDiv[2].classList.add("current_state_num_display");
    } else if (currentStep <= 9) {
      makeProgressDiv[3].classList.add("current_state_display");
      currentNumDiv[3].classList.add("current_state_num_display");
    }
  }, [currentStep]);

  useEffect(() => {
    const nextButton = document.getElementById("fontMakePage_next_button");
    nextButton?.classList.remove("noHover");
    if (currentStep === 5 && !uploadImage) {
      nextButton?.classList.add("noHover");
    } else if (currentStep === 6 && croppedImageUrl.length !== 11) {
      nextButton?.classList.add("noHover");
    } else if (currentStep === 9) {
      nextButton?.classList.add("noHover");
    }
  }, [currentStep, cropStep, uploadImage, croppedImageUrl]);

  function clickStepButton(type) {
    setCurrentStep(
      type === "prev"
        ? currentStep === 1
          ? 1
          : currentStep - 1
        : currentStep + 1
    );

    if (type === "next" && currentStep === 4) {
      if (isMobile760) {
        swal({
          title: "에러",
          text: "760px 이하의 모바일 환경에서는 제작이 불가능합니다!",
          icon: "warning",
          button: "확인",
        });
        setCurrentStep(currentStep);
        return;
      }
    }

    if (type === "prev" && currentStep === 9) {
      setCurrentStep(1);
      setCroppedImageUrl([]);
      setUploadImage(null);
      setIntroduction("");
      setFontName("");
      setCropStep(0);
      setCrop({
        aspect: 1280 / 300,
        x: 0,
        y: 0,
        width: 100,
        height: 100,
        unit: "px",
      });
    } else if (type === "next" && currentStep === 8) {
      if (fontName.length < 2 || fontName.length > 10) {
        alert("폰트 이름은 2~10자로 입력해주세요!");
        setCurrentStep(currentStep);
        return;
      }

      if (introduction.length < 5) {
        alert("폰트 소개는 최소 5자 이상 입력해주세요!");
        setCurrentStep(currentStep);
        return;
      }

      if (!fontNameCheck) {
        alert("폰트 이름이 중복됩니다.");
        setCurrentStep(currentStep);
        return;
      }
      const formData = new FormData();

      for (let index = 0; index < croppedImageUrl.length; index++) {
        const imgDataUrl = croppedImageUrl[index];
        const blobBin = atob(imgDataUrl.split(",")[1]);

        const array = [];
        for (let i = 0; i < blobBin.length; i++) {
          array.push(blobBin.charCodeAt(i));
        }

        const file = new Blob([new Uint8Array(array)], { type: "image/png" });
        formData.append("uploadImg", file);
      }

      formData.append("fontName", fontName);
      formData.append("description", introduction);
      //axios로 백엔드에 정보들 보내기

      axios({
        method: "POST",
        url: "/api/font",
        mode: "cors",
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        data: formData,
      })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  useEffect(() => {
    const checkFontNameDiv = document.getElementById(
      "check_font_name_duplicate"
    );

    if (fontName.length < 2) {
      checkFontNameDiv && (checkFontNameDiv.style.color = "red");
    }
  }, [fontName]);

  function checkFontName(e) {
    const checkFontNameDiv = document.getElementById(
      "check_font_name_duplicate"
    );
    if (e.target.value.length > 10) {
      return;
    }

    // setFontNameCheck(false);
    // checkFontNameDiv.style.color = "red";
    setFontName(e.target.value);

    if (e.target.value.length < 2) {
      return;
    }

    // 폰트 중복체크 axios
    axios({
      method: "GET",
      url: `/api/font/checkname/${e.target.value}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
      },
    })
      .then((res) => {
        if (res.data.usable && e.target.value.length >= 2) {
          checkFontNameDiv.style.color = "green";
          setFontNameCheck(true);
        } else {
          setFontNameCheck(false);
          checkFontNameDiv.style.color = "red";
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function UploadImageClick() {
    if (!inputImageRef.current) {
      return;
    }

    inputImageRef.current.click();
  }

  function onUploadImage(e) {
    const fileBlob = e.target.files[0];
    if (fileBlob.type.split("/")[0] !== "image") {
      alert("이미지 파일을 업로드 해주세요!");
      return;
    }

    setFontName("");
    setIntroduction("");
    setCroppedImageUrl([]);
    setCropStep(0);
    setCrop({
      aspect: 1280 / 300,
      x: 0,
      y: 0,
      width: 100,
      height: 100,
      unit: "px",
    });

    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise((resolve) => {
      reader.onload = () => {
        setUploadImage(reader.result);
        resolve();
      };
    });
  }

  const onLoad = (img) => {
    imgRef.current = img.target;
  };

  function removeCanvas() {
    if (!completedCrop || !imgRef.current || cropStep === 0) {
      return;
    }

    setCroppedImageUrl([...croppedImageUrl.slice(0, -1)]);
    setCropStep(cropStep === 0 ? cropStep : cropStep - 1);
    setCrop({ ...crop, x: crop.x - 50 });
  }

  // 크롭 영역 canvas에 넣기
  const createCanvas = () => {
    if (!completedCrop || !imgRef.current || cropStep === 11) {
      return;
    }

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    //const crop = completedCrop;

    const scaleX = imgRef.current.naturalWidth / imgRef.current.width;
    const scaleY = imgRef.current.naturalHeight / imgRef.current.height;
    const pixelRatio = window.devicePixelRatio;

    canvas.width = crop.width * pixelRatio * scaleX;
    canvas.height = crop?.height * pixelRatio * scaleY;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = "high";

    ctx.drawImage(
      imgRef.current,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width * scaleX,
      crop.height * scaleY
    );

    const base64Image = canvas.toDataURL("image/png");
    setCroppedImageUrl([...croppedImageUrl, base64Image]);
    setCropStep(cropStep + 1);
    setCrop({ ...crop, x: crop.x + 50 });
  };

  return (
    <div className="FontMakePage">
      <div className="current_step_box">
        <div className="make_progress" id="make_progress_1">
          <span className="current_state_num_display current_num">1.</span>
          &nbsp; 준비하기
        </div>
        <div className="make_progress" id="make_progress_2">
          <span className="current_num">2.</span>&nbsp; 업로드
        </div>
        <div className="make_progress" id="make_progress_3">
          <span className="current_num">3.</span>&nbsp; 최종 확인
        </div>
        <div className="make_progress" id="make_progress_4">
          <span className="current_num">4.</span>&nbsp; 완료
        </div>
      </div>
      <div className="make_box">
        {[1, 2, 3, 4].map((_, i) => {
          switch (i) {
            case 0:
              nowImage = ready_1;
              break;
            case 1:
              nowImage = ready_2;
              break;
            case 2:
              nowImage = ready_3;
              break;
            case 3:
              nowImage = ready_4;
              break;
            default:
              break;
          }

          return (
            <img
              className="make_ready_img"
              src={nowImage}
              alt="준비1"
              key={i}
              style={
                currentStep === i + 1
                  ? { display: "block" }
                  : { display: "none" }
              }
            />
          );
        })}
        {currentStep === 5 && (
          <div className="make_upload_box" id="">
            <div className="image_upload_preview">
              {uploadImage ? (
                <img
                  src={uploadImage}
                  alt="이미지를 업로드 해주세요"
                  width={"100%"}
                  height={"200px"}
                  style={{ borderRadius: "10px" }}
                />
              ) : (
                <div className="upload_image_text_box">
                  <div className="upload_image_text">
                    다음과 같이 이미지를 업로드 해주세요!
                  </div>
                  <img
                    src={handWritingExample}
                    alt="손글씨 예시"
                    width={"100%"}
                    style={{ borderRadius: "10px" }}
                  />
                </div>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              ref={inputImageRef}
              style={{ display: "none" }}
              onChange={onUploadImage}
            />
            <button className="image_upload_button" onClick={UploadImageClick}>
              <span className="image_upload_text">이미지 고르기</span>
            </button>
          </div>
        )}
        {currentStep === 6 && (
          <>
            <div className="selected_image_preview_box">
              <div className="selected_info_text">
                {cropStep < 11 ? (
                  <>
                    <span className="selected_word">
                      "{selectedWords[cropStep]}"
                    </span>
                    를 잡아 주세요
                  </>
                ) : (
                  <>
                    <span className="selected_word">다음</span>
                    으로 넘어 가주세요!
                  </>
                )}
              </div>
            </div>
            <div className="crop_image_box">
              <ReactCrop
                crop={crop}
                onComplete={setCompletedCrop}
                onChange={(c) => setCrop(c)}
              >
                <img
                  src={uploadImage}
                  onLoad={onLoad}
                  alt="이미지"
                  height={"100%"}
                  style={{ width: "1000px", maxHeight: "600px" }}
                />
              </ReactCrop>
            </div>
            <div className="crop_click_button_box">
              <button onClick={removeCanvas} className="crop_click_button">
                {"〈"}
              </button>
              <div className="crop_step">
                {cropStep >= 12 ? 12 : cropStep + 1} / 12
              </div>
              <button onClick={createCanvas} className="crop_click_button">
                {"〉"}
              </button>
            </div>
          </>
        )}
        {currentStep === 7 && (
          <>
            <div
              className="crop_check_info_box"
              style={{ textAlign: "center" }}
            >
              <div className="crop_check_info_row">
                *반드시 <span style={{ color: "red" }}>11자</span>가 모두 잘
                나왔는지 확인해주세요!
              </div>
              <div className="crop_check_info_row">
                *만약 한 글자안에{" "}
                <span style={{ color: "red" }}>다른 글자나 획이</span>{" "}
                섞여있다면 다시 잡아주세요
              </div>
              <div className="crop_check_info_row">
                *최대한 글자가 <span style={{ color: "red" }}>중앙</span>으로
                오게 잡아주세요
              </div>
              <div className="crop_check_info_row">
                *이전으로 돌아가시면{" "}
                <span style={{ color: "red" }}>{'"<"'}</span> 버튼을 통해서 다시
                원하는 글자를 잡을 수 있습니다.
              </div>
            </div>
            <div className="selected_images_grid">
              {croppedImageUrl.map((url, i) => {
                return (
                  <div key={i} className="crop_img_box">
                    <div className="selected_word_header">
                      {selectedWords[i]}
                    </div>
                    <img src={url} alt="이미지" className="crop_img"></img>
                  </div>
                );
              })}
            </div>
          </>
        )}
        {currentStep === 8 && (
          <>
            <div className="crop_check_info_box">
              <div className="crop_check_info_row">
                해당 폰트를 설명할 수 있는{" "}
                <span style={{ color: "#d4b099" }}>소개글</span>을 간단히 작성해
                주세요
              </div>
              <div className="crop_check_info_row">
                <span style={{ color: "#d4b099" }}>소개글</span>은
                상세페이지에서 언제든지 수정할 수 있습니다.
              </div>
              <div className="crop_check_info_row">
                <span style={{ color: "#d4b099" }}>폰트이름</span>은 2~10자로
                제한되며, 맨마지막 '체'라는 글자는 자동으로 붙여줍니다.
              </div>
              <div className="crop_check_info_row">
                <span style={{ color: "#d4b099" }}>ex{") "}</span>
                <span style={{ fontWeight: "normal" }}>수료 기념체</span>
              </div>
              <div className="crop_check_info_row">
                <span style={{ color: "#d4b099" }}>ex{") "}</span>
                <span style={{ fontWeight: "normal" }}>
                  이 폰트는 싸피를 수료를 기념하기 위한 폰트입니다.!!
                </span>
              </div>
            </div>
            <div className="font_name_input_box">
              <div className="font_name_input">
                <input
                  type="text"
                  value={fontName}
                  placeholder="원하는 폰트 이름을 입력하세요(2~10자)"
                  onChange={checkFontName}
                />
                <div style={{ fontSize: "25px", marginLeft: "10px" }}>"체"</div>
              </div>
              <div
                className="check_font_name_duplicate"
                id="check_font_name_duplicate"
              >
                {fontName.length < 2
                  ? "2글자 이상 입력해주세요!"
                  : fontNameCheck
                  ? "사용할 수 있습니다!"
                  : "이미 존재하는 이름입니다!"}
              </div>
            </div>
            <div className="font_introduce_textarea_box">
              <textarea
                placeholder="소개하는 글을 쓰신 후 완료를 눌러주세요!(최소 5자 이상)"
                value={introduction}
                onChange={(e) => setIntroduction(e.target.value)}
              ></textarea>
            </div>
          </>
        )}
        {currentStep === 9 && (
          <>
            <div className="completed_box">
              <div className="completed_header">
                <span style={{ color: "#d4b099" }}>제작 신청</span>이
                완료되었습니다.
              </div>
              <div className="complted_info_text_box">
                <div className="completed_info_text">
                  *제작 완료까지 최소<span style={{ color: "red" }}>20분</span>
                  소요 됩니다 단, 제작 요청이 많을 경우 추가적인 시간이 더 소요
                  됩니다.
                </div>
                <div className="completed_info_text">
                  *제작이 완료된 후에 카카오톡에 등록된{" "}
                  <span style={{ color: "red" }}>이메일로 </span>
                  안내해 드립니다.
                </div>
                <div className="completed_info_text">
                  *제작이 완료된 후에{" "}
                  <span style={{ color: "red" }}>자동적</span> 으로 폰트
                  검색페이지에 공유됩니다.
                </div>
                <div className="completed_info_text">
                  *언제든지 마이페이지에서 제작한 폰트를
                  <span style={{ color: "red" }}> 다운로드</span> 할 수
                  있습니다.
                </div>
                <div className="completed_info_text">
                  *패들릿 페이지에서 제작한 폰트를
                  <span style={{ color: "red" }}> 사용해</span> 볼수 있습니다.
                </div>
              </div>
            </div>
          </>
        )}
        <div className="prev_next_button_box">
          <button
            className={
              currentStep === 1 ? "prev_button noHover" : "prev_button"
            }
            onClick={() => clickStepButton("prev")}
          >
            {currentStep === 9 ? "처음으로" : "이전"}
          </button>
          {currentStep !== 9 && (
            <button
              className="next_button"
              id="fontMakePage_next_button"
              onClick={() => clickStepButton("next")}
            >
              {currentStep === 8 ? "완료" : "다음"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FontMakePage;
