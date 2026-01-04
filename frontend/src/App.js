// // import React, { useEffect, useState, useMemo } from "react";
// // import axios from "axios";
// // import "./App.css";
// // import TaglineSection from "./TaglineSection";

// // const api = axios.create({
// //   baseURL: "http://localhost:8000",
// // });

// // function App() {
// //   const [products, setProducts] = useState([]);
// //   const [form, setForm] = useState({
// //     id: "",
// //     name: "",
// //     description: "",
// //     price: "",
// //     quantity: "",
// //   });
// //   const [editId, setEditId] = useState(null);
// //   const [message, setMessage] = useState("");
// //   const [error, setError] = useState("");
// //   const [loading, setLoading] = useState(false);
// //   const [filter, setFilter] = useState("");
// //   const [sortField, setSortField] = useState("id");
// //   const [sortDirection, setSortDirection] = useState("asc");

// //   // Auto-dismiss messages after 5 seconds
// //   useEffect(() => {
// //     if (message) {
// //       const timer = setTimeout(() => {
// //         setMessage("");
// //       }, 5000);
// //       return () => clearTimeout(timer);
// //     }
// //   }, [message]);

// //   useEffect(() => {
// //     if (error) {
// //       const timer = setTimeout(() => {
// //         setError("");
// //       }, 5000);
// //       return () => clearTimeout(timer);
// //     }
// //   }, [error]);

// //   // Fetch all products
// //   const fetchProducts = async () => {
// //     setLoading(true);
// //     try {
// //       const res = await api.get("/products/");
// //       setProducts(res.data);
// //       setError("");
// //     } catch (err) {
// //       setError("Failed to fetch products");
// //     }
// //     setLoading(false);
// //   };

// //   useEffect(() => {
// //     // Inline initial fetch to avoid referencing external deps
// //     const run = async () => {
// //       setLoading(true);
// //       try {
// //         const res = await api.get("/products/");
// //         setProducts(res.data);
// //         setError("");
// //       } catch (err) {
// //         setError("Failed to fetch products");
// //       }
// //       setLoading(false);
// //     };
// //     run();
// //   }, []);

// //   // Handle sorting
// //   const handleSort = (field) => {
// //     if (sortField === field) {
// //       setSortDirection(sortDirection === "asc" ? "desc" : "asc");
// //     } else {
// //       setSortField(field);
// //       setSortDirection("asc");
// //     }
// //   };

// //   // Derived list with filter and sorting
// //   const filteredProducts = useMemo(() => {
// //     let filtered = products;

// //     // Apply filter
// //     const q = filter.trim().toLowerCase();
// //     if (q) {
// //       filtered = products.filter((p) =>
// //         String(p.id).includes(q) ||
// //         p.name?.toLowerCase().includes(q) ||
// //         p.description?.toLowerCase().includes(q)
// //       );
// //     }

// //     // Apply sorting
// //     return filtered.sort((a, b) => {
// //       let aVal = a[sortField];
// //       let bVal = b[sortField];

// //       // Handle numeric fields
// //       if (sortField === "id" || sortField === "price" || sortField === "quantity") {
// //         aVal = Number(aVal);
// //         bVal = Number(bVal);
// //       } else {
// //         // Handle string fields
// //         aVal = String(aVal).toLowerCase();
// //         bVal = String(bVal).toLowerCase();
// //       }

// //       if (aVal < bVal) return sortDirection === "asc" ? -1 : 1;
// //       if (aVal > bVal) return sortDirection === "asc" ? 1 : -1;
// //       return 0;
// //     });
// //   }, [products, filter, sortField, sortDirection]);

// //   // Handle form input
// //   const handleChange = (e) => {
// //     setForm({ ...form, [e.target.name]: e.target.value });
// //   };

// //   // Reset form
// //   const resetForm = () => {
// //     setForm({ id: "", name: "", description: "", price: "", quantity: "" });
// //     setEditId(null);
// //   };

// //   // Create or update product
// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setLoading(true);
// //     setMessage("");
// //     setError("");
// //     try {
// //       if (editId) {
// //         await api.put(`/products/${editId}`, {
// //           ...form,
// //           id: Number(form.id),
// //           price: Number(form.price),
// //           quantity: Number(form.quantity),
// //         });
// //         setMessage("Product updated successfully");
// //       } else {
// //         await api.post("/products/", {
// //           ...form,
// //           id: Number(form.id),
// //           price: Number(form.price),
// //           quantity: Number(form.quantity),
// //         });
// //         setMessage("Product created successfully");
// //       }
// //       resetForm();
// //       fetchProducts();
// //     } catch (err) {
// //       setError(err.response?.data?.detail || "Operation failed");
// //     }
// //     setLoading(false);
// //   };

