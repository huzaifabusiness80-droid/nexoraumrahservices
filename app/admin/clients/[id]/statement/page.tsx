"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  FaArrowLeft,
  FaEnvelope,
  FaPhone,
  FaPrint,
  FaSpinner,
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
}

interface Client {
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
  const [summary, setSummary] = useState({
    totalDebit: 0,
    totalCredit: 0,
    balance: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;
    fetch(`/api/admin/clients/${id}/statement`)
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok || !data.success) {
          throw new Error(data.error || "Failed to load statement");
        }
        setClient(data.client);
        setEntries(data.entries || []);
        setSummary(data.summary);
      })
      .catch((err) => setError(err.message || "Failed to load statement"))
      .finally(() => setLoading(false));
  }, [id]);

  const formatAmount = (amount: number, currency = "SAR") =>
    `${currency} ${Math.abs(amount).toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    })}`;

  if (loading) {
    return (
      <div className="py-20 flex flex-col items-center justify-center gap-3">
        <FaSpinner className="animate-spin text-2xl text-[#c5a059]" />
        <span className="text-xs uppercase tracking-widest text-zinc-400 font-semibold">
          Loading account statement...
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

  const currency = entries[0]?.currency || "SAR";

  return (
    <div className="space-y-6">
      <style jsx global>{`
        @media print {
          aside, nav, header, .no-print { display: none !important; }
          main { padding: 0 !important; }
          body { background: white !important; }
        }
      `}</style>

      <div className="no-print flex items-center justify-between pb-6 border-b border-zinc-200">
        <Link href="/admin/clients" className="text-xs text-zinc-500 hover:text-zinc-900 flex items-center gap-2">
          <FaArrowLeft className="text-[10px]" />
          Back to Registered Clients
        </Link>
        <button
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-zinc-900 text-white rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-[#c5a059]"
        >
          <FaPrint />
          Print / Save PDF
        </button>
      </div>

      <div className="bg-white border border-zinc-300 rounded-lg max-w-6xl mx-auto print:border-0">
        <div className="p-6 sm:p-8 border-b-2 border-zinc-900 flex flex-col sm:flex-row justify-between gap-6">
          <div>
            <p className="text-[#c5a059] text-xs font-bold uppercase tracking-[0.25em]">Nexora Journeys</p>
            <h1 className="text-2xl font-black text-zinc-900 mt-2 uppercase">Account Statement</h1>
            <p className="text-xs text-zinc-500 mt-1">Customer ledger / payment statement</p>
          </div>
          <div className="sm:text-right text-xs text-zinc-600">
            <p className="font-bold text-zinc-900">Period</p>
            <p>01-01-2020 To {new Date().toLocaleDateString("en-GB")}</p>
            <p className="mt-2 font-bold text-zinc-900">Exch Rate</p>
            <p>1.000</p>
          </div>
        </div>

        <div className="p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-2 gap-6 border-b border-zinc-200">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Account Code</p>
            <p className="text-sm font-bold text-zinc-900 mt-1">{id.slice(-8).toUpperCase()}</p>
            <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 mt-4">Account Name</p>
            <p className="text-sm font-bold text-zinc-900 mt-1">{client.name}</p>
          </div>
          <div className="sm:text-right">
            <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Current Balance</p>
            <p className={`text-2xl font-black mt-1 ${summary.balance > 0 ? "text-red-600" : "text-emerald-700"}`}>
              {formatAmount(summary.balance, currency)}
            </p>
            <div className="mt-3 flex sm:justify-end gap-4 text-xs">
              <a href={`mailto:${client.email}`} className="inline-flex items-center gap-1.5 text-zinc-600">
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

        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] text-xs border-collapse">
            <thead>
              <tr className="bg-zinc-900 text-white">
                <th className="py-3 px-3 text-left">Date</th>
                <th className="py-3 px-3 text-left">Type</th>
                <th className="py-3 px-3 text-left">Booking / Particulars</th>
                <th className="py-3 px-3 text-right">Debit</th>
                <th className="py-3 px-3 text-right">Credit</th>
                <th className="py-3 px-3 text-right">Balance</th>
              </tr>
            </thead>
            <tbody>
              {entries.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-zinc-400">
                    No booking transactions found for this client.
                  </td>
                </tr>
              ) : (
                entries.map((entry) => (
                  <tr key={entry.id} className="border-b border-zinc-200">
                    <td className="py-3 px-3 whitespace-nowrap text-zinc-600">
                      {new Date(entry.date).toLocaleDateString("en-GB")}
                    </td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-1 rounded bg-zinc-100 font-bold uppercase text-[10px]">
                        {entry.type}
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <p className="font-bold text-zinc-900">
                        {entry.bookingNumber.slice(-8)} — {entry.particulars}
                      </p>
                      <p className="text-[10px] text-zinc-400 mt-1">
                        {entry.paymentStatus} · {entry.bookingStatus}
                      </p>
                    </td>
                    <td className="py-3 px-3 text-right font-semibold">
                      {entry.debit > 0 ? formatAmount(entry.debit, entry.currency) : "—"}
                    </td>
                    <td className="py-3 px-3 text-right font-semibold text-emerald-700">
                      {entry.credit > 0 ? formatAmount(entry.credit, entry.currency) : "—"}
                    </td>
                    <td className={`py-3 px-3 text-right font-black ${entry.balance > 0 ? "text-red-600" : entry.balance < 0 ? "text-emerald-700" : "text-zinc-800"}`}>
                      {formatAmount(entry.balance, entry.currency)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
            <tfoot>
              <tr className="bg-zinc-50 border-t-2 border-zinc-900">
                <td colSpan={3} className="py-4 px-3 font-black uppercase text-zinc-900">Total</td>
                <td className="py-4 px-3 text-right font-black">{formatAmount(summary.totalDebit, currency)}</td>
                <td className="py-4 px-3 text-right font-black text-emerald-700">{formatAmount(summary.totalCredit, currency)}</td>
                <td className="py-4 px-3 text-right font-black text-red-600">{formatAmount(summary.balance, currency)}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}
