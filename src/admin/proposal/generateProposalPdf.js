import jsPDF from "jspdf";
import "jspdf-autotable";

export const generatePDF = (proposalData) => {
  const doc = new jsPDF();

  // Get current date and time for both timestamp and file name
  const currentDate = new Date();
  const timestamp = `${currentDate.toLocaleDateString()} ${currentDate.toLocaleTimeString()}`;
  const formattedDate = currentDate.toISOString().slice(0, 10); // YYYY-MM-DD format for file name
  const formattedTime = currentDate
    .toTimeString()
    .slice(0, 8)
    .replace(/:/g, "-"); // HH-MM-SS format

  // Set up title and basic styling
  doc.setFontSize(20);
  doc.setTextColor(40, 40, 40);
  doc.text("Proposal Details", 20, 20);

  // Add timestamp in the top right corner
  doc.setFontSize(10);
  doc.text(`Date: ${timestamp}`, 160, 20, { align: "right" });

  // Add title
  doc.setFontSize(12);
  doc.setTextColor(80, 80, 80);
  doc.text(`Title: ${proposalData.title || ""}`, 20, 40);

  // Add products table header
  const headers = [["Product", "Quantity", "Discount", "Total"]];
  const tableData = proposalData.products.map((product) => [
    product.name || "",
    product.quantity || 0,
    `${proposalData.grandTotalCurrency}${product.discount || 0}`,
    `${proposalData.grandTotalCurrency}${product.total || 0}`,
  ]);

  // Draw table with custom styles
  doc.autoTable({
    head: headers,
    body: tableData,
    startY: 60,
    theme: "grid",
    styles: {
      fontSize: 10,
      halign: "center",
      valign: "middle",
    },
    headStyles: {
      fillColor: [22, 160, 133],
      textColor: [255, 255, 255],
      fontStyle: "bold",
    },
    alternateRowStyles: {
      fillColor: [240, 248, 255],
    },
  });

  // Calculate Y-position for totals
  const finalY = doc.lastAutoTable ? doc.lastAutoTable.finalY + 15 : 60;

  // Add totals with bold font
  doc.setFontSize(12);
  doc.setTextColor(40, 40, 40);
  doc.text(
    `Product Total: ${proposalData.grandTotalCurrency}${
      proposalData.productTotal || 0
    }`,
    20,
    finalY
  );
  doc.text(
    `Grand Total: ${proposalData.grandTotalCurrency}${
      proposalData.grandTotal || 0
    }`,
    20,
    finalY + 10
  );
  doc.text(
    `Discount on Grand Total: ${proposalData.grandTotalCurrency}${
      proposalData.discountOnGrandTotal || 0
    }`,
    20,
    finalY + 20
  );
  doc.text(
    `Final Amount: ${proposalData.grandTotalCurrency}${
      proposalData.finalAmount || 0
    }`,
    20,
    finalY + 30
  );

  // Save the PDF with a timestamped filename
  doc.save(`proposal_${formattedDate}_${formattedTime}.pdf`);
};
