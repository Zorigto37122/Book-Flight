// src/pages/Register.jsx
import React from 'react';
import { Form, Input, Button, message, Card } from 'antd';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

axios.defaults.withCredentials = true;

export default function Register() {
    const navigate = useNavigate();

    const onFinish = async (values) => {
        try {
            const params = {
                first_name: values.first_name,
                last_name: values.last_name,
                sex: values.sex,
                email: values.email,
                birthdate: values.birthdate,
                password: values.password
            }


            await axios.post(
                'http://localhost:8000/auth/register',
                params,
                { withCredentials: true }
            );
            message.success('Регистрация успешна! Пожалуйста, войдите.');
            navigate('/login');
        } catch (err) {
            console.error(err.response?.data);
            message.error(err.response?.data?.detail || 'Ошибка регистрации');
        }
    };

    return (
        <Card title="Регистрация" style={{ maxWidth: 400, margin: '100px auto' }}>
            <Form layout="vertical" onFinish={onFinish}>
                <Form.Item
                    name="first_name"
                    label="Имя"
                    rules={[{ required: true, message: 'Введите имя' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="last_name"
                    label="Фамилия"
                    rules={[{ required: true, message: 'Введите фамилию' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="sex"
                    label="Пол"
                    rules={[{ required: true, message: 'Введите пол' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                        { required: true, message: 'Введите email' },
                        { type: 'email', message: 'Неверный формат email' }
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="password"
                    label="Пароль"
                    rules={[{ required: true, message: 'Введите пароль' }]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    name="birthdate"
                    label="Дата рождения"
                    rules={[{ required: false, message: 'Введите дату рождения' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" block>
                        Зарегистрироваться
                    </Button>
                </Form.Item>
                <Form.Item>
                    Уже есть аккаунт? <Link to="/login">Войти</Link>
                </Form.Item>
            </Form>
        </Card>
    );
}
