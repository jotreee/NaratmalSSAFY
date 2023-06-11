import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/FontDetailPage/FontDetailPage.scss";
import { BiStar } from "react-icons/bi";
import { BsStarFill } from "react-icons/bs";
import { AiOutlineDownload, AiOutlineFontSize } from "react-icons/ai";
import { TbAlignLeft, TbAlignCenter, TbAlignRight } from "react-icons/tb";
import { SketchPicker } from "react-color";
import { CopyToClipboard } from "react-copy-to-clipboard";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Grid, Slider } from "@mui/material";
import swal from "sweetalert";

import bgImage_1 from "../assets/textarea_img/background_1.jpg";
import bgImage_2 from "../assets/textarea_img/background_2.jpg";
import bgImage_3 from "../assets/textarea_img/background_3.jpg";
import bgImage_4 from "../assets/textarea_img/background_4.jpg";

import kakaoImg from "../assets/sns_icon/kakao_img.png";
import linkImg from "../assets/sns_icon/link.png";

import { useScript } from "../hooks";
import axios from "axios";

const FontDetailPage = () => {
  const navigate = useNavigate();

  const [fontData, setfontData] = useState({});
  const [fontTrialConfig, setFontTrialConfig] = useState({
    color: "#000000",
    size: 30,
    lineHeight: 1.6, //1~2.1
    letterSpacing: 1, //1px~10px
    align: "left",
  });

  const [oneLineText, setOneLineText] = useState("");
  const [modifyText, setModifyText] = useState(false);

  const [isFavorite, setIsFavorite] = useState(false);

  const currentUrl = window.location.href;

  const currentUserEmail = localStorage.getItem("email") || null;

  let clipboardModal = null;

  // 파라미터로 넘어오는 id 값 받기
  const { fontSeq } = useParams();
  useEffect(() => {
    // axios로 폰트 데이터 요청
    axios({
      method: "GET",
      url: `/api/font/detail/${fontSeq}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
      },
    })
      .then((res) => {
        // console.log(res);
        setfontData(res.data);
        setOneLineText(res.data.description);
        setIsFavorite(res.data.isLike);
        const fontDetailPage = document.getElementById("FontDetailPage");

        const textarea = document.getElementById(
          `FontDetailPage_textarea_${res.data.fontSeq}`
        );

        let font = new FontFace(
          `${res.data.fontFamilyName}`,
          `url(${res.data.webFontPath}) format("woff")`
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

        fontDetailPage &&
          (fontDetailPage.style.fontFamily = res.data.fontFamilyName);

        textarea && (textarea.style.fontFamily = res.data.fontFamilyName);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    const textarea = document.getElementById(
      `FontDetailPage_textarea_${fontSeq}`
    );

    textarea.style.fontSize = fontTrialConfig.size + "px";
    textarea.style.color = fontTrialConfig.color;
    textarea.style.letterSpacing = fontTrialConfig.letterSpacing + "px";
    textarea.style.lineHeight = fontTrialConfig.lineHeight;
    textarea.style.textAlign = fontTrialConfig.align;
  }, [fontTrialConfig]);

  useEffect(() => {
    if (modifyText) {
      const modifyOnelineTextarea = document.getElementById(
        "modify_oneline_textarea"
      );

      modifyOnelineTextarea.style.fontFamily = fontData.fontFamilyName;
    }
  }, [modifyText]);

  function changeConfig(e, name, value) {
    setFontTrialConfig({
      ...fontTrialConfig,
      [e.target.name || name]: e.target.value || value,
    });

    if (name === "align" || e.target.name === "align") {
      const alignDivs = document.getElementsByClassName("font_align_each_box");

      for (let index = 0; index < alignDivs.length; index++) {
        const element = alignDivs[index];

        element.classList.remove("select_font_align");
        if (element.id === `font_align_${e.target.value || value}`) {
          element.classList.add("select_font_align");
        }
      }
    }
  }

  function clickPicker(e) {
    const fullWidthHeightDiv = document.getElementById(
      "fontDetailPage_full_width_height"
    );
    const colorClickBox = document.getElementById(
      "fontDetailPage_color_select"
    );

    const fontColorPickerBox = document.getElementById(
      "fontDetailPage_font_color_picker_box"
    );

    const spacingPickerBox = document.getElementById(
      "fontDetailPage_spacing_picker_box"
    );

    const spacingSelectBox = document.getElementById(
      "fontDetailPage_spacing_select"
    );

    fullWidthHeightDiv.style.visibility = "visible";
    if (e.target.id === "fontDetailPage_full_width_height") {
      fullWidthHeightDiv.style.visibility = "hidden";
      fontColorPickerBox.style.display = "none";
      spacingPickerBox.style.display = "none";
    } else if (e.target.id === "fontDetailPage_spacing_select") {
      spacingPickerBox.style.display = "block";

      const spacingSelectBoxRect = spacingSelectBox.getBoundingClientRect();
      spacingPickerBox.style.top =
        window.scrollY + spacingSelectBoxRect.bottom + "px";

      spacingPickerBox.style.left =
        window.scrollX + spacingSelectBoxRect.left + "px";
    } else {
      fontColorPickerBox.style.display = "block";

      const colorClickBoxRect = colorClickBox.getBoundingClientRect();
      fontColorPickerBox.style.top =
        window.scrollY + colorClickBoxRect.bottom + "px";
      fontColorPickerBox.style.left =
        window.scrollX + colorClickBoxRect.left + "px";
    }
  }

  function imageClick(e) {
    const textarea = document.getElementById(
      `FontDetailPage_textarea_${fontSeq}`
    );

    let bgImage = null;
    switch (e.target.id) {
      case `FontDetailPage_bgImage_1`:
        bgImage = bgImage_1;
        break;
      case `FontDetailPage_bgImage_2`:
        bgImage = bgImage_2;
        break;
      case `FontDetailPage_bgImage_3`:
        bgImage = bgImage_3;
        break;
      case `FontDetailPage_bgImage_4`:
        bgImage = bgImage_4;
        break;
      default:
        break;
    }
    textarea.style.backgroundImage = `url(${bgImage})`;
  }

  function fontDownloadClick() {
    if (!localStorage.getItem("token")) {
      swal({
        title: "필요",
        text: "로그인이 필요합니다!",
        icon: "warning",
        button: "확인",
      }).then(() => {
        navigate("/login");
      });
      return;
    }

    // axios로 다운로드 받은 폰트번호 서버로 보내기
    axios({
      method: "POST",
      url: `/api/user/download`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
      },
      data: {
        fontName: fontData.fontName,
        fontSeq: fontSeq,
      },
    })
      .then((_res) => {
        // 만약 다운로드가 성공한다면
        setfontData({ ...fontData, downloadCount: ++fontData.downloadCount });

        //다운로드 페이지 이동
        window.location.href = fontData.fontDownloadPath;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function clickModifyTextButton() {
    if (oneLineText.length < 5) {
      alert("최소 5자 이상 입력해주세요!");
      return;
    }
    // 변경사항 서버로 axios 보내기
    axios({
      method: "PUT",
      url: `/api/font`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      data: {
        fontDescription: oneLineText,
        fontName: fontData.fontName,
      },
    })
      .then(() => {
        // 정상적인 응답이 오면
        fontData.description = oneLineText;
        setModifyText(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function clickFavoriteButton() {
    if (!localStorage.getItem("token")) {
      swal({
        title: "필요",
        text: "로그인이 필요합니다!",
        icon: "warning",
        button: "확인",
      }).then(() => {
        navigate("/login");
      });
      return;
    }

    // Favorite 버튼 클릭 API 요청
    axios({
      method: "POST",
      url: `/api/user/toggleLike`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
      },
      data: {
        id: fontSeq,
      },
    })
      .then((_res) => {
        // 만약 성공했다면
        if (isFavorite) {
          fontData.favCount -= 1;
        } else {
          fontData.favCount += 1;
        }
        setIsFavorite(!isFavorite);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  // 카카오 공유 버튼######################################################################################################
  const status = useScript("https://developers.kakao.com/sdk/js/kakao.js");
  useEffect(() => {
    if (status === "ready" && window.Kakao) {
      // 중복 initialization 방지
      if (!window.Kakao.isInitialized()) {
        // 두번째 step 에서 가져온 javascript key 를 이용하여 initialize
        window.Kakao.init("143701b766fa03b8b23aa8b170cdf655");
      }
    }
  }, [status]);

  const handleKakaoButton = () => {
    window.Kakao.Link.sendDefault({
      objectType: "feed",
      content: {
        title: `${
          fontData.creator.location +
          "_" +
          fontData.creator.name +
          "_" +
          fontData.creator.nickname
        }님의 폰트를 구경해보세요!`,
        // 폰트 만든사람 이름 넣어서 보내면 됨.
        description: "#폰트 #나만의 #싸피 #SSAFY #추억 #선물",
        imageUrl:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTemP_0duhHjJ0tjzZtz_AKErxLKTuaKteuw&usqp=CAU",
        link: {
          mobileWebUrl: window.location.href,
          webUrl: window.location.href,
        },
      },
      buttons: [
        {
          title: "자세히보기",
          link: {
            mobileWebUrl: window.location.href,
            webUrl: window.location.href,
          },
        },
      ],
    });
  };
  // 카카오 공유 버튼######################################################################################################

  return (
    <div className="FontDetailPage" id="FontDetailPage">
      <link rel="stylesheet" type="text/css" href={fontData.webFontPath} />
      <div className="first_row_box">
        <div className="font_info_box">
          <div className="font_name">{fontData.fontName}</div>
          <div className="font_user">
            <span style={{ fontFamily: "GongGothicMedium" }}>Designed By</span>{" "}
            <span style={{ fontSize: "2.0rem" }}>
              {fontData.creator?.location +
                "_" +
                fontData.creator?.name +
                "_" +
                fontData.creator?.nickname}
            </span>{" "}
          </div>
          <div className="font_make_time">
            <span>제작일시:</span>{" "}
            <span style={{ fontSize: "1.5rem" }}>
              {fontData.regDate?.split("T")[0]}
            </span>
          </div>
        </div>
        <div className="font_popular_info_box">
          {isFavorite ? (
            <div className="font_favorite_box" onClick={clickFavoriteButton}>
              <BsStarFill size={30} color="orange" />
              <span style={{ fontSize: "20px", marginLeft: "3px" }}>
                즐겨찾기 취소
              </span>{" "}
            </div>
          ) : (
            <div className="font_favorite_box" onClick={clickFavoriteButton}>
              <BiStar size={30} color="orange" />
              <span style={{ fontSize: "20px", marginLeft: "3px" }}>
                즐겨찾기 추가
              </span>{" "}
            </div>
          )}
          <div className="font_favorite_download_info_box">
            <div className="font_favorite_count">
              <span className="font_size_20">즐겨찾기 수:</span>{" "}
              <span className="font_size_30 font_weight_bold">
                {fontData.favCount}
              </span>{" "}
            </div>
            <div className="font_download_count">
              <span className="font_size_20">다운로드 수:</span>{" "}
              <span className="font_size_30 font_weight_bold">
                {fontData.downloadCount}
              </span>{" "}
            </div>
          </div>
        </div>
      </div>
      <div className="second_row_box">
        <div className="font_oneline_header">
          <span>폰트 한줄 설명</span>
          {currentUserEmail === fontData.creator?.email &&
            (modifyText ? (
              <div>
                <span
                  className="font_oneline_fix"
                  style={{ marginRight: "20px" }}
                  onClick={() => {
                    setOneLineText(fontData.description);
                    setModifyText(false);
                  }}
                >
                  취소하기
                </span>
                <span
                  className="font_oneline_fix"
                  onClick={clickModifyTextButton}
                >
                  수정완료
                </span>
              </div>
            ) : (
              <span
                className="font_oneline_fix"
                onClick={() => {
                  setModifyText(!modifyText);
                }}
              >
                수정하기
              </span>
            ))}
        </div>

        {modifyText ? (
          <textarea
            className="modify_oneline_textarea"
            id="modify_oneline_textarea"
            value={oneLineText}
            onChange={(e) => {
              setOneLineText(e.target.value);
            }}
          ></textarea>
        ) : (
          <div className="font_oneline_mention">{oneLineText}</div>
        )}
      </div>
      <div className="third_row_box">
        <div className="text_area_box">
          <textarea
            id={`FontDetailPage_textarea_${fontSeq}`}
            placeholder="원하는 글자를 작성해보세요"
          ></textarea>
        </div>
        <div className="control_panel">
          <div className="font_editor_panel">
            <div className="font_editor_panel_header">폰트 스타일</div>
            <div className="font_editor_panel_first_row">
              <FormControl sx={{ minWidth: 120 }} size="normal">
                <InputLabel id="demo-select-small">크기</InputLabel>
                <Select
                  name="size"
                  labelId="demo-select-small"
                  id="demo-select-small"
                  value={fontTrialConfig.size}
                  label="Size"
                  onChange={changeConfig}
                >
                  <MenuItem value={10}>10px</MenuItem>
                  <MenuItem value={20}>20px</MenuItem>
                  <MenuItem value={30}>30px</MenuItem>
                  <MenuItem value={40}>40px</MenuItem>
                </Select>
              </FormControl>
              <div className="font_align_box">
                <ul>
                  <li
                    className="select_font_align font_align_each_box"
                    id="font_align_left"
                    onClick={(e) => changeConfig(e, "align", "left")}
                  >
                    <TbAlignLeft size={30} />
                  </li>
                  <li
                    className="font_align_each_box"
                    id="font_align_center"
                    onClick={(e) => changeConfig(e, "align", "center")}
                  >
                    <TbAlignCenter size={30} />
                  </li>
                  <li
                    className="font_align_each_box"
                    id="font_align_right"
                    onClick={(e) => changeConfig(e, "align", "right")}
                  >
                    <TbAlignRight size={30} />
                  </li>
                </ul>
              </div>
            </div>
            <div className="font_editor_panel_second_row">
              <div
                className="font_color_select_box"
                id="fontDetailPage_color_select"
                onClick={clickPicker}
              >
                <div
                  className="font_color_current"
                  id="fontDetailPage_color_select_current"
                  onClick={clickPicker}
                ></div>
              </div>
              <div
                className="font_spacing_select_box"
                id="fontDetailPage_spacing_select"
                onClick={clickPicker}
              >
                자간 및 행간
              </div>
            </div>
          </div>
          <div className="textarea_background_img_box">
            <div className="textarea_background_img_box_header">
              배경 이미지
            </div>
            <div className="textarea_background_img_grid">
              <Grid container spacing={1}>
                {[1, 2, 3, 4].map((_, i) => {
                  let bgImage = null;
                  switch (i) {
                    case 0:
                      bgImage = bgImage_1;
                      break;
                    case 1:
                      bgImage = bgImage_2;
                      break;
                    case 2:
                      bgImage = bgImage_3;
                      break;
                    case 3:
                      bgImage = bgImage_4;
                      break;
                    default:
                      break;
                  }
                  return (
                    <Grid xs={6} sm={6} md={6} item key={i}>
                      <div className="bg_img">
                        <img
                          onClick={imageClick}
                          id={`FontDetailPage_bgImage_${i + 1}`}
                          src={bgImage}
                          alt="font"
                          width={"135px"}
                          height={"130px"}
                        />
                      </div>
                    </Grid>
                  );
                })}
              </Grid>
            </div>
          </div>
          <div className="sns_box">
            <div className="sns_header">폰트 공유</div>
            {/* 카카오톡 버튼 공유 클릭 */}
            <div className="sns_icon_box">
              <div className="sns_img_box" onClick={handleKakaoButton}>
                <img
                  src={kakaoImg}
                  alt="카카오"
                  width={"27px"}
                  height={"27px"}
                />
              </div>
              <CopyToClipboard text={currentUrl}>
                <div
                  className="sns_img_box"
                  onClick={() => {
                    clearTimeout(clipboardModal);
                    const clipboard_check =
                      document.getElementById("clipboard_check");
                    clipboard_check.style.visibility = "visible";
                    clipboard_check.style.left =
                      window.innerWidth / 2 - 175 / 2 + "px";
                    clipboardModal = setTimeout(() => {
                      clipboard_check.style.visibility = "hidden";
                    }, 1000);
                  }}
                >
                  <img
                    src={linkImg}
                    alt="링크"
                    width={"42px"}
                    height={"42px"}
                  />
                </div>
              </CopyToClipboard>
            </div>
            <div className="font_download_box" onClick={fontDownloadClick}>
              폰트 다운로드
              <AiOutlineDownload size={25} style={{ marginLeft: "10px" }} />
            </div>
          </div>
          <div className="font_make_box">
            <div className="font_make_header">폰트 제작</div>
            <div
              className="font_make_button"
              onClick={() => {
                navigate("/make-font");
              }}
            >
              내 폰트 제작하기
              <AiOutlineFontSize size={25} style={{ marginLeft: "10px" }} />
            </div>
          </div>
        </div>
      </div>

      {/* 바깥 div 영역 */}
      <div
        className="font_picker_box"
        id="fontDetailPage_font_color_picker_box"
      >
        <SketchPicker
          color={fontTrialConfig.color}
          onChange={(color) => {
            setFontTrialConfig({ ...fontTrialConfig, color: color.hex });
            document.getElementById(
              "fontDetailPage_color_select_current"
            ).style.backgroundColor = fontTrialConfig.color;
          }}
        />
      </div>
      <div
        className="font_spacing_picker_box"
        id="fontDetailPage_spacing_picker_box"
      >
        <div className="spacing_picker_header">자간</div>
        <Slider
          defaultValue={1}
          aria-label="Default"
          valueLabelDisplay="auto"
          max={10}
          min={1}
          name="letterSpacing"
          value={fontTrialConfig.letterSpacing}
          onChange={changeConfig}
        />
        <div className="spacing_picker_header">행간</div>
        <Slider
          step={0.1}
          min={1}
          max={2.1}
          name="lineHeight"
          value={fontTrialConfig.lineHeight}
          aria-label="Default"
          valueLabelDisplay="auto"
          onChange={changeConfig}
        />
      </div>
      <div className="clipboard_check" id="clipboard_check">
        클립보드에 복사 되었습니다.
      </div>
      <div
        className="full_width_height"
        id="fontDetailPage_full_width_height"
        onClick={clickPicker}
      ></div>
    </div>
  );
};

export default FontDetailPage;
