import React, { useState, useEffect } from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { motion } from 'framer-motion';
import { Cardone, Cardtwo, Cardthree } from '../Components/Cards';
import VerseOfTheDay from '../Components/VerseOdTheDay';
import '/src/CSS/Welcome.css';

export default function Welcome (){

    const cards = [
        { id: 1, component: <Cardone/> },
        { id: 2, component: <Cardtwo/> },
        { id: 3, component: <Cardthree/> },
        { id: 4, component: <Cardone/> },
        { id: 5, component: <Cardtwo/> },
        { id: 6, component: <Cardthree/> }
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
                        const nextIndex = (pos.index + 3) % cards.length;
                        return { position: 'left', index: nextIndex };
                    }
                    return pos;
                });
            });
        }, 8500);
    
        return () => clearInterval(interval);
    }, [cards]);
    
    // Helper function to calculate position styling
    const getPositionStyles = (position) => {
        switch (position) {
            case 'left':
                return { x: '-200%', scale: 1, opacity: 2 };
            case 'center':
                return { x: '-0%', scale: 2, opacity: 2 };
            case 'right':
                return { x: '200%', scale: 1, opacity: 2 };
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
            <div className="cards-wrapper">
                <div className="card-slide-show">
                    {currentPositions.map(({ position, index }) => (
                        <motion.div
                            key={cards[index].id}
                            className="individual-card"
                            initial={getPositionStyles(position)}
                            animate={getPositionStyles(position)}
                            transition={{ duration: 0.5 }}
                        >
                            {cards[index].component}
                        </motion.div>
                    ))}
                </div>
                <div className="description">
                    <p>Imagine a application that makes everyone's experience much easier to just book your seat at an event that you would like to attend to.<br/>
                       Everything is so much easier with the 
                       <span style={{fontWeight: "bold", color: "yellow", textShadow: "0 0 2px #000, 0 0 5px #000, 0 0 10px #000, 0 0 2px #000", marginLeft: "5px", marginRight: "3px"}}>Church Event Management Application</span>,
                       marking your attendance  by just one click!
                    </p><br/>
                    <h2>--- Enjoy the Booking to Enjoy the Event ---</h2>
                </div>
                <div className="verseOfToday">
                    <VerseOfTheDay/>
                </div>
                <div>

                </div>
            </div>
        </div>
        <div>
            <Footer/>
        </div>
        </>
    );
 }


            {/* <div className="insideCard">
                <img src={image2} alt="front image" class="front-image" style={{borderRadius: "15px"}}/>
                <div className="back-text">
                    <h1>Hey. </h1>
                </div>
            </div> */}