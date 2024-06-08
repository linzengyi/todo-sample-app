const url = import.meta.env.VITE_API_URL;//"http://127.0.0.1:3000/api";

export const userRegister = async (registerData) => {

    const response = await fetch(`${url}/users/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(registerData)
    });

    if (!response.ok) {
        throw new Error("Network response was not ok");
    }

    return true;
};

export const getUserInfo = async () => {
    const todoSample = localStorage.getItem("todoSample");

    if (todoSample) {
      const { accessToken } = JSON.parse(todoSample);

      const response = await fetch(`${url}/users/info`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      
      console.log('userInfo', data);

      let storageData = localStorage.getItem('todoSample');

      if (storageData) {
        storageData = JSON.parse(storageData);
      }
      localStorage.setItem('todoSample', JSON.stringify({ userInfo: { id: data.id, name: data.name }, ...storageData }));

    }

};