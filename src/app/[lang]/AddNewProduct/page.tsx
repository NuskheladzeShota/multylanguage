"use client";
import React, { useState } from "react";
import "./style.css";

let tagArray = ["", "", ""]; // Predefined empty tags for the UI

export default function AddNewProduct() {
  const [message, setMessage] = useState<string | null>(null); // State for the success or error message

  async function submitProduct(formData: FormData, formElement: HTMLFormElement) {
    try {
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
        if (tag?.trim()) tags.push(tag.trim());
      }

      // Validate required fields
      if (!title_en || !title_ge || !price || !category || !size) {
        throw new Error("Please fill out all required fields.");
      }

      const productData = {
        title_en,
        title_ge,
        description_en,
        description_ge,
        gender,
        category,
        price,
        size,
        tags,
      };

      // Send the product data to the API
      const response = await fetch("/api/addProduct", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        throw new Error(`Failed to add product: ${response.statusText}`);
      }

      const result = await response.json();
      console.log("Product added successfully:", result);

      // Clear the form inputs
      formElement.reset();

      // Set success message
      setMessage("Product added successfully!");
    } catch (error) {
      console.error("Error adding product:", error);
      // Set error message
      setMessage("Error adding product. Please try again.");
    }
  }

  // Handle form submission
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission
    const formData = new FormData(event.currentTarget); // Create FormData from the form
    submitProduct(formData, event.currentTarget); // Pass form element to clear inputs
  };

  return (
    <div className="addNewProduct-container">
      <form onSubmit={handleSubmit} className="addNewProduct-form">
        <div className="addNewProduct-Info">
          <div style={{ borderBottom: "2px solid #98cddf", marginBottom: "20px" }}>
            <h3>ინფორმაცია</h3>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label style={{ marginBottom: "10px" }} htmlFor="title_en">Title</label>
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
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginTop: "20px" }}>
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
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "20px", marginTop: "20px" }}>
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
          <div style={{ display: "flex", flexDirection: "column", marginTop: "20px" }}>
            <div style={{ marginBottom: "10px", display: "flex", gap: "10px", alignItems: "center" }}>
              <label>Tags</label>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px" }}>
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
            type="submit"
          >
            Add Product to Stripe
          </button>
        </div>
      </form>

      {/* Display success or error message */}
      {message && (
        <div
          style={{
            marginTop: "20px",
            padding: "10px",
            backgroundColor: message.includes("successfully") ? "#d4edda" : "#f8d7da",
            color: message.includes("successfully") ? "#155724" : "#721c24",
            border: `1px solid ${message.includes("successfully") ? "#c3e6cb" : "#f5c6cb"}`,
            borderRadius: "5px",
          }}
        >
          {message}
        </div>
      )}
    </div>
  );
}
