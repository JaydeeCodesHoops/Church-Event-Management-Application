import React, { useState, useEffect } from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { motion } from 'framer-motion';

import image from '../assets/pngtree-white-cross.jpg'
import image2 from '../assets/YouthHike.jpg'
import image3 from '../assets/worship.jpg'
import image4 from '../assets/crosses-jesus-white.jpg'
import image5 from '../assets/come-to-church.jpg'
import image6 from '../assets/logo.png'
import '/src/CSS/Welcome.css';

function Welcome (){

    const images = [
        { id: 1, src: image },
        { id: 2, src: image2 },
        { id: 3, src: image3 },
        { id: 4, src: image4 },
        { id: 5, src: image5 },
        { id: 6, src: image6 }
    ];

    const [currentPositions, setCurrentPositions] = useState([
        { position: 'left', index: 0 },
        { position: 'center', index: 1 },
        { position: 'right', index: 2 },
    ]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentPositions((current) => {
                return current.map((pos) => {
                    if (pos.position === 'left') return { ...pos, position: 'center' };
                    if (pos.position === 'center') return { ...pos, position: 'right' };
                    if (pos.position === 'right') {
                        const nextIndex = (pos.index + 3) % images.length;
                        return { position: 'left', index: nextIndex };
                    }
                    return pos;
                });
            });
        }, 3000);
    
        return () => clearInterval(interval);
    }, [images]);
    
    // Helper function to calculate position styling
    const getPositionStyles = (position) => {
        switch (position) {
            case 'left':
                return { x: '-200%', scale: 0.5, opacity: 0.8 };
            case 'center':
                return { x: '-0%', scale: 1, opacity: 1 };
            case 'right':
                return { x: '200%', scale: 0.5, opacity: 0.8 };
            default:
                return {};
        }
    };
 
    return (
        <>
        <div className="head">
            <Header/>
        </div>
        <div className="welcomepage">
            <div className="carousel-wrapper">
                <div className="carousel">
                    {currentPositions.map(({ position, index }) => (
                        <motion.div
                            key={images[index].id}
                            className="image-container"
                            initial={getPositionStyles(position)}
                            animate={getPositionStyles(position)}
                            transition={{ duration: 1 }}
                        >
                            <img className="carousel-image" src={images[index].src} alt={`Image ${images[index].id}`} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
        <div>
            <Footer/>
        </div>
        </>
    );
 }
 export default Welcome;


            {/* <div className="insideCard">
                <img src={image2} alt="front image" class="front-image" style={{borderRadius: "15px"}}/>
                <div className="back-text">
                    <h1>Hey. </h1>
                </div>
            </div> */}