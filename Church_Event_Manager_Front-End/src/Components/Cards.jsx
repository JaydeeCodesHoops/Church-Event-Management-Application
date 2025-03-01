import React from "react";

const scriptures = [
    { reference: "John 3:16", text: "For God so loved the world that he gave his one and only Son..." },
    { reference: "Psalm 23:1", text: "The Lord is my shepherd, I lack nothing." },
    { reference: "Proverbs 3:5-6", text: "Trust in the Lord with all your heart and lean not on your own understanding..." },
    { reference: "Romans 8:28", text: "And we know that in all things God works for the good of those who love him..." },
    { reference: "Isaiah 41:10", text: "So do not fear, for I am with you; do not be dismayed, for I am your God..." },
];

// Function to randomize scripture
const getRandomScripture = () => {
    const randomIndex = Math.floor(Math.random() * scriptures.length);
    return scriptures[randomIndex];
};

export function Cardone(){
    const { reference, text } = getRandomScripture();
    return (
        <div className="crd1">
            <h1>{reference}</h1>
            <p>{text}</p>
        </div>
    );
}

export function Cardtwo(){
    const { reference, text } = getRandomScripture();
    return (
        <div className="crd2">
            <h1>{reference}</h1>
            <p>{text}</p>
        </div>
    );
}

export function Cardthree(){
    const { reference, text } = getRandomScripture();
    return (
        <div className="crd3">
           <h1>{reference}</h1>
           <p>{text}</p>
        </div>
    );
}