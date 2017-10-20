AuthService.$inject = []

export default function AuthService() {

    const state = {
        is_login : false,
        token : null,
    }

    const isLogin = () => state.is_login

    const makeUserAuthenticate = () => state.is_login = true

    const makeUserUnAuthenticate = () => state.is_login = false

    const setToken = (token) => state.token = token

    const setTokenNull = () => state.token = null

    return {
        shareableState : state,
        setToken,
        setTokenNull,
        isLogin,
        makeUserAuthenticate,
        makeUserUnAuthenticate
    }

}
