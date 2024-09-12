import React, { useEffect, useState } from "react";
import DefaultLayout from "../../components/layout/Layout";
import { useDispatch } from "react-redux";
import { getUser } from "../../services/Authservice";
import { SET_NAME, SET_USER } from "../../redux/auth/AuthReducer";
import { Card, Col, Descriptions, Image, Row } from "antd";
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
        <div className="w-full h-full border border-gray-300 rounded-lg overflow-hidden shadow-lg">
          <header className="bg-[--light-blue] py-3 pl-4">
            <h1 className="font-[Sans] text-xl text-white">Profile: </h1>
          </header>
          
          <div className="flex w-full items-center justify-around">
            <div className="  space-y-6 h-54 w-52">
              <h1 className="text-lg font-semibold">Photo :</h1>
              <img src={imageSrc} alt="profile photo" className="profile-image object-cover" />
            </div>

            <div className=" w-2/3  h-fit flex items-center">
              <Row className="text-center space-y-4">
                <Col span={12} className="border p-2 mt-4 border-gray-400 bg-[--light-blue]">
                  <p className=" text-white">
                    <strong>UserName:</strong>
                  </p>
                </Col>
                <Col span={12} className="border p-2 border-gray-400 rounded-tr-lg hover:bg-gray-100">
                  {profile?.name}
                </Col>

                <Col span={12} className="border p-2 bg-[--light-blue]  border-gray-400" >
                  <p className='text-white'>
                    <strong>Email:</strong>
                  </p>
                </Col>
                <Col span={12} className="border p-2 border-gray-400 hover:bg-gray-100">{profile?.email}</Col>

                <Col span={12} className="border p-2 bg-[--light-blue]  border-gray-400">
                  <p className='text-white'>
                    <strong>Phone Number:</strong>
                  </p>
                </Col>
                <Col span={12} className="border p-2 border-gray-400 hover:bg-gray-100">{profile?.phoneNumber}</Col>

                <Col span={12} className="border p-2 bg-[--light-blue]  border-gray-400">
                  <p className='text-white'>
                    <strong>Role:</strong>
                  </p>
                </Col>
                <Col span={12} className="border p-2 border-gray-400 hover:bg-gray-100">{profile?.role}</Col>
                <Col span={12} className="border p-2 bg-[--light-blue]  border-gray-400">
                  <p className='text-white text-center'>
                    <strong>Bio:</strong>
                  </p>
                </Col>
                <Col span={12} className="border p-2 border-gray-400 hover:bg-gray-100">
                  <p className="break-words text-center">
                    {profile?.bio}
                  </p>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      )}
    </DefaultLayout>
  );
};

export default Profile;
