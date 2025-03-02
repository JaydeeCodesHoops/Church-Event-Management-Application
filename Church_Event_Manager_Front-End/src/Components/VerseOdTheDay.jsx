import React, { useState, useEffect } from 'react';

// Sample scripture list - you can expand this or load from an API
const scriptures = [
    { reference: "John 14:27", text: "Peace I leave with you; my peace I give you." },
    { reference: "Psalm 46:10", text: "Be still, and know that I am God." },
    { reference: "Jeremiah 29:11", text: "For I know the plans I have for you, declares the Lord..." },
    { reference: "Matthew 6:34", text: "Therefore do not worry about tomorrow..." },
    { reference: "Romans 15:13", text: "May the God of hope fill you with all joy and peace..." },
];

// Helper to get a random verse
const getRandomScripture = () => {
    const randomIndex = Math.floor(Math.random() * scriptures.length);
    return scriptures[randomIndex];
};

// Helper to get the current South African date (in UTC +2:00 timezone)
const getSASTDate = () => {
    const options = { timeZone: 'Africa/Johannesburg', year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Intl.DateTimeFormat('en-GB', options).format(new Date());
};

const VerseOfTheDay = () => {
    const [verseOfTheDay, setVerseOfTheDay] = useState(null);

    useEffect(() => {
        // Get the current South African date
        const today = getSASTDate();
        const savedVerse = JSON.parse(localStorage.getItem('verseOfTheDay'));

        if (savedVerse && savedVerse.date === today) {
            setVerseOfTheDay(savedVerse);
        } else {
            // Pick a new verse and save it to local storage with today's date
            const newVerse = { ...getRandomScripture(), date: today };
            localStorage.setItem('verseOfTheDay', JSON.stringify(newVerse));
            setVerseOfTheDay(newVerse);
        }
    }, []);

    if (!verseOfTheDay) return <p>Loading Verse of the Day...</p>;

    return (
        <div>
            <h2 style={{textDecoration: "underline"}}>Verse of the Day</h2><br/>
            <p>"{verseOfTheDay.text}"</p><br/>
            <p>-- {verseOfTheDay.reference} --</p>
        </div>
    );
};

export default VerseOfTheDay;