// //   // Edit product
// //   const handleEdit = (product) => {
// //     setForm({
// //       id: product.id,
// //       name: product.name,
// //       description: product.description,
// //       price: product.price,
// //       quantity: product.quantity,
// //     });
// //     setEditId(product.id);
// //     setMessage("");
// //     setError("");
// //   };

// //   // Delete product
// //   const handleDelete = async (id) => {
// //     const ok = window.confirm("Delete this product?");
// //     if (!ok) return;
// //     setLoading(true);
// //     setMessage("");
// //     setError("");
// //     try {
// //       await api.delete(`/products/${id}`);
// //       setMessage("Product deleted successfully");
// //       fetchProducts();
// //     } catch (err) {
// //       setError("Delete failed");
// //     }
// //     setLoading(false);
// //   };

// //   const currency = (n) =>
// //     typeof n === "number" ? n.toFixed(2) : Number(n || 0).toFixed(2);

// //   return (
// //     <div className="app-bg">
// //       <header className="topbar">
// //         <div className="brand">
// //           <span className="brand-badge">📦</span>
// //           <h1>Telusko Trac</h1>
// //         </div>
// //         <div className="top-actions">
// //           <button className="btn btn-light" onClick={fetchProducts} disabled={loading}>
// //             Refresh
// //           </button>
// //         </div>
// //       </header>

// //       <div className="container">
// //         <div className="stats">
// //           <div className="chip">Total: {products.length}</div>
// //           <div className="search">
// //             <input
// //               type="text"
// //               placeholder="Search by id, name or description..."
// //               value={filter}
// //               onChange={(e) => setFilter(e.target.value)}
// //             />
// //           </div>
// //         </div>

// //         <div className="content-grid">
// //           <div className="card form-card">
// //             <h2>{editId ? "Edit Product" : "Add Product"}</h2>
// //             <form onSubmit={handleSubmit} className="product-form">
// //               <input
// //                 type="number"
// //                 name="id"
// //                 placeholder="ID"
// //                 value={form.id}
// //                 onChange={handleChange}
// //                 required
// //                 disabled={!!editId}
// //               />
// //               <input
// //                 type="text"
// //                 name="name"
// //                 placeholder="Name"
// //                 value={form.name}
// //                 onChange={handleChange}
// //                 required
// //               />
// //               <input
// //                 type="text"
// //                 name="description"
// //                 placeholder="Description"
// //                 value={form.description}
// //                 onChange={handleChange}
// //                 required
// //               />
// //               <input
// //                 type="number"
// //                 name="price"
// //                 placeholder="Price"
// //                 value={form.price}
// //                 onChange={handleChange}
// //                 required
// //                 step="0.01"
// //               />
// //               <input
// //                 type="number"
// //                 name="quantity"
// //                 placeholder="Quantity"
// //                 value={form.quantity}
// //                 onChange={handleChange}
// //                 required
// //               />
// //               <div className="form-actions">
// //                 <button className="btn" type="submit" disabled={loading}>
// //                   {editId ? "Update" : "Add"}
// //                 </button>
// //                 {editId && (
// //                   <button
// //                     className="btn btn-secondary"
// //                     type="button"
// //                     onClick={() => {
// //                       resetForm();
// //                       setMessage("");
// //                       setError("");
// //                     }}
// //                   >
// //                     Cancel
// //                   </button>
// //                 )}
// //               </div>
// //             </form>
// //             {message && <div className="success-msg">{message}</div>}
// //             {error && <div className="error-msg">{error}</div>}
// //           </div>

// //           <TaglineSection />

