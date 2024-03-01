"use client";
import { Menubar } from "primereact/menubar";
import { MenuItem } from "primereact/menuitem";
import "./index.css";

export function Header() {
  const items: MenuItem[] = [
    {
      label: "Home",
      icon: "pi pi-home",
      url: "/",
    },
    {
      label: "Produtos",
      icon: "pi pi-wrench",
      url: "/products"
    },
    {
      label: "Clientes",
      icon: "pi pi-user",
      items: [
        {
          label: "Components",
          icon: "pi pi-bolt",
        },
        {
          label: "Blocks",
          icon: "pi pi-server",
        },
        {
          label: "UI Kit",
          icon: "pi pi-pencil",
        },
        {
          label: "Revendedor",
          icon: "pi pi-palette",
          items: [
            {
              label: "Apollo",
              icon: "pi pi-palette",
            },
            {
              label: "Ultima",
              icon: "pi pi-palette",
            },
          ],
        },
      ],
    },
    {
      label: "Revendedores",
      icon: "pi pi-users",
    },
    {
      label: "Vendas",
      icon: "pi pi-money-bill",
    },
    {
      label: "Estoque",
      icon: "pi pi-table",
    },
    {
      label: "Montagem de Kit",
      icon: "pi pi-cart-plus",
    },
    {
      label: "Acerto",
      icon: "pi pi-check-circle",
    },
  ];

  return (
    <div className="card">
      <Menubar model={items} className="bg-red-900 flex justify-content-center  rounded-none text-white p-3" aria-label="true" />
    </div>
  );
}
