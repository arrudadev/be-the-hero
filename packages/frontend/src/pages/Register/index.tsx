import React, { useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';

import './styles.css';

import logoImg from '../../assets/logo.svg';
import api from '../../services/api';

const Register: React.FC = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [whatsapp, setWhatsApp] = useState('');
	const [city, setCity] = useState('');
	const [uf, setUf] = useState('');

	const history = useHistory();

	const handleRegister = async (event: React.FormEvent): Promise<void> => {
		event.preventDefault();
		const payload = {
			name,
			email,
			whatsapp,
			city,
			uf,
		};

		try {
			const response = await api.post('ongs', payload);
			alert(`Seu ID de acesso: ${response.data.id}`);
			history.push('/');
		} catch (error) {
			alert('Erro no cadastro, tente novamente');
		}
	};

	return (
		<div className="register-container">
			<div className="content">
				<section>
					<img src={logoImg} alt="Be The Hero" />

					<h1>Cadastro</h1>
					<p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>
					<Link className="back-link" to="/">
						<FiArrowLeft size={16} color="#E02041" />
                        Não tenho cadastro
					</Link>
				</section>

				<form onSubmit={handleRegister}>
					<input
						placeholder="Nome da ONG"
						value={name}
						onChange={(event: React.ChangeEvent<HTMLInputElement>): void => setName(event.target.value)}
					/>
					<input
						type="email"
						placeholder="E-mail"
						value={email}
						onChange={(event: React.ChangeEvent<HTMLInputElement>): void => setEmail(event.target.value)}
					/>
					<input
						placeholder="WhatsApp"
						value={whatsapp}
						onChange={(event: React.ChangeEvent<HTMLInputElement>): void => setWhatsApp(event.target.value)}
					/>

					<div className="input-group">
						<input
							placeholder="Cidade"
							value={city}
							onChange={(event: React.ChangeEvent<HTMLInputElement>): void => setCity(event.target.value)}
						/>
						<input
							placeholder="UF"
							style={{ width: 80 }}
							value={uf}
							onChange={(event: React.ChangeEvent<HTMLInputElement>): void => setUf(event.target.value)}
						/>
					</div>

					<button type="submit" className="button">
                        Cadastrar
					</button>
				</form>
			</div>
		</div>
	);
};

export default Register;
