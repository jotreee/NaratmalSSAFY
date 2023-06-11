import React, { useState } from "react";
import "../styles/MainPage/MainPage.scss";
import mainLogo from "../assets/mainicon.png";
import Grid from "@mui/material/Grid";
import font_img from "../assets/text.png";
import computer_img from "../assets/counseling.png";
import no_money_img from "../assets/no-money.png";
import overwork_img from "../assets/overwork.png";
import introduce_ucc from "../assets/example.mp4";
import process_1 from "../assets/freeEvent_make_process_1.png";
import process_2 from "../assets/freeEvent_make_process_2.png";
import process_3 from "../assets/freeEvent_make_process_3.png";

import { Divider, useMediaQuery } from "@mui/material";
import Carousel2 from "react-material-ui-carousel";
import { TiChevronLeftOutline, TiChevronRightOutline } from "react-icons/ti";
import { useNavigate } from "react-router-dom";
import font_img_1 from "../assets/font_img/1.png";
import font_img_2 from "../assets/font_img/2.png";
import font_img_3 from "../assets/font_img/3.png";
import font_img_4 from "../assets/font_img/4.png";
import font_img_5 from "../assets/font_img/5.png";
import font_img_6 from "../assets/font_img/6.png";

const MainPage = () => {
  const isMobile720 = useMediaQuery("(max-width:720px)");
  const navigate = useNavigate();
  const CARDS = 6;
  const MAX_VISIBILITY = 3;

  const Card = ({ index }) => {
    let current_font_img = null;
    switch (index) {
      case 1:
        current_font_img = font_img_1;
        break;
      case 2:
        current_font_img = font_img_2;
        break;
      case 3:
        current_font_img = font_img_3;
        break;
      case 4:
        current_font_img = font_img_4;
        break;
      case 5:
        current_font_img = font_img_5;
        break;
      case 6:
        current_font_img = font_img_6;
        break;
      default:
        current_font_img = font_img_1;
        break;
    }

    return (
      <div className="card">
        <img
          src={current_font_img}
          alt=""
          width="100%"
          height={"100%"}
          style={{ borderRadius: "1rem" }}
        />
      </div>
    );
  };

  const Carousel = ({ children }) => {
    const [active, setActive] = useState(2);
    const count = React.Children.count(children);

    return (
      <div className="carousel">
        {active > 0 && (
          <button className="nav left" onClick={() => setActive((i) => i - 1)}>
            <TiChevronLeftOutline />
          </button>
        )}
        {React.Children.map(children, (child, i) => (
          <div
            className="card-container"
            style={{
              "--active": i === active ? 1 : 0,
              "--offset": (active - i) / 3,
              "--direction": Math.sign(active - i),
              "--abs-offset": Math.abs(active - i) / 3,
              opacity: Math.abs(active - i) >= MAX_VISIBILITY ? "0" : "1",
              display: Math.abs(active - i) > MAX_VISIBILITY ? "none" : "block",
            }}
          >
            {child}
          </div>
        ))}
        {active < count - 1 && (
          <button className="nav right" onClick={() => setActive((i) => i + 1)}>
            <TiChevronRightOutline />
          </button>
        )}
      </div>
    );
  };

  const process = document.getElementsByClassName("font_make_info_process");
  let addClass = null;
  setInterval(() => {
    for (let index = 0; index < process.length; index++) {
      const element = process[index];
      element.classList.remove(`appear${index + 1}`);
    }

    addClass = setTimeout(() => {
      clearTimeout(addClass);
      for (let index = 0; index < process.length; index++) {
        const element = process[index];
        element.classList.add(`appear${index + 1}`);
      }
    }, 1);
  }, 8000);

  return (
    <div className="MainPage">
      <div className="main_img_box">
        <img
          className="main_img"
          src={mainLogo}
          alt="mainlogo"
          width={"100%"}
        />
      </div>
      <div></div>
      <div className="main_introduce_box">
        <div className="main_introduce_header custom_m_y_30">
          너만의 폰트를{" "}
          <span style={{ textDecorationLine: "underline" }}>무료로</span>{" "}
          만들어봐!
        </div>
        <div className="main_introduce_info_box">
          <Grid
            container
            spacing={3}
            sx={{ marginTop: "200px", marginBottom: "200px" }}
          >
            <Grid xs={12} sm={6} md={3} item>
              <div className="main_introduce_info">
                <div className="main_introduce_info_img">
                  <img src={font_img} alt="font" width={"128px"} />
                </div>
                <div className="main_introduce_info_text">
                  세상에 없는 독특한 폰트를 원한다면
                </div>
              </div>
            </Grid>
            <Grid xs={12} sm={6} md={3} item>
              <div className="main_introduce_info">
                <div className="main_introduce_info_img">
                  <img src={computer_img} alt="font" width={"128px"} />
                </div>
                <div className="main_introduce_info_text">
                  손글씨를 컴퓨터로 편하게 쓰고 싶다면
                </div>
              </div>
            </Grid>
            <Grid xs={12} sm={6} md={3} item>
              <div className="main_introduce_info">
                <div className="main_introduce_info_img">
                  <img src={overwork_img} alt="font" width={"128px"} />
                </div>
                <div className="main_introduce_info_text">
                  무료 폰트들이 질린다면
                </div>
              </div>
            </Grid>
            <Grid xs={12} sm={6} md={3} item>
              <div className="main_introduce_info">
                <div className="main_introduce_info_img">
                  <img src={no_money_img} alt="font" width={"128px"} />
                </div>
                <div className="main_introduce_info_text">
                  폰트에 금액을 지불하기 아깝다면
                </div>
              </div>
            </Grid>
          </Grid>
          <div className="main_introduce_info_ucc_box">
            <video
              src={introduce_ucc}
              autoPlay
              loop
              playsInline
              muted
              controls
              preload="auto"
              className="main_introduce_info_ucc"
            ></video>
          </div>
        </div>
      </div>
      <div className="custom_m_y_30">
        <Divider />
      </div>

      <div className="font_make_box">
        <div className="font_make_header">폰트 만들기 아주 쉬워요!</div>
        <div className="font_make_info_box">
          <div className="font_make_info_text_box">
            <div className="font_make_info_text">
              <ul>
                <li className="font_make_info_process appear1">
                  <span style={{ fontSize: "20px" }}>1</span>.{" "}
                  <span style={{ color: "#ffb9b9", fontSize: "28px" }}>
                    12자
                  </span>
                  를 손으로 적어주세요
                </li>
                <li className="font_make_info_process appear2">
                  <span style={{ fontSize: "20px" }}>2</span>.{" "}
                  <span style={{ color: "#ffb9b9", fontSize: "28px" }}>
                    휴대폰
                  </span>
                  으로 촬영!
                </li>
                <li className="font_make_info_process appear3">
                  <span style={{ fontSize: "20px" }}>3</span>.{" "}
                  <span style={{ color: "#ffb9b9", fontSize: "28px" }}>
                    업로드{" "}
                  </span>
                  후 개별 글자 선택하면 끝!
                </li>
              </ul>
            </div>
            <div className="font_make_info_button_box">
              <button
                className="custom_button"
                onClick={() => navigate("/make-font")}
              >
                나만의 폰트 제작하기
              </button>
            </div>
          </div>
          <div className="font_make_info_carousel">
            <Carousel2 height={"300px"} autoPlay interval={2000}>
              {[
                <div key={1}>
                  <img src={process_1} alt="" width={"100%"} />
                </div>,
                <div key={2}>
                  <img src={process_2} alt="" width={"100%"} />
                </div>,
                <div key={3}>
                  <img src={process_3} alt="" width={"100%"} />
                </div>,
              ]}
            </Carousel2>
          </div>
        </div>
      </div>
      <div className="custom_m_y_60">
        <Divider />
      </div>
      <div className="font_extend_header">
        <h1>어떤 폰트들이 있나요?</h1>
      </div>
      {!isMobile720 ? (
        <>
          <div className="font_carousel_box">
            <Carousel>
              {[...new Array(CARDS)].map((_, i) => (
                <Card index={i + 1} key={i} />
              ))}
            </Carousel>
          </div>
        </>
      ) : (
        <>
          <div className="font_make_info_carousel" style={{ margin: "0 auto" }}>
            <Carousel2 height={"300px"} autoPlay interval={2000}>
              {[...new Array(5)].map((_, i) => (
                <Card index={i + 1} key={i} />
              ))}
            </Carousel2>
          </div>
        </>
      )}
      <div className="font_extend_button_box">
        <button
          className="font_extend_button"
          onClick={() => navigate("/search")}
        >
          폰트 둘러보기
        </button>
      </div>
      <div className="custom_m_t_30">
        <Divider />
      </div>
    </div>
  );
};

export default MainPage;
