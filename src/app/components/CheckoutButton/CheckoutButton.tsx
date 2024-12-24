"use client";

import React, { useState, useEffect } from "react";
import { createCheckoutSession } from "../../actions/stripe";

interface ProductPurchaseProps {
  productId: string; 
}

export default function ProductPurchase({ productId }: ProductPurchaseProps) {
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        console.log("Fetching product details for productId:", productId); 
  
        const response = await fetch(`/api/get-product-details?productId=${productId}`);
  
        console.log("API Response Status:", response.status); 
  
        if (!response.ok) {
          throw new Error(`Failed to fetch product details. Status: ${response.status}`);
        }
  
        const data = await response.json();
        console.log("Product details received:", data); 
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product details:", error); 
      }
    };
  
    fetchProductDetails();
  }, [productId]);
  

  const handlePurchase = async () => {
    setLoading(true);
    try {
      if (!product) throw new Error("Product details are not loaded yet.");

      const formData = new FormData();
      formData.set("uiMode", "hosted");
      formData.set("customDonation", String(product.priceInCents)); 

      const { url } = await createCheckoutSession(formData);
      if (url) {
        window.location.href = url; 
      } else {
        throw new Error("No URL returned from the server action.");
      }
    } catch (error) {
      console.error("Error creating checkout session:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 border rounded-lg text-center">
      {product ? (
        <>
          <button
            onClick={handlePurchase}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? "Processing..." : "Buy Now"}
          </button>
        </>
      ) : (
        <button  className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700"> Loading....</button>
      )}
    </div>
  );
}
