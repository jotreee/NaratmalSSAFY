import '../../../styles/Padlet/Post.scss'
import { useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import axios from 'axios'
import swal from "sweetalert";

const Modal = ({setModalOpen, userinfo}) => {
    const myFonts= userinfo.myFonts
    const token = localStorage.getItem('token')
    const [color, setColor] = useState('')
    const [font, setFont] = useState('')
    const [content, setContent] = useState('')
    const [title, setTitle] = useState('')

    const colorlist = [
        'red', 'blue', 'green', 'skyblue', 'gray', 'pink', 'brown', 'orange', 'yellow', 'purple'
    ]
    const closeModal = () => {
        setModalOpen(false)
    }
    const createPost = () => {
        axios({            
            url: '/api/padlet',
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`, 
                'Content-Type':'application/json'
            },
            data: {
                "color": `${color}`,
                "content": `${content}`,
                "fontSeq": `${font}`,
                "location": "gumi",
                "title": `${title}`
            }
        })
        .then(res => {
            console.log(res)
            swal({
                text: "낙서가 성공적으로 생성되었습니다.",
                icon: "success",
                button: "확인",
              }).then(() => {
                window.location.href='/post/gumi'
              });
        })
        .catch(err => {
            console.log(err)
            swal({
                text: "낙서 정보를 확인하세요!",
                icon: "error",
                button: "확인",
              }).then(() => {
                window.location.href='/post/gumi'
              });
        })
        setModalOpen(false)
    }
    
    const handlefont = (e) => {
        setFont(e.target.value)
        console.log(font)
    }

    const handlecontent = (e) => {
        setContent(e.target.value)
        console.log(content)
    }
    const handletitle = (e) => {
        setTitle(e.target.value)
        console.log(content)
    }
    const handlecolor = (e) => {
        setColor(e.target.value)
        console.log(color)
    }

    return(
        <div className='Modal'>
            <div className='Modal__Body'>
            <div className='Modal__Top'>
                <div className='Modal__Top__Title'>낙서 생성</div>
                <div className='Modal__Top__Button'>
                    <div className='Modal__Top__Button__Make' onClick={createPost}>생성</div>
                    <div className='Modal__Top__Button__Close' onClick={closeModal}>닫기</div>
                </div>
            </div>
            <input type='text' placeholder='제목' onChange={handletitle} className="Modal__Title"></input>
            <textarea onChange={handlecontent} className="Modal__Content" placeholder="아름다운 추억을 나누어 보아요..."></textarea>
            <div className='Modal__Space'></div>
            <FormControl fullWidth className='Modal__Select__Font'>
                <InputLabel id="demo-simple-select-label">폰트 선택</InputLabel>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={font}
                label="Font"
                onChange={handlefont}
                >
                    {myFonts.map((data) =>
                        <MenuItem value={data.fontSeq}>{data.fontName}</MenuItem>    
                    )}
                </Select>
            </FormControl>
            <div className='Modal__Space'></div>
            <FormControl fullWidth className='Modal__Select__Color'>
                <InputLabel id="demo-simple-select-label">색상 선택</InputLabel>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={color}
                label="Color"
                onChange={handlecolor}
                >
                    {colorlist.map((data) =>
                        <MenuItem value={data}><div className='menuitems'><div className="Colorexample" style={{backgroundColor:`${data}`}}></div><div>{data}</div></div></MenuItem>   
                    )}
                </Select>
            </FormControl>
            <div className='Modal__Space'></div>
            </div>
        </div>
    );
};

export default Modal;
