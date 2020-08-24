import React,{useState,useEffect,useContext} from "react";
import moment from 'moment'
import Cookie from 'js-cookie';
// API
import {LockerList,Booking} from './API/ManageApi'
// component
import GlobalState from '../utils/GlobalState'
import Dashboard from "./Dashboard";

const Locker = () => {
  // variable
  const {client,user} = useContext(GlobalState);
  const [selection, setSelection] = useState(0);
  const [size, setSize] = useState('')
  const [sdate, setSdate] = useState('');
  // function
  // function  to call list data of locker, check every locker that was booking or empty 
  // and add click event to select locker for booking 
  const handleSelect=async()=>{
    const res = await LockerList();
    let a = document.querySelectorAll('button');
    for(let i = 0;i<a.length;i++){
      if(a[i].getAttribute('id')==='locker'){
        res.data.map(item=>{
          if(a[i].getAttribute('no')===item.no.toString()){
            if(item.isbook===true){
              a[i].classList.add('btn-danger');
              a[i].classList.add('disabled');
            }else{
              a[i].classList.add('btn-success'); 
              if(Cookie.get('auth')){
                a[i].addEventListener('click',()=>{
                  setSelection(item.no);
                  setSize(item.size);
                  setSdate(moment().format('MMMM Do YYYY, h:mm:ss a'));
                  console.log('click!!');
                })
              }
            }
          }
        });
      }
    }
  }
  // function call booking API to booking locker.
  const handleBook=()=>{
    if(sdate!==''&&client.no ===0){
      if(window.confirm('Confirm Booking...')){
        const newData = {
          no:selection,
          size:size,
          _id:user,
          sdate:moment().local().toDate(sdate).toUTCString(),
          isbook:true
        }
        Booking(newData);
      }
      window.location.reload(false);
    }else{
      window.alert('You were booking yet or Pls,SignIn')
    }
  }

  useEffect(() => {
    setInterval(()=>{
      handleSelect();
    },200)
    
  }, [])
  

  return (
    <div className="container locker">
      <table className="table table-dark">
        <thead>
          <tr>
            <th>S</th>
            <th>M</th>
            <th>L</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <button className="btn" name="s" no="1" id="locker" >#1</button>
            </td>
            <td>
              <button className="btn" name="m" no="2" id="locker" >#2</button>
            </td>
            <td>
              <button className="btn" name="l" no="3" id="locker" >#3</button>
            </td>
          </tr>
          <tr>
            <td>
              <button className="btn" name="s" no="4" id="locker"  >#4</button>
            </td>
            <td>
              <button className="btn" name="m" no="5" id="locker" >#5</button>
            </td>
            <td>
              <button className="btn" name="l" no="6" id="locker" >#6</button>
            </td>
          </tr>
          <tr>
            <td>
              <button className="btn" name="s" no="7" id="locker"  >#7</button>
            </td>
            <td>
              <button className="btn" name="m" no="8" id="locker" >#8</button>
            </td>
            <td>
              <button className="btn" name="l" no="9" id="locker" >#9</button>
            </td>
          </tr>
          <tr>
            <td>
              <button className="btn" name="s" no="10" id="locker"  >#10</button>
            </td>
            <td>
              <button className="btn" name="m" no="11" id="locker" >#11</button>
            </td>
            <td>
              <button className="btn" name="l" no="12" id="locker" >#12</button>
            </td>
          </tr>
        </tbody>
      </table>
      <div className="row">
        <div className="col-lg-3 col-sm-12 form-group">
          <input type="text" className="form-control" value={`LOCKER# ${selection}`} readOnly/>
        </div>
        <div className="col-lg-6 col-sm-12 form-group">
          <input type="text" className="form-control" value={sdate} readOnly/>
        </div>
        <div className="col-lg-3 col-sm-12 form-group">
          <button className="btn btn-success form-control" onClick={handleBook} >BOOKING</button>
        </div>
      </div>
      {/* show dashboard */}
      <Dashboard/>
    </div>
  );
};

export default Locker;
