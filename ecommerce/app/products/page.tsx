import ProductsList from "../ProductsList";

export const dynamic = 'force-dynamic';

export default async function ProductsPage() {
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_SITE_URL + '/api/products');
    if (!response.ok) {
      console.error(`Failed to fetch products: ${response.status} ${response.statusText}`);
      return (
        <div className="container mx-auto p-8">
          <h1 className="text-4xl font-bold mb-8">Products</h1>
          <div className="text-red-600 text-center py-8">
            Failed to load products. Please try again later.
          </div>
        </div>
      );
    }
    
    const products = await response.json();

    const response2 = await fetch(process.env.NEXT_PUBLIC_SITE_URL + '/api/users/2/cart', {
      cache: 'no-cache',
    });
    
    let cartProducts = [];
    if (response2.ok) {
      cartProducts = await response2.json();
    }

    return (
      <div className="container mx-auto p-8"> 
        <h1 className="text-4xl font-bold mb-8">Products</h1> 
        <ProductsList products={products} initialCartProducts={cartProducts} />
      </div>
    );
  } catch (error) {
    console.error('Error loading products:', error);
    return (
      <div className="container mx-auto p-8">
        <h1 className="text-4xl font-bold mb-8">Products</h1>
        <div className="text-red-600 text-center py-8">
          An error occurred while loading products. Please try again later.
        </div>
      </div>
    );
  }
}