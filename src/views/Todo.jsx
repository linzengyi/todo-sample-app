import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

import TodoItem from "../components/Todo/TodoItem.jsx";

import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { getTodo, addTodo } from "../utilts/todo.js";
import { authRefresh } from '../utilts/auth.js';

export default function Todo() {
  const [todos, setTodos] = useState([]);
  const [todoTitle, setTodoTitle] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const [page, setPage] = useState(1);
  const limit = 15;

  const [pages, setPages] = useState(1);

  const navigate =  useNavigate();

  async function loadData(todoId = -1) {
    try {
      const todoData = await getTodo(page);
      const rowsTotal = parseInt(todoData.rowsTotal, 10);
      setPages(Math.floor(rowsTotal / limit) + ((rowsTotal % limit) > 0 ? 1 : 0));
      
      let todoList = todoData.rows;
      todoList = todoList.map((todo) => {
        return {
          ...todo,
          isEdit: todo.id !== todoId? false : true
        }
      });

      setTodos(todoList);
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
        loadData(todoId);
      }
    }
    setIsLoading(false);
  }

  function submitHandler(e) {
    e.preventDefault();
    e.stopPropagation();

    (async () => {
      try {
        setIsLoading(true);
        await addTodo(todoTitle);
        setTodoTitle("");
        setIsLoading(false);

        setPage(1);

        await loadData();
      } catch (error) {
        if (error.message === 'token不存在') {
          alert(error.message);
          navigate('/login');
        } else if (error.message === 'jwt expired') {
          await authRefresh();
          
          await addTodo(todoTitle);
          setTodoTitle("");
          setIsLoading(false);

          setPage(1);

          await loadData();
        }
      }
    })();
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    loadData();
  }, []);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    loadData();
  }, [page]);

  

  return (
    <>
      <Container sx={{ height: "100%", paddingTop: "25px" }}>
        <Box component="div" className="w-full h-12 bg-gray-200">
          <h1 className="p-2 font-bold text-2xl text-gray-600">
            Todo List Sample
          </h1>
        </Box>
        <Box
          component="div"
          sx={{ height: '80%', overflow: 'auto'}}
          className="bg-white border border-slate-400 shadow-md"
        >
          <form className="p-0">
            <div className="flex px-2 pb-0 py-3 justify-center">
              <TextField
                label="待辦內容"
                variant="standard"
                value={todoTitle}
                margin="dense"
                onChange={(e) => setTodoTitle(e.target.value)}
                sx={{ marginRight: "10px" }}
                className="shrink basis-4/5"
              />
              <Button
                variant="contained"
                onClick={submitHandler}
                sx={{ marginTop: "10px", marginBottom: "10px" }}
              >
                新增
              </Button>
            </div>
          </form>
          {/* 列表顯示 */}
          <Table size="small">
            <TableBody>
              {!isLoading ? (
                Array.isArray(todos) &&
                todos.map((todo) => (
                  <>
                    <TodoItem
                      key={todo.id}
                      todo={todo}
                      action={{ loadData, setTodos, setIsLoading }}
                    />
                  </>
                ))
              ) : (
                <>
                  <TableRow key={-1}>
                    <TableCell
                      sx={{
                        textAlign: "center",
                        fontWeight: 700,
                        fontSize: "1.5rem",
                        lineHeight: "2rem",
                      }}
                    >
                      Loading....
                    </TableCell>
                  </TableRow>
                </>
              )}
            </TableBody>
          </Table>
        </Box>
        <Stack direction="row" justifyContent="center" className="py-2">
          <Pagination
            count={pages}
            page={page}
            shape="rounded"
            onChange={handlePageChange}
          />
        </Stack>
      </Container>
    </>
  );
}
