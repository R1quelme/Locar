import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import Logo from '../../assets/logo.svg';
import { api }from "../../services/api"
import { CarDTO } from '../../dtos/CarDTO'

import { Car } from '../../components/Car';

import {
    Container,
    Header,
    HeaderContent,
    TotalCars,
    CarList
} from './styles';

export function Home(){
    const [cars, setCars] = useState<CarDTO[]>([])
    const [loading, setLoading] =useState(true)
    interface NavigationProps {
        navigate: (screen: string) => void;
    }

    const navigation = useNavigation<NavigationProps>();

    const carData = {
        brand: 'Audi',
        name: 'R$ 5 COUPÉ',
        rent: {
            period: 'AO DIA',
            price: 120,
        },
        thumbnail: 'https://cdn.picpng.com/audi/audi-face-28582.png'
    }

    function handleCarDetails(){
        navigation.navigate('CarDetails')
    }

    useEffect(() => {
        async function fetchCars(){
            try {
                const response = await api.get('/cars') 
                setCars(response.data)
            } catch (error) {
                console.log(error)
            } finally{
                setLoading(false)
            }
        }

        fetchCars();
    }, []);

    return (
        <Container>
            <StatusBar 
                barStyle="light-content"
                backgroundColor="transparent"
                translucent
            />
            <Header>
                <HeaderContent>
                    <Logo 
                        width={RFValue(108)}
                        height={RFValue(12)}
                    />
                    <TotalCars>
                        Total de 12 carros
                    </TotalCars>
                </HeaderContent>
            </Header>

            <CarList 
                data={cars}
                keyExtractor={item => String(item)}
                renderItem={({ item }) => 
                    <Car 
                        data={carData} 
                        onPress={handleCarDetails} 
                    />
                }
            />
        </Container>
    )
}