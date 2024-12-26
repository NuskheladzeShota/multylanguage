import React from "react";
import { fetchProducts, Product } from "./fetchProducts";
import { ProductList } from "./ProductList";

interface ProductsProps {
  params: { locale: string };
}

export default async function Products({
  params,
}: ProductsProps): Promise<JSX.Element> {
  const productList: Product[] = await fetchProducts();
  const { locale } = params;
  // const productTitle = locale === "ka" ? "პროდუქტები" : "Item shop";
  return (
    <div className="container dark:text-white">
      {/* <button>buy</button> */}
      {/* <h2 style={{ textAlign: "center" }} className="margin-top-20px">
        {productTitle}
      </h2> */}
      <div style={{ display: "flex", justifyContent: "space-between" }}></div>
      <ProductList productList={productList} locale={locale} />
    </div>
  );
}

// "use client";
// import Header from "../../components/header/Header";
// import Footer from "../../components/footer/Footer";
// import { LoadingGear } from "../../components/profile/loading-gear";
// import { getSession } from "@auth0/nextjs-auth0";

// import { UserProfile } from "../../components/profile/user-profile";
// import "./index.css";
// import { useState, useEffect } from "react";
// import { useTokens } from "../../hooks/useTokens";

// export default function Profile() {
// async function fetchUser() {
//   const { user } = await getSession();

//   return user;
// }
// fetchUser();

// const [user, setUser] = useState(null);
// const { accessToken, refreshtoken } = useTokens();

// useEffect(() => {
//   const token = accessToken;
//   async function fetchUser() {
//     try {
//       const response = await fetch("https://dummyjson.com/user/me", {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       if (response.ok) {
//         const data = await response.json();
//         setUser(data);
//       }
//     } catch (error) {
//       console.error("Something went wrong: ", error);
//     }
//   }
//   fetchUser();
// }, [accessToken, refreshtoken]);

// return (
//   <div className="page-wrapper">
// {/* <Header />
//   <div className="default-layout">
//     {user ? (
//       <>
//         <UserProfile user={user} />
//         <Footer />
//       </>
//     ) : (
//       <LoadingGear />
//     )}
//   </div> */}
// // </div>
//   );
// }
