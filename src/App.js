import TodoFeature from 'features/Todo';
import React, { useEffect } from 'react';
import './App.css';
import { Routes, Route, NavLink } from 'react-router-dom';
import Song from './features/Song';
import ListPage from './features/Todo/pages/ListPage';
import DetailPage from './features/Todo/pages/DetailPage';
import NotFound from './Components/NotFound';
import Home from './Components/Home';
import productAPI from 'api/productAPI';
import Counter from 'features/Counter';
import Header from 'Components/Header';

function App() {
    useEffect(() => {
        const fetchProducts = async () => {
            const param = {
                _limit: 10,
            };
            const productList = await productAPI.getAll(param);
            console.log(productList);
        };
        fetchProducts();
    }, []);

    return (
        <div className="app">
            <Header />

            <nav>
                <NavLink to="/todos">Todo App</NavLink>
                <br />
                <NavLink to="/song">Song</NavLink>
                <br />
                <NavLink to="/counter">Counter</NavLink>
            </nav>
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/counter" element={<Counter />}></Route>
                <Route path="/todos" element={<TodoFeature />}>
                    <Route path="detailpage" element={<DetailPage />}></Route>
                    <Route path="listpage" element={<ListPage />}></Route>
                </Route>
                <Route path="/song" element={<Song />}></Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
        </div>
    );
}

export default App;
