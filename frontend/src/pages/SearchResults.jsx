import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const SearchResults = () => {
    const [flights, setFlights] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const location = useLocation();

    useEffect(() => {
        const fetchResults = async () => {
            try {
                setLoading(true);
                const response = await fetch(`/api/flights/search${location.search}`);

                if (!response.ok) {
                    throw new Error('Ошибка при поиске рейсов');
                }

                const data = await response.json();
                setFlights(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchResults();
    }, [location.search]);

    if (loading) return <div>Загрузка...</div>;
    if (error) return <div>Ошибка: {error}</div>;

    return (
        <div>
            <h2>Результаты поиска</h2>
            {flights.length === 0 ? (
                <p>Рейсы не найдены</p>
            ) : (
                flights.map(flight => (
                    <div key={flight.id} className="flight-card">
                        <h3>{flight.departure_airport.city} → {flight.arrival_airport.city}</h3>
                        <p>Вылет: {new Date(flight.departure_time).toLocaleString()}</p>
                        <p>Прилет: {new Date(flight.arrival_time).toLocaleString()}</p>
                        <p>Аэропорт вылета: {flight.departure_airport.name} ({flight.departure_airport.code})</p>
                        <p>Аэропорт прибытия: {flight.arrival_airport.name} ({flight.arrival_airport.code})</p>
                        <p className="price">Цена: {flight.base_price} руб.</p>
                    </div>
                ))
            )}
        </div>
    );
};

export default SearchResults;