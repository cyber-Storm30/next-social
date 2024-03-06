"use client";

import React, { useEffect, useState } from "react";
import styles from "./signupform.module.css";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AppDispatch } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { handleSignUpApi } from "@/services/userOnboardingService";
import { CircularProgress } from "@mui/material";
import { resetError } from "@/redux/AuthSlice";
import { usePathname } from "next/navigation";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "@/config/firebase";
import Image from "next/image";

const SignUpSchema = z.object({
  username: z.string().min(1, { message: "Username is required" }),
  email: z.string().min(1, { message: "Email is required" }).email({
    message: "Must be a valid email",
  }),
  password: z
    .string()
    .min(6, { message: "Password must be atleast 6 characters" }),
});

type SignUpSchemaType = z.infer<typeof SignUpSchema>;

const SingupForm = () => {
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const pathname = usePathname();
  const loginError = useSelector((state: any) => state.auth.isError);
  // const loading = useSelector((state: any) => state.auth.isLoading);
  const [loading, setLoading] = useState<boolean>();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignUpSchemaType>({ resolver: zodResolver(SignUpSchema) });
  const [image, setImage] = useState<any>(null);

  useEffect(() => {
    dispatch(resetError());
    return () => {
      dispatch(resetError());
    };
  }, [pathname]);

  const onSubmit: SubmitHandler<SignUpSchemaType> = (data) => {
    if (image) {
      const fileName = new Date().getTime() + image?.name;
      const storage = getStorage(app);
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, image);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setLoading(true);
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
          }
        },
        (error) => {
          console.log(error);
          setLoading(false);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            if (downloadURL.length > 0) {
              dispatch(
                handleSignUpApi({
                  username: data.username,
                  router: router,
                  email: data.email,
                  password: data.password,
                  image: downloadURL,
                })
              );
            }
          });
          setLoading(false);
        }
      );
    } else {
      alert("Please upload an image as well.");
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <p className={styles.title}>Sign up</p>

      {image && (
        <div className={styles.previewImageWrapper}>
          <Image
            src={URL.createObjectURL(image)}
            className={styles.previewImage}
            fill
            alt=""
          />
        </div>
      )}
      <input
        type="file"
        id="photoInput"
        style={{ display: "none" }}
        onChange={(e: any) => {
          setImage(e.target.files[0]);
        }}
      />
      {!image && (
        <label htmlFor="photoInput">
          <div className={styles.imgWrapper}>
            <Image src="/people.png" fill alt="" />
          </div>
        </label>
      )}
      <div className={styles.inputWrapper}>
        <input
          type="text"
          placeholder="Enter your username"
          {...register("username")}
          className={errors.email?.message ? styles.errorInput : styles.input}
        />
        {errors.username && (
          <p className={styles.error}>{errors.username?.message}</p>
        )}
      </div>
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
          <p>Signup</p>
        )}
      </button>
      <p className={styles.extraText}>
        Already have a profile?{" "}
        <span
          style={{ color: "gray", cursor: "pointer" }}
          onClick={() => {
            router.push("/signup");
          }}
        >
          Log in
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
export default SingupForm;
