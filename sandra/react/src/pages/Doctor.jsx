import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Doctor.css';
import doctorImg from '../assets/doctoricon.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage } from '@fortawesome/free-solid-svg-icons';
import medalia from '../assets/medaliaicon.png';
import axiosClient from '../axios';
import love from '../assets/hand.png'
import Swal from 'sweetalert2';
import { useTranslation } from 'react-i18next';

export default function Doctor() {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  const [visibleDoctors, setVisibleDoctors] = useState(8);
  const [likes, setLikes] = useState([]);
  const [likedDoctors, setLikedDoctors] = useState([]);
  const {t} = useTranslation(); 


  useEffect(() => {
    if (!localStorage.getItem('user-info')) {
      navigate('/login');
    } else {
      fetchDoctors();
    }
  }, [navigate]);


  const handleError = () => {
    Swal.fire(
      {
        'title': "OPPS...",
        'icon': "error",
        'text': "Something went wrong",
      }
    );
  }




  const fetchDoctors = async () => {
    try {
      const response = await axiosClient.get('/get/doctors');
      const data = response.data;
      setDoctors(data.doctors);
      const doctorIds = data.doctors.map(doctor => doctor.id);
      DoctorLikes(doctorIds);
    } catch (error) {
      console.error('Error fetching doctors:', error);
      handleError(); 
    }
  };


  //here section for add likes 
  const addLike = async (doctorId) => {
    try {
      const userId = localStorage.getItem('user-id');
      await axiosClient.post(`/add/like/${doctorId}/${userId}`);

      // Update the likedDoctors state to include the newly liked doctor
      setLikedDoctors((prevLikedDoctors) => [...prevLikedDoctors, doctorId]);

      // Update the like counts
      DoctorLikes([doctorId]);
    } catch (error) {

      console.error('Error adding like:', error);
      handleError(); 
    }
  };






  //section here for display the doctor likes 
  const DoctorLikes = async (doctorIds) => {
    try {
      const updatedLikes = { ...likes };

      for (let i = 0; i < doctorIds.length; i++) {
        const doctorId = doctorIds[i];
        const response = await axiosClient.post(`show/likes/${doctorId}`);
        const data = response.data;

        if (data && data.likes !== undefined) {
          const likeCount = data.likes;
          updatedLikes[doctorId] = likeCount;
        } else {
          updatedLikes[doctorId] = 0; // Set default like count to 0 if data is missing
        }
      }

      setLikes(updatedLikes);
    } catch (error) {
      console.error('Error fetching Likes:', error);
      handleError(); 
    }
  };

  const openChatWithDoctor = async (doctorId) => {
    try {
      const userId = localStorage.getItem('user-id');
      const userType = localStorage.getItem('user-type'); // Add this line to get the user type
      const response = await axiosClient.post(`/open-chat/${userType}/${userId}/${doctorId}`); // Include the user type in the API call
      const data = response.data;
      // Handle the response data as needed
      console.log(data);
      // Navigate to the chat page
      navigate('/chats');
    } catch (error) {
      console.error('Error opening chat:', error);
      handleError(); 
    }
  };
  // here section for load more doctor 
  const loadMoreDoctors = () => {
    setVisibleDoctors((prevVisibleDoctors) => prevVisibleDoctors + 5);
  };



  return (
    <div >
      {/* Cards section */}
      <div className='p-3 mt-[100px] ml-5'>
        <div className='max-h-[480px]' style={{ overflowX: 'hidden' }}>
          <div className='flex flex-wrap -mx-1 mt-0'>
            {doctors.slice(0, visibleDoctors).map((doctor) => (
              <div key={doctor.id} className='w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 h-3/5 px-4 pl-1'>
                <div className='flex flex-col rounded-xl mt-4 cards p-2'>
                  {/* Image section */}
                  <div className='flex justify-content-between'>
                    <img
                      className='object-fit-cover rounded-full border border-secondary border-3 border-info-subtle'
                      src={doctorImg}
                      alt=''
                      height='90'
                      width='90'
                    />
                    {doctor.isVerfiy == 1 ?
                      <img className='medalia'
                        src={medalia}
                      />
                      :
                      ""
                    }

                  </div>
                  {/* Doctor Information */}
                  <div className='p-2 doctorInfo'>
                    {/* Doctor Name */}
                    <div className='font-bold text-black text-lg-center'>{doctor.user_name}</div>
                    {/* Doctor info */}
                    <div className='text-sm text-black max-h-32'>
                      {t("email")}:{doctor.email}
                      <br />
                      {t("more")}
                    </div>
                  </div>
                  {/* Doctor Articles */}
                  <div className='m-2'>
                    <button className='text-white botton px-2 py-1 rounded-md'>{t("Articals")}</button>
                  </div>
                  {/* for open chat */}
                  <div className='m-2'>
                    <a className='text-sm text-white botton px-2 py-1 rounded-md cursor-pointer'
                      onClick={() => openChatWithDoctor(doctor.id)}>
                      {t("chattingwith")} <FontAwesomeIcon icon={faMessage} className='pl-2 text-white' />
                    </a>
                  </div>
                  {/* display it here  */}
                  <div className='mt-1 pl-[45%]'>
                    <div className="text-lg cursor-pointer" onClick={() => addLike(doctor.id)}>
                      {likedDoctors.includes(doctor.id) ? (
                        <div className='text-warning flex'>
                          <img src={love} height='40' width='40' className="pl-2" />
                          <span className='pl-2 text-warning'>{likes[doctor.id] || 0}</span>

                        </div>
                      ) : (
                        <div className='text-warning flex' >
                          <img src={love} height='40' width='40' className='pl-2' />
                          <span className='pl-2 text-warning'>{likes[doctor.id] || 0}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {visibleDoctors < doctors.length && (
          <div className='text-center mt-2'>
            <button className='text-white botton px-1 py-1 rounded-md' onClick={loadMoreDoctors}>
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  );
}