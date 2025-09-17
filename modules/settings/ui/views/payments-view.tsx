"use client";
import { DataTable } from "@/components/custom/form-elements/data-table";
import Head from "../components/head";
import { cn } from "@/lib/utils";
import { EyeIcon } from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";

enum PaymentStatus {
  Approved = "Approved",
  Initiated = "Initiated",
  Canceled = "Canceled",
}

const PaymentsView = () => {
  const { t } = useTranslation();
  const columns = [
    {
      accessorKey: "type",
      header: () => t('settingsPages.payments.type'),
      cell: ({ row }: any) => (
        <span className="font-medium text-gray-600">{row.original.type}</span>
      ),
    },
    {
      accessorKey: "status",
      header: () => t('settingsPages.payments.status'),
      cell: ({ row }: any) => {
        const status = row.original.status;
        let color = "bg-gray-300 text-gray-800";
        if (status === PaymentStatus.Approved) color = "text-green-600";
        if (status === PaymentStatus.Initiated) color = "text-sky-600";
        if (status === PaymentStatus.Canceled) color = "text-red-600";
        return (
          <span className={cn("px-3 py-1 rounded font-semibold text-sm", color)}>
            {status}
          </span>
        );
      },
    },
    {
      accessorKey: "amount",
      header: () => t('settingsPages.payments.amount'),
      cell: ({ row }: any) => (
        <span className="font-medium text-gray-600">{row.original.amount}</span>
      ),
    },
    {
      accessorKey: "from",
      header: () => t('settingsPages.payments.from'),
      cell: ({ row }: any) => (
        <span className="text-gray-600">{row.original.from}</span>
      ),
    },
    {
      accessorKey: "to",
      header: () => t('settingsPages.payments.to'),
      cell: ({ row }: any) => (
        <span className="text-gray-600">{row.original.to}</span>
      ),
    },
    {
      id: "actions",
      header: "",
      cell: () => (
          <EyeIcon className="w-4 h-4 text-gray-500" />
      ),
      enableSorting: false,
      enableHiding: false,
    },
  ];
  return (
    <div>
      <Head title={t('settingsPages.payments.headTitle')} description={t('settingsPages.payments.headDescription')} />
      <DataTable columns={columns} data={[
        {
          type: "Deposit",
          status: PaymentStatus.Approved,
          amount: 100,
          from: "John Doe",
          to: "Jane Doe",
        },
        {
          type: "Deposit",
          status: PaymentStatus.Initiated,
          amount: 100,
          from: "John Doe",
          to: "Jane Doe",
        },  
        {
          type: "Deposit",
          status: PaymentStatus.Canceled,
          amount: 100,
          from: "John Doe",
          to: "Jane Doe",
        },
      ]} pageCount={1} />
    </div>
  );
};

export default PaymentsView;
