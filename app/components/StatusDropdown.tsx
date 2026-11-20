"use client";

import { useTransition } from "react";
import { updateStatusPendaftar } from "@/app/(public)/actions/pendaftaran";

export default function StatusDropdown({ id, currentStatus }: { id: number, currentStatus: string }) {
  const [isPending, startTransition] = useTransition();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const statusBaru = e.target.value;
    startTransition(async () => {
      await updateStatusPendaftar(id, statusBaru);
    });
  };

  return (
    <select
      name="status"
      defaultValue={currentStatus}
      onChange={handleChange}
      disabled={isPending}
      className={`px-3 py-1.5 rounded-full text-xs font-semibold cursor-pointer outline-none border transition-colors ${
        currentStatus === 'Diterima' ? 'bg-green-100 text-green-700 border-green-200' : 
        currentStatus === 'Pending' ? 'bg-yellow-100 text-yellow-700 border-yellow-200' : 
        'bg-red-100 text-red-700 border-red-200'
      } ${isPending ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      <option value="Pending">Pending</option>
      <option value="Diterima">Diterima</option>
      <option value="Ditolak">Ditolak</option>
    </select>
  );
}