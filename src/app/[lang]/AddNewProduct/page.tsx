import React from "react";
import Stripe from "stripe";
import {createClient} from "../../lib/supaBase/server";
import "./style.css";

let tagArray = ["", "", ""]; // Predefined empty tags for the UI

export default function AddNewProduct() {
  async function submitProduct(formData: FormData) {
    "use server";

    try {
      // Initialize Stripe
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
      const  supabase = await createClient();
      // Collect form data
      const title_en = formData.get("title_en") as string;
      const title_ge = formData.get("title_ge") as string;
      const description_en = formData.get("description_en") as string;
      const description_ge = formData.get("description_ge") as string;
      const gender = formData.get("gender") as string;
      const category = formData.get("category") as string;
      const price = formData.get("price") as string;
      const size = formData.get("size") as string;

      // Collect and filter tags
      const tags: string[] = [];
      for (let i = 0; i < tagArray.length; i++) {
        const tag = formData.get(`tag-${i}`) as string;
        if (tag?.trim()) tags.push(tag.trim()); // Add non-empty, trimmed tags
      }

      // Validate required fields
      if (!title_en || !title_ge || !price || !category || !size) {
        throw new Error("Please fill out all required fields.");
      }

      // Create a product in Stripe
      const product = await stripe.products.create({
        name: title_en,
        description: description_en,
        metadata: {
          title_ge,
          description_ge,
          gender,
          category,
          price,
          size,
          tags: tags.join(", "), // Save tags as a comma-separated string in metadata
        },
      });

      // Create a price for the product
      await stripe.prices.create({
        product: product.id,
        unit_amount: parseInt(price) * 100, // Convert price to cents
        currency: "usd",
      });

      console.log("Product created successfully:", {
        title_en,
        title_ge,
        description_en,
        description_ge,
        gender,
        category,
        price,
        size,
        tags,
      });
  const { data: productData, error: productError } = await supabase
        .from("products")
        .insert([
          {
            title_en,
            title_ge,
            description_en,
            description_ge,
            gender,
            category,
            price,
            size,
            tags,
            stripe_product_id: product.id
          }
        ]).single();

    } catch (error) {
      console.error("Error adding product:", error);
    }
  }

  return (
    <form action={submitProduct} className="addNewProduct-container">
      <div className="addNewProduct-Info">
        {/* Title Inputs */}
        <div
          style={{ borderBottom: "2px solid #98cddf", marginBottom: "20px" }}>
          <h3>ინფორმაცია</h3>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "20px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label style={{ marginBottom: "10px" }} htmlFor="title_en">
              Title
            </label>
            <input
              style={{ padding: "10px" }}
              id="title_en"
              placeholder="Title"
              type="text"
              name="title_en"
              required
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label style={{ marginBottom: "auto" }}>სათაური</label>
            <input
              style={{ padding: "10px" }}
              id="title_ge"
              name="title_ge"
              placeholder="სათაური"
              type="text"
              required
            />
          </div>
        </div>

        {/* Description Inputs */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "20px",
            marginTop: "20px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label style={{ marginBottom: "10px" }}>Description</label>
            <textarea
              style={{ height: "100px", padding: "10px" }}
              id="description_en"
              placeholder="Description"
              name="description_en"
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label style={{ marginBottom: "auto" }}>აღწერა</label>
            <textarea
              style={{ height: "100px", padding: "10px" }}
              id="description_ge"
              placeholder="აღწერა"
              name="description_ge"
              required
            />
          </div>
        </div>

        {/* Additional Inputs */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr 1fr",
            gap: "20px",
            marginTop: "20px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label style={{ marginBottom: "10px" }}>Gender</label>
            <select id="gender" style={{ padding: "10px" }} name="gender">
              <option value="woman">ქალი</option>
              <option value="man">კაცი</option>
              <option value="girl">გოგო</option>
              <option value="boy">ბიჭი</option>
            </select>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label style={{ marginBottom: "10px" }}>Category</label>
            <select id="category" style={{ padding: "10px" }} name="category">
              <option value="pants">შარვალი</option>
              <option value="jeans">ჯინსი</option>
              <option value="shorts">შორტები</option>
              <option value="coat">ქურთუკი</option>
            </select>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label style={{ marginBottom: "10px" }}>Size</label>
            <select id="size" style={{ padding: "10px" }} name="size">
              <option value="xs">XS</option>
              <option value="s">S</option>
              <option value="m">M</option>
              <option value="l">L</option>
            </select>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label style={{ marginBottom: "10px" }}>Price</label>
            <input
              id="price"
              name="price"
              style={{ padding: "10px" }}
              placeholder="Price"
              type="number"
              required
            />
          </div>
        </div>

        {/* Tags */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "20px",
          }}
        >
          <div
            style={{
              marginBottom: "10px",
              display: "flex",
              gap: "10px",
              alignItems: "center",
            }}
          >
            <label>Tags</label>
          </div>
          <div
            style={{
              boxSizing: "border-box",
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: "10px",
            }}
          >
            {tagArray.map((tag, index) => (
              <input
                key={index}
                style={{ padding: "10px" }}
                placeholder={`Tag ${index + 1}`}
                name={`tag-${index}`}
              />
            ))}
          </div>
        </div>
        <button
        style={{
          padding: "10px",
          marginTop: "20px",
          backgroundColor: "#0070f3",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
        }}
        type="submit">
        Add Product to Stripe
      </button>
      </div>

    </form>
  );
}
