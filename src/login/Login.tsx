import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import { login } from "../redux/regLogSlice";

import { useNavigate } from "react-router";
import { useAppDispatch } from "../redux/hooks/hooks";
import type { LogDataType } from "../redux/regLogSlice";
import type React from "react";

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const initialValues: LogDataType = {
    email: "",
    password: "",
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Некорректный email").required("Введите email"),
    password: Yup.string()
      .min(8, "Минимальная длина - 8 символов")
      .matches(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=$$$${};':"\\|,.<>\/?])/,
        "Пароль должен содержать минимум 1 заглавную букву, 1 прописную, 1 число и 1 символ",
      )
      .required("Введите пароль"),
  });

  const handleSubmit = async (data: LogDataType) => {
    try {
      await dispatch(login(data)).unwrap();
      navigate("/");
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <h1>Вход</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div>
            <label>E-mail: </label>

            <Field type="email" id="email" name="email" />
            <ErrorMessage name="email" component="div" />
          </div>
          <div>
            <label>Пароль: </label>
            <Field type="password" id="password" name="password" />
            <ErrorMessage name="password" component="div" />
          </div>
          <button type="submit">Войти</button>
        </Form>
      </Formik>
    </>
  );
};

export default Login;
