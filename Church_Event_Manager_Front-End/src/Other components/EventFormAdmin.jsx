import React, { useEffect, useState } from 'react';

const EventForm = ({ addEvent, updateEvent, currentEvent, setCurrentEvent}) => {
    const [Title, setTitle] = useState('');
    const [Description, setDescription] = useState('');
    const [Location, setLocation] = useState('');
    const [Date, setDate] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect (() => {
        if (currentEvent){
            setTitle(currentEvent.title || '');
            setDescription(currentEvent.description || '');
            setLocation(currentEvent.location || '');
            setDate(currentEvent.date);
        }
        else{
            resetForm();
        }
    }, [currentEvent]);

    const resetForm = () => {
        setTitle('');
        setDescription('');
        setLocation('');
        setDate('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!Title || !Description || !Location || !Date){
            setError('Please fill in all required fields.');
            return;
        }

        const event = {
            title: Title,
            description: Description,
            location: Location,
            date: Date,
        };

        setLoading(true);
        try{
            if(currentEvent){
                await updateEvent({ ...currentEvent, ...event });
            } else{
                await addEvent(event);
            }
            resetForm();
        } catch(error){
            setError('Failed to save Event');
            console.log(error);
        } finally{
            setLoading(false);
        }
    };

    return (
        <form className="AdminForm" onSubmit={handleSubmit}>
            <div className="form1">
                <div>
                    <label style={{fontSize: 25, color: 'white', marginBottom: '5px'}}>Title:</label>
                    <input
                        type="text"
                        placeholder="Title"
                        value={Title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label style={{fontSize: 25, color: 'white', marginBottom: '5px'}}>Description:</label>
                    <textarea
                        placeholder="Description"
                        value={Description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label style={{fontSize: 25, color: 'white', marginBottom: '5px'}}>Location:</label>
                    <textarea
                        placeholder="Loction"
                        value={Location}
                        onChange={(e) => setLocation(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label style={{fontSize: 25, color: 'white', marginBottom: '5px'}}>Date:</label>
                    <input
                        type="datetime-local"
                        value={Date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                </div>
                <div className="load-error">
                    {loading && <p>...loading...</p>}
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                    <button id="updateB" type="submit">
                        {currentEvent? 'Update Event' : 'Add Event'}
                    </button>
                    {currentEvent && <button type="button" onClick={() => setCurrentEvent(null)}>Cancel</button>}
                </div>
            </div>
        </form>
    );
};

export default EventForm