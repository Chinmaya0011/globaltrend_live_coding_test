import React, { useState } from 'react';
import styles from '../assets/Signup.module.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    validateField(name, value);
  };

  const validateField = (name, value) => {
    switch (name) {
      case 'email':
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: emailPattern.test(value) ? '' : 'Invalid email format',
        }));
        break;
      case 'password':
        setErrors((prevErrors) => ({
          ...prevErrors,
          password: value.length >= 6 ? '' : 'Password must be at least 6 characters',
        }));
        break;
      case 'confirmPassword':
        setErrors((prevErrors) => ({
          ...prevErrors,
          confirmPassword: value === formData.password ? '' : 'Passwords do not match',
        }));
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.values(errors).every((error) => error === '')) {
      alert('Form submitted successfully!');
    } else {
      alert('Please fix the errors in the form.');
    }
  };

  return (
    <div className={styles.signUp} style={{marginTop:"40px"}}>
      <h1 className={styles.title}>SignUp Form</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.field}>
          <label htmlFor="name" className={styles.label}>Enter Your Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={styles.inputField}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="email" className={styles.label}>Enter Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={styles.inputField}
          />
          {errors.email && <p className={styles.error}>{errors.email}</p>}
        </div>

        <div className={styles.field}>
          <label htmlFor="password" className={styles.label}>Enter Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={styles.inputField}
          />
          {errors.password && <p className={styles.error}>{errors.password}</p>}
        </div>

        <div className={styles.field}>
          <label htmlFor="confirmPassword" className={styles.label}>Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={styles.inputField}
          />
          {errors.confirmPassword && <p className={styles.error}>{errors.confirmPassword}</p>}
        </div>

        <button type="submit" className={styles.submitButton}>Signup</button>
      </form>
    </div>
  );
};

export default Signup;
