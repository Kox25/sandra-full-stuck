import React, { useRef } from 'react';
import './UploadDocumet.css';
import upload from '../assets/upload-file.png';
import avatar from '../assets/avatar.png';

export default function UploadDocument() {
    const fileInputRef = useRef(null);

    const handleClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        // Do something with the selected file

        // For example, you can display the file name
        console.log('Selected file:', file.name);
    };



    return (
        <div>
            <div className='u w-screen flex mt-[10%]'>
                <div className='w-[10%]'></div>


                <span className='w-[30%] pl-3'>
                    <div className='flex'>
                        <img className='ml-[-10%]' src={avatar} width={90} />
                        <p className='ml-3 mt-4' > Note:</p>
                    </div>
                    If you want to make your account more reliable
                    and objective and have a greater chance of reaching more cases
                    and spreading your articles among users
                    you must verify your account by inserting your certificate here
                    <p className='mt-3 ml-3 mb-3'>Sandra Team</p>
                </span>


                <div className='w-[10%]'></div>

                <div>
                    <p className='ml-[33%] mb-[-10%]'>Upload File Here</p>
                    <form className='w-[40%] mt-12'>
                        <input
                            type='file'
                            accept='image/*'
                            className='input-field'
                            hidden
                            ref={fileInputRef}
                            onChange={handleFileChange}
                        />
                        <img
                            src={upload}
                            alt='Not-Available'
                            height={70}
                            width={120}
                            onClick={handleClick}
                            style={{ cursor: 'pointer' }}
                        />
                    </form>
                </div>
                <div className='w-[10%]'></div>
            </div>

            <div>
                <button></button>
            </div>
        </div>
    )
}
