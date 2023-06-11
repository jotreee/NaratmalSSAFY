import MyFont from '../components/Mypage/Cards/Myfont.jsx'
import MyFavoritesFont from '../components/Mypage/Cards/Myfavoritesfont.jsx'
import MyDownloadFont from '../components/Mypage/Cards/Mydownloadfont.jsx'
import MyWaitingFont from '../components/Mypage/Cards/Mywaitingfont.jsx'
import '../styles/MyPage/MyPage.scss'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Divider, Grid } from "@mui/material";

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';


import { useNavigate } from 'react-router-dom'
import swal from "sweetalert";

const MyPage = () => {
    const navigate = useNavigate()
    const [userinfo, setUserinfo] = useState('')
    const [ismyfontsempty, setIsmyfontsempty] = useState(true)
    const [isdownloadfontsempty, setIsdownloadfontsempty] = useState(true)
    const [islikefontsempty, setIslikefontsempty] = useState(true)
    
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
      }, []);
    
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
            setUserinfo(res.data)
            if (res.data.downloadFonts.length !== 0) {
                setIsdownloadfontsempty(false)
            }
            if (res.data.likeFonts.length !== 0){
                setIslikefontsempty(false)
            }
            if (res.data.myFonts.length !== 0){
                setIsmyfontsempty(false)
            }
            if (res.data.waitingFonts.length !== 0) {
                setIsmyfontsempty(false)
            }
        })
        .catch(err => {
            console.log(err)
        })
    }, [])


// 내폰트, 다운로드, 즐겨찾기중 어떤걸로 볼지 #################################################################

    const [ismyfontshow, setIsmyfontshow] = useState(true)
    const [isdownloadshow, setIsdownloadshow] = useState(false)
    const [isfavoriteshow, setIsfavoriteshow] = useState(false)
    const [iseditshow, setIseditshow] = useState(false)

    function showedit() {
        setIsmyfontshow(false)
        setIsfavoriteshow(false)
        setIsdownloadshow(false)
        setIseditshow(true)
    } 
    function showmyfont() {
        setIsmyfontshow(true)
        setIsfavoriteshow(false)
        setIsdownloadshow(false)
        setIseditshow(false)
    } 
    function showdownloadfont() {
        setIsmyfontshow(false)
        setIsfavoriteshow(false)
        setIsdownloadshow(true)
        setIseditshow(false)
    } 
    function showfavoritefont() {
        setIsmyfontshow(false)
        setIsfavoriteshow(true)
        setIsdownloadshow(false)
        setIseditshow(false)
    } 
// ###########################################################################################################

// 회원정보수정을 위한 ########################################################################################

// 회원 정보 수정 ######################################################################################## 
const [region, setRegion] = useState('')
const [name, setName] = useState('')
const [nickname, setNickname] = useState('')
const [change, setChange] = useState(false)