// //           <div className="card list-card">
// //             <h2>Products</h2>
// //             {loading ? (
// //               <div className="loader">Loading...</div>
// //             ) : (
// //               <div className="scroll-x">
// //                 <table className="product-table">
// //                   <thead>
// //                     <tr>
// //                       <th
// //                         className={`sortable ${sortField === 'id' ? `sort-${sortDirection}` : ''}`}
// //                         onClick={() => handleSort('id')}
// //                       >
// //                         ID
// //                       </th>
// //                       <th
// //                         className={`sortable ${sortField === 'name' ? `sort-${sortDirection}` : ''}`}
// //                         onClick={() => handleSort('name')}
// //                       >
// //                         Name
// //                       </th>
// //                       <th>Description</th>
// //                       <th
// //                         className={`sortable ${sortField === 'price' ? `sort-${sortDirection}` : ''}`}
// //                         onClick={() => handleSort('price')}
// //                       >
// //                         Price
// //                       </th>
// //                       <th
// //                         className={`sortable ${sortField === 'quantity' ? `sort-${sortDirection}` : ''}`}
// //                         onClick={() => handleSort('quantity')}
// //                       >
// //                         Quantity
// //                       </th>
// //                       <th>Actions</th>
// //                     </tr>
// //                   </thead>
// //                   <tbody>
// //                     {filteredProducts.map((p) => (
// //                       <tr key={p.id}>
// //                         <td>{p.id}</td>
// //                         <td className="name-cell">{p.name}</td>
// //                         <td className="desc-cell" title={p.description}>{p.description}</td>
// //                         <td className="price-cell">${currency(p.price)}</td>
// //                         <td>
// //                           <span className="qty-badge">{p.quantity}</span>
// //                         </td>
// //                         <td>
// //                           <div className="row-actions">
// //                             <button className="btn btn-edit" onClick={() => handleEdit(p)}>
// //                               Edit
// //                             </button>
// //                             <button className="btn btn-delete" onClick={() => handleDelete(p.id)}>
// //                               Delete
// //                             </button>
// //                           </div>
// //                         </td>
// //                       </tr>
// //                     ))}
// //                     {filteredProducts.length === 0 && (
// //                       <tr>
// //                         <td colSpan={6} className="empty">
// //                           No products found.
// //                         </td>
// //                       </tr>
// //                     )}
// //                   </tbody>
// //                 </table>
// //               </div>
// //             )}
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // export default App;
// import React, { useEffect, useState, useMemo } from "react";
// import axios from "axios";
// import "./App.css";
// import TaglineSection from "./TaglineSection";

// const api = axios.create({
//   baseURL: "http://localhost:8000",
// });

// function App() {
//   const [habits, setHabits] = useState([]);
//   const [form, setForm] = useState({
//     id: "",
//     name: "",
//     description: "",
//     boolean: false,
//   });
//   const [editId, setEditId] = useState(null);
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [filter, setFilter] = useState("");
//   const [sortField, setSortField] = useState("id");
//   const [sortDirection, setSortDirection] = useState("asc");

//   // Auto-dismiss messages after 5 seconds
//   useEffect(() => {
//     if (message) {
//       const timer = setTimeout(() => {
//         setMessage("");
//       }, 5000);
//       return () => clearTimeout(timer);
//     }
//   }, [message]);

//   useEffect(() => {
//     if (error) {
//       const timer = setTimeout(() => {
//         setError("");
//       }, 5000);
//       return () => clearTimeout(timer);
//     }
//   }, [error]);

//   // Fetch all habits
//   const fetchHabits = async () => {
//     setLoading(true);
//     try {
//       const res = await api.get("/habits");
//       setHabits(res.data);
//       setError("");
//     } catch (err) {
//       setError("Failed to fetch habits");
//     }
//     setLoading(false);
//   };

//   useEffect(() => {
//     // Inline initial fetch to avoid referencing external deps
//     const run = async () => {
//       setLoading(true);
//       try {
//         const res = await api.get("/habits");
//         setHabits(res.data);
//         setError("");
//       } catch (err) {
//         setError("Failed to fetch habits");
//       }
//       setLoading(false);
//     };
//     run();
//   }, []);

//   // Handle sorting
//   const handleSort = (field) => {
//     if (sortField === field) {
//       setSortDirection(sortDirection === "asc" ? "desc" : "asc");
//     } else {
//       setSortField(field);
//       setSortDirection("asc");
//     }
//   };

//   // Derived list with filter and sorting
//   const filteredHabits = useMemo(() => {
//     let filtered = habits;

//     // Apply filter
//     const q = filter.trim().toLowerCase();
//     if (q) {
//       filtered = habits.filter(
//         (h) =>
//           String(h.id).includes(q) ||
//           h.name?.toLowerCase().includes(q) ||
//           h.description?.toLowerCase().includes(q)
//       );
//     }

//     // Apply sorting
//     return filtered.sort((a, b) => {
//       let aVal = a[sortField];
//       let bVal = b[sortField];

