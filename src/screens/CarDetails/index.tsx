import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Accessory } from '../../components/Accessory';
import { Button } from '../../components/Button';

import { getAccessoryIcon } from '../../utils/getAccessoryIcon';

import {
    Container,
    Header,
    CarImages,
    Content,
    Details,
    Description,
    Brand,
    Name,
    Rent,
    Period,
    Price,
    About,
    Accessorys,
    Footer
} from './styles';
import { CarDTO } from '../../dtos/CarDTO';

interface Params {
    car: CarDTO;
}

export function CarDetails(){
    const navigation = useNavigation();
    const route = useRoute(); 
    const { car } = route.params as Params

    function handleConfirmRental(){
        navigation.navigate('Scheduling', { car });
    }

    function handleBack(){
        navigation.goBack()
    }

    return (
        <Container>
            <Header>
                <BackButton onPress={handleBack}/>
            </Header>

            <CarImages>
                <ImageSlider 
                    imagesUrl={car.photos}
                />
            </CarImages>

            <Content>
                <Details>
                    <Description>
                        <Brand>{car.brand}</Brand>
                        <Name>{car.name}</Name>
                    </Description>

                    <Rent>
                        <Period>{car.rent.period}</Period>
                        <Price>R$ {car.rent.price}</Price>
                    </Rent>
                </Details>

                <Accessorys>
                    {
                        car.accessories.map(accessory => (
                            <Accessory
                                key={accessory.type}
                                name={accessory.name}
                                icon={getAccessoryIcon(accessory.type)}
                            />
                        ))
                    }
                </Accessorys>

                <About>{car.about}</About>
            </Content>

            <Footer>
                <Button title="Escolher período do aluguel" color="" onPress={handleConfirmRental}/>
            </Footer>
        </Container>
    )
}