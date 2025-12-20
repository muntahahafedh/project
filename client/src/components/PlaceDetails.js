import React from 'react';
import { ArrowLeft, Navigation, Star, Accessibility, SquareParking, MapPin, ArrowUpDown, Heart } from 'lucide-react';
import './PlaceDetails.css';

const placeData = {
  1: {
    name: 'Accessible Café Downtown',
    image: 'https://images.unsplash.com/photo-1638882267964-0d9764607947?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjYWZlJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzYxNzc0NTE3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.8,
    reviews: 124,
    distance: '0.3 km',
    description: 'A modern, fully accessible café with wide entrances, accessible restrooms, and wheelchair-friendly seating. Serves excellent coffee and light meals.',
    features: [
      { icon: Accessibility, label: 'Wheelchair Access' },
      { icon: MapPin, label: 'Accessible Toilet' },
      { icon: SquareParking, label: 'Accessible Parking' },
    ],
    address: '123 Main Street, Downtown',
  },
  // باقي الأماكن...
};

export function PlaceDetails({ placeId, onBack }) {
  const place = placeData[placeId] || placeData[1];

  return (
    <div className="place-container">
      <div className="place-image-container">
        <img src={place.image} alt={place.name} className="place-image" />
        <button className="icon-btn back-btn" onClick={onBack}><ArrowLeft /></button>
        <button className="icon-btn favorite-btn"><Heart /></button>
      </div>

      <div className="place-content">
        <h2 className="place-title">{place.name}</h2>

        <div className="place-rating">
          <div className="rating-stars">
            <Star className="star-icon" />
            <span>{place.rating}</span>
            <span className="reviews">({place.reviews})</span>
          </div>
          <span className="distance">{place.distance}</span>
        </div>

        <div className="features-card">
          <p>Accessibility Features</p>
          <div className="features-grid">
            {place.features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="feature-item">
                  <div className="feature-icon"><Icon /></div>
                  <span>{feature.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="place-description">
          <h3>Description</h3>
          <p>{place.description}</p>
        </div>

        <div className="place-address">
          <h3>Address</h3>
          <p>{place.address}</p>
        </div>
      </div>

      <div className="place-footer">
        <button className="navigate-btn"><Navigation className="nav-icon" />Navigate</button>
      </div>
    </div>
  );
}
