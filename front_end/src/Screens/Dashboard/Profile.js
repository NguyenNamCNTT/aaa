import React, { useEffect, useState } from 'react';
import SideBar from './SideBar';
import { Input } from '../../Components/UserInput';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ProfileValidation } from '../../Components/Validation/UserValidation';

import { InlineError } from '../../Components/Notfications/Error';
import { Imagepreview } from '../../Components/Imagepreview';
import {  updateProfileAction } from '../../Redux/Actions/userActions';
import Uploder from './../../Components/Uploder';

function Profile() {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userLogin);
  const [imageUrl, setImageUrl] = useState(userInfo ? userInfo.image :"");
  const { isLoading, isError, isSuccess } = useSelector(
    (state) => state.userUpdateProfile
  );
 
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ProfileValidation),
  });
//update
  const onSubmit = (data) => {
    dispatch(updateProfileAction({ ...data, image: imageUrl }));
  };



  useEffect(() => {
    if (userInfo) {
      const { fullName, email } = userInfo;
      setValue('fullName', fullName);
      setValue('email', email);
    }
    if (isSuccess) {
      dispatch({ type:'USER_UPDATE_PROFILE_RESET'});
    }
    if (isError ) {
    }
  }, [userInfo, setValue, isSuccess, isError, dispatch]);

  return (
    <SideBar>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col gap-6'
      >
        <h2 className='text-xl font-bold'>Profile</h2>
        <div className='w-full grid lg:grid-cols-12 gap-6'>
          <div className='col-span-10'>
            <Uploder setImageUrl={setImageUrl} />
          </div>
          <div className='col-span-25'>
            <Imagepreview
              image={imageUrl}
              name={userInfo ? userInfo.fullName : 'Full Name'}
            />
          </div>
        </div>

        <div className='w-full'>
          <Input
            label='FullName'
            placeholder='Full name'
            type='text'
            name='fullName'
            register={register("fullName")}
            bg={true}
          />
          {errors.fullName && 
            <InlineError text={errors.fullName.message} />
          }
        </div>
        <div className='w-full'>
          <Input
            label='Email'
            placeholder='phimchill@gmail.com'
            type='email'
            name='email'
            register={register("email")}
            bg={true}
          />
          {errors.email && <InlineError text={errors.email.message} />}
        </div>

        <div className='flex gap-2 flex-wrap flex-col-reverse sm:flex-row justify-between items-center my-4'>
          
          <button 
           
            className='bg-main font-medium transitions hover:bg-subMain border border-subMain text-white py-3 px-6 rounded w-full sm:w-auto'>
            {isLoading ? 'Update' : 'Update profile'}
          </button>
        </div>
      </form>
    </SideBar>
  );
}

export default Profile;