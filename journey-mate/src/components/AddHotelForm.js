import React, { useState } from 'react';
import axios from 'axios';
import './addhotel.css';

const AddHotelForm = () => {
    const [name, setName] = useState('');
    const [distanceFromCenter, setDistanceFromCenter] = useState('');
    const [freeTaxi, setFreeTaxi] = useState(false);
    const [roomType, setRoomType] = useState('');
    const [features, setFeatures] = useState('');
    const [price, setPrice] = useState('');
    const [rating, setRating] = useState('');
    const [ratingLabel, setRatingLabel] = useState('');
    const [freeCancellation, setFreeCancellation] = useState(true);
    const [image, setImage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('http://localhost:5000/api/products/add', {
            name,
            distanceFromCenter,
            freeTaxi,
            roomType,
            features,
            price,
            rating,
            ratingLabel,
            freeCancellation,
            image,
        })
        .then(() => {
            alert('Hotel added successfully!');
            setName('');
            setDistanceFromCenter('');
            setFreeTaxi(false);
            setRoomType('');
            setFeatures('');
            setPrice('');
            setRating('');
            setRatingLabel('');
            setFreeCancellation(true);
            setImage('');
        })
        .catch(error => {
            console.error('There was an error adding the hotel!', error);
        });
    };

    return (
        <form onSubmit={handleSubmit} className='fom'>
            <h2 className='htwo'>Add New Hotel</h2>
            <div className='division'>
                <label className='lbl'>Hotel Name:</label>
                <input
                    className='ipnt'
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>
            <div className='division'>
                <label className='lbl'>Distance from Center (in meters):</label>
                <input
                    className='ipnt'
                    type="number"
                    value={distanceFromCenter}
                    onChange={(e) => setDistanceFromCenter(e.target.value)}
                    required
                />
            </div>
            <div className='division'>
                <label className='lbl'>Free Airport Taxi:</label>
                <input
                    className='ipnt'
                    type="checkbox"
                    checked={freeTaxi}
                    onChange={(e) => setFreeTaxi(e.target.checked)}
                />
            </div>
            <div className='division'>
                <label className='lbl'>Room Type:</label>
                <input
                    className='ipnt'
                    type="text"
                    value={roomType}
                    onChange={(e) => setRoomType(e.target.value)}
                    required
                />
            </div>
            <div className='division'>
                <label className='lbl'>Features:</label>
                <input
                    className='ipnt'
                    type="text"
                    value={features}
                    onChange={(e) => setFeatures(e.target.value)}
                    required
                />
            </div>
            <div className='division'>
                <label className='lbl'>Price (₹):</label>
                <input
                    className='ipnt'
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                />
            </div>
            <div className='division'>
                <label className='lbl'>Rating:</label>
                <input
                    className='ipnt'
                    type="number"
                    step="0.1"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                />
            </div>
            <div className='division'>
                <label className='lbl'>Rating Label:</label>
                <input
                    className='ipnt'
                    type="text"
                    value={ratingLabel}
                    onChange={(e) => setRatingLabel(e.target.value)}
                />
            </div>
            <div className='division'>
                <label className='lbl'>Free Cancellation:</label>
                <input
                    className='ipnt'
                    type="checkbox"
                    checked={freeCancellation}
                    onChange={(e) => setFreeCancellation(e.target.checked)}
                />
            </div>
            <div className='division'>
                <label className='lbl'>Image:</label>
                <input
                    className='ipnt'
                    type="text"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                />
            </div>
            <button className='butto' type="submit">Add Hotel</button>
        </form>
    );
};

export default AddHotelForm;
