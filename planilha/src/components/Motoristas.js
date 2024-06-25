// src/components/Motoristas.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Motoristas.css';

const Motoristas = () => {
  const [drivers, setDrivers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5000/drivers')
      .then(response => response.json())
      .then(data => setDrivers(data));
  }, []);

  const handleEditDriver = (index) => {
    navigate('/', { state: { driver: drivers[index], index } });
  };

  const handleDeleteDriver = (index) => {
    fetch(`http://localhost:5000/drivers/${drivers[index].id}`, {
      method: 'DELETE'
    }).then(() => {
      setDrivers(prevDrivers => prevDrivers.filter((_, i) => i !== index));
    });
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredDrivers = drivers.filter(driver =>
    driver.driver.toLowerCase().includes(searchTerm) ||
    driver.phone.toLowerCase().includes(searchTerm) ||
    driver.owner.toLowerCase().includes(searchTerm)
  );

  return (
    <div>
      <button onClick={() => navigate('/')}>Voltar</button>
      <h1>Lista de Motoristas</h1>
      <input
        type="text"
        placeholder="Pesquisar"
        value={searchTerm}
        onChange={handleSearch}
      />
      <table>
        <thead>
          <tr>
            <th>Motorista</th>
            <th>Telefone</th>
            <th>Frotista</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {filteredDrivers.map((driver, index) => (
            <tr key={index}>
              <td>{driver.driver}</td>
              <td>{driver.phone}</td>
              <td>{driver.owner}</td>
              <td className="actions">
                <button onClick={() => handleEditDriver(index)}>Editar</button>
                <button onClick={() => handleDeleteDriver(index)}>Apagar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
    </div>
  );
};

export default Motoristas;
