export default async function CategorySliderDate() {
  try{
    const res = await fetch("https://ecommerce.routemisr.com/api/v1/categories");
  
    return res.json();
  }catch{
    throw new Error("something went wrong")
  }
}
