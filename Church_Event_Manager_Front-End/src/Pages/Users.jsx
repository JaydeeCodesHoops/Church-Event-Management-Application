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
            <div className="head">
                <h1 style={{ fontSize: 50 }}> All Users </h1>
                <button id="btn2" onClick={handleBack}>
                    Back
                </button>
            </div>
            <div className="userBGimage">
            <div className="userList">
                {users.map(user => (
                    <div key={user.id} className="userWrapper">
                        <div className="viewUsers">
                        <div>
                            <h2>{user.name}</h2>
                            <p style={{fontSize: 20}}><span style={{fontWeight: 'bold'}}>Email:</span> {user.email}</p>
                            <p style={{fontSize: 20}}><span style={{fontWeight: 'bold'}}>Role:</span> {user.role}</p>
                        </div>
                        <div>
                            {user.role === 'congregant' && (
                            <button 
                                style={{ backgroundColor: "red", color: "white", border: "none", padding: "5px 10px", cursor: "pointer", fontSize: 15 }}
                                onClick={() => handleDelete(user.id)}
                            >
                                Delete
                            </button>
                            )}
                        </div>
                        </div>
                    </div>
                ))}
            </div>
            </div>
        </>
    );
}

export default Users;
