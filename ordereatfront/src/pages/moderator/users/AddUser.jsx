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
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Select from "react-select";
import { Checkbox } from "@mui/material";

export default function AddUser() {
  const navigate = useNavigate();

  const dateValue = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate()
  );

  const initialFormData = Object.freeze({
    active: "",
    authorize_date: "",
    email: "",
    end_authorize_date: "",
    role: "",
    password: "",
    password_again: "",
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
    { value: "admin", label: "Admin" },
    { value: "moderator", label: "Moderator" },
    { value: "user", label: "User" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("active", checked);
    formData.append("authorize_date", data.authorize_date);
    formData.append("email", data.email);
    formData.append("end_authorize_date", data.end_authorize_date);
    formData.append("role", role);
    formData.append("password", data.password);
    formData.append("password_again", data.password_again);
    console.log(formData);
    api.post("/auth/register", formData);
    navigate("/admin");
    //window.location.reload();
  };

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <div
        style={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Dodaj użytkownika
        </Typography>
        <br />
        <form
          style={{
            width: "100%", // Fix IE 11 issue.
            marginTop: 3,
          }}
          noValidate
        >
          <Grid container spacing={2}>
            <p>Aktywny</p>&ensp;
            <Checkbox onChange={handleChangeUserActive} />
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                id="authorize_date"
                label="Data nadania uprawnień"
                name="authorize_date"
                autoComplete="authorize_date"
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
                id="end_authorize_date"
                label="Data wygaśnięcia uprawnień"
                name="end_authorize_date"
                autoComplete="end_authorize_date"
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
                id="password_again"
                label="Powtórz hasło"
                name="password_again"
                type="password"
                autoComplete="password_again"
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
