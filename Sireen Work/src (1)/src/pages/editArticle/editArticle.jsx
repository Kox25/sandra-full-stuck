import React,{useState,useEffect} from "react";
import './editArticle.css';
import { useNavigate , useParams } from 'react-router-dom';
import CircularLoading from "../../Components/loadingprogress/loadingProgress";
import ArticleForm from "../../Components/ArticleForm/ArticleForm";
import axiosClient from '../../axios';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
const EditArticle = () => {
    const navigate = useNavigate();
    const userType=localStorage.getItem('user-type');
    const userID=localStorage.getItem('user-id');

 const {id}=useParams();
 const [title, setTitle] = useState('');
    const [Category, setCategory] = useState(null);
    const [image, setImage] = useState(null);
    const [imageURL, setImageURL] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [Article,setArticle]=useState([]);
    const [ImageChange,setImageChange]=useState(false);
    const [doctorID, setdoctorID] = useState(null);

    const handleImageChange = (e) => {
      setImageChange(true);
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
    useEffect(()=>{
      

        const fetchData=async ()=>{
          const userID=localStorage.getItem('user-id');
          const userType=localStorage.getItem('user-type');
      try{
          const response=await axiosClient.post(`Articles/content/${id}`,{  userID,userType });
  
          setArticle(response.data['Article'])
          setTitle(response.data['Article'].name)
          setCategory(response.data['Article'].category.id)
          setImage(response.data['Article'].image)
          setImageURL("http://localhost:8000/"+response.data['Article'].image)
          setdoctorID(response.data['Article'].doctorID)
      }
      catch(error){
        console.error('Error fetching data:', error);
        
      }
       
        
      }
      fetchData();
      
    },[id])
  
     function cancell (){
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })
      
      swalWithBootstrapButtons.fire({
        title: 'Are you sure?',
        text: "changes will not be saved",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, discard!',
        cancelButtonText: 'No, stay!',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          console.log(result)
          navigate(`/articles/${Category}/${id}`);
        } 
      })
  }
  const error =()=>{
    Swal.fire('something went wrong check your permissions');


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
        text: "Do you want to save the changes!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, save!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
      }).then(async (result) => {
        if (result.isConfirmed) {
          const userID=localStorage.getItem('user-id');
          const userType=localStorage.getItem('user-type');
          const formData = new FormData();
          formData.append('name', title);
          formData.append('image', ImageChange?image:'');
          formData.append('specialityID', Category);
          formData.append('doctorID', parseInt( userID));
          formData.append('imageChange', ImageChange.toString());
          formData.append('userType', userType);
    
          console.log(formData);
          setIsLoading(true); // Show loading indicator
          
      try{
          const response=await axiosClient.post(`Articles/update/${id}`,formData);
          setIsLoading(false); // Show loading indicator
        console.log(response)
          if(response.data.status===200){
            swalWithBootstrapButtons.fire(
              'Changes saved.',
              'Your changes has been saved.',
              'success'
            )
            navigate(`/articles/${Category}/${id}`);
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
    if(Article.length!==0){
      if(userType==='doctor'&&userID==doctorID){
        return (
            <div className="editArticles">
                   {isLoading && <CircularLoading />}
  
                <ArticleForm page="edit" cancel={cancell}  image={image} imageURL={imageURL}  imagefunction={handleImageChange}  submit={handleSubmit} title={title} setTitle={setTitle} Category={Category} setCategory={setCategory}/>
            </div>
          );  

      }
      else{
        return(<div className="editArticles">
        {isLoading && <CircularLoading />}
          {error}
 </div>);
      }

    }
    else{
      return (
        <div className="editArticles">
                  <CircularLoading />
          </div>
      )
    }
 

}
export default EditArticle;

