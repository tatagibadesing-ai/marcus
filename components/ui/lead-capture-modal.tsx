"use client"

import type React from "react"
import { useState } from "react"
import * as Dialog from "@radix-ui/react-dialog"
import { X } from "lucide-react"

interface LeadCaptureModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function LeadCaptureModal({ open, onOpenChange }: LeadCaptureModalProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Add your form submission logic here (e.g., API call, webhook, etc.)
    setSubmitted(true)
    setTimeout(() => {
      onOpenChange(false)
      setSubmitted(false)
      setName("")
      setEmail("")
      setPhone("")
    }, 3000)
  }

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[90vw] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-[#FFCD01]/30 bg-zinc-950 p-8 shadow-[0_0_60px_rgba(255,205,1,0.15)] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95">
          <Dialog.Close className="absolute right-4 top-4 rounded-full p-1 text-zinc-400 hover:text-white transition-colors">
            <X className="h-5 w-5" />
          </Dialog.Close>

          {submitted ? (
            <div className="text-center py-8">
              <div className="text-4xl mb-4">&#10003;</div>
              <h3 className="text-xl font-bold text-white mb-2">Dados enviados!</h3>
              <p className="text-zinc-400">Em breve você receberá o acesso.</p>
            </div>
          ) : (
            <>
              <Dialog.Title className="text-xl font-bold text-white mb-2 text-center">
                Acesse o Combo PRF
              </Dialog.Title>
              <Dialog.Description className="text-zinc-400 text-sm text-center mb-6">
                Preencha seus dados para garantir seu acesso ao sistema completo.
              </Dialog.Description>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="Seu nome"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-white placeholder:text-zinc-500 focus:border-[#FFCD01]/50 focus:outline-none focus:ring-1 focus:ring-[#FFCD01]/30 transition-colors"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Seu melhor e-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-white placeholder:text-zinc-500 focus:border-[#FFCD01]/50 focus:outline-none focus:ring-1 focus:ring-[#FFCD01]/30 transition-colors"
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    placeholder="Seu WhatsApp"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-white placeholder:text-zinc-500 focus:border-[#FFCD01]/50 focus:outline-none focus:ring-1 focus:ring-[#FFCD01]/30 transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full rounded-xl py-4 text-black font-extrabold uppercase tracking-wide text-base transition-all hover:scale-[1.02]"
                  style={{
                    background: "linear-gradient(90deg, #FFCD01, #FFD83A, #FFCD01, #FFD83A)",
                    backgroundSize: "300% 100%",
                    animation: "gradientShift 3s ease infinite",
                  }}
                >
                  QUERO ACESSAR AGORA
                </button>
              </form>

              <p className="text-zinc-600 text-[10px] text-center mt-4 uppercase tracking-wider">
                Seus dados estão seguros e não serão compartilhados.
              </p>
            </>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
