UserService.$inject = []

export default function UserService() {

    const state = {
        userInfo : null,
    }

    return {
        shareableState : state
    }
}
