import React from "react";
import Header from "../components/Header";
import Search from "../components/Search";
import List from "../components/List";


export default function Home({ swiper, movie }) {
  return (
    <>
     <Header></Header>
     <Search></Search>
     <List></List>
    </>
  );
}

// export async function getStaticProps() {
//   let { data: swiper } = await loadSwiper();
//   let {data: movie} = await loadMovie()

//   return {
//     props: {
//       swiper,
//       movie,
//     },
//   };
// }
