import{r as n,j as e,L as p,B as t}from"./index-BOpix8-o.js";import{a as m,i as j,B as g}from"./validation-CSFyoy5d.js";const y=({id:s,title:a,onBoardUpdated:o})=>{const[c,l]=n.useState(!1),[i,x]=n.useState(a),u=h=>{x(h.target.value)},f=async()=>{if(!m.test(i)){t.error("Імʼя дошки може містити лише літери, цифри, пробіли, тире, крапки та нижні підкреслення.");return}try{await j.put(`/board/${s}`,{title:i}),l(!1),t.success("Назва дошки успішно змінена."),o&&o()}catch{t.error("Сталася помилка при редагуванні назви.")}},r=h=>{h.key==="Enter"&&f()},d=()=>{f()};return e.jsx(p,{to:`/board/${s}`,style:{textDecoration:"none"},children:e.jsxs("div",{className:"board-item",children:[e.jsx("h3",{onClick:h=>{h.preventDefault(),l(!0)},children:i}),e.jsx("div",{children:c?e.jsx("input",{type:"text",value:i,onChange:u,onKeyDown:r,onBlur:d,autoFocus:!0}):null})]})})},B=({onBoardCreated:s})=>{const[a,o]=n.useState(""),c=async()=>{if(a.trim()===""){t.error("Назва дошки не може бути порожньою.");return}if(!m.test(a)){t.error("Ім'я дошки може містити лише літери, цифри, пробіли, тире, крапки та нижні підкреслення.");return}try{await j.post("board",{title:a}),o(""),t.success("Дошку успішно створено."),s()}catch{t.error("Не вдалося створити дошку. Спробуйте ще раз.")}};return e.jsx("div",{className:"modal",children:e.jsxs("div",{className:"modal-content",children:[e.jsx("h3",{children:"Нова дошка"}),e.jsx("input",{type:"text",value:a,onChange:l=>o(l.target.value),placeholder:"Назва дошки"}),e.jsx("button",{onClick:c,children:"Додати"}),e.jsx("button",{onClick:()=>s(),children:"Закрити"})]})})},w=()=>{const[s,a]=n.useState([]),[o,c]=n.useState(!1),[l,i]=n.useState(!1),x=n.useRef(!0),u=async(r=!0)=>{i(!0);try{const d=await j.get("board");a(d.boards),r&&x.current&&(t.success("Дошки успішно завантажені!"),x.current=!1)}catch(d){d instanceof Error?t.error(`Помилка завантаження дошок: ${d.message}`):t.error("Невідома помилка")}finally{i(!1)}};n.useEffect(()=>{u(!0)},[]);const f=()=>{u(!1)};return e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"home-container",children:l?e.jsx("p",{children:"Завантаження..."}):Array.isArray(s)&&s.length>0?s.map(r=>e.jsx("div",{className:"board",children:e.jsx(y,{id:r.id,title:r.title,background:r.background,cards:r.cards,onBoardUpdated:f})},r.id)):e.jsx("p",{children:"Немає доступних дошок."})}),e.jsx(g,{onClick:()=>c(!0),children:"Додати нову дошку"}),o&&e.jsx(B,{onBoardCreated:()=>{c(!1),u()}})]})};export{w as default};