//       // Handle numeric fields
//       if (sortField === "id") {
//         aVal = Number(aVal);
//         bVal = Number(bVal);
//       } else if (sortField === "boolean") {
//         // Sort boolean: true first, then false
//         aVal = a.boolean ? 1 : 0;
//         bVal = b.boolean ? 1 : 0;
//       } else {
//         // Handle string fields
//         aVal = String(aVal).toLowerCase();
//         bVal = String(bVal).toLowerCase();
//       }

//       if (aVal < bVal) return sortDirection === "asc" ? -1 : 1;
//       if (aVal > bVal) return sortDirection === "asc" ? 1 : -1;
//       return 0;
//     });
//   }, [habits, filter, sortField, sortDirection]);

//   // Handle form input
//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setForm({
//       ...form,
//       [name]: type === "checkbox" ? checked : value,
//     });
//   };

//   // Reset form
//   const resetForm = () => {
//     setForm({ id: "", name: "", description: "", boolean: false });
//     setEditId(null);
//   };

//   // Create or update habit
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage("");
//     setError("");
//     try {
//       if (editId) {
//         await api.put(`/habits/${editId}`, {
//           ...form,
//           id: Number(form.id),
//         });
//         setMessage("Habit updated successfully");
//       } else {
//         await api.post("/habits", {
//           ...form,
//           id: Number(form.id),
//         });
//         setMessage("Habit created successfully");
//       }
//       resetForm();
//       fetchHabits();
//     } catch (err) {
//       setError(err.response?.data?.detail || "Operation failed");
//     }
//     setLoading(false);
//   };

//   // Edit habit
//   const handleEdit = (habit) => {
//     setForm({
//       id: habit.id,
//       name: habit.name,
//       description: habit.description,
//       boolean: habit.boolean,
//     });
//     setEditId(habit.id);
//     setMessage("");
//     setError("");
//   };

//   // Delete habit
//   const handleDelete = async (id) => {
//     const ok = window.confirm("Delete this habit?");
//     if (!ok) return;
//     setLoading(true);
//     setMessage("");
//     setError("");
//     try {
//       await api.delete(`/habits/${id}`);
//       setMessage("Habit deleted successfully");
//       fetchHabits();
//     } catch (err) {
//       setError("Delete failed");
//     }
//     setLoading(false);
//   };

//   return (
//     <div className="app-bg">
//       <header className="topbar">
//         <div className="brand">
//           <span className="brand-badge">✅</span>
//           <h1>Habit Tracker</h1>
//         </div>
//         <div className="top-actions">
//           <button
//             className="btn btn-light"
//             onClick={fetchHabits}
//             disabled={loading}
//           >
//             Refresh
//           </button>
//         </div>
//       </header>

//       <div className="container">
//         <div className="stats">
//           <div className="chip">Total: {habits.length}</div>
//           <div className="search">
//             <input
//               type="text"
//               placeholder="Search by id, name or description..."
//               value={filter}
//               onChange={(e) => setFilter(e.target.value)}
//             />
//           </div>
//         </div>

//         <div className="content-grid">
//           <div className="card form-card">
//             <h2>{editId ? "Edit Habit" : "Add Habit"}</h2>
//             <form onSubmit={handleSubmit} className="product-form">
//               <input
//                 type="number"
//                 name="id"
//                 placeholder="ID"
//                 value={form.id}
//                 onChange={handleChange}
//                 required
//                 disabled={!!editId}
//               />
//               <input
//                 type="text"
//                 name="name"
//                 placeholder="Habit Name"
//                 value={form.name}
//                 onChange={handleChange}
//                 required
//               />
//               <input
//                 type="text"
//                 name="description"
//                 placeholder="Description"
//                 value={form.description}
//                 onChange={handleChange}
//                 required
//               />
//               <label className="checkbox-label">
//                 <input
//                   type="checkbox"
//                   name="boolean"
//                   checked={form.boolean}
//                   onChange={handleChange}
//                 />
//                 <span>Completed Today</span>
//               </label>
//               <div className="form-actions">
//                 <button className="btn" type="submit" disabled={loading}>
//                   {editId ? "Update" : "Add"}
//                 </button>
//                 {editId && (
//                   <button
//                     className="btn btn-secondary"
//                     type="button"
//                     onClick={() => {
//                       resetForm();
//                       setMessage("");
//                       setError("");
//                     }}
//                   >
//                     Cancel
//                   </button>
//                 )}
//               </div>
//             </form>
//             {message && <div className="success-msg">{message}</div>}
//             {error && <div className="error-msg">{error}</div>}
//           </div>

//           <TaglineSection />

