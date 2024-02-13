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
      icon: "pi pi-star",
    },
    {
      label: "Clientes",
      icon: "pi pi-search",
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
      label: "Revendedor",
      icon: "pi pi-envelope",
    },
    {
      label: "Vendas",
      icon: "pi pi-envelope",
    },
    {
      label: "Estoque",
      icon: "pi pi-envelope",
    },
    {
      label: "Montagem",
      icon: "pi pi-envelope",
    },
    {
      label: "Acerto",
      icon: "pi pi-envelope",
    },
  ];

  return (
    <div className="card">
      <Menubar model={items} className="bg-red-900 rounded-none text-white" />
    </div>
  );
}
