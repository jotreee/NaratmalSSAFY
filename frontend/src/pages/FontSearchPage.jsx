import React, { useCallback, useEffect, useState } from "react";
import "../styles/FontSearchPage/FontSearchPage.scss";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Divider, Grid, TextField, useMediaQuery } from "@mui/material";
import { FcSearch } from "react-icons/fc";
import { BsFonts } from "react-icons/bs";
import FontSearchItem from "../components/FontSearch/FontSearchItem";
import { useInView } from "react-intersection-observer";
import axios from "axios";

const FontSearchPage = () => {
  const [searchCondition, setSearchCondition] = useState("nickName");
  const [searchText, setSearchText] = useState("");
  const [searchOption, setSearchOption] = useState("fontRegDate,desc");
  const [fontData, setFontData] = useState([]);

  const [fontEditorText, setFontEditorText] = useState("");

  // 무한 스크롤
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [ref, inView] = useInView();

  const isMobile600 = useMediaQuery("(max-width:600px)");

  const handleChangeCondition = (event) => {
    setSearchCondition(event.target.value);
  };
  const handleChangeText = (event) => {
    setSearchText(event.target.value);
  };

  useEffect(() => {
    if (!isMobile600) {
      document
        .getElementById(searchOption)
        .classList.add("font_search_opt_select");
    }

    //fontData axios로 받기
  }, []);

  // 서버에서 아이템을 가지고 오는 함수
  const getItems = useCallback(() => {
    setLoading(true);
    axios({
      method: "GET",
      url: `/api/font`,
      params: {
        page: page,
        size: 20,
        flag: searchCondition,
        keyword: searchText,
        sort: searchOption,
      },
    })
      .then((res) => {
        setFontData((prevState) => {
          return [...prevState, ...res.data.fonts];
        });
      })
      .catch((err) => {
        console.log(err);
      });

    // await axios.get(`${Your Server Url}/page=${page}`).then((res) => {
    //   setItems(prevState => [...prevState, res])
    // })
    setLoading(false);
  }, [page]);

  // `getItems` 가 바뀔 때 마다 함수 실행
  useEffect(() => {
    getItems();
  }, [getItems]);

  useEffect(() => {
    // 사용자가 마지막 요소를 보고 있고, 로딩 중이 아니라면
    if (inView && !loading) {
      setPage((prevState) => prevState + 1);
    }
  }, [inView, loading]);

  const enterClick = (e) => {
    //검색 조건 받아오는 aixos 서버 통신
    if (e.key === "Enter" || e.type === "click") {
      setPage(1);
      axios({
        method: "GET",
        url: `/api/font`,
        params: {
          page: 1,
          size: 20,
          flag: searchCondition,
          keyword: searchText,
          sort: searchOption,
        },
      })
        .then((res) => {
          setFontData(res.data.fonts);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const clickSearchOption = (e) => {
    let searchOpt = "";

    if (isMobile600) {
      setSearchOption(e.target.value);
      searchOpt = e.target.value;
    } else {
      searchOpt = e.target.id;
      const fontSearchOptName = document.getElementsByClassName(
        "font_search_opt_name"
      );

      for (let index = 0; index < fontSearchOptName.length; index++) {
        const element = fontSearchOptName[index];
        element.classList.remove("font_search_opt_select");

        if (element.id === e.target.id) {
          element.classList.add("font_search_opt_select");
        }
      }
    }

    setPage(1);
    axios({
      method: "GET",
      url: `/api/font`,
      params: {
        page: 1,
        size: 20,
        flag: searchCondition,
        keyword: searchText,
        sort: searchOpt,
      },
    })
      .then((res) => {
        setFontData(res.data.fonts);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="FontSearchPage">
      <div className="font_search_header">
        <h1>원하는 폰트를 검색하세요!</h1>
        <div className="font_search_info_text">
          <span>지역_이름_닉네임</span> 형식으로 검색하면 자세히 검색
          가능합니다.
        </div>
        <div className="font_search_info_text">
          다른 싸피생들의 폰트들을 구경하고 이용하세요!
        </div>
        <div className="font_search_info_text">
          무료로 받을 수 있고 비상업적 용도로 이용가능합니다!
        </div>
      </div>
      <div className="font_search_box">
        <div className="font_search_dropdown">
          <FormControl sx={{ width: 120 }}>
            <InputLabel
              id="demo-simple-select-label"
              style={{ fontFamily: "GongGothicMedium" }}
            >
              검색
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={searchCondition}
              label="검색"
              onChange={handleChangeCondition}
              style={{ fontFamily: "GongGothicMedium" }}
            >
              <MenuItem value={"nickName"}>닉네임</MenuItem>
              <MenuItem value={"fontName"}>폰트 이름</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="font_search_text">
          <FormControl sx={{ width: 480 }}>
            <TextField
              id="standard-basic"
              label={
                searchCondition === "nickName"
                  ? "원하는 닉네임, 지역, 이름 중 하나를 입력해주세요"
                  : "폰트 이름을 입력해주세요"
              }
              variant="standard"
              fullWidth
              inputProps={{
                style: { fontSize: 20, fontFamily: "GongGothicMedium" },
              }}
              InputLabelProps={{
                style: { fontSize: 20, fontFamily: "GongGothicMedium" },
              }} // font size of input label
              onChange={handleChangeText}
              value={searchText}
              onKeyDown={enterClick}
            />
          </FormControl>
          <div className="search_icon_box">
            <FcSearch size={50} onClick={enterClick} />
          </div>
        </div>
      </div>

      <div className="font_search_opt">
        {isMobile600 ? (
          <>
            <FormControl
              sx={{ width: 120, marginBottom: "15px", marginRight: "20px" }}
            >
              <InputLabel id="demo-simple-select-label2">정렬</InputLabel>
              <Select
                labelId="demo-simple-select-label2"
                id="demo-simple-select2"
                value={searchOption}
                label="정렬"
                onChange={clickSearchOption}
              >
                <MenuItem value={"fontRegDate,desc"}>최신순</MenuItem>
                <MenuItem value={"fontRegDate,asc"}>오래된 순</MenuItem>
                <MenuItem value={"fontFavCount,desc"}>인기 순</MenuItem>
                <MenuItem value={"fontDownloadCount,desc"}>
                  다운로드 순
                </MenuItem>
              </Select>
            </FormControl>
          </>
        ) : (
          <ul style={{ marginRight: "20px" }}>
            <li
              className="font_search_opt_name"
              id="fontRegDate,desc"
              onClick={clickSearchOption}
            >
              최신순
            </li>
            <li
              className="font_search_opt_name"
              id="fontRegDate,asc"
              onClick={clickSearchOption}
            >
              오래된 순
            </li>
            <li
              className="font_search_opt_name"
              id="fontFavCount,desc"
              onClick={clickSearchOption}
            >
              인기 순
            </li>
            <li
              className="font_search_opt_name"
              id="fontDownloadCount,desc"
              onClick={clickSearchOption}
            >
              다운로드 순
            </li>
          </ul>
        )}
        <div className="font_text_editor">
          <span>
            <BsFonts size={30} />
          </span>
          <input
            type="text"
            placeholder="원하는 글자를 입력해보세요"
            value={fontEditorText}
            onChange={(e) => {
              setFontEditorText(e.target.value);
            }}
          />
        </div>
      </div>
      <div className="custom_m_y_10">
        <Divider />
      </div>

      <Grid container spacing={3}>
        {fontData.map((data, idx) =>
          fontData.length - 1 === idx ? (
            <Grid key={idx} ref={ref} xs={12} sm={6} md={4} lg={3} item>
              <FontSearchItem
                idx={idx}
                fontData={data}
                fontEditorText={fontEditorText}
              />
            </Grid>
          ) : (
            <Grid key={idx} xs={12} sm={6} md={4} lg={3} item>
              <FontSearchItem
                idx={idx}
                fontData={data}
                fontEditorText={fontEditorText}
              />
            </Grid>
          )
        )}
      </Grid>
    </div>
  );
};

export default FontSearchPage;