//           <div className="card list-card">
//             <h2>Habits</h2>
//             {loading ? (
//               <div className="loader">Loading...</div>
//             ) : (
//               <div className="scroll-x">
//                 <table className="product-table">
//                   <thead>
//                     <tr>
//                       <th
//                         className={`sortable ${
//                           sortField === "id" ? `sort-${sortDirection}` : ""
//                         }`}
//                         onClick={() => handleSort("id")}
//                       >
//                         ID
//                       </th>
//                       <th
//                         className={`sortable ${
//                           sortField === "name" ? `sort-${sortDirection}` : ""
//                         }`}
//                         onClick={() => handleSort("name")}
//                       >
//                         Name
//                       </th>
//                       <th>Description</th>
//                       <th
//                         className={`sortable ${
//                           sortField === "boolean" ? `sort-${sortDirection}` : ""
//                         }`}
//                         onClick={() => handleSort("boolean")}
//                       >
//                         Status
//                       </th>
//                       <th>Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {filteredHabits.map((h) => (
//                       <tr key={h.id}>
//                         <td>{h.id}</td>
//                         <td className="name-cell">{h.name}</td>
//                         <td className="desc-cell" title={h.description}>
//                           {h.description}
//                         </td>
//                         <td>
//                           <span
//                             className={`status-badge ${
//                               h.boolean ? "status-done" : "status-pending"
//                             }`}
//                           >
//                             {h.boolean ? "✓ Done" : "○ Pending"}
//                           </span>
//                         </td>
//                         <td>
//                           <div className="row-actions">
//                             <button
//                               className="btn btn-edit"
//                               onClick={() => handleEdit(h)}
//                             >
//                               Edit
//                             </button>
//                             <button
//                               className="btn btn-delete"
//                               onClick={() => handleDelete(h.id)}
//                             >
//                               Delete
//                             </button>
//                           </div>
//                         </td>
//                       </tr>
//                     ))}
//                     {filteredHabits.length === 0 && (
//                       <tr>
//                         <td colSpan={5} className="empty">
//                           No habits found.
//                         </td>
//                       </tr>
//                     )}
//                   </tbody>
//                 </table>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;

import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import "./App.css";

const api = axios.create({
  baseURL: "http://localhost:8000",
});

