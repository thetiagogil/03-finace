import { Box, Button, IconButton, Input, Link, Typography } from "@mui/joy";
import { useEffect, useState } from "react";
import { MdInfoOutline, MdKeyboardArrowLeft } from "react-icons/md";
import { Link as ReactLink } from "react-router-dom";
import { Flex } from "./flex";

type Form = {
  firstname?: string;
  lastname?: string;
  email: string;
  password: string;
  passwordConfirmation?: string;
  setFirstname?: (value: string) => void;
  setLastname?: (value: string) => void;
  setEmail: (value: string) => void;
  setPassword: (value: string) => void;
  setPasswordConfirmation?: (value: string) => void;
};

type FormAuthProps = {
  signup?: boolean;
  login?: boolean;
  form: Form;
  handleSubmit: (e: React.FormEvent) => void;
  loadingSubmit: boolean;
  loginError?: string;
};

export const FormAuth = ({ signup, login, form, handleSubmit, loadingSubmit, loginError }: FormAuthProps) => {
  const {
    firstname,
    lastname,
    email,
    password,
    passwordConfirmation,
    setFirstname,
    setLastname,
    setEmail,
    setPassword,
    setPasswordConfirmation
  } = form;

  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const isValid =
      (signup ? firstname && lastname && passwordConfirmation && password === passwordConfirmation : true) &&
      email &&
      password;

    setIsFormValid(!!isValid);
  }, [signup, firstname, lastname, email, password, passwordConfirmation]);

  const inputErrorStyles = loginError ? { borderColor: "red" } : {};

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ width: { xs: "90%", sm: 400 } }}>
      <Flex y gap2>
        <Flex x yc gap1>
          <Box component={ReactLink} to="/">
            <IconButton size="sm">
              <MdKeyboardArrowLeft size={20} />
            </IconButton>
          </Box>
          <Typography level="h4">{signup ? "Create an account" : login ? "Welcome back" : ""}</Typography>
        </Flex>
        {signup && (
          <Flex x gap1>
            <Input
              placeholder="First Name"
              sx={{ width: "100%" }}
              value={firstname}
              onChange={e => setFirstname?.(e.target.value)}
            />
            <Input
              placeholder="Last Name"
              sx={{ width: "100%" }}
              value={lastname}
              onChange={e => setLastname?.(e.target.value)}
            />
          </Flex>
        )}
        <Flex y gap2>
          <Input placeholder="Email" sx={inputErrorStyles} value={email} onChange={e => setEmail(e.target.value)} />
          <Input
            placeholder="Password"
            type="password"
            sx={inputErrorStyles}
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          {signup && (
            <Input
              placeholder="Password Confirmation"
              type="password"
              value={passwordConfirmation}
              onChange={e => setPasswordConfirmation?.(e.target.value)}
            />
          )}
          {loginError && (
            <Typography color="danger" level="body-sm" startDecorator={<MdInfoOutline size={15} />}>
              {loginError}
            </Typography>
          )}
        </Flex>
        <Button type="submit" disabled={!isFormValid} loading={loadingSubmit}>
          {signup && "Sign Up"}
          {login && "Log In"}
        </Button>
        <Flex y>
          <Typography>
            {signup && "Don't have an account? "}
            {login && "Already have an account? "}
            {signup && (
              <Link component={ReactLink} to="/login">
                Log in here
              </Link>
            )}
            {login && (
              <Link component={ReactLink} to="/signup">
                Sign up here
              </Link>
            )}
          </Typography>
        </Flex>
      </Flex>
    </Box>
  );
};
