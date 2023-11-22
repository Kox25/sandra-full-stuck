import {React ,useContext}from "react";
import Carousel from 'react-bootstrap/Carousel';
import './Slider.css';
import {MyContext} from '../../Providers/ArticleCategoryprov';
const Slider = () =>{
  const {Categories} = useContext(MyContext);

    return (
      <Carousel data-bs-theme="dark" className="Carousel">
      {  Categories.map((item) => (
              <Carousel.Item key={item.id}>
            <img
              className="d-block w-100"
              src={item.image}
              alt={item.id}
            />
            <Carousel.Caption className="SliderCaption">
              <h5 className="text">{item.name}</h5>
              <p className="text">{item.description}</p>
            </Carousel.Caption>
          </Carousel.Item>  
          ))}
    </Carousel>
    );
    }
    export default Slider;
