// import { Action } from "../utilts/utilts.js";

const url = `${import.meta.env.VITE_API_URL}/todos`//"http://127.0.0.1:3000/api/todos";


export const getTodo = async (page=1) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const storageData = localStorage.getItem('todoSample') || undefined;
    
    if (storageData) {

      const { accessToken } = JSON.parse(storageData);

      const response = await fetch(`${url}?page=${page}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      return { 
        rows: data.rows,
        rowsTotal: data.rowsTotal
      };
    } else {
      throw new Error('token不存在');
    }
  } catch (error) {
    throw error;
  }
};

export const addTodo = async (todoContent) => {
  try {
    const storageData = localStorage.getItem('todoSample') || undefined;
    
    if (storageData) {
      const { accessToken } = JSON.parse(storageData);

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({ title: todoContent }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      console.log("Add:", data);
    } else {
      throw new Error('token不存在');
    }
  } catch (error) {
    return Promise.reject(error);
  }
};

export const updateTodo = async (todoId, updateData) => {
  try {
    const storageData = localStorage.getItem('todoSample') || undefined;
    
    if (storageData) {
      const { accessToken } = JSON.parse(storageData);
      
      const response = await fetch(`${url}/${todoId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify(updateData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      console.log("Response data:", data);
    } else {
      throw new Error('token不存在');
    }

  } catch (error) {
    return Promise.reject(error);
  }
};

export const deleteTodo = async (todoId) => {
  try {
    const storageData = localStorage.getItem('todoSample') || undefined;
    
    if (storageData) {
      const { accessToken } = JSON.parse(storageData);
      
      const response = await fetch(`${url}/${todoId}`, {
        method: "DELETE",
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });

      if (!response.ok) {
        const data = await response.json();
        console.log("Response data:", data);
        throw new Error(data.message);
      }

      return true;
    } else {
      throw new Error('token不存在');
    }
  } catch (error) {
    return Promise.reject(error);
  }
};


