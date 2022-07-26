import classes from "./ProfileForm.module.css";
import React, { useContext, useRef, useState } from "react";
import AuthContext from "../../store/auth-context";
import { useHistory } from "react-router-dom";

const ProfileForm = () => {
  const authCtx = useContext(AuthContext);
  const newPasswordRef = useRef();
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const newPasswordHandler = (event) => {
    event.preventDefault();
    setLoading(true);
    const enteredNewPassword = newPasswordRef.current.value;
    let idToken = authCtx.token;
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDovX5U11h_IZTG9O-7IcYVeXe9tpSTIGU";

    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        idToken: idToken,
        password: enteredNewPassword,
        returnSecureToken: true,
      }),
      headers: { "Content-Type": "application/json" },
    }).then((res) => {
      history.replace("/");
      // if (res.ok) {
      //   return res.json();
      // }
      // else {
      //   res.json().then((data) => {
      //     let errorMessage = "Updating password failed";
      //     // if (data && data.error && data.error.message) {
      //     //   errorMessage = data.error.message;
      //     // }
      //     console.log(errorMessage);
      //     alert(errorMessage);
      //     throw new Error(errorMessage);
      //   });
      // }
    });
    // .then((data) => {
    //   console.log(data.idToken);
    //   authCtx.login(data.idToken);
    // })
    // .catch((err) => {
    //   alert(err.message);
    // });
    setLoading(false);
  };

  return (
    <form className={classes.form} onSubmit={newPasswordHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input
          type="password"
          id="new-password"
          minLength="5"
          ref={newPasswordRef}
        />
      </div>
      <div className={classes.action}>
        <button>{loading ? "loading" : "Change Password"}</button>
      </div>
    </form>
  );
};

export default ProfileForm;
