import React, { useRef, useState } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

const TestPage = () => {
  const [uploadImage, setUploadImage] = useState(null);
  const [crop, setCrop] = useState({
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

  const [croppedImageUrl, setCroppedImageUrl] = useState(null);

  const inputImageRef = useRef();

  const canvasRef = useRef();
  const imgRef = useRef();

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

  // 크롭 영역 canvas에 넣기
  const createCanvas = () => {
    if (!completedCrop || !canvasRef.current || !imgRef.current) {
      return;
    }
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;
    const crop = completedCrop;

    const scaleX = imgRef.current.naturalWidth / imgRef.current.width;
    const scaleY = imgRef.current.naturalHeight / imgRef.current.height;
    const pixelRatio = window.devicePixelRatio;

    canvasRef.current.width = crop.width * pixelRatio * scaleX;
    canvasRef.current.height = crop?.height * pixelRatio * scaleY;

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

    const base64Image = canvasRef.current.toDataURL("image/png");
    setCroppedImageUrl(base64Image);
  };

  return (
    <div>
      <div>
        <img
          src={uploadImage}
          alt="이미지를 업로드 해주세요"
          width={"100%"}
          height={"100%"}
          style={{
            borderRadius: "10px",
          }}
        />
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

      <div style={{ marginTop: "100px" }}>
        <ReactCrop
          crop={crop}
          onComplete={setCompletedCrop}
          onChange={(c) => {
            setCrop(c);
          }}
        >
          <img
            src={uploadImage}
            onLoad={onLoad}
            alt="이미지"
            id="cropBasedImage"
            style={{ maxWidth: "800px", maxHeight: "400px" }}
          />
        </ReactCrop>
        <div>
          <button onClick={createCanvas}>크랍</button>
        </div>
        <canvas ref={canvasRef}></canvas>
        <div>
          <img
            src={croppedImageUrl}
            alt="이미지"
            width={"32px"}
            height={"32px"}
          />
        </div>
      </div>
    </div>
  );
};

export default TestPage;
