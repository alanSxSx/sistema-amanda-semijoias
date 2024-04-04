"use client";
import React, { useState, useEffect, useRef, ChangeEvent } from "react";
import { classNames } from "primereact/utils";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { Rating } from "primereact/rating";
import { Toolbar } from "primereact/toolbar";
import { InputTextarea } from "primereact/inputtextarea";
import { RadioButton, RadioButtonChangeEvent } from "primereact/radiobutton";
import { InputNumber, InputNumberValueChangeEvent } from "primereact/inputnumber";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Tag } from "primereact/tag";
import './products.css'
import { Product } from "@/app/types/product";
import { getProducts } from "@/app/routes/products/route";
import { baseURL } from "@/app/routes/route";
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import { piececategory } from "./pieceCategory";
import { FileUpload, FileUploadProps, FileUploadSelectEvent, FileUploadUploadEvent } from "primereact/fileupload";

interface DataProducts {
  productsData: Product[];
}


export default function Products({ productsData }: DataProducts) {

  let emptyProduct: Product = {
    id: null,
    code: "",
    name: "",
    image: null,
    description: "",
    category: null,
    price: 0,
    priceforsale: 0,
    quantity: 0,
    rating: 0,
    inventoryStatus: "EM ESTOQUE",
    piececategory: "",
  };


  const [products, setProducts] = useState<Product[]>(productsData);
  const [productDialog, setProductDialog] = useState<boolean>(false);
  const [deleteProductDialog, setDeleteProductDialog] = useState<boolean>(false);
  const [deleteProductsDialog, setDeleteProductsDialog] = useState<boolean>(false);
  const [product, setProduct] = useState<Product>(emptyProduct);
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [globalFilter, setGlobalFilter] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [image, setImage] = useState<File | string>('');
  const toast = useRef<Toast>(null);
  const dt = useRef<DataTable<Product[]>>(null);
  const fileUploadRef = useRef<FileUpload>(null);


  const formatCurrency = (value: number | undefined) => {
    if (value !== undefined) {
      return value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
    } else {
      // Handle the case where value is undefined, e.g., return a default value or an empty string
      return "N/A"; // You can customize this based on your requirements
    }
  };

  const openNew = () => {
    setProduct(emptyProduct);
    setSubmitted(false);
    setProductDialog(true);
  };

  const hideDialog = () => {
    setSubmitted(false);
    setProductDialog(false);
  };

  const hideDeleteProductDialog = () => {
    setDeleteProductDialog(false);
  };

  const hideDeleteProductsDialog = () => {
    setDeleteProductsDialog(false);
  };

  async function fetchData() {
    const data = await getProducts();
    setProducts(data);
  }

  const determineInventoryStatus = (quantity: number): string => {

    const estoqueminimo = 2;

    if (quantity > 2) {
      return "EM ESTOQUE";
    } else if (quantity > 0 && quantity <= estoqueminimo) {
      return "ESTOQUE BAIXO";
    } else {
      return "SEM ESTOQUE";
    }
  };

  // const saveProduct = async () => {
  //   setSubmitted(true);

  //   if (product.name.trim()) {
  //     let _products = [...products];
  //     let _product = { ...product };

  //     if (product.id) {
  //       const index = findIndexById(product.id);
  //       _product.inventoryStatus = determineInventoryStatus(_product.quantity);

  //       const response = await fetch(`${baseURL}/products/${product.id}`, {
  //         method: 'PUT',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify(_product),
  //       });
  //       _products[index] = _product;

  //       toast.current?.show({
  //         severity: "success",
  //         summary: "Successful",
  //         detail: "Product Updated",
  //         life: 3000,
  //       });
  //     } else {
  //       _product.id = createId();
  //       _product.image = "product-placeholder.svg";
  //       _products.push(_product);
  //       _product.inventoryStatus = determineInventoryStatus(_product.quantity);

  //       toast.current?.show({
  //         severity: "success",
  //         summary: "Successful",
  //         detail: "Product Criado com Sucesso",
  //         life: 3000,
  //       });
  //     }

  //     fetchData();
  //     setProducts(_products);
  //     setProductDialog(false);
  //     setProduct(emptyProduct);
  //   }
  // };



    const saveProduct = async () => {
    setSubmitted(true);

    if (product.name.trim()) {
      let _products = [...products];
      let _product = { ...product };

      fetchData();
      uploadImage();
      setProducts(_products);
      setProductDialog(false);
      setProduct(emptyProduct);
    }

  };

  

  const editProduct = async (product: Product) => {
    setProduct({ ...product });
    setProductDialog(true);
  };

  const confirmDeleteProduct = (product: Product) => {
    setProduct(product);
    setDeleteProductDialog(true);
  };

  const deleteProduct = () => {
    let _products = products.filter((val) => val.id !== product.id);

    setProducts(_products);
    setDeleteProductDialog(false);
    setProduct(emptyProduct);
    toast.current?.show({
      severity: "success",
      summary: "Successful",
      detail: "Product Deleted",
      life: 3000,
    });
  };

  const findIndexById = (id: string) => {
    let index = -1;

    for (let i = 0; i < products.length; i++) {
      if (products[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  };

  const createId = (): string => {
    let id = "";
    let chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return id;
  };

  const exportCSV = () => {
    dt.current?.exportCSV();
  };

  const confirmDeleteSelected = () => {
    setDeleteProductsDialog(true);
  };

  const deleteSelectedProducts = () => {
    let _products = products.filter((val) => !selectedProducts.includes(val));

    setProducts(_products);
    setDeleteProductsDialog(false);
    setSelectedProducts([]);
    toast.current?.show({
      severity: "success",
      summary: "Successful",
      detail: "Products Deleted",
      life: 3000,
    });
  };

  const onCategoryChange = (e: RadioButtonChangeEvent) => {
    let _product = { ...product };

    _product["category"] = e.value;
    setProduct(_product);
  };

  const onPieceCategoryChange = (e: DropdownChangeEvent) => {
    let _product = { ...product };

    _product["piececategory"] = e.target.value;

    setSelectedCategory(e.target.value)
    setProduct(_product);
  };

  const onInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    name: string
  ) => {
    const val = (e.target && e.target.value) || "";
    let _product = { ...product };

    // @ts-ignore
    _product[`${name}`] = val;

    setProduct(_product);
  };

  const onInputTextAreaChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    name: string
  ) => {
    const val = (e.target && e.target.value) || "";
    let _product = { ...product };

    // @ts-ignore
    _product[`${name}`] = val;

    setProduct(_product);
  };

  const onInputNumberChange = (e: InputNumberValueChangeEvent, name: string) => {
    const val = e.target.value ?? 0;
    let _product = { ...product };

    // @ts-ignore
    _product[`${name}`] = val;

    setProduct(_product);
  };

  const leftToolbarTemplate = () => {
    return (
      <div className="flex flex-wrap gap-2">
        <Button
          label="Novo"
          icon="pi pi-plus"
          severity="success"
          onClick={openNew}
        />
        <Button
          label="Excluir"
          icon="pi pi-trash"
          severity="danger"
          onClick={confirmDeleteSelected}
          disabled={!selectedProducts || !selectedProducts.length}
        />
      </div>
    );
  };

  const rightToolbarTemplate = () => {
    return (
      <Button
        label="Export"
        icon="pi pi-upload"
        className="p-button-help"
        onClick={exportCSV}
      />
    );
  };

  const imageBodyTemplate = (rowData: Product) => {
    return (
      <img
        src={`https://primefaces.org/cdn/primereact/images/product/${rowData.image}`}
        alt={rowData.image!}
        className="shadow-2 border-round"
        style={{ width: "64px" }}
      />
    );
  };

  const priceBodyTemplate = (rowData: Product) => {
    return formatCurrency(rowData.price);
  };

  const quantityBodyTemplate = (rowData: Product) => {
    return rowData.quantity
  };


  const priceForSaleBodyTemplate = (rowData: Product) => {
    return formatCurrency(rowData.priceforsale);
  };

  const ratingBodyTemplate = (rowData: Product) => {
    return <Rating value={rowData.rating} readOnly cancel={false} />;
  };

  const statusBodyTemplate = (rowData: Product) => {
    return (
      <Tag
        value={rowData.inventoryStatus}
        severity={getSeverity(rowData)}
      ></Tag>
    );
  };

  const actionBodyTemplate = (rowData: Product) => {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-pencil"
          rounded
          outlined
          className="mr-2"
          onClick={() => editProduct(rowData)}
        />
        <Button
          icon="pi pi-trash"
          rounded
          outlined
          severity="danger"
          onClick={() => confirmDeleteProduct(rowData)}
        />
      </React.Fragment>
    );
  };

  const getSeverity = (product: Product) => {
    switch (product.inventoryStatus) {
      case "EM ESTOQUE":
        return "success";

      case "ESTOQUE BAIXO":
        return "warning";

      case "SEM ESTOQUE":
        return "danger";

      default:
        return null;
    }
  };

  const header = (
    <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
      <h4 className="m-0">Gerenciamento de Produtos</h4>
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          type="search"
          placeholder="Search..."
          onInput={(e) => {
            const target = e.target as HTMLInputElement;
            setGlobalFilter(target.value);
          }}
        />
      </span>
    </div>
  );
  const productDialogFooter = (
    <>
      <Button label="Cancelar" icon="pi pi-times" outlined onClick={hideDialog} />
      <Button label="Salvar" icon="pi pi-check" onClick={saveProduct} />
    </>
  );
  const deleteProductDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        outlined
        onClick={hideDeleteProductDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        severity="danger"
        onClick={deleteProduct}
      />
    </React.Fragment>
  );
  const deleteProductsDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        outlined
        onClick={hideDeleteProductsDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        severity="danger"
        onClick={deleteSelectedProducts}
      />
    </React.Fragment>
  );

  const uploadImage = async () => {
    // Criação de um objeto FormData para enviar o arquivo
    const formData = new FormData();
    formData.append('image',image)
  
    try {
      const response = await fetch('http://localhost:8080/upload-image', {
        method: 'POST',
        body: formData,  
      });
  
      if (response.ok) {
        // Sucesso ao enviar o arquivo
        console.log('Arquivo enviado com sucesso!');
      } else {
        // Tratar erro na resposta
        console.error('Erro ao enviar arquivo:', response.status, response.statusText);
      }
    } catch (error) {
      // Tratar erro de rede ou outros erros
      console.error('Erro de rede:', error);
    }
  };


  return (
    <div>
      <Toast ref={toast} />
      <div className="card">
        <Toolbar
          className=""
          left={leftToolbarTemplate}
          right={rightToolbarTemplate}
        ></Toolbar>

        <DataTable
          ref={dt}
          value={products}
          selection={selectedProducts}
          selectionMode="multiple"
          onSelectionChange={(e) => {
            if (Array.isArray(e.value)) {
              setSelectedProducts(e.value);
            }
          }}
          dataKey="id"
          paginator
          rows={10}
          rowsPerPageOptions={[5, 10, 25]}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Mostrando {first} para {last} de {totalRecords} produtos"
          globalFilter={globalFilter}
          header={header}

        >
          <Column selectionMode="multiple" exportable={false} ></Column>
          <Column
            field="code"
            header="Codigo"
            sortable
            style={{ minWidth: "8rem" }}
          ></Column>
          <Column
            field="name"
            header="Nome"
            sortable
            style={{ minWidth: "16rem" }}
          ></Column>
          <Column
            field="image"
            header="Imagem"
            body={imageBodyTemplate}
          ></Column>
          <Column
            field="price"
            header="Preço de Custo"
            body={priceBodyTemplate}
            sortable
            style={{ minWidth: "8rem" }}
          ></Column>
          <Column
            field="priceforsale"
            header="Preço de Venda"
            body={priceForSaleBodyTemplate}
            sortable
            style={{ minWidth: "8rem" }}
          ></Column>
          <Column
            field="quantity"
            header="Quantidade"
            body={quantityBodyTemplate}
            sortable
            style={{ minWidth: "8rem" }}
          ></Column>
          <Column
            field="inventoryStatus"
            header="Status"
            body={statusBodyTemplate}
            sortable
            style={{ minWidth: '10rem' }}>
          </Column>
          <Column
            field="category"
            header="Material"
            sortable
            style={{ minWidth: "10rem" }}
          ></Column>
          <Column
            field="piececategory"
            header="Tipo Da Peça"
            sortable
            style={{ minWidth: "10rem" }}
          ></Column>

          <Column
            body={actionBodyTemplate}
            exportable={false}
            style={{ minWidth: "12rem" }}
          ></Column>
        </DataTable>
      </div>

      <Dialog
        visible={productDialog}
        style={{ width: "32rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Sobre o Produto"
        modal
        className="p-fluid"
        footer={productDialogFooter}
        onHide={hideDialog}
      >
        {product.image && (
          <img
            src={`https://primefaces.org/cdn/primereact/images/product/${product.image}`}
            alt={product.image}
            className="product-image block m-auto pb-3"
          />
        )}
        <div className="card flex justify-content-center pt-3">

        <input type="file" name="image" onChange={e => setImage(e.target?.files?.[0] ?? '')}/>

        </div>
        <div className="field">
          <label htmlFor="name" className="font-bold">
            Nome
          </label>
          <InputText
            id="name"
            value={product.name}
            onChange={(e: ChangeEvent<HTMLInputElement>) => onInputChange(e, "name")}
            required
            autoFocus
            className={classNames({ "p-invalid": submitted && !product.name })}
          />
          {submitted && !product.name && (
            <small className="p-error">Name is required.</small>
          )}
        </div>
        <div className="field">
          <label htmlFor="description" className="font-bold">
            Descrição
          </label>
          <InputTextarea
            id="description"
            value={product.description}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => onInputTextAreaChange(e, "description")}
            required
            rows={3}
            cols={20}
          />
        </div>

        <div className="field">
          <label className="mb-3 font-bold">Material</label>
          <div className="formgrid grid">
            <div className="field-radiobutton col-6 text-center">
              <RadioButton
                inputId="category1"
                name="category"
                value="Prata"
                onChange={onCategoryChange}
                checked={product.category === "Prata"}
              />
              <label htmlFor="category1">Prata</label>
            </div>
            <div className="field-radiobutton col-6">
              <RadioButton
                inputId="category2"
                name="category"
                value="Moeda"
                onChange={onCategoryChange}
                checked={product.category === "Moeda"}
              />
              <label htmlFor="category2">Moeda</label>
            </div>
            <div className="field-radiobutton col-6">
              <RadioButton
                inputId="category3"
                name="category"
                value="SemiJoia"
                onChange={onCategoryChange}
                checked={product.category === "Semijoia"}
              />
              <label htmlFor="category3">SemiJoia</label>
            </div>
            <div className="field-radiobutton col-6">
              <RadioButton
                inputId="category4"
                name="category"
                value="Ouro"
                onChange={onCategoryChange}
                checked={product.category === "Ouro"}
              />
              <label htmlFor="category4">Ouro</label>
            </div>
          </div>
        </div>

        <div className="formgrid grid">
          <div className="field col">
            <label htmlFor="price" className="font-bold">
              Preço de Custo
            </label>
            <InputNumber
              id="price"
              value={product.price}
              onValueChange={(e: InputNumberValueChangeEvent) => onInputNumberChange(e, "price")}
              mode="currency"
              currency="BRL"
              locale="pt-BR"
            />
          </div>
          <div className="field col">
            <label htmlFor="priceforsale" className="font-bold">
              Preço de Venda
            </label>
            <InputNumber
              id="priceforsale"
              value={product.priceforsale}
              onValueChange={(e: InputNumberValueChangeEvent) => onInputNumberChange(e, "priceforsale")}
              mode="currency"
              currency="BRL"
              locale="pt-BR"
            />
          </div>
          <div className="field col">
            <label htmlFor="quantity" className="font-bold">
              Quantidade
            </label>
            <InputNumber
              id="quantity"
              value={product.quantity}
              onValueChange={(e) => onInputNumberChange(e, "quantity")}
            />
          </div>
        </div>
        <div className="card flex">
          <Dropdown value={selectedCategory} onChange={onPieceCategoryChange} options={piececategory} optionLabel=""
            placeholder="Selecione a Categoria" className="w-full md:w-14rem" />
        </div>
      </Dialog>

      <Dialog
        visible={deleteProductDialog}
        style={{ width: "32rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Confirmar"
        modal
        footer={deleteProductDialogFooter}
        onHide={hideDeleteProductDialog}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: "2rem" }}
          />
          {product && (
            <span>
              Tem certeza que deseja excluir <b>{product.name}</b>?
            </span>
          )}
        </div>
      </Dialog>

      <Dialog
        visible={deleteProductsDialog}
        style={{ width: "32rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Confirm"
        modal
        footer={deleteProductsDialogFooter}
        onHide={hideDeleteProductsDialog}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: "2rem" }}
          />
          {product && (
            <span>Tem certeza que deseja excluir os produtos selecionados ?</span>
          )}
        </div>
      </Dialog>
    </div>
  );
}