function App() {
  const [habits, setHabits] = useState([]);
  const [form, setForm] = useState({
    id: "",
    name: "",
    description: "",
    boolean: false,
  });
  const [editId, setEditId] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("");
  const [sortField, setSortField] = useState("id");
  const [sortDirection, setSortDirection] = useState("asc");

  // Auto-dismiss messages after 5 seconds
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  // Fetch all habits
  const fetchHabits = async () => {
    setLoading(true);
    try {
      const res = await api.get("/habits");
      setHabits(res.data);
      setError("");
    } catch (err) {
      setError("Failed to fetch habits");
    }
    setLoading(false);
  };

  useEffect(() => {
    // Inline initial fetch to avoid referencing external deps
    const run = async () => {
      setLoading(true);
      try {
        const res = await api.get("/habits");
        setHabits(res.data);
        setError("");
      } catch (err) {
        setError("Failed to fetch habits");
      }
      setLoading(false);
    };
    run();
  }, []);

  // Handle sorting
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // Derived list with filter and sorting
  const filteredHabits = useMemo(() => {
    let filtered = habits;
    
    // Apply filter
    const q = filter.trim().toLowerCase();
    if (q) {
      filtered = habits.filter((h) =>
        String(h.id).includes(q) ||
        h.name?.toLowerCase().includes(q) ||
        h.description?.toLowerCase().includes(q)
      );
    }
    
    // Apply sorting
    return filtered.sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];
      
      // Handle numeric fields
      if (sortField === "id") {
        aVal = Number(aVal);
        bVal = Number(bVal);
      } else if (sortField === "boolean") {
        // Sort boolean: true first, then false
        aVal = a.boolean ? 1 : 0;
        bVal = b.boolean ? 1 : 0;
      } else {
        // Handle string fields
        aVal = String(aVal).toLowerCase();
        bVal = String(bVal).toLowerCase();
      }
      
      if (aVal < bVal) return sortDirection === "asc" ? -1 : 1;
      if (aVal > bVal) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
  }, [habits, filter, sortField, sortDirection]);

  // Handle form input
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ 
      ...form, 
      [name]: type === "checkbox" ? checked : value 
    });
  };

  // Reset form
  const resetForm = () => {
    setForm({ id: "", name: "", description: "", boolean: false });
    setEditId(null);
  };

  // Create or update habit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");
    try {
      if (editId) {
        await api.put(`/habits/${editId}`, {
          ...form,
          id: Number(form.id),
        });
        setMessage("Habit updated successfully");
      } else {
        await api.post("/habits", {
          ...form,
          id: Number(form.id),
        });
        setMessage("Habit created successfully");
      }
      resetForm();
      fetchHabits();
    } catch (err) {
      setError(err.response?.data?.detail || "Operation failed");
    }
    setLoading(false);
  };

  // Edit habit
  const handleEdit = (habit) => {
    setForm({
      id: habit.id,
      name: habit.name,
      description: habit.description,
      boolean: habit.boolean,
    });
    setEditId(habit.id);
    setMessage("");
    setError("");
  };

  // Delete habit
  const handleDelete = async (id) => {
    const ok = window.confirm("Delete this habit?");
    if (!ok) return;
    setLoading(true);
    setMessage("");
    setError("");
    try {
      await api.delete(`/habits/${id}`);
      setMessage("Habit deleted successfully");
      fetchHabits();
    } catch (err) {
      setError("Delete failed");
    }
    setLoading(false);
  };

  return (
    <div className="app-bg">
      <header className="topbar">
        <div className="brand">
          <span className="brand-badge">✅</span>
          <h1>Track Habits</h1>
        </div>
        <div className="top-actions">
          <button className="btn btn-light" onClick={fetchHabits} disabled={loading}>
            Refresh
          </button>
        </div>
      </header>

      <div className="container">
        <div className="stats">
          <div className="chip">Total: {habits.length}</div>
          <div className="search">
            <input
              type="text"
              placeholder="Search by id, name or description..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
          </div>
        </div>

        <div className="content-grid">
          <div className="card form-card">
            <h2>Trying to track habits form</h2>
            <form onSubmit={handleSubmit} className="product-form">
              <input
                type="number"
                name="id"
                placeholder="ID"
                value={form.id}
                onChange={handleChange}
                required
                disabled={!!editId}
              />
              <input
                type="text"
                name="name"
                placeholder="Habit Name"
                value={form.name}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="description"
                placeholder="Description"
                value={form.description}
                onChange={handleChange}
                required
              />
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="boolean"
                  checked={form.boolean}
                  onChange={handleChange}
                />
                <span>Completed Today</span>
              </label>
              <div className="form-actions">
                <button className="btn" type="submit" disabled={loading}>
                  {editId ? "Update" : "Add"}
                </button>
                {editId && (
                  <button
                    className="btn btn-secondary"
                    type="button"
                    onClick={() => {
                      resetForm();
                      setMessage("");
                      setError("");
                    }}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
            {message && <div className="success-msg">{message}</div>}
            {error && <div className="error-msg">{error}</div>}
          </div>

          <div className="card list-card">
            <h2>Habits</h2>
            {loading ? (
              <div className="loader">Loading...</div>
            ) : (
              <div className="scroll-x">
                <table className="product-table">
                  <thead>
                    <tr>
                      <th 
                        className={`sortable ${sortField === 'id' ? `sort-${sortDirection}` : ''}`}
                        onClick={() => handleSort('id')}
                      >
                        ID
                      </th>
                      <th 
                        className={`sortable ${sortField === 'name' ? `sort-${sortDirection}` : ''}`}
                        onClick={() => handleSort('name')}
                      >
                        Name
                      </th>
                      <th>Description</th>
                      <th 
                        className={`sortable ${sortField === 'boolean' ? `sort-${sortDirection}` : ''}`}
                        onClick={() => handleSort('boolean')}
                      >
                        Status
                      </th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredHabits.map((h) => (
                      <tr key={h.id}>
                        <td>{h.id}</td>
                        <td className="name-cell">{h.name}</td>
                        <td className="desc-cell" title={h.description}>{h.description}</td>
                        <td>
                          <span className={`status-badge ${h.boolean ? 'status-done' : 'status-pending'}`}>
                            {h.boolean ? "✓ Done" : "○ Pending"}
                          </span>
                        </td>
                        <td>
                          <div className="row-actions">
                            <button className="btn btn-edit" onClick={() => handleEdit(h)}>
                              Edit
                            </button>
                            <button className="btn btn-delete" onClick={() => handleDelete(h.id)}>
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {filteredHabits.length === 0 && (
                      <tr>
                        <td colSpan={5} className="empty">
                          No habits found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
