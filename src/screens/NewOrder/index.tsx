import React, { useState } from 'react';
import {Alert} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import uuid from 'react-native-uuid';

import { Container, Header, Title, Form } from './styles';
import {getRealm} from '../../database/realm'

import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { TextArea } from '../../components/TextArea';
import { IconButton } from '../../components/IconButton';

export function NewOrder() {
  const [isLoading, setIsLoading] = useState(false);
  const [patrimony, setPatrimony] = useState('');
  const [equipment, setEquipment] = useState('');
  const [description, setDescription] = useState('');

  const navigation = useNavigation();

  function handleBack() {
    navigation.goBack();
  }

  async function handleNewOrderRegister() {
    const realm = await getRealm();
    try {
      setIsLoading(true);


      realm.write(() => {
        const created = realm.create('Order', {
          _id: uuid.v4(),
          patrimony,
          equipment,
          description,
          status: 'open', 
          created_at: new Date(), 
        });
        console.log('cadastrado', created); 
    }); 
    Alert.alert('Chamado', 'Chamado cadastrado com sucesso!');
    handleBack();
    } catch  {
    Alert.alert('Error', 'Não foi possível encerrar o chamado!');
    }
    finally{
      setIsLoading(false);
      realm.close();
    }
  }

  return (
    <Container>
      <Header>
        <Title>Novo chamado</Title>
        <IconButton icon="chevron-left" onPress={handleBack} />
      </Header>

      <Form>
        <Input
          placeholder="Número do Patrimônio"
          onChangeText={setPatrimony}
        />

        <Input
          placeholder="Equipamento"
          onChangeText={setEquipment}
        />

        <TextArea
          placeholder="Descrição"
          autoCorrect={false}
          onChangeText={setDescription}
        />
      </Form>

      <Button
        title="Enviar chamado"
        isLoading={isLoading}
        onPress={handleNewOrderRegister}
      />
    </Container>
  );
}