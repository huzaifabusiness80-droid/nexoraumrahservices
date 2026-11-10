"use client";

import { FaFileInvoiceDollar, FaReceipt, FaTimes, FaDownload } from "react-icons/fa";

interface InvoiceDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingId: string;
  bookingNumber: string;
  customerName?: string;
  serviceType?: string;
}

export default function InvoiceDownloadModal({
  isOpen,
  onClose,
  bookingId,
  bookingNumber,
  customerName,
  serviceType,
}: InvoiceDownloadModalProps) {
  if (!isOpen) return null;

  const withPaymentUrl = `/api/admin/bookings/${bookingId}/invoice?payment=with`;
  const withoutPaymentUrl = `/api/admin/bookings/${bookingId}/invoice?payment=without`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="bg-white rounded-xl border border-zinc-200 shadow-2xl max-w-md w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-100 px-6 py-4 bg-zinc-50">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-900">
              Download Document
            </h3>
            <p className="text-[11px] text-zinc-500 mt-0.5">
              Ref: <span className="font-mono font-bold text-zinc-800">#{bookingNumber.slice(-8)}</span>
              {customerName ? ` • ${customerName}` : ""}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-zinc-400 hover:text-zinc-700 p-1.5 rounded-lg hover:bg-zinc-100 transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <FaTimes />
          </button>
        </div>

        {/* Content & Options */}
        <div className="p-6 space-y-4">
          <p className="text-xs text-zinc-600 font-medium">
            Please choose how you would like to generate this document:
          </p>

          <div className="space-y-3">
            {/* OPTION 1: WITH PAYMENT */}
            <a
              href={withPaymentUrl}
              download
              onClick={onClose}
              className="flex items-start gap-3.5 p-4 rounded-xl border-2 border-amber-200 bg-amber-50/40 hover:bg-amber-50 hover:border-[#c5a059] transition-all group cursor-pointer block"
            >
              <div className="w-10 h-10 rounded-lg bg-amber-100 text-[#9f7d3b] flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-[#c5a059] group-hover:text-white transition-colors">
                <FaFileInvoiceDollar className="text-lg" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900 group-hover:text-[#9f7d3b] transition-colors">
                    With Payment (Full Invoice)
                  </h4>
                  <FaDownload className="text-xs text-zinc-400 group-hover:text-[#9f7d3b] transition-colors" />
                </div>
                <p className="text-[11px] text-zinc-500 mt-1 leading-relaxed">
                  Includes total amount, advance paid, remaining balance, and payment status. Recommended for client billing.
                </p>
              </div>
            </a>

            {/* OPTION 2: WITHOUT PAYMENT */}
            <a
              href={withoutPaymentUrl}
              download
              onClick={onClose}
              className="flex items-start gap-3.5 p-4 rounded-xl border-2 border-zinc-200 bg-white hover:bg-zinc-50 hover:border-zinc-400 transition-all group cursor-pointer block"
            >
              <div className="w-10 h-10 rounded-lg bg-zinc-100 text-zinc-700 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-zinc-900 group-hover:text-white transition-colors">
                <FaReceipt className="text-lg" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900 group-hover:text-zinc-700 transition-colors">
                    Without Payment (Service Voucher)
                  </h4>
                  <FaDownload className="text-xs text-zinc-400 group-hover:text-zinc-900 transition-colors" />
                </div>
                <p className="text-[11px] text-zinc-500 mt-1 leading-relaxed">
                  Excludes all pricing and billing numbers. Ideal for chauffeurs, hotel front desk, or confidential itineraries.
                </p>
              </div>
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-zinc-50 border-t border-zinc-100 flex items-center justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-zinc-600 hover:text-zinc-900 cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

