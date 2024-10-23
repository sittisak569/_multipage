import React, { useEffect, useState } from 'react';
import "./Animation.css";

function Animation() {
  const fieldWidth = 1000;
  const fieldHeight = 600;
  const diameter = 130;
  const maxLeft = fieldWidth - diameter - 2;
  const maxTop = fieldHeight - diameter - 2;

  const [running, setRunning] = useState(false);
  const [position, setPosition] = useState({ x: (fieldWidth / 2) - (diameter / 2), y: (fieldHeight / 2) - (diameter / 2) });
  const [rotation, setRotation] = useState(0);
  const [speed, setSpeed] = useState({ vx: 5, vy: 5 });
  const [rotationSpeed, setRotationSpeed] = useState(3);
  const [goRight, setGoRight] = useState(true);
  const [goDown, setGoDown] = useState(true);
  const [backgroundImage, setBackgroundImage] = useState("none");
  const [selectedButton, setSelectedButton] = useState('none'); // เก็บสถานะของปุ่มที่ถูกเลือก

  const randomSpeed = () => Math.floor(Math.random() * 4) + 2; // สุ่มความเร็วระหว่าง 2 ถึง 5
  const randomRotationSpeed = () => Math.floor(Math.random() * 5) + 1; // สุ่มความเร็วการหมุนระหว่าง 1 ถึง 5


  const runClick = () => {
    setRunning(!running);
  };

  const calculate = () => {
    let newX = position.x;
    let newY = position.y;

    // ตรวจสอบการชนขอบขวาและซ้าย
    if (newX >= maxLeft) {
        newX = maxLeft;                   // ทำให้ตำแหน่งลูกบอลอยู่ตรงขอบขวาพอดี
        setGoRight(false);                 // ถ้าชนขอบขวา ให้ย้อนกลับไปทางซ้าย
        const newSpeed = randomSpeed();           // สุ่มความเร็วใหม่
        setSpeed({ vx: newSpeed, vy: newSpeed }); // ใช้ค่าความเร็วเดียวกัน
        setRotationSpeed(randomRotationSpeed());  // สุ่มความเร็วการหมุนใหม่
      } else if (newX <= 0) {
        newX = 0;                       // ทำให้ตำแหน่งลูกบอลอยู่ตรงขอบซ้ายพอดี
        setGoRight(true);               // ถ้าชนขอบซ้าย ให้วิ่งไปทางขวา
        const newSpeed = randomSpeed(); 
        setSpeed({ vx: newSpeed, vy: newSpeed }); 
        setRotationSpeed(randomRotationSpeed()); 
      }

      // ตรวจสอบการชนขอบบนและล่าง
      if (newY >= maxTop) {
        newY = maxTop;            // ทำให้ตำแหน่งลูกบอลอยู่ตรงขอบล่างพอดี
        setGoDown(false);         // ถ้าชนขอบล่าง ให้ย้อนกลับไปทางบน
        const newSpeed = randomSpeed();           // สุ่มความเร็วใหม่
        setSpeed({ vx: newSpeed, vy: newSpeed }); // ใช้ค่าความเร็วเดียวกัน
        setRotationSpeed(randomRotationSpeed());  // สุ่มความเร็วการหมุนใหม่
      } else if (newY <= 0) {
        newY = 0;                            // ทำให้ตำแหน่งลูกบอลอยู่ตรงขอบบนพอดี
        setGoDown(true);                     // ถ้าชนขอบบน ให้วิ่งไปทางล่าง
        const newSpeed = randomSpeed(); 
        setSpeed({ vx: newSpeed, vy: newSpeed }); 
        setRotationSpeed(randomRotationSpeed()); 
      }
  
      // คำนวณตำแหน่งใหม่
      newX = goRight ? newX + speed.vx : newX - speed.vx;
      newY = goDown ? newY + speed.vy : newY - speed.vy;
  
      setPosition({ x: newX, y: newY });
      setRotation((prevRotation) => (prevRotation + rotationSpeed) % 360);  // หมุนลูกบอล
    };

  useEffect(() => {
    const interval = setInterval(() => {
      if (running) {
        calculate();
      }
    }, 25); // ความเร็วของการเคลื่อนที่

    return () => clearInterval(interval);
  }, [running, position, goRight, goDown]);

  const changeImage = (type) => {
    const images = {
      none: "none",
      basketball: "url(./IMG/png-transparent-basketball.png)",
      football: "url(./IMG/UEFA.jpg)",
      volleyball: "url(./IMG/Volleyball.jpg)",
      human: "url(./IMG/best.jpg)",
      cartoon: "url(./IMG/Cartoon.jpg)",
      logo: "url(./IMG/Logo.png)",
    };
    setBackgroundImage(images[type] || "none");
    setSelectedButton(type); // อัปเดตสถานะของปุ่มที่ถูกเลือก
  };

  return (
    <div id="container">
      <div id="field" style={{ width: fieldWidth, height: fieldHeight }}>
        <div
          id="ball"
          style={{
            left: position.x,
            top: position.y,
            width: diameter,
            height: diameter,
            transform: `rotate(${rotation}deg)`,
            backgroundImage,
            position: "relative", // แก้เป็น absolute เพื่อให้เคลื่อนไหวได้
          }}
        />
      </div>

      <div id="control">
        <button
          id="run"
          className={`btn ${running ? "btn-danger" : "btn-success"} me-4`}
          onClick={runClick}
        >
          {running ? (
            <span className="bi bi-pause">&nbsp;Pause</span>
          ) : (
            <span className="bi bi-play">&nbsp;Run</span>
          )}
        </button>

        <div className="conbox">
        {[
          "none",
          "basketball",
          "football",
          "volleyball",
          "human",
          "cartoon",
          "logo",
        ].map((type) => (
          <button
            key={type}
            className={`btn ${selectedButton === type ? 'btn-primary' : 'btn-dark'} me-1`}
            onClick={() => changeImage(type)}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
        </div>
      </div>
    </div>
  );
}

export default Animation;
