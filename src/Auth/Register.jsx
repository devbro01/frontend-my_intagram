import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createUser } from "../redux/extraReducer";
import { profile_logo, intagram_text } from "../constants";
import auth_bg from "../assets/auth-bg.jpg"; // image

const Register = () => {
  const { error } = useSelector((state) => state.login);
  const [data, setData] = useState({
    email: "",
    name: "",
    password: "",
    phone: "user bio",
    photo: { profile_logo },
  });
  const dispatch = useDispatch();
  const handleRegister = (e) => {
    e.preventDefault();
    dispatch(createUser(data));
  };
  // styles
  const containerStyle = {
    backgroundImage: `url(${auth_bg})`,
    backgroundSize: "150%",
    backgroundPosition: "center",
    minHeight: "100vh",
  };
  const backDrop = {
    minHeight: "100vh",
    backdropFilter: "blur(8.5px)",
  };

  return (
    <>
      <div className="container-fluid" style={containerStyle}>
        <div
          className="row d-flex justify-content-center align-items-center"
          style={backDrop}
        >
          <div className="col-md-6">
            <div className="text-center">
              <img src={intagram_text} alt="insta_text" width={300} />
            </div>
            <div className="card">
              <div className="card-body">
                <p className="h3 text-center my-4">SIGN UP TO INSTAGRAM</p>
                {error ? (
                  <h1>{error}</h1>
                ) : (
                  <form onSubmit={handleRegister}>
                    <div className="mb-3">
                      <p>Full Name</p>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Gaetan Juvin"
                        autoFocus
                        onChange={(e) =>
                          setData((prev) => ({
                            ...prev,
                            name: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div className="mb-3">
                      <p>Email</p>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="someone@outlook.com"
                        onChange={(e) =>
                          setData((prev) => ({
                            ...prev,
                            email: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div className="mb-3">
                      <p>Password</p>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="* * * * * * * *"
                        onChange={(e) =>
                          setData((prev) => ({
                            ...prev,
                            password: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <button
                      type="submit"
                      className="btn btn-primary gap-2 d-flex justify-content-center align-items-center"
                      style={{ fontSize: "20px", height: "35px" }}
                    >
                      Sign up <i className="fa-solid fa-user-plus" />
                    </button>
                  </form>
                )}
              </div>
            </div>
            <div className="text-center mt-3">
              <p className="h4">
                Have you an account yet?
                <a href="/" className="mx-2 link-primary">
                  Log in Here
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
