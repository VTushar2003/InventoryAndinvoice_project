import React, { useEffect, useState } from 'react';
import DefaultLayout from '../../components/layout/Layout';
import useRedirectLoggedOutUser from './../../customhooks/useRedirectLoggedOutUser';
import { useDispatch } from 'react-redux';
import { getUser } from '../../services/Authservice';
import { SET_NAME, SET_USER } from '../../redux/auth/AuthReducer';
import { Card, Descriptions, Image } from 'antd';
import toast from 'react-hot-toast';

const Profile = () => {
  useRedirectLoggedOutUser('/login');
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
        console.error('Error fetching user data:', error);
        toast.error('Something went wrong while fetching user data. Please refresh.');
      }
    }
    getUserData();
  }, [dispatch]);

  const defaultImage = 'http://localhost:3000/public/defaultProfile.jpg';

  return (
    <DefaultLayout>
      {!profile == null ? (
        <>
          {toast.error('Something went wrong')}
          <p>Something went wrong. Please refresh the page.</p>
        </>
      ) : (
        <Card className='shadow-lg'>
          <div className='Image flex items-center justify-center '>
            <Image className='rounded-full shadow-2xl' style={{ width: '200px' }} alt='user-Profile' src={defaultImage} />
          </div>
          <div>
            <Descriptions title='User Information' labelStyle={{ color: "Black", fontWeight: "bolder" }}>
              <Descriptions.Item label='Name'>{profile?.name}</Descriptions.Item>
              <Descriptions.Item label='Email'>{profile?.email}</Descriptions.Item>
              <Descriptions.Item label='Contact-Info'>{profile?.phoneNumber}</Descriptions.Item>
              <Descriptions.Item label='Role'>{profile?.role}</Descriptions.Item>
              <Descriptions.Item label='Bio'>{profile?.bio}</Descriptions.Item>
            </Descriptions>
          </div>
        </Card>
      )}
    </DefaultLayout>
  );
};

export default Profile;
