import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Container } from '../../components/globalComponents/globalComponents'
import { Input } from '../../components/Input/Input'


function Dashboard() {

    const [name, setName] = useState('')

    const currentUser = useSelector(state => state.auth.user)

    useEffect(() => {
        setName(currentUser.name)
    }, [currentUser.name])

    return (
        <Container>
            <Input 
                value={name}
                setValue={e => setName(e)}
                placeholder="Name"
                placeholderTextColor="#000"
                editable={false}
            />
        </Container>
    )
}

export default Dashboard