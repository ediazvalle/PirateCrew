import React, { useState } from 'react';
import { Form, Input } from 'antd';
import axios from 'axios';
import { ContactsOutlined, KeyOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import "./Auth.css"
import { ErrorMessage, SuccessMessage } from '../../components/Messages/messages';
import { Loading } from '../../components/Loading/Loading';


export const Signup = (props) => {
  const [loading, setLoading] = useState(false);

  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const { firstName, lastName, email, password, confirmPassword } = userData;

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    })
  }

  const onFinish = async (e) => {
    window.scrollTo(0, 0);
    setLoading(true);
    await axios.post('/api/users/signup', { firstName, lastName, email, password, confirmPassword }).then(res => {
      setLoading(false);
      if (res.status === 200) {
        SuccessMessage(res.data.successMessage);
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
        <div className='signup-right text-center'>
          <div className='px-5'>
            <h4 className='mb-2 p-2' style={{ fontSize: '20px', fontWeight: '680', color: '#424553' }}>Register</h4>
            {
              loading ?
                <Loading />
                :
                <Form
                  name="basic"
                  initialValues={{ remember: true }}
                  onFinish={onFinish}
                >
                  <div className="floating-label-group">
                    <Form.Item
                      name="First Name"
                      rules={[{ required: true, message: 'Please input your First Name!' }]}
                    >
                      <Input required name='firstName' onChange={handleChange} size='small' placeholder="First Name" prefix={<ContactsOutlined />} />
                    </Form.Item>
                  </div>
                  <div className="floating-label-group">
                    <Form.Item
                      name="lastName"
                      rules={[{ required: true, message: 'Please input your lastName!' }]}
                    >
                      <Input required name='lastName' type='text' onChange={handleChange} size="small" placeholder="Last Name" prefix={<UserOutlined />} />
                    </Form.Item>
                  </div>
                  <div className="floating-label-group">
                    <Form.Item
                      name="email"
                      rules={[
                        {
                          type: 'email',
                          message: 'The input is not valid E-mail!',
                        },
                        {
                          required: true,
                          message: 'Please input your E-mail!',
                        },
                      ]}
                    >
                      <Input required name='email' onChange={handleChange} size='small' placeholder="Email" prefix={<MailOutlined />} />
                    </Form.Item>
                  </div>
                  <div className="floating-label-group">
                    <Form.Item
                      name="password"
                      rules={[
                        {
                          required: true,
                          message: 'Please input your password!',
                        },
                      ]}
                      hasFeedback
                    >
                      <Input.Password required type='password' name='password' onChange={handleChange} size="small" placeholder="Password" prefix={<KeyOutlined />} />
                    </Form.Item>
                  </div>
                  <div className="floating-label-group">
                    <Form.Item
                      name="confirm"
                      dependencies={['password']}
                      hasFeedback
                      rules={[
                        {
                          required: true,
                          message: 'Please confirm your password!',
                        },
                        ({ getFieldValue }) => ({
                          validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                              return Promise.resolve();
                            }
                            return Promise.reject(new Error('The two passwords that you entered do not match!'));
                          },
                        }),
                      ]}
                    >
                      <Input.Password required name='confirmPassword' onChange={handleChange} size='small' placeholder="Re-Enter Password" prefix={<KeyOutlined />} />
                    </Form.Item>
                  </div>
                  <button type='submit' className='btn my-2 mt-3 w-100' style={{ padding: '10px', background: '#085394', color: 'white', borderRadius: '23px' }}>
                    Create Account
                  </button>
                </Form>
            }
          </div>
        </div>
      </div>
    </div>
  );
};
