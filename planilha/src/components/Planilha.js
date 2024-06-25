// src/components/Planilha.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Planilha.css';

const Planilha = () => {
  const [driver, setDriver] = useState('');
  const [phone, setPhone] = useState('');
  const [owner, setOwner] = useState('');
  const [drivers, setDrivers] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    fetch('http://localhost:5000/drivers')
      .then(response => response.json())
      .then(data => setDrivers(data));

    if (location.state) {
      const { driver, index } = location.state;
      setDriver(driver.driver);
      setPhone(driver.phone);
      setOwner(driver.owner);
      setEditIndex(index);
    }
  }, [location.state]);

  const handleAddOrEditDriver = () => {
    if (driver && phone && owner) {
      const newDriver = { driver, phone, owner };
      if (editIndex !== null) {
        const updatedDriver = { ...drivers[editIndex], ...newDriver };
        fetch(`http://localhost:5000/drivers/${drivers[editIndex].id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(updatedDriver)
        }).then(() => {
          setDrivers(prevDrivers => {
            const updatedDrivers = [...prevDrivers];
            updatedDrivers[editIndex] = updatedDriver;
            return updatedDrivers;
          });
          setEditIndex(null);
        });
      } else {
        fetch('http://localhost:5000/drivers', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newDriver)
        })
          .then(response => response.json())
          .then(data => setDrivers([...drivers, data]));
      }
      setDriver('');
      setPhone('');
      setOwner('');
    } else {
      alert('Por favor, preencha todos os campos.');
    }
  };

  const handlePhoneInput = (e) => {
    const x = e.target.value.replace(/\D/g, '').match(/(\d{0,2})(\d{0,5})(\d{0,4})/);
    e.target.value = !x[2] ? x[1] : `(${x[1]}) ${x[2]}${x[3] ? '-' + x[3] : ''}`;
    setPhone(e.target.value);
  };

  return (
    <div>
      <h1>Cadastro de Motoristas</h1>
      <input
        type="text"
        placeholder="Nome do Motorista"
        value={driver}
        onChange={(e) => setDriver(e.target.value)}
      />
      <input
        type="text"
        placeholder="Telefone"
        value={phone}
        onChange={handlePhoneInput}
      />
      <input
        type="text"
        placeholder="Frotista (Proprietário)"
        value={owner}
        onChange={(e) => setOwner(e.target.value)}
      />
      <div className="button-container">
        <button onClick={handleAddOrEditDriver}>
          {editIndex !== null ? 'Editar' : 'Adicionar'}
        </button>
        <button onClick={() => navigate('/motoristas')}>Ver Lista</button>
      </div>
    </div>
  );
};

export default Planilha;
