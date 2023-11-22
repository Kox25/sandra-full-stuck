import React, { useContext ,useEffect } from "react";
import './Categories.css';
import {Col, Row} from 'react-bootstrap';
import {MyContext} from '../../Providers/ArticleCategoryprov';
import {Link} from 'react-router-dom';
import axiosClient from '../../axios';

const Categories = () => {

  const {Category,Categories,handleUpdate,setCategories} = useContext(MyContext);
  const userType=localStorage.getItem('user-type');
  function onUpdate(value){
    console.log(value);
    handleUpdate(value)
  }
    
  useEffect(() => {
    const fetchData=async ()=>{
      try{const response = await axiosClient.get('/Categories');
      setCategories(response.data['Category']);
      }
      catch(error){
        console.error('Error fetching data:', error);

      }

    }
    fetchData();
  }, []);

  return (
    <div className="Categories">
      <div className="titleAdd">
      <h2>Discover Nice Articles here</h2>
      {userType==='doctor'?
      <Link to="AddArticle"  id="addArticle" className="link" >Add new Article</Link>:null}

      </div>
      
      <br/>
      <h6>There is hope. With the right support, you can overcome your challenges and live a happy and fulfilling life.</h6>
      <br/>
      <Row >   
        <Col >
          <div className="cat">
            Embark on an Article Category Journey to Uncover a Universe of Relevant Knowledge :<br/><br/>
            <button onClick={()=>onUpdate(0)}  id={0} className={Category===0?"selected":"none"}> All</button>
            {Categories.length>0? Categories.map((item)=>(
            <button onClick={()=>onUpdate(item.id)}  id={item.id} className={Category===item.id?"selected":"none"}>
              {item.name}
            </button>
            )):null}
          </div>
        </Col>
      </Row>
    </div>
  );
}
export default Categories;
