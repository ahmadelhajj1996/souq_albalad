// Get 

//   const { data , isFetched ,    } = useGet( ["categories"] , "categories", {
//     staleTime: Infinity,  
//   });
//   console.log(isFetched ?  data : 'null');



// Post : 

//  const postMutation = usePost({
//     invalidateQueries: "categories",  
//     onSuccess: (data) => {
//       console.log("Category created successfully:", data);
//     },
//     onError: (error) => {
//       console.error("Error creating category:", error);
//     },
//   });
  
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const data = {
//     "name": {
//       "ar": "ar name",
//       "en": "en name"
//     },
//     "image": null
//   }
//     const config = {
//       headers: {
//         "Accept-Language": "en",  
//       },
//     };
//     postMutation.mutate({
//       url: "categories",
//       data: data,
//       config: config,
//     });
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>

//         <button type="submit" disabled={postMutation.isLoading}>
//           {postMutation.isLoading ? "Creating..." : "Create Category"}
//         </button>
//       </form>

//       {postMutation.isError && (
//         <div style={{ color: "red" }}>Error: {postMutation.error.message}</div>
//       )}
//     </div>
//   );
// }



// Put : 

// import { usePut } from "../hooks/useApi"; // Adjust the import path as needed

// const Home = () => {
//   // Initialize the mutation hook for updating categories
//   const {
//     mutate: updateCategory,
//     isLoading,
//     isError,
//     error,
//     isSuccess,
//   } = usePut({
//     invalidateQueries: ["categories"], // This will refetch categories after update
//     onSuccess: (data) => {
//       console.log("Category updated successfully:", data);
//       // You could add a toast notification here
//     },
//     onError: (error) => {
//       console.error("Update failed:", error);
//       // You could add an error toast here
//     },
//   });

//   // Static data for category update
//   const categoryUpdateData = {
//     name: {
//       ar: "ar name update",
//       en: "en name update",
//     },
//     image: null,
//   };

//   // Configuration for the request
//   const requestConfig = {
//     headers: {
//       "Accept-Language": "ar",
//     },
//   };

//   const handleUpdateCategory = () => {
//     // Category ID to update (47 in this case)
//     const categoryId = 47;
//     const updateUrl = `https://phplaravel-1483035-5638759.cloudwaysapps.com/api/categories/${categoryId}`;

//     updateCategory({
//       url: updateUrl,
//       data: categoryUpdateData,
//       config: requestConfig,
//     });
//   };

//   return (
//     <div>

//       <button onClick={handleUpdateCategory} disabled={isLoading}>
//         {isLoading ? "Updating..." : "Update Category #47"}
//       </button>

//       {isError && (
//         <div style={{ color: "red", marginTop: "10px" }}>
//           Error: {error.message}
//         </div>
//       )}

//       {isSuccess && (
//         <div style={{ color: "green", marginTop: "10px" }}>
//           Category updated successfully!
//         </div>
//       )}
//     </div>
//   );
// };

// export default Home;




// Delete : 


// import { useDelete } from "../hooks/useApi";
// import { toast } from "react-toastify"; // Optional for notifications

// const Home = () => {
//   // Initialize the delete mutation
//   const { mutate: deleteCategory, isLoading: isDeleting } = useDelete({
//     invalidateQueries: ["categories"], // This will refetch categories after deletion
//     onSuccess: () => {
//       toast.success("Category deleted successfully");
//     },
//     onError: (error) => {
//       toast.error(`Error deleting category: ${error.message}`);
//     },
//   });

//   const handleDeleteCategory = (categoryId) => {
//     if (window.confirm("Are you sure you want to delete this category?")) {
//       deleteCategory({
//         url: `/categories/${categoryId}`,
//         // config: { headers: { 'Authorization': 'Bearer your-token' } } // if you need auth
//       });
//     }
//   };

//   return (
//     <div>
//       <h1>Categories</h1>

//       {/* Example delete button for category 47 */}
//       <button
//         onClick={() => handleDeleteCategory(45)}
//         disabled={isDeleting}
//         className={`delete-button ${isDeleting ? "disabled" : ""}`}
//       >
//         {isDeleting ? "Deleting..." : "Delete Category "}
//       </button>

//       {/* Styling example */}
//     </div>
//   );
// };

// export default Home;
