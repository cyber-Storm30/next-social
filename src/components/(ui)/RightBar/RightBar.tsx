"use client";
import React, { useEffect, useState } from "react";
import styles from "./rightbar.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import PeopleYouMayKnowCard from "@/components/PeopleYouMayKnowCard/PeopleYouMayKnowCard";
import { getPeopleYouMayKnow } from "@/services/connectionService";
import { useSelector } from "react-redux";

const RightBar = () => {
  const router = useRouter();
  const [people, setPeople] = useState<[]>([]);
  const user = useSelector((state: any) => state.auth.user);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await getPeopleYouMayKnow(user?._id);
        setPeople(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);

  return (
    <div className={styles.container}>
      <p>People you may know</p>
      {people?.map((data, idx) => (
        <PeopleYouMayKnowCard data={data} />
      ))}
    </div>
  );
};

export default RightBar;
