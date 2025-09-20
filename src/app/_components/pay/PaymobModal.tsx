"use client"
import React, { useContext, useState } from "react"
import { Button } from "@/components/ui/button"
import { cartContext } from "@/context/contextCartProvider"
import { ScaleLoader } from "react-spinners"
import { toast } from "react-toastify"

export default function PaymobModal() {
  const { data: cartData } = useContext(cartContext)!
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [iframeUrl, setIframeUrl] = useState<string | null>(null)

  async function openModal() {
    try {
      setOpen(true)
      setLoading(true)
      const amount = (cartData as any)?.data?.totalCartPrice ?? (cartData as any)?.totalCartPrice ?? 0
      if (!amount || amount <= 0) {
        toast.error("Your cart is empty", { position: "top-right", autoClose: 1500 })
        setLoading(false)
        return
      }
      const res = await fetch("/api/paymob", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount_cents: Number(amount) * 100,
          billing: {
            name: "FreshCart User",
            email: "customer@example.com",
            phone_number: "01000000000",
            city: "Cairo",
            details: "NA",
          },
        }),
      })
      if (!res.ok) throw new Error("Failed to init payment")
      const json = await res.json()
      setIframeUrl(json?.iframe_url || null)
    } catch (e: any) {
      toast.error(e?.message || "Something went wrong", { position: "top-right", autoClose: 2000 })
    } finally {
      setLoading(false)
    }
  }

  function closeModal() {
    setOpen(false)
    setIframeUrl(null)
  }

  return (
    <>
      <Button onClick={openModal} className="fixed bottom-6 right-6 z-30 shadow-lg">
        Pay Online
      </Button>

      {open && (
        <section className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 p-4">
          <section className="w-full max-w-3xl rounded-xl bg-white shadow-xl">
            <header className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold">Secure Card Payment</h3>
              <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">✕</button>
            </header>
            <section className="p-0">
              {loading && (
                <div className="flex items-center justify-center h-[420px]">
                  <ScaleLoader color="#0AAD0A" />
                </div>
              )}
              {!loading && iframeUrl && (
                <iframe
                  src={iframeUrl}
                  title="Paymob Card Payment"
                  className="w-full h-[560px]"
                  allow="payment *"
                />
              )}
            </section>
            <footer className="flex justify-end gap-2 p-4 border-t">
              <Button variant="outline" onClick={closeModal}>Close</Button>
            </footer>
          </section>
        </section>
      )}
    </>
  )
}