const handleRegion = (event) => {
    setRegion(event.target.value)
}
const handleName = (event) => {
    setName(event.target.value)
}
const handleNickname = (event) => {
    setNickname(event.target.value)
    setChange(false)
}
const handleEdit = () => {
    const token = localStorage.getItem('token')
    const userInfo={
        'userLocation' : region,
        'userName' : name,
        'userNickname' : nickname
    }
    console.log(userInfo)
    axios({
        url: '/api/user',
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`, 
            'Content-Type':'application/json'
        },
        data: userInfo
    })
    .then(res => {
        console.log(res)
        swal({
            text: "정보가 수정되었습니다!",
            icon: "success",
            button: "확인",
          }).then(() => {
            navigate("/");
          });
    })
    .catch(err => {
        console.log(err)
    })
}
// #############################################################################################################



// 닉네임 중복 체크 ################################################################################## 
const handleNicknameCheck=()=>{
    axios({
        url: `/api/user/checknickname/${nickname}`,
        method: 'GET',
        headers: {'Content-Type':'application/json'}
    })
    .then(res => {
        if (res.data === true){
            setChange(res.data)
            swal({
                text: "사용 가능한 닉네임입니다.",
                icon: "info",
                button: "확인",
              })
        }
        else{
            setChange(res.data)
            swal({
                text: "중복된 닉네임이 존재합니다! 다른 닉네임을 선택해 주세요!",
                icon: "warning",
                button: "확인",
              })
        }
    })
    .catch(err => {
        console.log(err)
    })
}
// #############################################################################################################

// 회원정보수정을 위한 ########################################################################################


    return(
        <div className='Mypage'>
            <div className='Mypage__Profile'>
                <div className='Mypage__Profile__Title'>마이 페이지</div>
                <div className='Mypage__Profile__Content'>닉네임 : {userinfo.userLocation}_{userinfo.userName}_{userinfo.userNickname}</div>
                <div className='Mypage__Profile__Content'>이메일 : {userinfo.userEmail}</div>
            </div>
            <div className='Mypage__Fontselect'>
                <div className='Mypage__Fontselect__My' onClick={showmyfont}>내폰트</div>
                <div className='Mypage__Fontselect__Favorite' onClick={showfavoritefont}>즐겨찾기폰트</div>
                <div className='Mypage__Fontselect__Download' onClick={showdownloadfont}>다운로드폰트</div>
                <div className='Mypage__Fontselect__Edit' onClick={showedit}>회원정보수정</div>
            </div>
            <div className="custom_m_y_10">
                    <Divider />
            </div>
                {iseditshow &&
                <div>
                <div className='Mypage__EditTitle'>회원정보수정</div>
                <div className='Mypage__Edituserinfo'>
                <Box>
                    <FormControl fullWidth className='Mypage__Edituserinfo__Location'>
                        <InputLabel id="demo-simple-select-label">지역</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={region}
                            label="지역"
                            onChange={handleRegion}
                        >
                            <MenuItem value={'서울'}>서울</MenuItem>
                            <MenuItem value={'대전'}>대전</MenuItem>
                            <MenuItem value={'구미'}>구미</MenuItem>
                            <MenuItem value={'광주'}>광주</MenuItem>
                            <MenuItem value={'부울경'}>부울경</MenuItem>
                        </Select>
                    </FormControl>
                    <div className='Mypage__Edituserinfo__Space'></div>
                    <FormControl fullWidth className='Mypage__Edituserinfo__Name'>
                        <TextField label="이름" variant="outlined" value={name} onChange={handleName}/>
                    </FormControl>
                    <div className='Mypage__Edituserinfo__Space'></div>
                    <FormControl fullWidth className='Mypage__Edituserinfo__Nickname'>
                        <TextField label="닉네임" variant="outlined" value={nickname} onChange={handleNickname}/>
                    </FormControl>
                    <div className='Mypage__Edituserinfo__Space'></div>
                    <p>최종 활동명은 지역, 이름, 닉네임을 합쳐 지역_이름_닉네임 형식으로 만들어드립니다.</p>
                    { change && <div className="checkNicknamecenter"><div className="checkNickname"  onClick={handleEdit}>정보수정하기</div></div>}
                </Box>
                <div><div className="Nickname" onClick={handleNicknameCheck}>중복체크</div></div>
            </div>
            </div>
                }
                { !ismyfontsempty &&
                <div>
                {
                    ismyfontshow &&
                    <div className='Mypage__Myfont'>
                    <Grid container spacing={3}>
                    {userinfo.waitingFonts.map((data, idx) =>
                        userinfo.waitingFonts.length - 1 === idx ? (
                            <Grid key={idx} xs={12} sm={6} md={4} lg={3} item>
                            <MyWaitingFont
                                fontData={data}
                                idx={idx}
                            />
                            </Grid>
                        ) : (
                            <Grid key={idx} xs={12} sm={6} md={4} lg={3} item>
                            <MyWaitingFont
                                fontData={data}
                                idx={idx}
                            />
                            </Grid>
                        )
                        )}
                        {userinfo.myFonts.map((data, idx) =>
                        userinfo.myFonts.length - 1 === idx ? (
                            <Grid key={idx} xs={12} sm={6} md={4} lg={3} item>
                            <MyFont
                                fontData={data}
                                idx={idx}
                            />
                            </Grid>
                        ) : (
                            <Grid key={idx} xs={12} sm={6} md={4} lg={3} item>
                            <MyFont
                                fontData={data}
                                idx={idx}
                            />
                            </Grid>
                        )
                        )}
                    </Grid>
                    </div>
                }
                </div>
                }
                {!islikefontsempty &&
                <div>
                { 
                    isfavoriteshow &&
                    <div className='Mypage__Myfavoritesfont'>
                    <Grid container spacing={3}>
                        {userinfo.likeFonts.map((data, idx) =>
                        userinfo.likeFonts.length - 1 === idx ? (
                            <Grid key={idx} xs={12} sm={6} md={4} lg={3} item>
                            <MyFavoritesFont
                                fontData={data}
                                idx={idx}
                            />
                            </Grid>
                        ) : (
                            <Grid key={idx} xs={12} sm={6} md={4} lg={3} item>
                            <MyFavoritesFont
                                fontData={data}
                                idx={idx}
                            />
                            </Grid>
                        )
                        )}
                    </Grid>
                    </div>
                }
                </div>
                }
                {!isdownloadfontsempty &&
                <div>
                { 
                    isdownloadshow &&
                    <div className='Mypage__Mydownloadfont'>
                    <Grid container spacing={3}>
                        {userinfo.downloadFonts.map((data, idx) =>
                        userinfo.downloadFonts.length - 1 === idx ? (
                            <Grid key={idx} xs={12} sm={6} md={4} lg={3} item>
                            <MyDownloadFont
                                fontData={data}
                                idx={idx}
                            />
                            </Grid>
                        ) : (
                            <Grid key={idx} xs={12} sm={6} md={4} lg={3} item>
                            <MyDownloadFont
                                fontData={data}
                                idx={idx}
                            />
                            </Grid>
                        )
                        )}
                    </Grid>
                    </div>    
                }
                </div>
            }
        { ismyfontsempty &&
            <div>
            {
                ismyfontshow && 
                <div className='Mypage__Alert'>
                    <div className='Mypage__Alert__Myfont__Title'>안녕하세요, {userinfo.userLocation}_{userinfo.userName}_{userinfo.userNickname}님 ^◡^</div>
                    <div className='Mypage__Alert__Myfont__Content'>현재 제작한 폰트가 없거나, 현재 제작 중 입니다!</div>
                    <div className='Mypage__Alert__Myfont__Content'>나랏말싸피와 함께 폰트를 제작해 보아요!!</div>
                    <div className='Mypage__Alert__Myfont__Button' onClick={()=> navigate('/make-font')}>폰트제작하기</div>
                </div>
            }
            </div>
        }
        { islikefontsempty &&
            <div>
            {
                isfavoriteshow &&
                <div className='Mypage__Alert'>
                    <div className='Mypage__Alert__Favorite__Title'>안녕하세요, {userinfo.userLocation}_{userinfo.userName}_{userinfo.userNickname}님 ^◡^</div>
                    <div className='Mypage__Alert__Favorite__Content'>현재 즐겨찾기한 폰트가 없어요.</div>
                    <div className='Mypage__Alert__Favorite__Content'>다른 회원님이 만든 폰트를 구경해봐요!</div>
                    <div className='Mypage__Alert__Favorite__Button' onClick={()=> navigate('/search')}>폰트보러가기</div>
                </div>
            }
            </div>
        }
        { isdownloadfontsempty &&
            <div>
            {
                isdownloadshow &&
                <div className='Mypage__Alert'>
                    <div className='Mypage__Alert__Download__Title'>안녕하세요, {userinfo.userLocation}_{userinfo.userName}_{userinfo.userNickname}님 ^◡^</div>
                    <div className='Mypage__Alert__Download__Content'>현재 다운로드한 폰트가 없어요.</div>
                    <div className='Mypage__Alert__Download__Content'>다른 회원님이 만든 폰트를 구경해봐요!</div>
                    <div className='Mypage__Alert__Download__Button' onClick={()=> navigate('/search')}>폰트보러가기</div>
                </div>
            }
            </div>
        }
        </div>
    );
};

export default MyPage;
