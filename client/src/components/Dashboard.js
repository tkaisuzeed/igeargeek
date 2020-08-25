import React, { useState, useContext, useEffect } from "react";
import GlobalState from "../utils/GlobalState";
import Cookie from "js-cookie";
import moment from "moment";
// import API
import { SignInAuth, SignUpAuth, userAuth } from "./API/AuthApi";
import { Deposit, Purchase } from "./API/ManageApi";

// Main export
const Dashboard = () => {
  // Variable
  const { hasAccount, auth } = useContext(GlobalState);
  if (auth) {
    return (
      <div className="dashboard">
        <MemberBoard />
      </div>
    );
  } else {
    if (hasAccount) {
      return (
        <div className="dashboard">
          <SignInBoard />
        </div>
      );
    } else {
      return (
        <div className="dashboard">
          <SignUpBoard />
        </div>
      );
    }
  }
};
// SignIn Board
const SignInBoard = () => {
  // Variable
  const { setHasAccount, setAuth, setUser } = useContext(GlobalState);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isValid, setIsValid] = useState("form-control");
  // Function
  // Function call API functio to signin
  const handleSignIn = async (e) => {
    e.preventDefault();
    const account = { username: username, password: password };
    const res = await SignInAuth(account);
    // check if signin is success or fail
    // Success: save cookie and setState
    // fail: input form again
    if (res.data.auth) {
      setUser(res.data.user);
      setIsValid("form-control");
      setAuth(true);
      Cookie.set("auth", true);
      Cookie.set("user", res.data.user);
    } else {
      setIsValid("form-control is-invalid");
    }
    console.log("LOG:", Cookie.get("user"));
  };

  return (
    <div>
      <div className="row dashboard-body">
        <div className="col-12">
          <div className="dashboard-head">
            <h5>SignIn</h5>
          </div>
        </div>
        <div className="form-group col-lg-6 col-sm-12">
          <label>Username</label>
          <br />
          <input
            type="text"
            className={isValid}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group col-lg-6 col-sm-12">
          <label>Password</label>
          <br />
          <input
            type="password"
            className={isValid}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group col-lg-6 col-sm-12">
          <button
            className="btn btn-success form-control"
            onClick={handleSignIn}
          >
            SignIn
          </button>
        </div>
        <div className="form-group col-lg-6 col-sm-12">
          <button
            className="btn btn-info form-control"
            onClick={() => {
              setHasAccount(false);
            }}
          >
            Got to SignUp
          </button>
        </div>
      </div>
    </div>
  );
};

// SignUp board
const SignUpBoard = () => {
  // Variable
  const { setHasAccount, setAuth, setUser } = useContext(GlobalState);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [isValidPass, setIsValidPass] = useState("form-control");
  const [isValidUser, setIsValidUser] = useState("form-control");
  // Function
  // Function call API functio to signin
  const handleSignUp = async (e) => {
    e.preventDefault();
    // check password
    if (repassword === password) {
      const account = { username: username, password: password };
      const res = await SignUpAuth(account);
      // check if sign up is success or fail.
      // success: save cookie, setState and sign in
      // fail: input form again
      if (!res.data.auth) {
        setIsValidUser("form-control is-invalid");
      } else {
        setUser(res.data.user);
        setAuth(true);
        Cookie.set("auth", true);
        Cookie.set("user", res.data.user);
      }
    } else {
      setIsValidPass("form-control is-invalid");
    }
  };

  return (
    <div>
      <div className="row dashboard-body">
        <div className="col-12">
          <div className="dashboard-head">
            <h5>SignUp</h5>
          </div>
        </div>
        <div className="form-group col-lg-4 col-sm-12">
          <label>Username</label>
          <br />
          <input
            type="text"
            className={isValidUser}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group col-lg-4 col-sm-12">
          <label>Password</label>
          <br />
          <input
            type="password"
            className={isValidPass}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group col-lg-4 col-sm-12">
          <label>Confirm-Password</label>
          <br />
          <input
            type="password"
            className={isValidPass}
            onChange={(e) => setRepassword(e.target.value)}
          />
        </div>
        <div className="form-group col-lg-6 col-sm-12">
          <button
            className="btn btn-success form-control"
            onClick={handleSignUp}
          >
            SignUp
          </button>
        </div>
        <div className="form-group col-lg-6 col-sm-12">
          <button
            className="btn btn-info form-control"
            onClick={() => {
              setHasAccount(true);
            }}
          >
            Go to SignIn
          </button>
        </div>
      </div>
    </div>
  );
};

