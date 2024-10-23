import { useEffect, useState } from "react";
import Variable from "../Variable/Variable";

import "./Temperaturs.css";

function Temperaturs() {
  const [celsius, setcelsius] = useState(25);
  const [fahrenheit, setfahrenheit] = useState(77);
  const [kelvin, setkelvin] = useState(298.15);
  const [activeUnit, setActiveUnit] = useState("celsius");  /*ติดตามหน่วยที่กำลังถูกเปลี่ยน นำมาแก้ Error Warning: Maximum update */



  useEffect (() => {    
    if (activeUnit === "celsius") {                /*แปลงจาก celsius to F and K  */
    setfahrenheit((celsius * 9/5) + 32);
    setkelvin((celsius + 273.15))
    }
  },[celsius, activeUnit])
  
  useEffect (() => {  
    if (activeUnit === "fahrenheit"){                /*แปลงจาก fahrenheit to C and K  */
    setcelsius((fahrenheit - 32) * 5/9);
    setkelvin((fahrenheit - 32) * 5/9 + 273);
    }
  },[fahrenheit, activeUnit])

  useEffect(() => {
    if (activeUnit === "kelvin") {
      setcelsius(kelvin - 273.15);
      setfahrenheit((kelvin - 273.15) * 9/5 + 32);
    }
  }, [kelvin, activeUnit]);

    // ฟังก์ชันในการเปลี่ยนค่าและกำหนด activeUnit เพื่อบอกว่าหน่วยไหนที่ถูกแก้ไข
    const handleCelsiusChange = (value) => {          /*Warning: Maximum update  */
      setActiveUnit("celsius");
      setcelsius(value);
    };
  
    const handleFahrenheitChange = (value) => {        /*แก้ Warning: Maximum update  */
      setActiveUnit("fahrenheit");
      setfahrenheit(value);
    };
  
    const handleKelvinChange = (value) => {       /*แก้ Warning: Maximum update  */
      setActiveUnit("kelvin");
      setkelvin(value);
    };

  return (
    <div className="temperaturs-variables">
      <h3 className="temperaturs-title">TEMPERATURS</h3>
      <h3 className="temperaturs-display">
        <span className="badge text-bg-info">{celsius.toFixed(2)} ºC</span>
        <span className="badge text-bg-info">{fahrenheit.toFixed(2)} ºF</span>
        <span className="badge text-bg-info">{kelvin.toFixed(2)} ºK</span>
      </h3>
      <div className="temperaturs-variables1">
        <Variable name={"CELSIUS"} value={celsius} setValue={handleCelsiusChange} />       {/*นำมาใช้แทน SetCelstus เพราะแก้ Error */}
        <Variable name={"FAHRENHEIT"} value={fahrenheit} setValue={handleFahrenheitChange} />
        <Variable name={"KELVIN"} value={kelvin} setValue={handleKelvinChange} />
      </div>
    </div>
  );
}

export default Temperaturs;
