import TodoFeature from 'features/Todo';
import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Song from './features/Song';
import NotFound from './Components/NotFound';
import Home from './Components/Home';
import Counter from 'features/Counter';
import Header from 'Components/Header';
import ProductFeatures from 'features/Product';
import TodoListPage from './features/Todo/pages/ListPage';
import ProductListPage from 'features/Product/pages/ProductListPage';
import DetailPage from 'features/Product/pages/DetailPage';

function App() {
    return (
        <div className="app">
            <Header />
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/counter" element={<Counter />}></Route>
                <Route path="/todos" element={<TodoFeature />}>
                    <Route path="listpage" element={<TodoListPage />}></Route>
                </Route>
                <Route path="/song" element={<Song />}></Route>
                <Route path="/product" element={<ProductFeatures />}>
                    <Route path="listpage" element={<ProductListPage />}></Route>
                    <Route path=":productId" element={<DetailPage />}></Route>
                </Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
        </div>
    );
}

export default App;
