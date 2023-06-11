import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import axios from 'axios'
import '../styles/Sign/SignUp.scss'
import { useNavigate } from 'react-router-dom'

import mainLogo from "../assets/mainicon.png";
import swal from "sweetalert";

const SignUpPage = () => {
    const navigate = useNavigate()
    useEffect(() => {
        const userEmail = location.search.split('=')[1]
        if (!userEmail) {
          swal({
            text: "잘못된 접근 방식입니다!",
            icon: "error",
            button: "확인",
          }).then(() => {
            navigate("/");
          });
        }
      }, []);
    const location = useLocation();
    const [region, setRegion] = useState('')
    const [name, setName] = useState('')
    const userEmail = location.search.split('=')[1]
    const [nickname, setNickname] = useState('')
    const [signup, setSignup] = useState(false)
    const handleRegion = (event) => {
        setRegion(event.target.value)
    }
    const handleName = (event) => {
        setName(event.target.value)
    }
    const handleNickname = (event) => {
        setNickname(event.target.value)
        setSignup(false)
    }

// 회원가입 #########################################################################################
    const handleSignup = () => {
        const userInfo={
            'userEmail' : userEmail,
            'userLocation' : region,
            'userName' : name,
            'userNickname' : nickname
        }
        console.log(userInfo)
        axios({
            url: '/api/user',
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            data: userInfo
        })
        .then(res => {
            console.log(res)
            localStorage.setItem('token', res.data.loginResult)
            swal({
                text: "환영합니다 회원님!!",
                icon: "success",
                button: "확인",
              }).then(() => {
                window.location.href='/'
              });
        })
        .catch(err => {
            console.log(err)
        })
    }
// #############################################################################################################

    
    
    // 닉넴 중복 체크 ##############################################################################
    const handleNicknameCheck=()=>{
        console.log(nickname)
        axios({
            url: `/api/user/checknickname/${nickname}`,
            method: 'GET',
            headers: {'Content-Type':'application/json'}
        })
        .then(res => {
            console.log(res.data)
            if (res.data === true){
                setSignup(res.data)
                swal({
                    text: "사용 가능한 닉네임입니다.",
                    icon: "info",
                    button: "확인",
                  })
            }
            else{
                setSignup(res.data)
                swal({
                    text: "중복된 닉네임이 존재합니다! 다른 닉네임을 선택해 주세요!",
                    icon: "warning",
                    button: "확인",
                  })
            }
            console.log(signup)
        })
        .catch(err => 
            console.log(err)
        )
    }
    // #############################################################################################################


    return(
        <div>
            <div className='Signup'>
            <div className='Signup__Logo'>
                <img
                        className="Signup__Logo__Main"
                        src={mainLogo}
                        alt="mainlogo"
                        width={"80%"}
                    />
            </div>
            <div className='Signup__Top'>
                <div className='Signup__Top__Title'>나랏말싸피 회원가입</div>
                <div className='Signup__Top__Content'>회원가입을 하세요! 아이디 하나로 다양한 서비스를 경험해 보세요!</div>
            </div>
            <div className='Signup__Content'>
            <Box>
                <FormControl fullWidth className='Signup__Content__Location'>
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
                <div className='Signup__Content__Space'></div>
                <FormControl fullWidth className='Signup__Content__Name'>
                    <TextField label="이름" variant="outlined" value={name} onChange={handleName}/>
                </FormControl>
                <div className='Signup__Content__Space'></div>
                <FormControl fullWidth className='Signup__Content__Nickname'>
                    <TextField label="닉네임" variant="outlined" value={nickname} onChange={handleNickname}/>
                </FormControl>
                <div className='Signup__Content__Space'></div>
                <p>최종 활동명은 지역, 이름, 닉네임을 합쳐 지역_이름_닉네임 형식으로 만들어드립니다.</p> 
                { signup && <div className="checkNicknamecenter"><div className="checkNickname"  onClick={handleSignup}>가입하기</div></div>}
            </Box>
            <div><div className="Nickname" onClick={handleNicknameCheck}>중복체크</div></div>
        </div>
        </div>
        </div>
    );
};

export default SignUpPage;
