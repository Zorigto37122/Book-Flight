import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";
import { Form, Input, DatePicker, Select, Button } from 'antd';
import { SwapOutlined } from '@ant-design/icons';
import './Home.css';
import axios from "axios";

const { Option } = Select;

const Home = () => {
    const [form] = Form.useForm();
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [date, setDate] = useState("");
    const navigate = useNavigate();


    const onFinish = async (values) => {
//         const params = {
//             departure_airport_code: values.departure_airport_code,
//             arrival_airport_code: values.arrival_airport_code,
//             departure_date: values.date.format('YYYY-MM-DD'),
//             travel_class: values.class,
//         };
//
// //         const response = await axios.get('http://localhost:5173/search/flights', {
// //             params,
// //             withCredentials: true,
// //         });
//
//         navigate(`/flights/results?${params.toString()}`);
//
//         console.log('Результаты поиска:', response.data);
    };

    function onSubmit(e) {
        e.preventDefault();
        // simple validation
        if (!from || !to || !date) return alert("Fill all fields");
        const qs = new URLSearchParams({
          departure_city: from,
          arrival_city: to,
          departure_date: date,
        }).toString();
        navigate(`/flights/search?${qs}`);
      }

    const swapLocations = () => {
        const from = form.getFieldValue('from');
        const to = form.getFieldValue('to');
        form.setFieldsValue({ from: to, to: from });
    };

    return (
        <div className="home-layout">
            <div className="hero-overlay">
                <Form form={form} layout="inline" className="search-bar" onSubmit={onSubmit}>
                    <Form.Item name="from" rules={[{ required: true, message: 'Укажите город вылета' }]}>
                        <Input placeholder="Откуда" />
                    </Form.Item>

                    <Form.Item className="swap-button-wrapper">
                        <Button
                            icon={<SwapOutlined />}
                            onClick={swapLocations}
                            className="swap-button"
                        />
                    </Form.Item>


                    <Form.Item name="to" rules={[{ required: true, message: 'Укажите город назначения' }]}>
                        <Input placeholder="Куда" />
                    </Form.Item>

                    <Form.Item name="date" rules={[{ required: true, message: 'Выберите дату' }]}>
                        <DatePicker placeholder="Когда" style={{ width: '100%' }} />
                    </Form.Item>

                    <Form.Item
                        name="class"
                        rules={[{ required: true, message: 'Выберите класс' }]}
                        className="class-form-item"
                    >
                        <Select placeholder="Класс" className="class-selector">
                            <Option value="economy">Эконом</Option>
                            <Option value="business">Бизнес</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Найти билеты
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default Home;
