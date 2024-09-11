import React, { useEffect, useState } from "react";
import DefaultLayout from "../../components/layout/Layout";
import { useDispatch } from "react-redux";
import { getUser } from "../../services/Authservice";
import { SET_NAME, SET_USER } from "../../redux/auth/AuthReducer";
import { Card, Descriptions, Image } from "antd";
import toast from "react-hot-toast";

const Profile = () => {
  const dispatch = useDispatch();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    async function getUserData() {
      try {
        const data = await getUser();
        setProfile(data);
        dispatch(SET_USER(data));
        dispatch(SET_NAME(data.name));
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast.error(
          "Something went wrong while fetching user data. Please refresh."
        );
      }
    }
    getUserData();
  }, [dispatch]);

  const imageSrc = `http://localhost:3000/public/${profile?.photo}`;
  return (
    <DefaultLayout>
      {!profile == null ? (
        <>
          {toast.error("Something went wrong")}
          <p>Something went wrong. Please refresh the page.</p>
        </>
      ) : (
        <Card className="shadow-lg">
          <div className="Image overflow-hidden flex h-auto  items-center justify-center object-cover ">
            <Image
              className=" shadow-2xl w-44 h-44 rounded m-auto object-cover"
              style={{ width: "10rem", height: "15rem" }}
              alt="user-Profile"
              src={imageSrc}
            />
          </div>
          <div>
            <Descriptions
              title="User Information"
              labelStyle={{ color: "Black", fontWeight: "bolder" }}
            >
              <Descriptions.Item label="Name" labelStyle={{ fontSize: "1rem" }}>
                {profile?.name}
              </Descriptions.Item>
              <Descriptions.Item
                label="Email"
                labelStyle={{ fontSize: "1rem" }}
              >
                {profile?.email}
              </Descriptions.Item>
              <Descriptions.Item
                label="Contact-Info"
                labelStyle={{ fontSize: "1rem" }}
              >
                {profile?.phoneNumber}
              </Descriptions.Item>
              <Descriptions.Item label="Role" labelStyle={{ fontSize: "1rem" }}>
                {profile?.role}
              </Descriptions.Item>
              <Descriptions.Item label="Bio" labelStyle={{ fontSize: "1rem" }}>
                {profile?.bio}
              </Descriptions.Item>
            </Descriptions>
          </div>
        </Card>
      )}
    </DefaultLayout>
  );
};

export default Profile;
