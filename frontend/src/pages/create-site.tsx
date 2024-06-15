// pages/create-site.tsx
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Header from '../components/header'; 

import styled from 'styled-components';

type Sitio = {
  nombre: string;
  latitud: number;
  longitud: number;
  descripcion: string;
};

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormField = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
`;

const Button = styled.button`
  background-color: #0070f3;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 10px;

  &:disabled {
    background-color: #ccc;
  }
`;

const SiteList = styled.ul`
  margin-top: 20px;
  padding: 0;
  list-style: none;
`;

const SiteItem = styled.li`
  background: #fff;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 10px;
`;

const CreateSite: React.FC = () => {
  const [name, setName] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [sitios, setSitios] = useState<[number, Sitio][]>([]);
  const router = useRouter();

  useEffect(() => {
    async function fetchSitios() {
      try {
        const response = await fetch('/api/read-all-sitios');
        const data = await response.json();
        setSitios(data);
      } catch (error) {
        console.error('Error fetching sitios:', error);
      }
    }

    fetchSitios();
  }, []);

  const createSitio = async () => {
    try {
      setLoading(true);
      console.log('Creating site', { name, latitude, longitude, description });
      alert('Sitio creado exitosamente');

      setSitios([...sitios, [sitios.length + 1, { nombre: name, latitud: +latitude, longitud: +longitude, descripcion: description }]]);
      setName('');
      setLatitude('');
      setLongitude('');
      setDescription('');
    } catch (error) {
      console.error('Error creating site:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await createSitio();
  };

  return (
    <Container>
      <Header />
      <Title>Agregar un nuevo sitio</Title>
      <Form onSubmit={handleSubmit}>
        <FormField>
          <Label htmlFor="name">Nombre del sitio</Label>
          <Input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </FormField>
        <FormField>
          <Label htmlFor="latitude">Latitud</Label>
          <Input
            id="latitude"
            type="text"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
            required
          />
        </FormField>
        <FormField>
          <Label htmlFor="longitude">Longitud</Label>
          <Input
            id="longitude"
            type="text"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
            required
          />
        </FormField>
        <FormField>
          <Label htmlFor="description">Descripción</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </FormField>
        <Button type="submit" disabled={loading}>
          {loading ? 'Creando...' : 'Agregar sitio'}
        </Button>
      </Form>

      <Title>Sitios Creados</Title>
      <SiteList>
        {sitios.map(([id, sitio]) => (
          <SiteItem key={id}>
            <strong>Nombre:</strong> {sitio.nombre} <br />
            <strong>Latitud:</strong> {sitio.latitud} <br />
            <strong>Longitud:</strong> {sitio.longitud} <br />
            <strong>Descripción:</strong> {sitio.descripcion}
          </SiteItem>
        ))}
      </SiteList>
      
    </Container>
  );
};

export default CreateSite;
