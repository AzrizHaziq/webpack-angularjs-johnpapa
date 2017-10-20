AuthService.$inject = []

export default function AuthService() {

    const state = {
        is_login : false
    }

    const isLogin = () => state.is_login

    const userAuthenticate = () => state.is_login = true

    const userUnAuthenticate = () => state.is_login = false

    return {
        shareableState : state,
        isLogin,
        userAuthenticate,
        userUnAuthenticate
    }

}
