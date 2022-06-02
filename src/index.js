import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './componet/App';
import reportWebVitals from './reportWebVitals';
import Login from './componet/auth/Login';
import Register from './componet/auth/Register';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
// import { withRouter } from "react-router";
import 'semantic-ui-css/semantic.min.css'
import { connect, Provider } from 'react-redux';
import store from './redux/store';
import firebase from './firebase';
import { createBrowserHistory } from "history";
import {setUser,clearUser} from './redux/user/userAction';
import Spinner from './componet/UI/Spinner';

class Root extends Component {
 
   history = createBrowserHistory();
    ///kiểm tra login chưa
  componentDidMount(){
    
    firebase.auth().onAuthStateChanged(user=>{
      if(user){
        createBrowserHistory().push('/')
        this.props.setUser(user)//
        // console.log(user);
        // window.location.reload();
      }else{
        createBrowserHistory().push('/login')
        this.props.clearUser()
        // window.location.reload();
      }
      
    })
  }
  
  render() {
    
    const {loading} = this.props; //là loading mapStateToProps 
    return (
      <Fragment>
        {loading ? <Spinner></Spinner>:
           <Routes>
           <Route exact path='/' element={<App />}></Route>
           <Route exact path='/Login' element={<Login />}></Route>
           <Route exact path='/Register' element={<Register />}></Route>
         </Routes>
        }
     
      </Fragment>
    );
  }
}

const mapStateToProps = ({users:{loading}}) => ({//user: in root reducer và lấy loading
  loading: loading //lấy loading ra khi đã gọi setUser  và loading setstate =  false
})

const mapDispatchToProps = (dispatch)=>({
  setUser:(user)=> dispatch(setUser(user)),
  clearUser:()=> dispatch(clearUser())
})


// const RootWithAuth = withRouter(connect(mapStateToProps, mapDispatchToProps))(Root);
const RootWithAuth = (connect(mapStateToProps, mapDispatchToProps))(Root);

const toot = ReactDOM.createRoot(document.getElementById('root'));
toot.render(
  <Provider store={store}>
    <BrowserRouter>
      <RootWithAuth/>
    </BrowserRouter>
  </Provider>

);
//Provider cung cấp store toàn cục từ store.js
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
