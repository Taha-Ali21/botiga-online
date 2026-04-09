// src/services/productsService.js
import { 
  collection, 
  getDocs, 
  doc, 
  getDoc,
  query,
  where,
  limit
} from "firebase/firestore";
import { db } from "../data/firebase"; 

// Cache for products to reduce Firebase reads
let productsCache = null;
let lastFetchTime = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

/**
 * Get all products from Firestore
 */
export async function obtenirProductes() {
  try {
    if (productsCache && lastFetchTime && (Date.now() - lastFetchTime < CACHE_DURATION)) {
      return productsCache;
    }

    // FIXED: Changed "productes" to "Products"
    const querySnapshot = await getDocs(collection(db, "Products"));
    
    const productes = [];
    querySnapshot.forEach((doc) => {
      productes.push({ 
        id: doc.id, 
        ...doc.data() 
      });
    });

    productsCache = productes;
    lastFetchTime = Date.now();
    
    return productes;
  } catch (error) {
    console.error("Error fetching products:", error);
    if (productsCache) return productsCache;
    throw new Error(`Failed to fetch products: ${error.message}`);
  }
}

/**
 * Get a single product by ID
 */
export async function obtenirProductePerId(id) {
  try {
    if (!id) throw new Error("Product ID is required");

    // FIXED: Changed "productes" to "Products"
    const docRef = doc(db, "Products", id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      throw new Error(`Product not found with ID: ${id}`);
    }
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    throw error;
  }
}

/**
 * Get products by category
 */
export async function obtenirProductesPerCategoria(categoria) {
  try {
    if (!categoria) throw new Error("Category is required");

    // FIXED: Changed "productes" to "Products"
    const q = query(
      collection(db, "Products"), 
      where("categoria", "==", categoria)
    );
    
    const querySnapshot = await getDocs(q);
    const productes = [];
    querySnapshot.forEach((doc) => {
      productes.push({ id: doc.id, ...doc.data() });
    });
    
    return productes;
  } catch (error) {
    console.error("Error fetching by category:", error);
    throw error;
  }
}

/**
 * Get featured products
 */
export async function obtenirProductesDestacats(limitCount = 4) {
  try {
    // FIXED: Changed "productes" to "Products"
    const q = query(
      collection(db, "Products"),
      where("destacat", "==", true),
      limit(limitCount)
    );
    
    const querySnapshot = await getDocs(q);
    const productes = [];
    
    querySnapshot.forEach((doc) => {
      productes.push({ id: doc.id, ...doc.data() });
    });
    
    if (productes.length === 0) {
      const allProducts = await obtenirProductes();
      return allProducts.slice(0, limitCount);
    }
    
    return productes;
  } catch (error) {
    console.error("Error fetching featured products:", error);
    const allProducts = await obtenirProductes();
    return allProducts.slice(0, limitCount);
  }
}

/**
 * Search products
 */
export async function cercarProductes(searchTerm) {
  try {
    if (!searchTerm || searchTerm.trim() === "") return [];

    const allProducts = await obtenirProductes();
    const searchTermLower = searchTerm.toLowerCase();
    
    return allProducts.filter(p => {
      // Matches Catalan fields from your screenshot: nom, descripcio, categoria
      const name = (p.nom || "").toLowerCase();
      const desc = (p.descripcio || "").toLowerCase();
      const cat = (p.categoria || "").toLowerCase();
      
      return name.includes(searchTermLower) || 
             desc.includes(searchTermLower) || 
             cat.includes(searchTermLower);
    });
  } catch (error) {
    console.error("Search error:", error);
    throw error;
  }
}

export function clearProductsCache() {
  productsCache = null;
  lastFetchTime = null;
}

export default {
  obtenirProductes,
  obtenirProductePerId,
  obtenirProductesPerCategoria,
  obtenirProductesDestacats,
  cercarProductes,
  clearProductsCache
};