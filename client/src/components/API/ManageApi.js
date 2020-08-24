import axios from 'axios'

// Deposit API
export const Deposit=async(balance)=>{
    const res = await axios.post('http://localhost:5000/manage/deposit',balance);
}
// get Locker list API
export const LockerList=async()=>{
    const res = await axios.get('http://localhost:5000/manage/lockerlist');
    return res;
}
// Booking locker API
export const Booking=async(newData)=>{
    const res = await axios.post('http://localhost:5000/manage/booking',newData);
    return res;
}
// Purchase API
export const Purchase=async(newData)=>{
    const res = await axios.post('http://localhost:5000/manage/purchase',newData);
    return res;
}