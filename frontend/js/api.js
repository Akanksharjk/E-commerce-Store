const API_BASE_URL = 'http://localhost:3000/api'

const apiRequest = async (
    endpoint,
    method = 'GET',
    body = null,
    requiresAuth = false
) => {
    try {
        let headers = { 'Content-Type': 'application/json' }
        if (requiresAuth) {
            let token = localStorage.getItem('token')
            if (token) {
                headers['Authrization'] = `Bearer ${token}`
            }
        }

        let config = { method, headers }
        if (body) {
            config.body = JSON.stringify(body)
        }

        let response = await fetch(`${API_BASE_URL} ${endpoint}`, config)
        let data = await response.json()

        if (!response.ok) {
            throw new Error(data.message || 'Request faild')
        }

        return data
    } catch (error) {
        console.error('API Error:', error.message)
        throw error
    }
}