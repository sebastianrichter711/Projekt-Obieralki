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
import Select from "react-select";
import { MenuItem } from "@mui/material";
import { InputLabel } from "@mui/material";
import { FormControl } from "@mui/material";
import AuthContext from "../../../services/AuthContext";
import Helmet from "../../../components/Helmet/Helmet";
import CommonSection from "../../../components/UI/common-section/CommonSection";
import { makeStyles } from "@mui/styles";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
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

export default function AdminEditUser() {
  const navigate = useNavigate();
  const { id } = useParams();

  const dateValue = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate()
  );

  const initialFormData = Object.freeze({
    active: "",
    address: "",
    authorizeDate: "",
    birthDate: "",
    dateCreated: "",
    dateOfLastLogin: "",
    email: "",
    endAuthorizeDate: "",
    name: "",
    orders: [],
    phone: "",
    restaurants: [],
    role: "",
    surname: "",
  });

  const [formData, updateFormData] = useState(initialFormData);
  //const [sex, setSexState] = useState("");
  const [date, setDate] = useState(new Date());
  const [role, setRole] = useState("");

  //const handleSexChange = (event) => {
  //setSexState(event.target.value);
  //};

  const handleDateChange = (date) => {
    console.log(date);
    date.setTime(date.getTime() + 2 * 60 * 60 * 1000);
    console.log(date);
    setDate(date);
  };

  useEffect(() => {
    api.get("https://localhost:44361/api/users/" + id).then((res) => {
      updateFormData({
        ...formData,
        // //['id']: res.data.id,
        ["active"]: res.data.active,
        ["address"]: res.data.address,
        ["authorizeDate"]: res.data.authorizeDate,
        ["birthDate"]: res.data.birthDate,
        ["dateCreated"]: res.data.dateCreated,
        ["dateOfLastLogin"]: res.data.dateOfLastLogin,
        ["email"]: res.data.email,
        ["endAuthorizeDate"]: res.data.endAuthorizeDate,
        ["name"]: res.data.name,
        ["orders"]: res.data.orders,
        ["phone"]: res.data.phone,
        ["restaurants"]: res.data.restaurants,
        ["role"]: res.data.role,
        ["surname"]: res.data.surname,
      });
      if (res.data.birthDate == null) setDate(new Date());
      else {
        let dateObj = new Date(res.data.birthDate);
        setDate(dateObj);
      }
      console.log(res.data);
      console.log(date);
    });
  }, [updateFormData]);

  const handleChange = (e) => {
    e.preventDefault();
    updateFormData({
      ...formData,
      // Trimming any whitespace
      [e.target.name]: e.target.value,
    });
  };

  const [checked, setChecked] = useState(false);

  const handleChangeUserActive = (event) => {
    setChecked(event.target.value);
  };

  const roleOptions = [
    { value: 0, label: "Admin" },
    { value: 1, label: "Moderator" },
    { value: 2, label: "User" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    let newFormData = new FormData();
    newFormData.append("active", checked);
    newFormData.append("address", formData.address);
    newFormData.append("authorizeDate", formData.authorizeDate);
    newFormData.append("birthDate", date.toISOString());
    newFormData.append("dateCreated", formData.dateCreated);
    newFormData.append("dateOfLastLogin", formData.dateOfLastLogin);
    newFormData.append("email", formData.email);
    newFormData.append("endAuthorizeDate", formData.endAuthorizeDate);
    newFormData.append("name", formData.name);
    newFormData.append("orders", formData.orders);
    newFormData.append("phone", formData.phone);
    newFormData.append("restaurants", formData.restaurants);
    newFormData.append("role", formData.role);
    newFormData.append("surname", formData.surname);

    var resp = api.put("users/" + id, newFormData).then(() => {
      navigate("/admin");
      //window.location.reload();
    });
    console.log(resp);
  };

  const classes = useStyles();

  return (
    <Helmet title="Edytuj dane osobowe">
      <CommonSection title="Edytuj dane osobowe" />
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Edytuj dane osobowe
          </Typography>
          <br />
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Checkbox onChange={handleChangeUserActive} />
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="address"
                  label="Adres"
                  name="address"
                  autoComplete="address"
                  value={formData.address}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="authorizeDate"
                  label="Data nadania uprawnień"
                  name="authorizeDate"
                  autoComplete="authorizeDate"
                  value={formData.authorizeDate}
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
                  id="birthDate"
                  label="Data urodzenia"
                  name="birthDate"
                  autoComplete="birthDate"
                  value={date}
                  onChange={handleChange}
                  multiline
                  rows={1}
                />
              </Grid>
              <br />
              <Calendar
                fullWidth
                value={date}
                onChange={handleDateChange}
              ></Calendar>
              <br />
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="dateCreated"
                  label="Data utworzenia"
                  name="dateCreated"
                  autoComplete="dateCreated"
                  value={formData.dateCreated}
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
                  id="dateOfLastLogin"
                  label="Data ost. logowania"
                  name="dateOfLastLogin"
                  autoComplete="dateOfLastLogin"
                  value={formData.dateOfLastLogin}
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
                  value={formData.email}
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
                  id="endAuthorizeDate"
                  label="Data wygaśnięcia uprawnień"
                  name="endAuthorizeDate"
                  autoComplete="endAuthorizeDate"
                  value={formData.endAuthorizeDate}
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
                  id="name"
                  label="Imię"
                  name="name"
                  autoComplete="name"
                  value={formData.name}
                  onChange={handleChange}
                  rows={1}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="surname"
                  label="Nazwisko"
                  name="surname"
                  autoComplete="surname"
                  value={formData.surname}
                  onChange={handleChange}
                  multiline
                  rows={1}
                />
              </Grid>
              <Select
                isClearable={false}
                className="react-select"
                classNamePrefix="select"
                placeholder="Wybierz rolę"
                options={roleOptions}
                onChange={(choice) => setRole(choice.value)}
              />
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="phone"
                  label="Numer telefonu"
                  name="phone"
                  autoComplete="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  multiline
                  rows={1}
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
              Edytuj użytkownika
            </Button>
          </form>
        </div>
      </Container>
    </Helmet>
  );
}
