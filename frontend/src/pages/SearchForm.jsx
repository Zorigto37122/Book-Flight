import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchForm = () => {
    const [formData, setFormData] = useState({
        departure_airport_code: '',
        arrival_airport_code: '',
        departure_time_start: '',
        departure_time_end: '',
        max_price: ''
    });

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Формируем query параметры
        const params = new URLSearchParams();
        Object.entries(formData).forEach(([key, value]) => {
            if (value) params.append(key, value);
        });

        // Перенаправляем на страницу результатов
        navigate(`/flights/results?${params.toString()}`);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Код аэропорта вылета (например, SVO)"
                value={formData.departure_airport_code}
                onChange={(e) => setFormData({...formData, departure_airport_code: e.target.value})}
            />
            <input
                type="text"
                placeholder="Код аэропорта прибытия (например, LED)"
                value={formData.arrival_airport_code}
                onChange={(e) => setFormData({...formData, arrival_airport_code: e.target.value})}
            />
            <input
                type="datetime-local"
                placeholder="Начальная дата вылета"
                value={formData.departure_time_start}
                onChange={(e) => setFormData({...formData, departure_time_start: e.target.value})}
            />
            <input
                type="datetime-local"
                placeholder="Конечная дата вылета"
                value={formData.departure_time_end}
                onChange={(e) => setFormData({...formData, departure_time_end: e.target.value})}
            />
            <input
                type="number"
                placeholder="Максимальная цена"
                value={formData.max_price}
                onChange={(e) => setFormData({...formData, max_price: e.target.value})}
            />
            <button type="submit">Найти билеты</button>
        </form>
    );
};

export default SearchForm;