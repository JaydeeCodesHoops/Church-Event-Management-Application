import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios';
import '../CSS/EventList2.css'

const Users = () => {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = sessionStorage.getItem('jwtToken'); 
                const role = sessionStorage.getItem('userRole');

                if (token && role === "Admin") {
                    const response = await axios.get('http://localhost:5231/api/Users', {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`,
                        }
                    });
                    setUsers(response.data);
                } else {
                    throw new Error('User is not authenticated.');
                }
            } catch (error) {
                console.error('Error fetching Users', error);
                alert('Failed to load Users. Check console for more details.');
            }
        };
        fetchUsers();
    }, []);

    const handleDelete = async (userId) => {
        try {
            const token = sessionStorage.getItem('jwtToken');
            await axios.delete(`http://localhost:5231/api/Users/${userId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            // Update state to remove the deleted user
            setUsers(users.filter(user => user.id !== userId));
            alert('User will be deleted.');
        } catch (error) {
            console.error('Error deleting user', error);
            alert('Failed to delete user. Check console for details.');
        }
    };

    const handleBack = () => {
        navigate("/admin");
    };

    return (
        <>
            <div className="userBGimage">
            <div className="userHead">
                <div style={{ fontSize: 35, marginLeft: 0 }}>
                    <h1> All Users </h1>
                </div>
                <div className="btns">
                    <button id="btn2" onClick={handleBack}>
                        Back
                    </button>
                </div>
            </div>
            <div className="userList">
                {users.map(user => (
                    <div key={user.id} className="userWrapper">
                        <div className="userDetails">
                            <h2>{user.name}</h2>
                            <p style={{fontSize: 25}}><span style={{fontWeight: 'bold'}}>Email:</span> {user.email}</p>
                            <p style={{fontSize: 25}}><span style={{fontWeight: 'bold'}}>Role:</span> {user.role}</p>
                        </div>
                        <div className="deleteBtn">
                            {user.role === 'congregant' && (
                            <button 
                                id="deleteUser"
                                onClick={() => handleDelete(user.id)}
                            >
                                Delete
                            </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
            </div>
        </>
    );
}

export default Users;
