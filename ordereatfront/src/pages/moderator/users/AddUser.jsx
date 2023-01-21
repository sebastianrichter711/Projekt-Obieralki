import React, { useState, useEffect, useContext } from "react";
import api from "../../../services/api";
import { useNavigate, useParams } from "react-router-dom";
//MaterialUI
import { Button } from "@mui/material";
import { CssBaseline } from "@mui/material";
import { TextField } from "@mui/material";
import { Grid } from "@mui/material";
import { Typography } from "@mui/material";
import { Container } from "@mui/material";
import { MenuItem } from "@mui/material";
import { InputLabel } from "@mui/material";
import { FormControl } from "@mui/material";
import AuthContext from "../../../services/AuthContext";
import Helmet from "../../../components/Helmet/Helmet";
import CommonSection from "../../../components/UI/common-section/CommonSection";
import { makeStyles } from "@mui/styles";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Select from "react-select";
import { Checkbox } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: 3,
  },
  // submit: {
  //   margin: theme.spacing(3, 0, 2),
  // },
}));

export default function AddUser() {
  const navigate = useNavigate();

  const dateValue = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate()
  );

  const initialFormData = Object.freeze({
    active: "",
    authorizeDate: "",
    email: "",
    endAuthorizeDate: "",
    role: "",
    password: "",
    passwordAgain: "",
  });

  const [data, updateFormData] = useState(initialFormData);
  //const [sex, setSexState] = useState("");
  const [date, setDate] = useState(new Date());
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");

  //const handleSexChange = (event) => {
  //setSexState(event.target.value);
  //};

  const handleDateChange = (date) => {
    console.log(date);
    date.setTime(date.getTime() + 2 * 60 * 60 * 1000);
    console.log(date);
    setDate(date);
  };

  const handleChange = (e) => {
    if ([e.target.name] == "name") {
      updateFormData({
        ...data,
        // Trimming any whitespace
        [e.target.name]: e.target.value,
        //['slug']: slugify(e.target.value.trim()),
      });
    } else {
      updateFormData({
        ...data,
        // Trimming any whitespace
        [e.target.name]: e.target.value,
      });
    }
  };

  const [checked, setChecked] = useState(false);

  const handleChangeUserActive = (event) => {
    if (event.target.value === "on") setChecked(true);
    else setChecked(false);
  };

  const roleOptions = [
    { value: 0, label: "Admin" },
    { value: 1, label: "Moderator" },
    { value: 2, label: "User" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("active", checked);
    formData.append("authorizeDate", data.authorizeDate);
    formData.append("email", data.email);
    formData.append("endAuthorizeDate", data.endAuthorizeDate);
    formData.append("role", role);
    formData.append("password", data.password);
    formData.append("passwordAgain", data.passwordAgain);
    console.log(formData);
    api.post("/auth/register", formData);
    navigate("/admin");
    //window.location.reload();
  };

  const classes = useStyles();

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Dodaj użytkownika
        </Typography>
        <br />
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <p>Aktywny</p>&ensp;
            <Checkbox onChange={handleChangeUserActive} />
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                id="authorizeDate"
                label="Data nadania uprawnień"
                name="authorizeDate"
                autoComplete="authorizeDate"
                onChange={handleChange}
                multiline
                rows={1}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="E-mail"
                name="email"
                autoComplete="email"
                onChange={handleChange}
                multiline
                rows={1}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                id="endAuthorizeDate"
                label="Data wygaśnięcia uprawnień"
                name="endAuthorizeDate"
                autoComplete="endAuthorizeDate"
                onChange={handleChange}
                multiline
                rows={1}
              />
            </Grid>
            <div style={{ width: "40%" }}>
              <Select
                isClearable={false}
                className="react-select"
                classNamePrefix="select"
                placeholder="Wybierz rolę"
                options={roleOptions}
                onChange={(choice) => setRole(choice.value)}
              />
            </div>
            <Grid item xs={12}>
              <TextField
                id="password"
                label="Hasło"
                name="password"
                type="password"
                autoComplete="password"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="passwordAgain"
                label="Powtórz hasło"
                name="passwordAgain"
                type="password"
                autoComplete="passwordAgain"
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            onClick={handleSubmit}
            //onSubmit={loginUser}
          >
            Dodaj użytkownika
          </Button>
        </form>
      </div>
    </Container>
  );
}
