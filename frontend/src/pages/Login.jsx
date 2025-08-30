// src/pages/Login.jsx
import React from 'react';
import { Form, Input, Button, message, Card } from 'antd';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

axios.defaults.withCredentials = true; // важно — чтобы отправлялись куки

export default function Login() {
    const navigate = useNavigate();

    const onFinish = async (values) => {
        try {
            const params = new URLSearchParams();
            params.append('username', values.username); // или values.email, если у вас так
            params.append('password', values.password);

            await axios.post(
                'http://localhost:8000/auth/jwt/login',
                params,
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    }
                }
            );
            message.success('Успешный вход!');
            navigate('/');
        } catch (err) {
            console.error(err.response?.data);
            message.error(err.response?.data?.detail || 'Ошибка входа');
        }
    };

    return (
        <Card title="Вход" style={{ maxWidth: 400, margin: '100px auto' }}>
            <Form layout="vertical" onFinish={onFinish}>
                <Form.Item
                    name="username"
                    label="Имя пользователя"
                    rules={[{ required: true, message: 'Введите имя пользователя' }]}
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
                <Form.Item>
                    <Button type="primary" htmlType="submit" block>
                        Войти
                    </Button>
                </Form.Item>
                <Form.Item>
                    Нет аккаунта? <Link to="/register">Зарегистрироваться</Link>
                </Form.Item>
            </Form>
        </Card>
    );
}