// Member Board
const MemberBoard = () => {
  // Variable
  const { setAuth, setUser, user, setClient, client } = useContext(GlobalState);

  const [balance, setBalance] = useState(1);

  const [amount, setAmount] = useState(0);                                                                                                                                                                  
  const [amountType, setAmountType] = useState({
    '1000':0,'500':0,'100':0,'50':0,'20':0,'10':0,'5':0,'2':0,'1':0
  });
  const [fillAmount, setFillAmount] = useState('')

  const [agreePurchase, setAgreePurchase] = useState(false);

  const [edate, setEdate] = useState("");

  const [cost, setCost] = useState(0);
  const [duration, setDuration] = useState(0);

  // Function
  // function sign out : remove cookie and clear state
  const handleSignOut = () => {
    Cookie.remove("auth");
    setAuth(false);

    Cookie.remove("user");
    setUser("");

    window.location.reload(false);
  };

  // inser money
  const handleDeposit = (e) => {
    e.preventDefault();
    setAmount(parseFloat(amount)+parseFloat(balance));
    if(parseInt(balance)===1000){
      setAmountType({...amountType,"1000":parseInt(amountType[1000]+1)});
    }else if(parseInt(balance)===500){
      setAmountType({...amountType,"500":parseInt(amountType[500]+1)});
    }else if(parseInt(balance)===100){
      setAmountType({...amountType,"100":parseInt(amountType[100]+1)});
    }else if(parseInt(balance)===50){
      setAmountType({...amountType,"50":parseInt(amountType[50]+1)});
    }else if(parseInt(balance)===20){
      setAmountType({...amountType,"20":parseInt(amountType[20]+1)});
    }else if(parseInt(balance)===10){
      setAmountType({...amountType,"10":parseInt(amountType[10]+1)});
    }else if(parseInt(balance)===5){
      setAmountType({...amountType,"5":parseInt(amountType[5]+1)});
    }else if(parseInt(balance)===2){
      setAmountType({...amountType,"2":parseInt(amountType[2]+1)});
    }else if(parseInt(balance)===1){
      setAmountType({...amountType,"1":parseInt(amountType[1]+1)});
    }
  };
  // filter bank and coin insert
  const filterBalance=()=>{
    let fill = '';
    if(parseInt(amountType[1000])>0){fill+=`,1000฿ x ${amountType[1000]}`}
    if(parseInt(amountType[500])>0){fill+=`,500฿ x ${amountType[500]}`}
    if(parseInt(amountType[100])>0){fill+=`,100฿ x ${amountType[100]}`}
    if(parseInt(amountType[50])>0){fill+=`,50฿ x ${amountType[50]}`}
    if(parseInt(amountType[20])>0){fill+=`,20฿ x ${amountType[20]}`}
    if(parseInt(amountType[10])>0){fill+=`,10฿ x ${amountType[10]}`}
    if(parseInt(amountType[5])>0){fill+=`,5฿ x ${amountType[5]}`}
    if(parseInt(amountType[2])>0){fill+=`,2฿ x ${amountType[2]}`}
    if(parseInt(amountType[1])>0){fill+=`,1฿ x ${amountType[1]}`}
    fill = fill.slice(1);
    setFillAmount(fill)
  }
  // filter change to bank and coin

  function filterChange(change_temp){
    
    let fill = '';
    let result = change_temp;
    const type = [1000,500,100,50,20,10,5,2,1];
    type.map(i=>{
      if(result>=i){
        let j = parseInt(result)/parseInt(i);
        j = parseInt(j);
        result = parseInt(result)%parseInt(i);
        fill += `,${i} x ${j}`;
      }
    })
    return fill.slice(1);
  }

  // make confirm for purchase and show end date
  const handleAgreePurchase = () => {
    setAgreePurchase(!agreePurchase);
    setEdate(moment().toDate().toLocaleString());
    // find different value of start date and end date.
    const start = moment(new Date()); //todays date
    const end = moment(new Date(client.start_date)); // another date
    const duration = start.diff(end, "minute");
    const min = duration;
    setDuration(min);
    // check size to set state cost
    if (client.locker_size === "s") {
      if (min <= 60) {
        setCost(+50);
      } else {
        setCost((min - 60) * 25 + 50);
      }
    } else if (client.locker_size === "m") {
      if (min <= 60) {
        setCost(+100);
      } else {
        setCost((min - 60) * 50 + 100);
      }
    } else if (client.locker_size === "l") {
      if (min <= 60) {
        setCost(+200);
      } else {
        setCost((min - 60) * 100 + 200);
      }
    }
  };

  // function call purchase API
  const handlePurchase = (e) => {
    e.preventDefault();
    let newData = {};
    if (agreePurchase&&client.no!==0) {
      if (cost <= amount) {
        window.alert(`${filterChange(parseInt(amount)-parseInt(cost))} : ${parseInt(amount)-parseInt(cost)}฿`);
        newData = {
          _id: client._id,
          no: client.no,
        };
        Purchase(newData);
      } else {
        window.alert(`Don't have enough money`);
      }
    } else {
      window.alert(`Pls, Agree or you did not book.`);
    }
    window.location.reload(false);
  };

  // function read user data
  const readUser = async () => {
    const res = await userAuth(user);
    setClient(res);
  };

  useEffect(() => {
    readUser();
    filterBalance();
  }, [client,amountType]);

  return (
    <div>
      <div className="dashboard-body">
        <div className="dashboard-name">
          <h2>{client.username}</h2>
        </div>
        <div className="form-group">
          <div>
            <div className="row">
              <div className="col-12">
                <div className="form-group">
                  <label>Balance</label>
                  <input
                    type="text"
                    className="form-control"
                    value={
                      amount>0?
                      (`${fillAmount} : ${amount}฿`):(`none : ${amount}฿`)
                    }
                    readOnly
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="form-group col-lg-7 col-sm-12">
                <select
                  className="form-control"
                  onChange={(e) => {
                    setBalance(e.target.value);
                  }}
                >
                  <option value={1}>฿1</option>
                  <option value={2}>฿2</option>
                  <option value={5}>฿5</option>
                  <option value={10}>฿10</option>
                  <option value={20}>฿20</option>
                  <option value={50}>฿50</option>
                  <option value={100}>฿100</option>
                  <option value={500}>฿500</option>
                  <option value={1000}>฿1000</option>
                </select>
              </div>
              <div className="form-group col-lg-5 col-sm-12">
                <button
                  className="btn btn-success form-control"
                  onClick={handleDeposit}
                >
                  INSERT    
                </button>
              </div>
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-lg-12 col-sm-12">
              <label>LOCKER</label>
              <input
                type="text"
                className="form-control"
                value={client.no === 0 ? "none" : `LOCKER#${client.no}`}
                readOnly
              />
            </div>
            <div className="col-lg-6 col-sm-12">
              <label>Cost</label>
              <input
                type="text"
                className="form-control"
                value={
                  agreePurchase ? `${client.no === 0 ? 0 : cost}฿` : `none`
                }
                readOnly
              />
            </div>
            <div className="col-lg-6 col-sm-12">
              <label>Duration</label>
              <input
                type="text"
                className="form-control"
                value={agreePurchase ?(`${duration}minute`):(`0 minute`)}
                readOnly
              />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6 col-sm-12">
              <label>start date</label>
              <input
                type="text"
                className="form-control"
                value={
                  new Date(client.start_date) < new Date(10)
                    ? "none"
                    : new Date(client.start_date).toLocaleString()
                }
                readOnly
              />
            </div>
            <div className="col-lg-6 col-sm-12">
              <label>end date</label>
              <input
                type="text"
                className="form-control"
                value={agreePurchase ? edate : "none"}
                readOnly
              />
            </div>
          </div>
          <br />
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              onClick={handleAgreePurchase}
            />
            <label className="form-check-label"> Agree purchase</label>
          </div>
          <br />
          <button
            className="btn btn-success form-control"
            onClick={handlePurchase}
          >
            Purchase
          </button>
        </div>
        <button className="btn btn-danger form-control" onClick={handleSignOut}>
          SignOut
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
