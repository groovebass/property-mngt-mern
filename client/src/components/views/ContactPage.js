import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { registerUser } from "../../actions/userActions";
import { useDispatch } from "react-redux";

import {
  Form,
  Input,
  Button, Row, Col
} from 'antd';
import { faEnvelopeOpen, faMapMarkerAlt, faPhone } from "@fortawesome/free-solid-svg-icons";



const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

function ContactPage(props) {
  const dispatch = useDispatch();
  return (
    <div style={{ width: '75%', margin: '3rem auto' }}> 
    <Row gutter={[16, 16]}>
    <Col lg={12} xs={24} > 
        <h2> Contact Details</h2>
        <h4> <FontAwesomeIcon icon={faPhone} type="align-right" style={{fontSize:'1.3rem', color: '#1890ff'}}/> +127345698</h4>
        <h4><FontAwesomeIcon icon={faEnvelopeOpen} type="align-right" style={{fontSize:'1.3rem', color: '#1890ff'}}/> info@demawoprops.com</h4>
        <h4> <FontAwesomeIcon icon={faMapMarkerAlt} type="align-right" style={{fontSize:'1.3rem', color: '#1890ff'}}/> 230 Main Road , Sea Point</h4>
    
    </Col> 


    <Col lg={12} xs={24} > 
    <Formik
      initialValues={{
        email: '',
        cell: '',
        name: '',
        message: '',
       
      }}
      validationSchema={Yup.object().shape({
        name: Yup.string()
          .required('Name is required'),
        message: Yup.string()
          .required('Please type your message'),
        email: Yup.string()
          .email('Email is invalid')
          .required('Email is required'),
        cell: Yup.string()
          .min(10, 'Cell Number must be at least 10 characters')
          .required('Contact Number is required'),
       
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {

          let dataToSubmit = {
            email: values.email,
            cell: values.cell,
            name: values.name,
            message: values.message,
            
          };

          dispatch(registerUser(dataToSubmit)).then(response => {
            if (response.payload.success) {
              props.history.push("/contact");
              alert('Your Message has been sent Successfully!')
            } else {
              alert(response.payload.err.errmsg)
            }
          })

          setSubmitting(false);
        }, 500);
      }}
    >
      {props => {
        const {
          values,
          touched,
          errors,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
        } = props;
        return (
          <div className="contactForm">

          
            <h2>Contact Form</h2>
            <Form style={{ minWidth: '375px' }} {...formItemLayout} onSubmit={handleSubmit} >

              <Form.Item required label="Your Name">
                <Input
                  id="name"
                  placeholder="Enter your name"
                  type="text"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.name && touched.name ? 'text-input error' : 'text-input'
                  }
                />
                {errors.name && touched.name && (
                  <div className="input-feedback">{errors.name}</div>
                )}
              </Form.Item>

              <Form.Item required label="Phone Number">
                <Input
                  id="cell"
                  placeholder="Please input your phone number!"
                  type="text"
                  addonBefore={+27} 
                  value={values.cell}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.cell && touched.cell ? 'text-input error' : 'text-input'
                  }
                />
                {errors.cell && touched.cell && (
                  <div className="input-feedback">{errors.cell}</div>
                )}
              </Form.Item>

              <Form.Item required label="Email" hasFeedback validateStatus={errors.email && touched.email ? "error" : 'success'}>
                <Input
                  id="email"
                  placeholder="Enter your Email"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.email && touched.email ? 'text-input error' : 'text-input'
                  }
                />
                {errors.email && touched.email && (
                  <div className="input-feedback">{errors.email}</div>
                )}
              </Form.Item>

              <Form.Item required label="Message" hasFeedback validateStatus={errors.message && touched.message ? "error" : 'success'}>
                <Input.TextArea
                  id="message"
                  placeholder="Type your message"
                  type="text"
                  value={values.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.message && touched.message ? 'text-input error' : 'text-input'
                  }
                />
                {errors.message && touched.message && (
                  <div className="input-feedback">{errors.message}</div>
                )}
              </Form.Item>

              

              <Form.Item {...tailFormItemLayout}>
                <Button onClick={handleSubmit} type="primary" disabled={isSubmitting}>
                  Submit
                </Button>
              </Form.Item>
            </Form>
            
          </div>
        );
      }}
    </Formik>
    </Col>
    </Row>
  
    </div>
  );
};


export default ContactPage
