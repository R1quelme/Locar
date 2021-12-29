import React, {useState} from "react";
import { TextInputProps } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useTheme } from 'styled-components'
import { BorderlessButton } from 'react-native-gesture-handler';

import {
    Container,
    IconContainer,
    InputText,
} from './styles';

interface Props extends TextInputProps {
    iconName: React.ComponentProps<typeof Feather>['name']
    value?: string
}

export function PasswordInput({
    iconName,
    value,
    ...rest
} : Props){
    const [isPasswordVisible, setIsPasswordVisible] = useState(true)
    const [isFocused, setIsFocused] = useState(false)
    const [isFilled, setIsFilled] = useState(false)

    const theme = useTheme()

    function handleInputFocus() {
        setIsFocused(true)
    }

    function handleInputBlur() {
        setIsFocused(false)
        setIsFilled(!!value) //dessa maneira é melhor do que com o if
        // if(value?.length > 0){
        //     setIsFilled(true)
        // } else {
        //     setIsFilled(false)
        // }
    }

    function handlePasswordVisibilityChange(){
        setIsPasswordVisible(prevState => !prevState) //Pega o estado que já existe e inverte ele
    }

    return (
        <Container>
            <IconContainer isFocused={isFocused}>
                <Feather 
                    name={iconName}
                    size={24}
                    color={(isFocused  || isFilled) ? theme.colors.main : theme.colors.text_detail}
                />
            </IconContainer>

            <InputText 
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                isFocused={isFocused}
                secureTextEntry={isPasswordVisible}
                {...rest}
            />

            <BorderlessButton onPress={handlePasswordVisibilityChange}>
                <IconContainer isFocused={isFocused}>
                    <Feather 
                        name= {isPasswordVisible ? 'eye' : 'eye-off'}
                        size={24}
                        color={theme.colors.text_detail}
                    />
                </IconContainer>
            </BorderlessButton>
        </Container>
    )
} 