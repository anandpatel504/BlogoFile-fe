import { reactLocalStorage } from 'reactjs-localstorage';


const getUserName = (() => {

    const user = reactLocalStorage.getObject("user")
    console.log(user, "user....");
    return user.name
})

export default getUserName