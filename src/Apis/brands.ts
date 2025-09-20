export default async function BrandsApi() {
  try{
    const res = await fetch("https://ecommerce.routemisr.com/api/v1/brands?limit=20");
  
    return res.json();
  }catch {
    throw new Error("something went wrong")
  }
}