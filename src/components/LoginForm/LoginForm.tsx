"use client";

import React, { useEffect } from "react";
import styles from "./loginform.module.css";
import { usePathname, useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { handleLoginApi } from "@/services/userOnboardingService";
import CircularProgress from "@mui/material/CircularProgress";
import { resetError } from "@/redux/AuthSlice";

const SignUpSchema = z.object({
  email: z.string().min(1, { message: "Email is required" }).email({
    message: "Must be a valid email",
  }),
  password: z
    .string()
    .min(6, { message: "Password must be atleast 6 characters" }),
});

type SignUpSchemaType = z.infer<typeof SignUpSchema>;

const LoginForm = () => {
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const pathname = usePathname();
  const loginError = useSelector((state: any) => state.auth.isError);
  const loading = useSelector((state: any) => state.auth.isLoading);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignUpSchemaType>({ resolver: zodResolver(SignUpSchema) });

  useEffect(() => {
    dispatch(resetError());
    return () => {
      dispatch(resetError());
    };
  }, [pathname]);

  const onSubmit: SubmitHandler<SignUpSchemaType> = (data) => {
    dispatch(
      handleLoginApi({
        router: router,
        email: data.email,
        password: data.password,
      })
    );
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <p className={styles.title}>Log in</p>
      <div className={styles.inputWrapper}>
        <input
          type="email"
          placeholder="Enter your email"
          {...register("email")}
          className={errors.email?.message ? styles.errorInput : styles.input}
        />
        {errors.email && (
          <p className={styles.error}>{errors.email?.message}</p>
        )}
      </div>
      <div className={styles.inputWrapper}>
        <input
          type="password"
          placeholder="Enter your password"
          {...register("password")}
          className={
            errors.password?.message ? styles.errorInput : styles.input
          }
        />
        {errors.password && (
          <p className={styles.error}>{errors.password?.message}</p>
        )}
      </div>
      <button className={styles.button} type="submit">
        {loading ? (
          <CircularProgress
            style={{ color: "white", width: "20px", height: "20px" }}
          />
        ) : (
          <p>Login</p>
        )}
      </button>
      <p className={styles.extraText}>
        Don't have a profile?{" "}
        <span
          style={{ color: "gray", cursor: "pointer" }}
          onClick={() => {
            router.push("/signup");
          }}
        >
          Join SocialHubb
        </span>
      </p>
      {loginError && loginError.length > 0 ? (
        <p className={styles.error}>{loginError}</p>
      ) : (
        <></>
      )}
    </form>
  );
};
export default LoginForm;
