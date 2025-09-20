
export default async function homePro(searchParams:Record<string, string>) {
  const param = await searchParams
  const query = new URLSearchParams(param).toString()
  try{
      const res = await fetch(`https://ecommerce.routemisr.com/api/v1/products?limit=15&${query}`);
  return res.json();
  }catch {
    throw new Error("some thing went wrong")
    
  }

}

