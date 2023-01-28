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
import { Select } from "@mui/material";
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

export default function EditUser() {
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
    authorize_date: "",
    birth_date: "",
    date_created: "",
    date_of_last_login: "",
    email: "",
    end_authorize_date: "",
    name: "",
    orders: [],
    phone: "",
    restaurants: [],
    role: [],
    surname: "",
  });

  const [formData, updateFormData] = useState(initialFormData);
  //const [sex, setSexState] = useState("");
  const [date, setDate] = useState(new Date());

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
    api.get("http://localhost:5000/api/users/" + id).then((res) => {
      updateFormData({
        ...formData,
        // //['id']: res.data.id,
        ["active"]: res.data.active,
        ["address"]: res.data.address,
        ["authorize_date"]: res.data.authorize_date,
        ["birth_date"]: res.data.birth_date,
        ["date_created"]: res.data.date_created,
        ["date_of_last_login"]: res.data.date_of_last_login,
        ["email"]: res.data.email,
        ["end_authorize_date"]: res.data.end_authorize_date,
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

  console.log(formData);

  const handleChange = (e) => {
    e.preventDefault();
    updateFormData({
      ...formData,
      // Trimming any whitespace
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    let newFormData = new FormData();
    newFormData.append("active", formData.active);
    newFormData.append("address", formData.address);
    newFormData.append("authorize_date", formData.authorize_date);
    newFormData.append("birth_date", date.toISOString());
    newFormData.append("date_created", formData.dateCreated);
    newFormData.append("date_of_last_login", formData.dateOfLastLogin);
    newFormData.append("email", formData.email);
    newFormData.append("end_authorize_date", fromData.end_authorize_date);
    newFormData.append("name", formData.name);
    newFormData.append("orders", formData.orders);
    newFormData.append("phone", formData.phone);
    newFormData.append("restaurants", formData.restaurants);
    newFormData.append("role", formData.role);
    newFormData.append("surname", formData.surname);

    var resp = api.put("users/" + id, newFormData).then(() => {
      navigate("/user/edit/" + id);

      window.location.reload();
    });
    console.log(resp);
  };

  return (
    <Helmet title="Edytuj dane osobowe">
      <CommonSection title="Edytuj dane osobowe" />
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
          {/* <Typography component="h1" variant="h5">
            Edytuj dane osobowe
          </Typography> */}
          <br />
          <form
            style={{
              width: "100%", // Fix IE 11 issue.
              marginTop: 3,
            }}
            noValidate
          >
            <Grid container spacing={2}>
              {/* <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="articleId"
                            label="Id artykułu"
                            name="articleId"
                            autoComplete="articleId"
                            value={formData.articleId}
                            onChange={handleChange}
                        />
                    </Grid> */}
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
              {/* <Grid item xs={12}>
              <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-standard-label">
                  Płeć
                </InputLabel>
                <Select
                  className="custom-select3"
                  name="sex"
                  value={sex}
                  onChange={handleSexChange}
                >
                  <MenuItem value="kobieta"> Kobieta </MenuItem>
                  <MenuItem value="mężczyzna"> Mężczyzna </MenuItem>
                </Select>
              </FormControl>
            </Grid> */}
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="birth_date"
                  label="Data urodzenia"
                  name="birth_date"
                  autoComplete="birth_date"
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
              {/* <input
                            accept='image/*'
                            className={classes.input}
                            id="avatar"
                            onChange={handleChange}
                            name="avatar"
                            type="file"
                        /> */}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={handleSubmit}
              //onSubmit={loginUser}
            >
              Edytuj
            </Button>
          </form>
        </div>
      </Container>
    </Helmet>
  );
}
