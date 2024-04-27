import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UserLogin } from "../redux/extraReducer";
import auth_bg from "../assets/auth-bg.jpg"; // image
import { intagram_text } from "../constants";

const Login = () => {
  const { error } = useSelector((state) => state.login);
  const dispatch = useDispatch();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(UserLogin(data));
  };

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
                <p className="h3 text-center my-4">LOG IN TO INSTAGRAM</p>
                {error ? (
                  <h1>{error}</h1>
                ) : (
                  <form onSubmit={handleLogin}>
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
                    <div className="mb-3 text-center">
                      <button
                        type="submit"
                        className="btn btn-primary gap-2 d-flex justify-content-center align-items-center"
                        style={{ fontSize: "20px", height: "35px" }}
                      >
                        Log in <i className="fa-solid fa-sign-in" />
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
            <div className="text-center mt-3">
              <p className="h4">
                Don't have an account yet?
                <a href="/sign-in" className="mx-2 link-primary">
                  Sign up Here
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
