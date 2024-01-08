import axios from 'axios'

export async function loginCall(userCredentials, dispatch) {
    dispatch({ type: "LOGIN_START" })
    try {
        const res = await axios.post("http://localhost:8000/auth/login", userCredentials);
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    } catch (error) {
        dispatch({ type: "LOGIN_FAIL", payload: error });
    }
}