import React,{useState,useEffect} from "react";
import './AddArticle.css';
import { useNavigate } from 'react-router-dom';
import CircularLoading from "../../Components/loadingprogress/loadingProgress";
import ArticleForm from "../../Components/ArticleForm/ArticleForm";
import axiosClient from '../../axios';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import Mybackground from './sandrabackground.png';

const AddArticle = () => {
  const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [Category, setCategory] = useState(null);
    const [image, setImage] = useState(null);
    const [contentFile, setContentFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [imageURL, setImageURL] = useState(null);
    useEffect(() => {

      if (localStorage.getItem('user-type')!=='doctor' ) {
  
          navigate('/login');
      }
    }, []);
    const handleImageChange = (e) => {
      const file = e.target.files[0];
      setImage(file);

      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          setImageURL(event.target.result);
        };
        reader.readAsDataURL(file);
      }
    };
  
    const handleTextChange = (event) => {
      setContentFile(event.target.files[0]);
    };
    async function cancel (){
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })
      
      swalWithBootstrapButtons.fire({
        title: 'Are you sure?',
        text: "data will not be saved",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, discard!',
        cancelButtonText: 'No, stay!',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          console.log(result)
          navigate(`/articles`);
        } 
      })
  }
    const handleSubmit = async (event) => {
      event.preventDefault();
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })
      
      swalWithBootstrapButtons.fire({
        title: 'Are you sure?',
        text: "Do you want to add this article!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, add!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
      }).then(async (result) => {
        if (result.isConfirmed) {
          const userID=localStorage.getItem('user-id');
          const userType=localStorage.getItem('user-type');
          const formData = new FormData();    
          formData.append('name', title);
          formData.append('image', image??'');
          formData.append('content', contentFile);
          formData.append('specialityID', Category);
          formData.append('doctorID',parseInt( userID));
          formData.append('userType',userType);

    
          console.log(formData);
          setIsLoading(true); // Show loading indicator
          
      try{
        const response = await axiosClient.post('/Articles/upload',formData);
          setIsLoading(false); // Show loading indicator
        console.log(response)
          if(response.data.status===200){
            swalWithBootstrapButtons.fire(
              'article added.',
              'Your article has been added.',
              'success'
            )
            navigate(`/articles`);
          }else{
            swalWithBootstrapButtons.fire(
              response.data.message,
              'Your changes has not been saved',
              'error'
            )  
          }
      }
      catch(error){
        console.error('Error fetching data:', error);
        
      }     
          
        }
      })
    };
   
  return (
    <div className="addArticle">
           {isLoading && <CircularLoading />}
           

        <ArticleForm page="add" cancel={cancel} imageURL={imageURL} image={image} imagefunction={handleImageChange} contentfunction={handleTextChange} submit={handleSubmit} title={title} setTitle={setTitle} Category={Category} setCategory={setCategory}/>
    </div>
  );  
}
export default AddArticle;
