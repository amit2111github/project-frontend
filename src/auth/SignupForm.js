import React from "react";
import ReactPasswordToggleIcon from "react-password-toggle-icon";

const SignupForm = React.forwardRef((props, passwordRef) => {
  const {
    handleChange,
    handleSubmit,
    values,
    changeShowPassword,
    step,
    otp,
    setOtp,
    setStep
  } = props;
  const { name, email, password } = values;
  if (step == 1) {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
            <div className="mb-3">
              <label className="fw-bold" style={{ fontSize: "20px" }}>
                Name
              </label>
              <input
                className="form-control"
                type="text"
                placeholder="Name"
                value={name}
                onChange={handleChange}
                name="name"
              />
            </div>
            <div className="mb-3">
              <label className="fw-bold" style={{ fontSize: "20px" }}>
                Email
              </label>
              <input
                className="form-control"
                type="text"
                placeholder="Email"
                value={email}
                onChange={handleChange}
                name="email"
              />
            </div>
            <div className="mb-3" style={{ position: "relative" }}>
              <label className="fw-bold" style={{ fontSize: "20px" }}>
                Password
              </label>
              <input
                ref={passwordRef}
                className="form-control"
                type="password"
                placeholder="Password"
                value={password}
                onChange={handleChange}
                name="password"
              />
              <ReactPasswordToggleIcon
                inputRef={passwordRef}
                style={{ marginTop: "20px" }}
                hideIcon={() => {
                  changeShowPassword();
                  return <i className="fa fa-eye" aria-hidden="true"></i>;
                }}
                showIcon={() => {
                  changeShowPassword();
                  return <i className="fa fa-eye-slash" aria-hidden="true"></i>;
                }}
              />
            </div>
            <div class="addtoCart mt-4 mb-4">
              <a href type="submit" onClick={handleSubmit}>
                Sign Up
              </a>
            </div>
            <div className="createAccount">
              <a
                href="/signin"
                className="createAccount"
                style={{
                  fontSize: "13px",
                  fontWeight: "bolder",
                  textDecoration: "none",
                  color: "black",
                }}
              >
                Already have an Account
              </a>
            </div>
          </form>
        </div>
      </div>
    );
  } else if (step == 2) {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
            <h5 style= {{textAlign : "center"}}>Verify otp sent to {email}</h5>
            <div className="mb-3">
              <label className="fw-bold" style={{ fontSize: "20px" }}>
                Otp
              </label>
              <input
                className="form-control"
                type="text"
                placeholder="Otp"
                value={otp}
                onChange={setOtp}
              />
            </div>
            <div class="addtoCart mt-4 mb-4">
              <a href type="submit" onClick={handleSubmit}>
                Verify
              </a>
            </div>
            <div className="createAccount">
              <a
                onClick = {() => setStep(1)}
                className="createAccount"
                style={{
                  fontSize: "13px",
                  fontWeight: "bolder",
                  textDecoration: "none",
                  color: "black",
                }}
              >
                Didn't receive otp
              </a>
            </div>
          </form>
        </div>
      </div>
    );
  }
});
export default SignupForm;
