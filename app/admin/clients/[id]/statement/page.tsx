"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import {
  FaArrowLeft,
  FaEnvelope,
  FaPhone,
  FaPrint,
  FaSpinner,
  FaPlus,
  FaTimes,
  FaCheckCircle,
  FaTrash,
  FaMoneyBillWave,
  FaCloudUploadAlt,
  FaImage,
  FaExternalLinkAlt,
} from "react-icons/fa";

interface StatementEntry {
  id: string;
  bookingNumber: string;
  date: string;
  type: string;
  particulars: string;
  debit: number;
  credit: number;
  balance: number;
  currency: string;
  paymentStatus: string;
  bookingStatus: string;
  isPayment?: boolean;
  paymentMethod?: string;
  reference?: string | null;
  receiptImage?: string | null;
  notes?: string | null;
}

interface ClientBooking {
  id: string;
  bookingNumber: string;
  itemName?: string;
  serviceType: string;
  totalPrice?: number;
  paidAmount?: number;
  currency: string;
  remainingBalance: number;
}

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  country: string | null;
  createdAt: string;
}

export default function ClientStatementPage() {
  const params = useParams();
  const id = params?.id as string;
  const [client, setClient] = useState<Client | null>(null);
  const [entries, setEntries] = useState<StatementEntry[]>([]);
  const [clientBookings, setClientBookings] = useState<ClientBooking[]>([]);
  const [summary, setSummary] = useState({
    totalDebit: 0,
    totalCredit: 0,
    balance: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Add Payment Modal State
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState<number | "">("");
  const [paymentCurrency, setPaymentCurrency] = useState("SAR");
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [paymentDate, setPaymentDate] = useState(() => new Date().toISOString().split("T")[0]);
  const [paymentBookingId, setPaymentBookingId] = useState("GENERAL");
  const [paymentReference, setPaymentReference] = useState("");
  const [paymentReceiptImage, setPaymentReceiptImage] = useState("");
  const [paymentNotes, setPaymentNotes] = useState("");
  const [submittingPayment, setSubmittingPayment] = useState(false);
  const [uploadingReceipt, setUploadingReceipt] = useState(false);
  const [paymentError, setPaymentError] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState("");
  const [deletingPaymentId, setDeletingPaymentId] = useState<string | null>(null);

  // Full-size Screenshot Preview Modal
  const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(null);

  const receiptFileInputRef = useRef<HTMLInputElement>(null);

  const fetchStatement = async () => {
    try {
      const response = await fetch(`/api/admin/clients/${id}/statement`);
      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to load statement");
      }
      setClient(data.client);
      setEntries(data.entries || []);
      setClientBookings(data.bookings || []);
      setSummary(data.summary);
    } catch (err: any) {
      setError(err.message || "Failed to load statement");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchStatement();
  }, [id]);

  // Handle receipt image file selection & upload
  const handleReceiptUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 8 * 1024 * 1024) {
      setPaymentError("Receipt image size must be less than 8MB");
      return;
    }

    setUploadingReceipt(true);
    setPaymentError("");

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", "nexora/receipts");

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to upload screenshot");
      }

      setPaymentReceiptImage(data.url);
    } catch (err: any) {
      setPaymentError(err.message || "Screenshot upload failed");
    } finally {
      setUploadingReceipt(false);
      if (receiptFileInputRef.current) receiptFileInputRef.current.value = "";
    }
  };

  const handleAddPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!paymentAmount || Number(paymentAmount) <= 0) {
      setPaymentError("Please enter a valid payment amount greater than zero.");
      return;
    }

    setSubmittingPayment(true);
    setPaymentError("");
    setPaymentSuccess("");

    try {
      const res = await fetch(`/api/admin/clients/${id}/statement`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: Number(paymentAmount),
          currency: paymentCurrency,
          paymentMethod,
          date: paymentDate,
          bookingId: paymentBookingId !== "GENERAL" ? paymentBookingId : null,
          reference: paymentReference,
          receiptImage: paymentReceiptImage || null,
          notes: paymentNotes,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to record payment");
      }

      setPaymentSuccess("Payment recorded with receipt successfully!");
      setPaymentAmount("");
      setPaymentReference("");
      setPaymentReceiptImage("");
      setPaymentNotes("");

      await fetchStatement();

      setTimeout(() => {
        setIsPaymentModalOpen(false);
        setPaymentSuccess("");
      }, 700);
    } catch (err: any) {
      setPaymentError(err.message || "An error occurred");
    } finally {
      setSubmittingPayment(false);
    }
  };

  const handleDeletePayment = async (paymentId: string) => {
    if (!confirm("Are you sure you want to remove this payment entry? This will reverse the credit balance.")) return;
    setDeletingPaymentId(paymentId);
    try {
      const res = await fetch(`/api/admin/clients/${id}/statement?paymentId=${paymentId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        alert(data.error || "Failed to delete payment");
        return;
      }
      await fetchStatement();
    } catch {
      alert("Error deleting payment entry");
    } finally {
      setDeletingPaymentId(null);
    }
  };

  const formatAmount = (amount: number, curr = "SAR") =>
    `${curr} ${Math.abs(amount).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;

  if (loading) {
    return (
      <div className="py-20 flex flex-col items-center justify-center gap-3">
        <FaSpinner className="animate-spin text-2xl text-[#c5a059]" />
        <span className="text-xs uppercase tracking-widest text-zinc-400 font-semibold">
          Loading client statement & ledger...
        </span>
      </div>
    );
  }

  if (error || !client) {
    return (
      <div className="space-y-4">
        <Link href="/admin/clients" className="text-xs text-[#9f7d3b] flex items-center gap-1">
          <FaArrowLeft /> Back to clients
        </Link>
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg">
          {error || "Client not found"}
        </div>
      </div>
    );
  }

  const defaultCurr = entries[0]?.currency || "SAR";

  return (
    <div className="space-y-6">
      <style jsx global>{`
        @media print {
          aside, nav, header, .no-print { display: none !important; }
          main { padding: 0 !important; }
          body { background: white !important; }
        }
      `}</style>

      {/* Action Header */}
      <div className="no-print flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-zinc-200">
        <Link href="/admin/clients" className="text-xs text-zinc-500 hover:text-zinc-900 flex items-center gap-2">
          <FaArrowLeft className="text-[10px]" />
          Back to Registered Clients
        </Link>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              setPaymentError("");
              setPaymentSuccess("");
              setIsPaymentModalOpen(true);
            }}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#c5a059] hover:bg-[#b08d4b] text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-colors shadow-xs cursor-pointer"
          >
            <FaPlus className="text-[10px]" />
            <span>Add Payment</span>
          </button>

          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-colors shadow-xs cursor-pointer"
          >
            <FaPrint />
            <span>Print Statement</span>
          </button>
        </div>
      </div>

      {/* Main Statement Container */}
      <div className="bg-white border border-zinc-300 rounded-xl max-w-6xl mx-auto print:border-0 shadow-2xs overflow-hidden">
        {/* Header Strip */}
        <div className="p-6 sm:p-8 border-b-2 border-zinc-900 flex flex-col sm:flex-row justify-between gap-6 bg-zinc-50/40">
          <div>
            <p className="text-[#c5a059] text-xs font-black uppercase tracking-[0.25em]">Nexora Journeys</p>
            <h1 className="text-2xl font-black text-zinc-900 mt-2 uppercase tracking-wide">Account Statement</h1>
            <p className="text-xs text-zinc-500 mt-1">Official Client Ledger & Payment Statement</p>
          </div>
          <div className="sm:text-right text-xs text-zinc-600">
            <p className="font-bold text-zinc-900 uppercase">Statement Period</p>
            <p>01-01-2020 To {new Date().toLocaleDateString("en-GB")}</p>
            <p className="mt-2 font-bold text-zinc-900 uppercase">Currency</p>
            <p className="font-bold text-[#9f7d3b]">{defaultCurr}</p>
          </div>
        </div>

        {/* Client & Balance Summary */}
        <div className="p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-2 gap-6 border-b border-zinc-200">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Account Code</p>
            <p className="text-sm font-bold text-zinc-900 mt-0.5 font-mono">{id.slice(-8).toUpperCase()}</p>
            <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 mt-3">Account Name</p>
            <p className="text-base font-extrabold text-zinc-900 mt-0.5">{client.name}</p>
          </div>
          <div className="sm:text-right">
            <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Current Outstanding Balance</p>
            <p className={`text-2xl font-black mt-1 ${summary.balance > 0 ? "text-red-600" : summary.balance < 0 ? "text-emerald-700" : "text-zinc-800"}`}>
              {formatAmount(summary.balance, defaultCurr)}
            </p>
            <div className="mt-2 flex sm:justify-end gap-3 text-xs">
              <a href={`mailto:${client.email}`} className="inline-flex items-center gap-1.5 text-zinc-600 hover:text-zinc-900">
                <FaEnvelope className="text-[#c5a059]" /> {client.email}
              </a>
              {client.phone && (
                <span className="inline-flex items-center gap-1.5 text-zinc-600">
                  <FaPhone className="text-[#c5a059]" /> {client.phone}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Statement Transactions Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] text-xs border-collapse">
            <thead>
              <tr className="bg-zinc-900 text-white">
                <th className="py-3 px-3.5 text-left font-bold uppercase text-[10px] tracking-wider">Date</th>
                <th className="py-3 px-3.5 text-left font-bold uppercase text-[10px] tracking-wider">Type</th>
                <th className="py-3 px-3.5 text-left font-bold uppercase text-[10px] tracking-wider">Particulars / Ref</th>
                <th className="py-3 px-3.5 text-center font-bold uppercase text-[10px] tracking-wider">Receipt Proof</th>
                <th className="py-3 px-3.5 text-right font-bold uppercase text-[10px] tracking-wider">Debit (Billed)</th>
                <th className="py-3 px-3.5 text-right font-bold uppercase text-[10px] tracking-wider">Credit (Paid)</th>
                <th className="py-3 px-3.5 text-right font-bold uppercase text-[10px] tracking-wider">Balance</th>
                <th className="py-3 px-3.5 text-center font-bold uppercase text-[10px] tracking-wider no-print">Action</th>
              </tr>
            </thead>
            <tbody>
              {entries.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-zinc-400">
                    No transactions or payments found for this client.
                  </td>
                </tr>
              ) : (
                entries.map((entry) => (
                  <tr
                    key={entry.id}
                    className={`border-b border-zinc-200 transition-colors ${
                      entry.isPayment ? "bg-emerald-50/30 hover:bg-emerald-50/50" : "hover:bg-zinc-50"
                    }`}
                  >
                    <td className="py-3 px-3.5 whitespace-nowrap text-zinc-600 font-mono text-[11px]">
                      {new Date(entry.date).toLocaleDateString("en-GB")}
                    </td>
                    <td className="py-3 px-3.5">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                          entry.isPayment
                            ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                            : "bg-zinc-100 text-zinc-700"
                        }`}
                      >
                        {entry.type}
                      </span>
                    </td>
                    <td className="py-3 px-3.5">
                      <p className={`font-bold ${entry.isPayment ? "text-emerald-900" : "text-zinc-900"}`}>
                        {entry.particulars}
                      </p>
                      {entry.paymentStatus && !entry.isPayment && (
                        <p className="text-[10px] text-zinc-400 mt-0.5">
                          Status: {entry.paymentStatus} · {entry.bookingStatus}
                        </p>
                      )}
                    </td>

                    {/* RECEIPT PROOF COLUMN */}
                    <td className="py-3 px-3.5 text-center">
                      {entry.receiptImage ? (
                        <button
                          type="button"
                          onClick={() => setPreviewImageUrl(entry.receiptImage!)}
                          className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-900 text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer"
                          title="View Payment Screenshot"
                        >
                          <FaImage className="text-amber-700 text-xs" />
                          <span>View Proof</span>
                        </button>
                      ) : (
                        <span className="text-zinc-300 text-[10px]">—</span>
                      )}
                    </td>

                    <td className="py-3 px-3.5 text-right font-semibold text-zinc-900">
                      {entry.debit > 0 ? formatAmount(entry.debit, entry.currency) : "—"}
                    </td>
                    <td className="py-3 px-3.5 text-right font-bold text-emerald-700">
                      {entry.credit > 0 ? formatAmount(entry.credit, entry.currency) : "—"}
                    </td>
                    <td
                      className={`py-3 px-3.5 text-right font-black ${
                        entry.balance > 0 ? "text-red-600" : entry.balance < 0 ? "text-emerald-700" : "text-zinc-800"
                      }`}
                    >
                      {formatAmount(entry.balance, entry.currency)}
                    </td>
                    <td className="py-3 px-3.5 text-center no-print">
                      {entry.isPayment ? (
                        <button
                          type="button"
                          onClick={() => handleDeletePayment(entry.id)}
                          disabled={deletingPaymentId === entry.id}
                          className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-colors cursor-pointer"
                          title="Delete Payment Entry"
                        >
                          {deletingPaymentId === entry.id ? (
                            <FaSpinner className="animate-spin text-xs" />
                          ) : (
                            <FaTrash className="text-xs" />
                          )}
                        </button>
                      ) : (
                        <span className="text-zinc-300 text-[10px]">—</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
            <tfoot>
              <tr className="bg-zinc-100 border-t-2 border-zinc-900">
                <td colSpan={4} className="py-4 px-3.5 font-black uppercase text-zinc-900">Total Summary</td>
                <td className="py-4 px-3.5 text-right font-black text-zinc-900">{formatAmount(summary.totalDebit, defaultCurr)}</td>
                <td className="py-4 px-3.5 text-right font-black text-emerald-700">{formatAmount(summary.totalCredit, defaultCurr)}</td>
                <td
                  className={`py-4 px-3.5 text-right font-black ${
                    summary.balance > 0 ? "text-red-600" : "text-emerald-700"
                  }`}
                >
                  {formatAmount(summary.balance, defaultCurr)}
                </td>
                <td className="no-print"></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* ADD PAYMENT MODAL (WITH IMAGE / SCREENSHOT UPLOAD & PREVIEW) */}
      {isPaymentModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white rounded-xl border border-zinc-200 shadow-xl max-w-lg w-full max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-zinc-100 px-6 py-4 bg-zinc-50 sticky top-0 z-10">
              <div className="flex items-center gap-2">
                <FaMoneyBillWave className="text-[#c5a059] text-base" />
                <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-900">
                  Record Client Payment
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsPaymentModalOpen(false)}
                className="text-zinc-400 hover:text-zinc-700 p-1 rounded cursor-pointer"
              >
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleAddPayment} className="p-6 space-y-4">
              {paymentError && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg font-medium">
                  {paymentError}
                </div>
              )}
              {paymentSuccess && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs rounded-lg font-medium flex items-center gap-2">
                  <FaCheckCircle className="text-emerald-600" />
                  <span>{paymentSuccess}</span>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-[11px] font-bold text-zinc-700 uppercase tracking-wider mb-1">
                    Amount <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    min="0.01"
                    step="0.01"
                    required
                    value={paymentAmount}
                    onChange={(e) => setPaymentAmount(e.target.value === "" ? "" : Number(e.target.value))}
                    placeholder="e.g. 1500"
                    className="w-full px-3 py-2 bg-white border border-zinc-200 rounded-lg text-sm text-zinc-900 focus:outline-none focus:border-[#c5a059]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-zinc-700 uppercase tracking-wider mb-1">
                    Currency
                  </label>
                  <select
                    value={paymentCurrency}
                    onChange={(e) => setPaymentCurrency(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-zinc-200 rounded-lg text-sm text-zinc-900 focus:outline-none focus:border-[#c5a059] cursor-pointer"
                  >
                    <option value="SAR">SAR (Saudi Riyal)</option>
                    <option value="AED">AED (Emirati Dirham)</option>
                    <option value="USD">USD (US Dollar)</option>
                    <option value="PKR">PKR (Pakistani Rupee)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-[11px] font-bold text-zinc-700 uppercase tracking-wider mb-1">
                    Payment Method <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-zinc-200 rounded-lg text-xs font-semibold text-zinc-900 focus:outline-none focus:border-[#c5a059] cursor-pointer"
                  >
                    <option value="Cash">Cash Payment</option>
                    <option value="Bank Transfer">Bank Transfer (Al Rajhi / SNB)</option>
                    <option value="Credit / Debit Card">Credit / Debit Card</option>
                    <option value="Online Gateway">Online Payment Gateway</option>
                    <option value="Cheque">Bank Cheque</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-zinc-700 uppercase tracking-wider mb-1">
                    Payment Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={paymentDate}
                    onChange={(e) => setPaymentDate(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-zinc-200 rounded-lg text-xs text-zinc-900 focus:outline-none focus:border-[#c5a059]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-zinc-700 uppercase tracking-wider mb-1">
                  Apply Payment To Booking (Optional)
                </label>
                <select
                  value={paymentBookingId}
                  onChange={(e) => setPaymentBookingId(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-zinc-200 rounded-lg text-xs text-zinc-900 focus:outline-none focus:border-[#c5a059] cursor-pointer"
                >
                  <option value="GENERAL">General Account Credit (Direct Payment)</option>
                  {clientBookings.map((b) => (
                    <option key={b.id} value={b.id}>
                      #{b.bookingNumber.slice(-8)} — {b.itemName || b.serviceType} (Due: {b.remainingBalance} {b.currency})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-zinc-700 uppercase tracking-wider mb-1">
                  Transaction / Receipt Reference
                </label>
                <input
                  type="text"
                  value={paymentReference}
                  onChange={(e) => setPaymentReference(e.target.value)}
                  placeholder="e.g. TXN-109823 or Bank Slip Ref"
                  className="w-full px-3 py-2 bg-white border border-zinc-200 rounded-lg text-xs text-zinc-900 focus:outline-none focus:border-[#c5a059]"
                />
              </div>

              {/* PAYMENT SCREENSHOT / RECEIPT IMAGE UPLOAD & PREVIEW */}
              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold text-zinc-700 uppercase tracking-wider">
                  Payment Receipt Screenshot / Proof
                </label>

                {/* Hidden input */}
                <input
                  ref={receiptFileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleReceiptUpload}
                  className="hidden"
                />

                {paymentReceiptImage ? (
                  <div className="relative border border-zinc-200 rounded-lg p-2 bg-zinc-50 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="relative w-14 h-14 rounded-md overflow-hidden bg-white border border-zinc-200 shrink-0">
                        <Image
                          src={paymentReceiptImage}
                          alt="Receipt screenshot"
                          fill
                          sizes="60px"
                          unoptimized
                          className="object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-emerald-800 flex items-center gap-1 truncate">
                          <FaCheckCircle className="text-emerald-600 shrink-0" />
                          <span>Receipt Attached</span>
                        </p>
                        <button
                          type="button"
                          onClick={() => setPreviewImageUrl(paymentReceiptImage)}
                          className="text-[10px] text-blue-600 hover:underline font-semibold"
                        >
                          Click to preview screenshot
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => receiptFileInputRef.current?.click()}
                        className="px-2.5 py-1 text-[11px] font-semibold text-zinc-700 hover:bg-zinc-200 bg-white border border-zinc-200 rounded cursor-pointer"
                      >
                        Change
                      </button>
                      <button
                        type="button"
                        onClick={() => setPaymentReceiptImage("")}
                        className="p-1.5 text-red-600 hover:bg-red-50 rounded cursor-pointer"
                        title="Remove screenshot"
                      >
                        <FaTimes className="text-xs" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div
                    onClick={() => !uploadingReceipt && receiptFileInputRef.current?.click()}
                    className={`border-2 border-dashed border-zinc-300 hover:border-[#c5a059] rounded-lg p-4 text-center cursor-pointer transition-colors bg-zinc-50 hover:bg-amber-50/20 ${
                      uploadingReceipt ? "opacity-60 cursor-not-allowed" : ""
                    }`}
                  >
                    {uploadingReceipt ? (
                      <div className="flex items-center justify-center gap-2 text-zinc-600 py-2">
                        <FaSpinner className="animate-spin text-sm text-[#c5a059]" />
                        <span className="text-xs font-semibold">Uploading payment screenshot...</span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center text-zinc-500">
                        <FaCloudUploadAlt className="text-2xl text-zinc-400 mb-1" />
                        <p className="text-xs font-bold text-zinc-800">
                          Click to upload bank transfer slip / payment screenshot
                        </p>
                        <p className="text-[10px] text-zinc-400 mt-0.5">
                          PNG, JPG, WEBP screenshot (Max 8MB)
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-[11px] font-bold text-zinc-700 uppercase tracking-wider mb-1">
                  Notes / Particulars
                </label>
                <textarea
                  rows={2}
                  value={paymentNotes}
                  onChange={(e) => setPaymentNotes(e.target.value)}
                  placeholder="e.g. Received via Al Rajhi online transfer..."
                  className="w-full px-3 py-2 bg-white border border-zinc-200 rounded-lg text-xs text-zinc-900 focus:outline-none focus:border-[#c5a059] resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-zinc-100">
                <button
                  type="button"
                  onClick={() => setIsPaymentModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-zinc-600 bg-white border border-zinc-200 rounded-lg hover:bg-zinc-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submittingPayment || uploadingReceipt}
                  className="inline-flex items-center gap-2 px-6 py-2 bg-[#c5a059] hover:bg-[#b08d4b] text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors disabled:opacity-50 cursor-pointer shadow-xs"
                >
                  {submittingPayment ? (
                    <FaSpinner className="animate-spin text-xs" />
                  ) : (
                    <FaCheckCircle className="text-xs" />
                  )}
                  <span>Record Payment</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* FULL PREVIEW MODAL FOR PAYMENT SCREENSHOT */}
      {previewImageUrl && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          onClick={() => setPreviewImageUrl(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="bg-white rounded-xl overflow-hidden max-w-2xl w-full shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-3.5 border-b border-zinc-200 bg-zinc-50">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-800 flex items-center gap-1.5">
                <FaImage className="text-[#c5a059]" />
                <span>Payment Screenshot Proof</span>
              </span>
              <div className="flex items-center gap-2">
                <a
                  href={previewImageUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 px-2.5 py-1 bg-white border border-zinc-200 rounded"
                >
                  <span>Open Full Size</span>
                  <FaExternalLinkAlt className="text-[10px]" />
                </a>
                <button
                  type="button"
                  onClick={() => setPreviewImageUrl(null)}
                  className="p-1.5 text-zinc-400 hover:text-zinc-700 rounded cursor-pointer"
                >
                  <FaTimes />
                </button>
              </div>
            </div>

            <div className="relative w-full h-[65vh] bg-zinc-950 flex items-center justify-center p-2">
              <Image
                src={previewImageUrl}
                alt="Payment proof screenshot"
                fill
                sizes="(max-width: 768px) 100vw, 800px"
                unoptimized
                className="object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
