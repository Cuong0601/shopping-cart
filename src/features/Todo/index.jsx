import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

function TodoFeature(props) {
  return (
    <div>
      <h1>Đây là ứng dụng todo apps</h1>
      <NavLink to="/todos/detailpage">Detailpage todo</NavLink>
      <br />
      <NavLink to="/todos/listpage">Listpage todo</NavLink>
      <Outlet />
    </div>
  );
}

export default TodoFeature;
