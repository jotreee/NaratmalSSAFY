import React from "react";
import "../../styles/Common/Footer.scss";
import logo from "../../assets/logo.png";

const Footer = () => {
  return (
    <div className="Footer">
      <div className="Footer__container">
        <div className="brand_info_box">
          <div className="brand_logo custom_m_y_10">
            <img
              src={logo}
              alt="logo"
              height="65px"
              style={{ maxWidth: "300px", width: "100%" }}
            />
          </div>
          <div className="brand_info custom_m_y_30">
            <ul>
              <li>상호명: 나랏말싸피</li>
              <li>
                <span style={{ fontSize: "10px" }}>(주)</span>SSAFY
              </li>
              <li>자율 프로젝트</li>
              <li>이메일: jimdac3464@gmail.com</li>
              <li>만든이: 한제규, 유지홍, 임현탁, 가수왕, 채민지, 조경수</li>
              <li>주소: 경북 구미시 3공단3로 302</li>
            </ul>
          </div>
          <div
            className="brand_info custom_m_t_30"
            style={{ fontWeight: "bold" }}
          >
            © 2022 나랏말싸피. All Rights Reserved.
          </div>
        </div>
        <div className="precaution_info_box">
          <div className="custom_m_y_30 precaution_header">주의 사항</div>
          <div className="custom_m_y_10 precaution_info">
            "나랏말싸피" 에서 만든 모든 폰트는 프리웨어 입니다.
          </div>
          <div className="custom_m_y_10 precaution_info">
            "나랏말싸피"에서 만들어진 모든 폰트는 금전적 거래가 금지됩니다.
          </div>
          <div className="custom_m_y_10 precaution_info">
            "나랏말싸피"에서 만들어진 모든 폰트와 관련된 거래에서 발생한 문제는
            일체 책임지지 않습니다.
          </div>
          <div
            className="custom_m_y_10 precaution_info"
            style={{ marginBottom: "30px" }}
          >
            "나랏말싸피"는 모든 싸피생들의 앞날을 응원합니다.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
