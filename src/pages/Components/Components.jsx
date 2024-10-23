// App.jsx ทำหน้าที่เขียน html

// import components
import Counter from './Components/Counter/Counter'
import Timer from './Components/Timer/Timer'
import Add from './Components/Add/Add'
import Temperaturs from './Components/Temperaturs/Temperaturs'

import './Components.css'

function Components() {
    return (
      <div className='box11'>
      <div className='body11'>
        {/* <Counter />                                                ใช้กี่ชุดก็ได้ แต่ไม่ควรชื่อเดียวกัน */}
        <div className='body22'>
          <div className='Timerandcon'>
            <Counter Name='BongBang' value={20} />                     {/*ใส่ค่ากับไม่ใส่อย่างละตัว*/}
            <Timer />
          </div>
          <div className='add1'>
            <Add aValue={10} bValue={20} />
          </div>
        </div>
        <Temperaturs />
      </div>
      <br />
    </div>
    );
  }
  
  export default Components;
  