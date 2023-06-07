import React, { useContext } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { updateProfile } from 'firebase/auth';
import PageTitle from '../../components/PageTitle/PageTitle';
import { ToastContext } from '../../providers/AuthProvider/SweetToast';
import { authContext } from '../../providers/AuthProvider/AuthProvider';

const Register = () => {
  const { loginUser } = useContext(authContext);
  const { successToast, alertToast, wrongToast } = useContext(ToastContext);

  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm();

  const handleRegister = (data) => {
    const { name, email, password, photo } = data;

    // Validate the form fields
    if (!email || !password || !name || !photo) {
      alertToast();
      return;
    } else {
      loginUser(email, password)
        .then((result) => {
          const user = result.user;
          updateNameAndPhoto(user, name, photo);
        })
        .catch((error) => {
          wrongToast();
          console.log(error);
        });
    }
  };

  const updateNameAndPhoto = (user, name, photo) => {
    updateProfile(user, {
      displayName: name,
      photoURL: photo,
    })
      .then((result) => {
        successToast();
        navigate('/');
      })
      .catch((error) => {
        alertToast();
      });
  };

  return (
    <Container>
      <PageTitle title="Register" />
      <Row className="justify-content-center">
        <Col className="justify-content-center shadow p-5 my-5" md={5}>
          <form onSubmit={handleSubmit(handleRegister)}>
            <h3 className="text-center">Register</h3>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                {...register('name', { required: true })}
                type="text"
                className={`form-control ${errors.name ? 'is-invalid' : ''}`}
              />
              {errors.name && <div className="invalid-feedback">Name is required</div>}
            </div>
            <div className="mb-3">
              <label className="form-label">Email address</label>
              <input
                {...register('email', { required: true })}
                type="email"
                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              />
              {errors.email && <div className="invalid-feedback">Email is required</div>}
              <div id="emailHelp" className="form-text">
                We'll never share your email with anyone else.
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                {...register('password', { required: true })}
                type="password"
                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
              />
              {errors.password && <div className="invalid-feedback">Password is required</div>}
            </div>
            <div className="mb-3">
              <label className="form-label">Photo</label>
              <input
                {...register('photo', { required: true })}
                type="text"
                className={`form-control ${errors.photo ? 'is-invalid' : ''}`}
              />
              {errors.photo && <div className="invalid-feedback">Photo is required</div>}
            </div>
            <button style={{ backgroundColor: '#617A55', borderRadius: '4px' }} type="submit" className="btn text-light mb-3">
              Register
            </button>
          </form>
          <h5 className="text-center mt-2">
            Already have an account? <Link style={{ color: '#617A55' }} className="text-decoration-none" to={'/login'}>Login</Link>
          </h5>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
