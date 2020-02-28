import request from "superagent";

export const getTodos = () => request.get(`https://infinite-caverns-73784.herokuapp.com/api/todos`);