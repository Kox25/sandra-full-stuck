import React from 'react'
import doctor from '../assets/doctoricon.png'
import Swal from 'sweetalert2'
import { Navigate, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
const InfoForVideo = () => {
    const Navigate = useNavigate(); 
    const {t} = useTranslation()
    const AgreePage = () =>
    {
        Swal.fire({
            title: "Do you agree to the terms you have read?",
            showDenyButton: true,
            showConfirmButton: true,
            confirmButtonText: "Agree",
            denyButtonText: "Do not",
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire("Done!", "", "success");
                Navigate('/chat/video/call');
            } else if (result.isDenied) {
                Swal.fire("Not sure!", "You have to accept all the term to make video call", "info");
            }
        });
    }
  return (
    <div>
            <div className='u w-screen flex mt-[220px]'>
                {/*just for divide the screen*/}
                <div className='w-[25%] mt-[-10px] doctorIcon '>
                <img src={doctor} width={70} height={70}
                 className='rounded-full border-black ml-[150px] '></img>
                 <div className='ml-[230px] mt-[-35px] font-mono'>DR.{localStorage.getItem('user-name')}</div>
                </div>
                
                {/*here is the for of information most the doctor agree on to open a video call with patient*/}
                <div className='w-[50%] mainForm'>
                    <div className='w-[10%] mt-[10px] mr-[450px] mb-[-30px] font-mono bold text-xl'>
                        {t("rules")}:
                    </div><br/>
                    <div className='font-mono -mr-2 mt-[30px]'> - {t("firstRule")} <br/>
                          - {t("secondRule")}<br/>
                          - {t("thirdRule")} <br/> {t("completethirdRule")}
                    </div>
                    <button className='mt-[5%] font-mono bg-orange-200 rounded-full w-[130px] h-[40px]'
                        onClick={AgreePage}>{t("readRules")}</button>
                </div>

                {/*just for divide the screen*/}
                <div className='w-[25%]'></div>
            </div>
        </div>
  )
}

export default InfoForVideo;