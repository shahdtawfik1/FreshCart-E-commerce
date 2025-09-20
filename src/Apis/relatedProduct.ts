
export default async function getRelatedProduct(id:string) {
  try{
      const res = await fetch(`https://ecommerce.routemisr.com/api/v1/products?category[in]=${id}`);
  return res.json();
  }catch {
    throw new Error("some thing went wrong")
    
  }

}