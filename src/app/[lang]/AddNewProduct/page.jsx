import React from "react";
import Image from "next/image";
import "./style.css";

let sizeArray = ["XS", "S", "M", "L", "XL", "XXL"];
let tagArray = ["", "" , ""];
export default function AddNewProduct() {

  async function submitProduct() {
    

  }
  return (
    <form action={submitProduct} className="addNewProduct-container">
      <div className="addNewProduct-Info">
        <div
          style={{ borderBottom: "2px solid #98cddf", marginBottom: "20px" }}>
          <h3>ინფორმაცია</h3>
        </div>
        <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "20px",
          }} >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label style={{ marginBottom: "10px" }} htmlFor="title_en">Title</label>
            <input
              style={{ padding: "10px" }}
              id="title_en"
              placeholder="Title"
              type="text"
            ></input>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label style={{ marginBottom: "auto" }}>სათაური</label>
            <input style={{ padding: "10px" }}
              id="title_ge"
              placeholder="სათაური"
              type="text"></input>
          </div>
        </div>
        <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "20px",
            marginTop: "20px",
          }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label style={{ marginBottom: "10px" }}>Description</label>
            <textarea
              style={{ height: "100px", padding: "10px" }}
              id="description_en"
              placeholder="Description"
              type="text"
            ></textarea>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label style={{ marginBottom: "auto" }}>აღწერა</label>
            <textarea
              style={{ height: "100px", padding: "10px" }}
              id="description_ge"
              placeholder="აღწერა"
              type="text"></textarea>
          </div>
        </div>
        <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "20px",
            marginTop: "20px",
          }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label style={{ marginBottom: "10px" }} htmlFor="title_en">სქესი</label>
            <select
              id="gender"
              style={{ padding: "10px" }}
              type="text">
              <option selected value="woman">ქალი</option>
              <option value="man">კაცი</option>
              <option value="girl">გოგო</option>
              <option value="boy">ბიჭი</option>
            </select>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label style={{ marginBottom: "auto" }} htmlFor="title_en">კატეგორია</label>
            <select
              style={{ padding: "10px" }}
              id="category"
              type="text">
              <option selected value="pants">შარვალი</option>
              <option value="jeans">ჯინსი</option>
              <option value="shorts">შორტები</option>
              <option value="coat">ქურთუკი</option>
            </select>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "20px",
          }}>
          <div style={{
              marginBottom: "10px",
              display: "flex",
              gap: "10px",
              alignItems: "center",
            }}>
            <label>Tags</label>
            <svg
              style={{ cursor: "pointer", width: "20px", height: "20px" }}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"><path d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </div>
          <div
            style={{
              boxSizing: "border-box",
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr 1fr",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "10px",
            }}>
            {tagArray.map((tag, index) => (
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}
                key={index}>
                <input
                  style={{ padding: "10px" }}
                  placeholder={`Tag ${index + 1}`}
                  value={tag}/>
                <svg
                  style={{ cursor: "pointer", width: "20px", height: "20px" }}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"><path d="M12 9.75 14.25 12m0 0 2.25 2.25M14.25 12l2.25-2.25M14.25 12 12 14.25m-2.58 4.92-6.374-6.375a1.125 1.125 0 0 1 0-1.59L9.42 4.83c.21-.211.497-.33.795-.33H19.5a2.25 2.25 0 0 1 2.25 2.25v10.5a2.25 2.25 0 0 1-2.25 2.25h-9.284c-.298 0-.585-.119-.795-.33Z" />
                </svg>
              </div>
            ))}
          </div>
        </div>
      </div>
      <button
        style={{ padding: '10px', marginTop: '20px', backgroundColor: '#0070f3', color: '#fff', border: 'none', borderRadius: '5px' }}
      type="submit"
      >
        Add Product to Stripe
      </button>
    </form>
  );
}
