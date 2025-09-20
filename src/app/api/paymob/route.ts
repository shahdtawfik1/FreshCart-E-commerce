import { NextRequest, NextResponse } from "next/server";

// Docs: https://paymob.com/docs/

export async function POST(req: NextRequest) {
  try {
    const {
      amount_cents,
      billing,
    }: {
      amount_cents: number
      billing: {
        name?: string
        email?: string
        phone_number?: string
        city?: string
        details?: string
      }
    } = await req.json()

    if (!process.env.PAYMOB_API_KEY || !process.env.PAYMOB_INTEGRATION_ID || !process.env.PAYMOB_IFRAME_ID) {
      return NextResponse.json({ error: "Missing Paymob env vars" }, { status: 500 })
    }

    // 1) Authenticate
    const authRes = await fetch("https://accept.paymob.com/api/auth/tokens", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ api_key: process.env.PAYMOB_API_KEY })
    })
    const authJson = await authRes.json()
    const token = authJson?.token
    if (!token) return NextResponse.json({ error: "Paymob auth failed" }, { status: 500 })

    // 2) Register order
    const registerOrderRes = await fetch("https://accept.paymob.com/api/ecommerce/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        auth_token: token,
        amount_cents,
        currency: "EGP",
        delivery_needed: false,
        items: []
      })
    })
    const orderJson = await registerOrderRes.json()
    const orderId = orderJson?.id
    if (!orderId) return NextResponse.json({ error: "Paymob order failed" }, { status: 500 })

    // 3) Payment key
    const paymentKeyRes = await fetch("https://accept.paymob.com/api/acceptance/payment_keys", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        auth_token: token,
        amount_cents,
        expiration: 3600,
        order_id: orderId,
        billing_data: {
          apartment: "NA",
          email: billing?.email || "customer@example.com",
          floor: "NA",
          first_name: billing?.name?.split(" ")[0] || "Customer",
          street: billing?.details || "NA",
          building: "NA",
          phone_number: billing?.phone_number || "01000000000",
          shipping_method: "NA",
          postal_code: "NA",
          city: billing?.city || "Cairo",
          country: "EG",
          last_name: billing?.name?.split(" ")[1] || "User",
          state: "NA"
        },
        currency: "EGP",
        integration_id: Number(process.env.PAYMOB_INTEGRATION_ID)
      })
    })
    const keyJson = await paymentKeyRes.json()
    const paymentToken = keyJson?.token
    if (!paymentToken) return NextResponse.json({ error: "Paymob key failed" }, { status: 500 })

    // 4) Build iframe URL
    const iframeId = process.env.PAYMOB_IFRAME_ID
    const iframe_url = `https://accept.paymob.com/api/acceptance/iframes/${iframeId}?payment_token=${paymentToken}`

    return NextResponse.json({ iframe_url })
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Server error" }, { status: 500 })
  }
}


