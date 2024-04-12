import React, { useState, useRef } from "react";
import SignupForm from "./SignupForm";
import { signup } from "../apicaller/auth";
import Menu from "../Component/Menu";
import Footer from "../Component/Footer";
import {
  errorMessage,
  successMessage,
  loadingMessage,
} from "../Component/Message";

const Signup = ({ history }) => {
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState("");
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    success: "",
    error: "",
    loading: "",
  });
  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };
  const passwordRef = useRef("");
  const changeShowPassword = () => {
    if (!passwordRef.current) return;
    if (passwordRef.current.type === "text")
      passwordRef.current.type = "password";
    else passwordRef.current.type = "text";
  };
  const { name, email, password, error, loading, success } = values;

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!name) return setValues({ ...values, error: "Name is required" });
    if (!email) return setValues({ ...values, error: "Email is required" });
    if (!password)
      return setValues({ ...values, error: "Password is required" });
    setValues({ ...values, loading: true, error: false, success: false });
    if (step == 1) {
      const data = await signup(name, email, password, step,otp);
      setValues({ ...values, loading: false });
      if (data.error || data.errors) {
        setValues({
          ...values,
          error: data.error || data.errors[0].msg,
          success: false,
        });
      } else {
        setStep(2);
        setValues({
          ...values,
          error: false,
          success: false,
        });
      }
    } else if (step == 2) {
      if (!otp) return setValues({ ...values, error: "Otp is required" });
      const data = await signup(name, email, password, step, otp);
      setValues({ ...values, loading: false });
      if (data.error || data.errors) {
        setValues({
          ...values,
          error: data.error || data.errors[0].msg,
          success: false,
        });
      } else {
        setStep(1);
        setOtp("");
        setValues({
          ...values,
          success: "Account created successfully",
          didRedirect: false,
          email: "",
          password: "",
          error: false,
        });
        setTimeout(() => {
          history.push("/signin");
        }, 1000);
      }
    }
  };
  return (
    <>
      <div className="fashion_section" style={{ backgroundColor: "#f0de6e" }}>
        <Menu />
        <div className="logo_section mb-2">
          <div className="container">
            <div className="row">
              <div className="col-sm-12">
                <div className="logo">
                  <a href="/">
                    <img
                      alt="logo"
                      style={{ maxwidth: "100%" }}
                      src="https://fontmeme.com/permalink/211220/293d7532b26cd531b84fcc2c6d4fa661.png"
                    />
                  </a>
                </div>
              </div>
            </div>
            <p className="messages font-weight-normal">Welcome</p>
            {error && errorMessage(error)}
            {success && successMessage(success)}
            {loading && loadingMessage("Loading...")}
            <SignupForm
              ref={passwordRef}
              changeShowPassword={changeShowPassword}
              handleSubmit={handleSubmit}
              handleChange={handleChange}
              values={values}
              step={step}
              otp={otp}
              setOtp={(e) => setOtp(e.target.value)}
              setStep = {setStep}
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default Signup;
