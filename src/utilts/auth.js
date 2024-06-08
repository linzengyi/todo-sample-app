const url = import.meta.env.VITE_API_URL;//"http://127.0.0.1:3000/api";

export const authLogin = async (account, password) => {
    
    const response = await fetch(`${url}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            account,
            password,
        })
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message);
    }

    const { accessToken, refreshToken } = data;

    localStorage.setItem("todoSample", JSON.stringify({ accessToken, refreshToken }));
   
};

export const authLogout = async (mode) => {
    if (mode){
        throw new Error('登出失敗');
    }
    
    const todoSample = localStorage.getItem('todoSample');

    if (todoSample) {
        const {accessToken} = JSON.parse(todoSample);

        const response = await fetch(`${url}/auth/logout`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message);
        }

        return true;
    }
};

export const authRefresh = async () => {
    let storageData = localStorage.getItem('todoSample');

    if (storageData) {
        const { refreshToken: refToken } = JSON.parse(storageData);

        const response = await fetch(`${url}/auth/token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${refToken}`
            }
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(`reAuth ${data.message}`);
        }

        const { accessToken, refreshToken } = data;

        storageData = JSON.parse(storageData);
        
        localStorage.setItem("todoSample", JSON.stringify({ ...storageData, accessToken, refreshToken }));

        return true;
    }
}