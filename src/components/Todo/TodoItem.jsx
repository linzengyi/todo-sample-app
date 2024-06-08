/* eslint-disable react/prop-types */
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import DeleteSharpIcon from "@mui/icons-material/DeleteSharp";
import EditSharpIcon from "@mui/icons-material/EditSharp";
import TaskAltSharpIcon from "@mui/icons-material/TaskAltSharp";
import CancelSharpIcon from "@mui/icons-material/CancelSharp";
import SaveSharpIcon from "@mui/icons-material/SaveSharp";
import TextField from "@mui/material/TextField";
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Action } from "../../utilts/utilts";

import { updateTodo, deleteTodo } from "../../utilts/todo.js";
import { authRefresh } from "../../utilts/auth.js";


export default function TodoItem({ todo, action }) {
  
  const [newTodoTitle, setNewTodoTitle] = useState(todo.title);
  const navigate = useNavigate();

 
  const toggleHandler = async (type, todo) => {    
    try {
      if (type === Action.EDIT_TOGGLE) {
        if (newTodoTitle !== todo.title) {
          setNewTodoTitle(todo.title);
        }
  
        await action.loadData(!todo.isEdit ? todo.id : -1);
      } else if (type === Action.COMPLETE_TOGGLE) {
        action.setIsLoading(true);
        await updateTodo(todo.id, { is_completed: !todo.is_completed });
        await action.loadData();
      }
    } catch (error) {
      if (error.message === 'token不存在') {
        alert(error.message);
        navigate('/login');
      } else if (error.message === 'jwt expired') {
        try {
          await authRefresh();
        } catch (error) {
          console.log('authRefresh error: ',error.message);
          if (error.message === 'reAuth jwt expired') {
            localStorage.removeItem('todoSample');
            navigate('/login');
          }
        }
        
        if (type === Action.COMPLETE_TOGGLE) {
          await updateTodo(todo.id, { is_completed: !todo.is_completed });
          await action.loadData();
        }
      }
    }
  };

  const deleteHandler = async () => {
    try {
      await deleteTodo(todo.id);
      action.setIsLoading(true);
      await action.loadData();
    } catch (error) {
      if (error.message === 'token不存在') {
        alert(error.message);
        navigate('/login');
      } else if (error.message === 'jwt expired') {
        try {
          await authRefresh();
        } catch (error) {
          console.log('authRefresh error: ',error.message);
          if (error.message === 'reAuth jwt expired') {
            localStorage.removeItem('todoSample');
            navigate('/login');
          }
        }
        await deleteTodo(todo.id);
        action.setIsLoading(true);
        await action.loadData();
      }
    }
  };

  const saveHandler = async () => {
    try {
      await updateTodo(todo.id, { title: newTodoTitle });
      setNewTodoTitle('');
      action.setIsLoading(true);
      await action.loadData();
    } catch (error) {
      if (error.message === 'token不存在') {
        alert(error.message);
        navigate('/login');
      } else if (error.message === 'jwt expired') {
        try {
          await authRefresh();
        } catch (error) {
          console.log('authRefresh error: ',error.message);
          if (error.message === 'reAuth jwt expired') {
            localStorage.removeItem('todoSample');
            navigate('/login');
          }
        }
        await updateTodo(todo.id, { title: newTodoTitle });
        setNewTodoTitle("");
        action.setIsLoading(true);
        await action.loadData();
      }
    }
  };

  return (
    <TableRow key={todo.id} className="hover:bg-sky-200">
      <TableCell>
        <Grid container columnSpacing={1}>
          <Grid item xs={8}>
            {!todo.isEdit ? (
              <p
                className={
                  todo.is_completed
                    ? "text-lg h-fit pl-2 isCompleted"
                    : "text-lg h-fit pl-2"
                }
              >
                {todo.title}
              </p>
            ) : (
              <TextField
                fullWidth
                variant="standard"
                value={newTodoTitle}
                onChange={(e) => setNewTodoTitle(e.target.value)}
              />
            )}
          </Grid>
          <Grid item xs={4}>
            {!todo.isEdit && (
              <Button
                style={{ marginLeft: "10px" }}
                variant="outlined"
                startIcon={
                  !todo.is_completed ? (
                    <TaskAltSharpIcon />
                  ) : (
                    <CancelSharpIcon />
                  )
                }
                size="small"
                color="success"
                onClick={async () => {
                  try {
                    await toggleHandler(Action.COMPLETE_TOGGLE, todo);
                  } catch (error) {
                    alert(error.message);
                  }
                }}
              >
                {todo.is_completed ? "取消" : "完成"}
              </Button>
            )}
            <Button
              style={{ marginLeft: "10px" }}
              variant="outlined"
              size="small"
              startIcon={!todo.isEdit ? <EditSharpIcon /> : <CancelSharpIcon />}
              disabled={todo.is_completed}
              onClick={() => toggleHandler(Action.EDIT_TOGGLE, todo)}
            >
              {todo.isEdit ? "取消" : "編輯"}
            </Button>
            {todo.isEdit && (
              <Button
                style={{ marginLeft: "10px" }}
                variant="outlined"
                size="small"
                startIcon={<SaveSharpIcon />}
                onClick={() => saveHandler()}
              >
                儲存
              </Button>
            )}
            {!todo.isEdit && (
              <Button
                style={{ marginLeft: "10px" }}
                variant="outlined"
                size="small"
                color="error"
                startIcon={<DeleteSharpIcon />}
                onClick={() => deleteHandler()}
              >
                刪除
              </Button>
            )}
          </Grid>
        </Grid>
      </TableCell>
    </TableRow>
  );
}
