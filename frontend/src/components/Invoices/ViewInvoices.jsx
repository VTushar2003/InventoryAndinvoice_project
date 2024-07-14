import { Modal, Table, Button, Descriptions } from "antd";
import React from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";

const ViewInvoices = ({ visible, onClose, invoiceDets }) => {
  const handleDownload = () => {
    const doc = new jsPDF();

    // Set font size and style for the title
    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");
    doc.text("INVENTRA", 14, 10);
    doc.text("Invoice", 14, 20);

    // Set font size and style for invoice details
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`Invoice Number: ${invoiceDets.invoiceOrder}`, 14, 30);
    doc.text(`Customer: ${invoiceDets.customer.CustomerName}`, 14, 40);
    doc.text(`Email: ${invoiceDets.customer.customerEmail}`, 14, 50);
    doc.text(`Address: ${invoiceDets.customer.CustomerAddress}`, 14, 60);

    // AutoTable configuration for invoice items
    doc.autoTable({
      startY: 70,
      head: [["ProductId", "Product Name", "Quantity", "Unit Price", "Total"]],
      body: invoiceDets.items.map((item) => [
        item.product.productId,
        item.product.name,
        item.quantity,
        item.price,
        {
          content: (item.quantity * item.price).toFixed(2),
          styles: { fontStyle: "normal" },
        }, // Ensure total amount is formatted
      ]),
      styles: {
        font: "Sans",
        fontSize: 10,
        fontStyle: "normal",
        textColor: [0, 0, 0],
        lineWidth: 0.1,
      },
    });

    // Set font size and style for total amount
    doc.setFontSize(12);
    doc.text(
      `Total Amount: ${invoiceDets.totalAmount}`,
      14,
      doc.lastAutoTable.finalY + 10
    );

    // Save the PDF with a specific file name
    doc.save(`invoice-${invoiceDets.invoiceOrder}.pdf`);
  };

  const handlePrint = () => {
    window.print();
  };

  const columns = [
    {
      title: "ProductId",
      dataIndex: ["product", "productId"],
      key: "productId",
      responsive: ["sm"],
    },
    {
      title: "Product Name",
      dataIndex: ["product", "name"],
      key: "productName",
      responsive: ["sm"],
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      responsive: ["sm"],
    },
    {
      title: "Unit Price",
      dataIndex: "price",
      key: "productPrice",
      responsive: ["sm"],
    },
    {
      title: "Total",
      render: (text, record) => <span>{record.quantity * record.price}</span>,
      key: "Total",
      responsive: ["sm"],
    },
  ];

  return (
    <>
      <Modal
        width={"50rem"}
        open={visible}
        title={<h2 className="text-black font-[Sans]">Invoice Details</h2>}
        onCancel={onClose}
        footer={
          <div className="flex justify-end gap-4">
            <Button type="primary" onClick={handleDownload}>
              Download
            </Button>
            <Button type="primary" onClick={handlePrint}>
              Print
            </Button>
          </div>
        }
      >
        <div className="flex flex-col gap-4 p-5 border border-black shadow">
          <div className="flex items-center justify-around">
            <div className="inventra text-[--light-blue] font-[grifter] text-2xl">
              INVENTRA
            </div>
            <div className="invoice">
              <h1 className="text-black text-3xl">Invoice</h1>
              <div className="flex">
                <h3 className="text-black text-lg">Invoice Number: </h3>
                <p className="text-black text-lg">{invoiceDets.invoiceOrder}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-lg">
              <h2>To:</h2>
              <p>{invoiceDets.customer.CustomerName}</p>
              <p>{invoiceDets.customer.CustomerAddress}</p>
              <p>{invoiceDets.customer.customerEmail}</p>
            </div>
            <div className="text-sm">
              <h1>
                Invoice Date:{" "}
                {new Date(invoiceDets.invoiceDate).toLocaleString("en-IN")}
              </h1>
              <h1>
                Due Date:{" "}
                {new Date(invoiceDets.dueDate).toLocaleString("en-IN")}
              </h1>
              <h1>Status: {invoiceDets.status}</h1>
            </div>
          </div>
          <div className="table">
            <Table
              className="bg-blue"
              dataSource={invoiceDets.items.map((item) => ({
                ...item,
                key: item.product.productId,
              }))}
              columns={columns}
              pagination={false}
            />
            <Descriptions
              bordered
              className="text-center font-[Sans]"
              labelStyle={{ fontSize: "1rem" }}
            >
              <Descriptions.Item label="Sub Total:">
                {invoiceDets.totalAmount}
              </Descriptions.Item>
            </Descriptions>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ViewInvoices;
