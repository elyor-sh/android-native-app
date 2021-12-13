import React from 'react'
import styled from 'styled-components/native'

const InputText = styled.TextInput`
    border: 1px solid #C4C4C4;
    padding: 3px 10px 4px;
`

export const Input = (
    {
        keyboardType = "default",
        value = "", setValue,
        placeholder = "",
        secureTextEntry = false,
        placeholderTextColor="#000",
        editable = true
    }) => {

    return (
        <InputText
            keyboardType={keyboardType}
            value={value}
            onChangeText={setValue}
            placeholder={placeholder}
            secureTextEntry={secureTextEntry}
            placeholderTextColor={placeholderTextColor}
            editable={editable}
        />
    )
}

// =======---------KEYDOARD TYPE-------------==========
// default
// number-pad
// decimal-pad
// numeric
// email-address
// phone-pad

// iOS Only
// The following values work on iOS only:

// ascii-capable
// numbers-and-punctuation
// url
// name-phone-pad
// twitter
// web-search

// Android Only
// The following values work on Android only:

// visible-password