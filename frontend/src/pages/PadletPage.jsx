import '../styles/Padlet/Board.scss'
import map from '../assets/map.png'
import pointer from '../assets/pointer.png'
import { useNavigate } from 'react-router-dom'
import swal from "sweetalert";
import { useEffect } from 'react'

const PadletPage = () => {
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

    const navigate = useNavigate()
    function navitoSeoul () {
        navigate('/post/seoul')
    }
    function navitoDaejeon () {
        navigate('/post/daejeon')
    }
    function navitoGwangju () {
        navigate('/post/gwangju')
    }
    function navitoGumi () {
        navigate('/post/gumi')
    }
    function navitoBusan () {
        navigate('/post/busan')
    }
    return(
        <div className='Padlet'>
            <div className='Padlet__Top'>
                <div className='Padlet__Top__Title'>싸피 낙서장 입니다!</div>
                <div className='Padlet__Top__Content'>아이콘을 클릭하여 각 지역의 낙서장으로 입장하세요.</div>
                <div className='Padlet__Top__Content'>낙서장을 작성하여 싸피에서의 추억을 공유해 보세요.</div>
                <div className='Padlet__Top__Content'>자신만의 폰트로 손으로 직접 적은 듯한 느낌을 받아보세요!</div>
            </div>
            <div className='Padlet__main'>
                <img className='Padlet__main__map' src={map} alt="map"/>
                <div className='Padlet__main__Seoul'>
                    <img className='Padlet__main__Seoul__Img' src={pointer} alt="seoul" onClick={navitoSeoul}/>
                </div>
                <div className='Padlet__main__Daejeon'>
                    <img className='Padlet__main__Daejeon__Img' src={pointer} alt="daejeon" onClick={navitoDaejeon}/>
                </div>
                <div className='Padlet__main__Gwangju'>
                    <img className='Padlet__main__Gwangju__Img' src={pointer} alt="gwangju" onClick={navitoGwangju}/>
                </div>
                <div className='Padlet__main__Gumi'>
                    <img className='Padlet__main__Gumi__Img' src={pointer} alt="gumi" onClick={navitoGumi}/>
                </div>
                <div className='Padlet__main__Busan'>
                    <img className='Padlet__main__Busan__Img' src={pointer} alt="busan" onClick={navitoBusan}/>
                </div>
            </div>
                {/* <img className='Padlet__main__Seoul' src={pointer} alt="seoul" onClick={navitoSeoul}/>
                <img className='Padlet__main__Daejeon' src={pointer} alt="daejeon" onClick={navitoDaejeon}/>
                <img className='Padlet__main__Gwangju' src={pointer} alt="gwangju" onClick={navitoGwangju}/>
                <img className='Padlet__main__Gumi' src={pointer} alt="gumi" onClick={navitoGumi}/>
                <img className='Padlet__main__Busan' src={pointer} alt="busan" onClick={navitoBusan}/> */}
        </div>
    );
};

export default PadletPage;
