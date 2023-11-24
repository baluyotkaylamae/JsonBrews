// import React, { Fragment, useState, useEffect } from 'react'
// import { Link, useNavigate, useLocation } from 'react-router-dom'

// import Loader from '../Layouts/Loader'
// import Metadata from '../Layouts/Metadata'
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import axios from 'axios';
// import { authenticate } from '../../utils/helpers'
// import { getUser } from '../../utils/helpers';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// import '../Layouts/FH.css';

// const Login = () => {

//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [loading, setLoading] = useState(false)

//     const navigate = useNavigate()
//     let location = useLocation();
//     const redirect = location.search ? new URLSearchParams(location.search).get('redirect') : ''
//     const notify = (error) => toast.error(error, {
//         position: toast.POSITION.BOTTOM_RIGHT
//     });

//     const login = async (email, password) => {
//         try {
//             const config = {
//                 headers: {
//                     'Content-Type': 'application/json'
//                 }
//             }
//             const { data } = await axios.post(`http://localhost:4001/api/login`, { email, password }, config)
//             console.log(data)
//             authenticate(data, () => navigate("/"))
//             window.location.reload();

//         } catch (error) {
//             toast.error("invalid user or password", {
//                 position: toast.POSITION.BOTTOM_RIGHT
//             })
//         }
//     }
//     const submitHandler = (e) => {
//         e.preventDefault();
//         login(email, password)
//     }

//     useEffect(() => {
//         if (getUser() && redirect === 'shipping') {
//             navigate(`/${redirect}`)
//         }
//     }, [])

//     return (
//         <Fragment>
//             {loading ? <Loader /> : (
//                 <Fragment>
//                     <Metadata title={'Login'} />
//                     <div className="row wrapper">
//                         <div className="col-10 col-lg-5" style={{ paddingBottom: '50px' }}>
//                             <form className="shadow-lg Json-Login-Form" onSubmit={submitHandler}
//                             >
//                                 <h2 className="mb-3" style={{ fontWeight: '500' }}>LOGIN</h2>
//                                 <div className="form-group">
//                                     <label htmlFor="email_field">Email</label>
//                                     <input
//                                         type="email"
//                                         id="email_field"
//                                         className="form-control"
//                                         value={email}
//                                         onChange={(e) => setEmail(e.target.value)}
//                                     />
//                                 </div>

//                                 <div className="form-group">
//                                     <label htmlFor="password_field">Password</label>
//                                     <input
//                                         type="password"
//                                         id="password_field"
//                                         className="form-control"
//                                         value={password}
//                                         onChange={(e) => setPassword(e.target.value)}
//                                     />
//                                 </div>

//                                 <div className="d-flex justify-content-between mb-2">
//                                     <Link to="/password/forgot" className="float-left Json-Login-Form">Forgot Password?</Link>
//                                     <Link to="/register" className="float-right Json-Login-Form">New User?</Link>
//                                 </div>
//                                 <div className="d-flex justify-content-center mt-2">
//                                     <button
//                                         id="login_button"
//                                         type="submit"
//                                         className="Json-Login-BTN btn btn-block py-3 "
//                                         style={{ padding: '20px' }}
//                                     >
//                                         LOGIN
//                                     </button>
//                                 </div>
//                             </form>
//                         </div>
//                         <ToastContainer />
//                     </div>


//                 </Fragment>
//             )}
//         </Fragment>
//     )
// }

// export default Login



import React, { Fragment, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Metadata from '../Layouts/Metadata';
import Loader from '../Layouts/Loader';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { authenticate, getUser } from '../../utils/helpers';
import { ToastContainer } from 'react-toastify';

import '../Layouts/FH.css';
import '../Layouts/RLForms.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  let location = useLocation();
  const redirect = location.search ? new URLSearchParams(location.search).get('redirect') : '';
  const notify = (error) =>
    toast.error(error, {
      position: toast.POSITION.BOTTOM_RIGHT,
    });

  const login = async (email, password) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const { data } = await axios.post(`http://localhost:4001/api/login`, { email, password }, config);
      console.log(data);
      authenticate(data, () => navigate('/'));
      window.location.reload();
    } catch (error) {
      toast.error('Invalid user or password', {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    login(email, password);
  };

  useEffect(() => {
    if (getUser() && redirect === 'shipping') {
      navigate(`/${redirect}`);
    }
  }, []);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <Metadata title={'Login'} />
          <div className="container register-photo-json">
            <div className="form-container" >
              <div className="image-holder-log"></div>
              <form className="shadow-lg form-json" onSubmit={submitHandler}>
                <h1 className="mb-3 rl-title-des">LOGIN</h1>
                <div className="form-group rl-des">
                  <label htmlFor="email_field">Email</label>
                  <input
                    type="email"
                    id="email_field"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="form-group rl-des">
                  <label htmlFor="password_field">Password</label>
                  <input
                    type="password"
                    id="password_field"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div className="d-flex justify-content-between mb-2">
                  <a href="/password/forgot" className="float-left rl-des">
                    Forgot Password?
                  </a>
                  <a href="/register" className="float-right rl-des">
                    New User?
                  </a>
                </div>
                <div className="d-flex justify-content-center mt-2">
                  <button id="login_button" type="submit" className="btn-json ">
                    LOGIN
                  </button>
                </div>
              </form>
            </div>
          </div>
          <ToastContainer />
        </Fragment>
      )}
    </Fragment>
  );
};

export default Login;
