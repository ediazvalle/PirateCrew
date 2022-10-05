import React, { useState } from 'react';
import { Input } from 'antd';
import { KeyOutlined, UserOutlined } from '@ant-design/icons';
import axios from 'axios';
import { setAuthentication } from '../../components/auth/auth';
import "./Auth.css"
import { ErrorMessage, SuccessMessage } from '../../components/Messages/messages';
import { Loading } from '../../components/Loading/Loading';
import { useHistory } from 'react-router-dom';

export const Login = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    email: '',
    password: '',

  });

  const { email, password } = userData;

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    });
  }


  const onFinish = async () => {
    window.scrollTo(0, 0);
    setLoading(true);
    await axios.post('/api/users/login', { email, password }).then(res => {
      setLoading(false);
      if (res.status === 200) {
        setAuthentication(res.data, res.data.token);
        SuccessMessage(res.data.successMessage);
        history.push('/dashboard');
        window.location.reload();
      }
      else if (res.status === 201) {
        ErrorMessage(res.data.errorMessage);
      }
      else {
        ErrorMessage(res.data.errorMessage);
      }
    })

  };


  return (
    <div className='auth-form'>
      <div className='auth-form-inner'>
        <div style={{ padding: '60px' }}>
          <div className='login-right text-center'>
            <div>
              <h4 className='mb-2' style={{ fontSize: '20px', fontWeight: '680', color: '#424553' }}>Login</h4>
              {
                loading ?
                  <Loading />
                  :
                  <form onSubmit={onFinish}>
                    <div className="floating-label-group mb-3">
                      <Input name='email' onChange={handleChange} size='small' placeholder="Email or Username" prefix={<UserOutlined />} />
                    </div>
                    <div className="floating-label-group">
                      <Input.Password name='password' type='password' onChange={handleChange} size="small" placeholder="Password" prefix={<KeyOutlined />} />
                    </div>
                    <button type='submit' className='btn my-2 mt-3 w-100' style={{ padding: '10px', background: '#085394', color: 'white', borderRadius: '23px' }}>
                      Login
                    </button>
                  </form>
              }
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}
