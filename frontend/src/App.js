import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import KakaoLogin from "./components/Login/KakaoLogin.jsx";
import MainPage from "./pages/MainPage.jsx";
import MyPage from "./pages/MyPage.jsx";
import "../src/styles/Common/App.scss";
import TopNav from "./components/Common/TopNav.jsx";
import Footer from "./components/Common/Footer.jsx";
import PadletPage from "./pages/PadletPage.jsx";
import Postseoul from "./components/Padlet/Seoul/Postseoul.jsx";
import Postbusan from "./components/Padlet/Busan/Postbusan.jsx";
import Postgumi from "./components/Padlet/Gumi/Postgumi.jsx";
import Postgwangju from "./components/Padlet/Gwangju/Postgwangju.jsx";
import Postdaejeon from "./components/Padlet/Daejeon/Postdaejeon.jsx";
import FontSearchPage from "./pages/FontSearchPage.jsx";
import FontDetailPage from "./pages/FontDetailPage.jsx";
import FontMakePage from "./pages/FontMakePage.jsx";
import TestPage from "./pages/TestPage.jsx";
import ScrollToTop from "./components/Common/ScrollToTop.jsx";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <TopNav />
        <ScrollToTop />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/oauth/callback/kakao" element={<KakaoLogin />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/" element={<MainPage />} />
          <Route path="/make-font" element={<FontMakePage />} />
          <Route path="/detail/:fontSeq" element={<FontDetailPage />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/padlet" element={<PadletPage />} />
          <Route path="/post/seoul" element={<Postseoul />} />
          <Route path="/post/busan" element={<Postbusan />} />
          <Route path="/post/daejeon" element={<Postdaejeon />} />
          <Route path="/post/gwangju" element={<Postgwangju />} />
          <Route path="/post/gumi" element={<Postgumi />} />
          <Route path="/search" element={<FontSearchPage />} />
          <Route path="/test" element={<TestPage />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
