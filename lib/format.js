export function formatToman(amount) {
  return `${new Intl.NumberFormat("fa-IR").format(amount)} تومان`;
}

export function formatKg(kg) {
  return `${new Intl.NumberFormat("fa-IR", {
    maximumFractionDigits: 1,
  }).format(kg)} کیلو`;
}

export const ORDER_STATUSES = [
  { id: "new", label: "جدید" },
  { id: "preparing", label: "در حال آماده‌سازی" },
  { id: "shipped", label: "ارسال شد" },
  { id: "cancelled", label: "لغو" },
];

export function statusLabel(id) {
  return ORDER_STATUSES.find((item) => item.id === id)?.label ?? id;
}
