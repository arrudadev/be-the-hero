import React, { useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';

import './styles.css';

import logoImg from '../../assets/logo.svg';
import api from '../../services/api';

const NewIncident: React.FC = () => {
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [value, setValue] = useState('');

	const history = useHistory();

	const ongId = localStorage.getItem('ongId');

	const handleNewIncident = async (event: React.FormEvent): Promise<void> => {
		event.preventDefault();
		const payload = {
			title,
			description,
			value,
		};
		await api.post('incidents', payload, {
			headers: {
				Authorization: ongId,
			},
		});
		history.push('/profile');
	};

	return (
		<div className="new-incident-container">
			<div className="content">
				<section>
					<img src={logoImg} alt="Be The Hero" />

					<h1>Cadastrar novo caso</h1>
					<p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>

					<Link className="back-link" to="/profile">
						<FiArrowLeft size={16} color="#E02041" />
                        Voltar para home
					</Link>
				</section>

				<form onSubmit={handleNewIncident}>
					<input
						placeholder="Título do caso"
						value={title}
						onChange={(event: React.ChangeEvent<HTMLInputElement>): void => setTitle(event.target.value)}
					/>
					<textarea
						placeholder="Descrição"
						value={description}
						onChange={(event: React.ChangeEvent<HTMLTextAreaElement>): void => setDescription(event.target.value)}
					/>
					<input
						placeholder="Valor em reais"
						value={value}
						onChange={(event: React.ChangeEvent<HTMLInputElement>): void => setValue(event.target.value)}
					/>

					<button type="submit" className="button">
                        Cadastrar
					</button>
				</form>
			</div>
		</div>
	);
};

export default NewIncident;
