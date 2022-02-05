import { reactLocalStorage } from 'reactjs-localstorage';


const getUserName = (() => {

    const user = reactLocalStorage.getObject("user")
    return user.name
})

export default getUserName