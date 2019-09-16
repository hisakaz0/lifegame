
// import { DEAD, ALIVE } from './common';
// import createNumArray from './helper';
// import { } from './proto';
// 
// const DEAD_CLASS = 'dead';
// 
// const createEle = (name) => document.createElement(name);
// const getBoardEle = () => document.getElementById('board');
// const isDeadEle = (ele) => ele.classList.contains(DEAD_CLASS);
// const isAliveEle = (ele) => !isDeadEle(ele);
// 
// const setStateEle = (ele, state) => ((state === DEAD)
//   ? ele.addClass(DEAD_CLASS)
//   : ele.removeClass(DEAD_CLASS));
// 
// const setState = ({ x, y, state }) => getBoardEle().children[x].children[y]
//   |> ((ele) => setStateEle(ele, state));
// const getState = ({ x, y }) => getBoardEle().children[x].children[y]
//   |> ((ele) => (isDeadEle(ele) ? DEAD : ALIVE));
// const createBoard = ({ x, y }) => createNumArray(y)
//   .map(() => createEle('div').addClass('row'))
//   .map((row) => createNumArray(x)
//     .map(() => createEle('div').addClass('blk'))
//     .map((blk) => row.appendChild(blk))
//     .let(() => row)).map((row) => getBoardEle().appendChild(row));
// 
// const getAroundEles = ({ x, y }) => {
//   const size = getBoardEle().children
//   |> Array.from
//   |> ((rowArr) => ({
//     x: rowArr[0].children
//     |> Array.from
//     |> ((colArr) => colArr.length),
//     y: rowArr.length,
//   }));
//   const xArr = [
//     x === 0 ? size.x - 1 : x - 1,
//     x,
//     x === size.x - 1 ? 0 : x + 1,
//   ];
//   const yArr = [
//     y === 0 ? size.y - 1 : y - 1,
//     y,
//     y === size.y - 1 ? 0 : y + 1,
//   ];
//   return xArr.map((x) => yArr.map((y) => [x, y]))
//     .flat()
//     .filter(([xi, yi]) => x !== xi || y !== yi)
//     .map(([x, y]) => getState({ x, y }));
// };
// 
// const getCountOfAlive = () => getBoardEle().children
//   |> Array.from
//   |> ((rowArr) => rowArr
//     .map((row) => row.children
//       |> Array.from
//       |> ((row) => row.map((blk) => isAliveEle(blk))))
//     .flat()
//     .filter((v) => v === ALIVE)
//     .length
//   );
// const getBoardState = () => getBoardEle().children
//   |> Array.from
//   |> ((rowArr) => rowArr
//     .map((row, rowIdx) => row.children
//       |> Array.from
//       |> ((colArr) => colArr
//         .map((blk, colIdx) => (
//           {
//             x: colIdx,
//             y: rowIdx,
//           }
//         ))
//         .map((pos) => (
//           {
//             ...pos,
//             state: getState(pos),
//           }
//         ))
//       ))
//     .flat()
//   );
// 
// export {
//   createEle, getBoardEle, isDeadEle, setStateEle,
//   createBoard, getCountOfAlive, setState, isAliveEle,
//   getState, getBoardState, getAroundEles, resultList,
// };
