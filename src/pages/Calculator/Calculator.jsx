import React, { useState } from "react";
import "./Calculator.css";

function Calculator() {
  const [currentOperand, setCurrentOperand] = useState("0");
  const [previousOperand, setPreviousOperand] = useState("0");
  const [operation, setOperation] = useState(undefined);
  const [clearState, setClearState] = useState(0);
  const [lastOperation, setLastOperation] = useState(null);
  const [lastOperand, setLastOperand] = useState(null);

  const clear = () => {
    if (clearState === 0 && currentOperand !== "0") {
      setCurrentOperand("0");
      setClearState(1);
    } else if (clearState === 1) {
      setCurrentOperand("0");
      setPreviousOperand("0");
      setOperation(undefined);
      setClearState(0);
    } else {
      setClearState(0);
    }
  };

  const deleteNumber = () => {
    setCurrentOperand(currentOperand.toString().slice(0, -1) || "0");
  };

  const appendNumber = (number) => {
    if (clearState === 1) {
      setClearState(0);
    }
    if (currentOperand === "0" && number !== ".") {
      setCurrentOperand(number.toString());
    } else if (!(number === "." && currentOperand.includes("."))) {
      setCurrentOperand(currentOperand + number.toString());
    }
  };

  const chooseOperation = (op) => {
    if (currentOperand === "") return;
    if (previousOperand !== "0") {
      compute();
    }
    setOperation(op);
    setPreviousOperand(currentOperand);
    setCurrentOperand("0");
  };

  const compute = () => {
    let result;
    const previous = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
  
    if (isNaN(previous) || isNaN(current)) return;
  
    switch (operation) {
      case "+":
        result = previous + current;
        break;
      case "-":
        result = previous - current;
        break;
      case "x":
        result = previous * current;
        break;
      case "÷":
        if (current === 0) {
          result = "Error"; // แก้ไขให้แสดง Error เมื่อหารด้วย 0
        } else {
          result = previous / current;
        }
        break;
      case "%":
        result = previous * (current / 100);
        break;
      default:
        return;
    }
  
    result = parseFloat(result.toFixed(10)); // ปัดทศนิยมเพื่อความแม่นยำ
  
    setCurrentOperand(result.toString());
    setOperation(undefined);
    setPreviousOperand(result.toString()); // เก็บผลลัพธ์ไว้ใน previousOperand เพื่อคำนวณต่อเนื่อง
  };

  const handleEquals = () => {
    if (!operation && lastOperation && lastOperand !== null) {
      // ถ้ากด = ซ้ำ ให้คำนวณต่อเนื่องโดยใช้ผลลัพธ์และตัวเลขล่าสุด
      setPreviousOperand(currentOperand); // เอาค่าปัจจุบันมาเก็บเป็น previousOperand
      setCurrentOperand(lastOperand); // ใช้ค่าที่เก็บไว้ใน lastOperand มาคำนวณ
      setOperation(lastOperation); // ใช้เครื่องหมายการคำนวณเดิม
      compute(); // คำนวณต่อเนื่อง
    } else if (operation) {
      compute(); // คำนวณครั้งแรกหรือการคำนวณปกติ
      setLastOperand(currentOperand); // เก็บค่าปัจจุบันไว้เพื่อคำนวณครั้งถัดไป
      setLastOperation(operation); // เก็บเครื่องหมายการคำนวณล่าสุด
    }
  };

  // const handleKeyDown = (event) => {
  //   switch (event.key) {
  //     case "0":
  //     case "1":
  //     case "2":
  //     case "3":
  //     case "4":
  //     case "5":
  //     case "6":
  //     case "7":
  //     case "8":
  //     case "9":
  //       appendNumber(event.key);
  //       break;
  //     case "+":
  //     case "-":
  //     case "*":
  //     case "/":
  //       chooseOperation(convertOperation(event.key));
  //       break;
  //     case "Enter":
  //     case "=":
  //       handleEquals();
  //       break;
  //     case "Backspace":
  //       deleteNumber();
  //       break;
  //     case "Escape":
  //       clear();
  //       break;
  //     case ".":
  //       appendNumber(".");
  //       break;
  //     default:
  //       break;
  //   }
  // };

  // const convertOperation = (key) => {
  //   switch (key) {
  //     case "*":
  //       return "x";
  //     case "/":
  //       return "÷";
  //     default:
  //       return key;
  //   }
  // };

  // React.useEffect(() => {
  //   window.addEventListener("keydown", handleKeyDown);
  //   return () => window.removeEventListener("keydown", handleKeyDown);
  // }, [currentOperand, operation]);

  return (
    <div className=" boxALL">
     <div className="box1">
      <section className="screen">
        <div className="previous">{previousOperand} {operation}</div>
        <div className="current">{currentOperand}</div>
      </section>
      <section className="box2">
        <div className="calcu-row">
          <button className="calcu-num" onClick={clear}>C</button>
          <button className="calcu-num" onClick={deleteNumber}>◀</button>
          <button className="calcu-num" onClick={() => chooseOperation("%")}>%</button>
          <button className="calcu-num" onClick={() => chooseOperation("+")}>+</button>
        </div>
        <div className="calcu-row">
          <button className="calcu-num" onClick={() => appendNumber("7")}>7</button>
          <button className="calcu-num" onClick={() => appendNumber("8")}>8</button>
          <button className="calcu-num" onClick={() => appendNumber("9")}>9</button>
          <button className="calcu-num" onClick={() => chooseOperation("-")}>-</button>
        </div>
        <div className="calcu-row">
          <button className="calcu-num" onClick={() => appendNumber("4")}>4</button>
          <button className="calcu-num" onClick={() => appendNumber("5")}>5</button>
          <button className="calcu-num" onClick={() => appendNumber("6")}>6</button>
          <button className="calcu-num" onClick={() => chooseOperation("x")}>x</button>
        </div>
        <div className="calcu-row">
          <button className="calcu-num" onClick={() => appendNumber("1")}>1</button>
          <button className="calcu-num" onClick={() => appendNumber("2")}>2</button>
          <button className="calcu-num" onClick={() => appendNumber("3")}>3</button>
          <button className="calcu-num" onClick={() => chooseOperation("÷")}>÷</button>
        </div>
        <div className="calcu-row">
          <button className="calcu-num buttonC" onClick={() => appendNumber("0")}>0</button>
          <button className="calcu-num" onClick={() => appendNumber(".")}>.</button>
          <button className="calcu-num" onClick={handleEquals}>=</button>
        </div>
      </section>
     </div>
    </div>
  );
}

export default Calculator;
