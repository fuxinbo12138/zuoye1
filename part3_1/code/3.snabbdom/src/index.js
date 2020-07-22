import { h, init } from "snabbdom";
//导入模块
import style from "snabbdom/modules/style";
import eventlisteners from "snabbdom/modules/eventlisteners";

//导入css
import "./main.css";

//创建patch函数，注册style，eventlisteners模块
let patch = init([style, eventlisteners]);

//获取占位模块
let app = document.querySelector("#app");

//设置初始数据
let vnode = null;
var nextKey = 11;
var margin = 8;
var sortBy = "rank";
var totalHeight = 0;
let data = [
  {
    rank: 1,
    title: "The Shawshank Redemption",
    desc:
      "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    elmHeight: 0,
  },
  {
    rank: 2,
    title: "The Godfather",
    desc:
      "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
    elmHeight: 0,
  },
  {
    rank: 3,
    title: "The Godfather: Part II",
    desc:
      "The early life and career of Vito Corleone in 1920s New York is portrayed while his son, Michael, expands and tightens his grip on his crime syndicate stretching from Lake Tahoe, Nevada to pre-revolution 1958 Cuba.",
    elmHeight: 0,
  },
  {
    rank: 4,
    title: "The Dark Knight",
    desc:
      "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, the caped crusader must come to terms with one of the greatest psychological tests of his ability to fight injustice.",
    elmHeight: 0,
  },
  {
    rank: 5,
    title: "Pulp Fiction",
    desc:
      "The lives of two mob hit men, a boxer, a gangster's wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
    elmHeight: 0,
  },
  {
    rank: 6,
    title: "Schindler's List",
    desc:
      "In Poland during World War II, Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution by the Nazis.",
    elmHeight: 0,
  },
  {
    rank: 7,
    title: "12 Angry Men",
    desc:
      "A dissenting juror in a murder trial slowly manages to convince the others that the case is not as obviously clear as it seemed in court.",
    elmHeight: 0,
  },
  {
    rank: 8,
    title: "The Good, the Bad and the Ugly",
    desc:
      "A bounty hunting scam joins two men in an uneasy alliance against a third in a race to find a fortune in gold buried in a remote cemetery.",
    elmHeight: 0,
  },
  {
    rank: 9,
    title: "The Lord of the Rings: The Return of the King",
    desc:
      "Gandalf and Aragorn lead the World of Men against Sauron's army to draw his gaze from Frodo and Sam as they approach Mount Doom with the One Ring.",
    elmHeight: 0,
  },
  {
    rank: 10,
    title: "Fight Club",
    desc:
      "An insomniac office worker looking for a way to change his life crosses paths with a devil-may-care soap maker and they form an underground fight club that evolves into something much, much more...",
    elmHeight: 0,
  },
];

//创建外层layout
function createlayout() {
  return h("div", [
    h("h1", "Top 10 movies"),
    h("div", [
      h("a.btn.add", { on: { click: add } }, "Add"),
      "Sort by: ",
      h("span.btn-group", [
        h(
          "a.btn.rank",
          {
            class: { active: sortBy === "rank" },
            on: { click: [changeSort, "rank"] },
          },
          "Rank"
        ),
        h(
          "a.btn.title",
          {
            class: { active: sortBy === "title" },
            on: { click: [changeSort, "title"] },
          },
          "Title"
        ),
        h(
          "a.btn.desc",
          {
            class: { active: sortBy === "desc" },
            on: { click: [changeSort, "desc"] },
          },
          "Description"
        ),
      ]),
    ]),
    h(
      "div#box.list",
      { style: { height: totalHeight + "px" } },
      data.map(movieView) //调用map函数返回一个vnode数组
    ),
  ]);
}

//创建条目
function movieView(movie) {
  return h(
    "div.row",
    {
      key: movie.rank,
      style: {
        opacity: "0",
        transform: "translate(-200px)",
        delayed: { opacity: "1", transform: `translateY(${movie.offset}px)` },
        remove: {
          opacity: "0",
          transform: `translateY(${movie.offset}px) translateX(200px)`,
        },
      },
      hook: { //钩子函数
        insert: (vnode) => { //追加到队列，在patch函数末尾调用所有的insert函数
          movie.elmHeight = vnode.elm.offsetHeight;
        },
      },
    },
    [
      h("div", { style: { fontWeight: "bold" } }, movie.rank),
      h("div", movie.title),
      h("div", movie.desc),
      h("div.btn.rm-btn", { on: { click: [remove, movie] } }, "x"),
    ]
  );
}

//渲染方法
function render() {
  data = data.reduce((acc, m) => { //给每一个条目设置据顶部高度
    var last = acc[acc.length - 1];
    m.offset = last ? last.offset + last.elmHeight + margin : margin;
    return acc.concat(m);
  }, []);
  totalHeight = data[data.length - 1].offset + data[data.length - 1].elmHeight; //计算总宽度
  vnode = patch(vnode, createlayout(data));
}

//调用patch比较展位dom创建外层dom
vnode = patch(app, createlayout());
render()

//add方法
function add() { //push一个新
  nextKey++  //修改可一个rank值
  data.push({
    rank: nextKey,
    title: "Fight Club",
    desc:
      "An insomniac office worker looking for a way to change his life crosses paths with a devil-may-care soap maker and they form an underground fight club that evolves into something much, much more...",
    elmHeight: 0,
  });
  render()
}

//移除方法
function remove(movie) {
  data.splice(data.indexOf(movie), 1); //找到下标删除其中一个
  render()
}

//排序
function changeSort(prop) {
  sortBy = prop;
  data.sort((a, b) => { //根据不同类型排序
    if (a[prop] > b[prop]) {
      return 1;
    }
    if (a[prop] < b[prop]) {
      return -1;
    }
    return 0;
  });
  render()
}
