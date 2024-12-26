import { createClient } from "../../lib/supaBase/server";
import { getUserIdFromSupabase } from "../../lib/getUserIdFromSupabase";
interface Product {
  id: number;
  title_en: string;
  description_en: string;
  price: number;
  image: string;
}

const CartPage = async ({ params }: { params: { lang: string } }) => {
  const userId = await getUserIdFromSupabase();

  if (!userId) {
    return <div>Please log in to view your cart.</div>;
  }

  const client = createClient();

  const { data: cartData, error: cartError } = await (await client)
    .from("cart")
    .select("product_list")
    .eq("user_id", userId)
    .single();

  if (cartError || !cartData) {
    return <div>Your cart is empty.</div>;
  }

  const productList = cartData.product_list;

  const uniqueProductIds = Array.from(new Set(productList)); 

  const { data: productData, error: productError } = await (await client)
    .from("products")
    .select("id, title_en, description_en, price, image")
    .in("id", uniqueProductIds); 

  if (productError || !productData) {
    return <div>Error fetching product data.</div>;
  }

  const productMap = productData.reduce((acc: { [key: number]: any }, product) => {
    const quantity = productList.filter((id) => id === product.id).length;
    acc[product.id] = { ...product, quantity };
    return acc;
  }, {});

  const groupedProducts = Object.values(productMap);

  const totalPrice = groupedProducts.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );

  return (
    <div className="cart-page p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Your Cart</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {groupedProducts.length === 0 ? (
          <p>No products in the cart.</p>
        ) : (
          groupedProducts.map((product) => (
            <div
              key={product.id}
              className="cart-item bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 flex flex-col items-center p-4"
            >
              <img
                src={product.image}
                alt={product.title_en}
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <h3 className="text-lg font-semibold text-gray-800">{product.title_en}</h3>
              <p className="text-sm text-gray-600 mt-2">{product.description_en}</p>
              <p className="text-lg font-bold text-green-600 mt-4">
                {product.price} ₾ x {product.quantity}
              </p>
              <p className="text-lg font-semibold text-gray-800 mt-2">
                Subtotal: {product.price * product.quantity} ₾
              </p>
            </div>
          ))
        )}
      </div>

      <div className="mt-8 text-lg font-semibold text-center">
        <h3>Total: {totalPrice} ₾</h3>
      </div>
    </div>
  );
};

export default CartPage;
