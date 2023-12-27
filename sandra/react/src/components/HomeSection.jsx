import React from 'react'
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import vid from '../assets/intro.mp4';
import './HomeSection.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCube, faSterlingSign, faHandPaper, faSquare } from '@fortawesome/free-solid-svg-icons'






export default function HomeSection() {
  return (
    <div>
      <header className=''>
        <div className=''>
          <video src={vid} controls autoPlay loop type="video/mp4" className='video' />
        </div>
        <FontAwesomeIcon className='line' icon={faSterlingSign} />
      </header>
      <FontAwesomeIcon className='square' icon={faSquare} />
    </div>
  )
}
