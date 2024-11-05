import jsPDF from "jspdf";
import "jspdf-autotable";
import axios from "axios";

export const savePdfToServer = async (proposalData, authToken) => {
  const doc = new jsPDF();

  // Get current date and time for filename
  const currentDate = new Date();
  const formattedDate = currentDate.toISOString().slice(0, 10);
  const formattedTime = currentDate
    .toTimeString()
    .slice(0, 8)
    .replace(/:/g, "-");
  const filename = `proposal_${formattedDate}_${formattedTime}.pdf`;

  // Set up PDF content (same as in previous code)
  doc.setFontSize(20);
  doc.setTextColor(40, 40, 40);
  doc.text("Proposal Details", 20, 20);

  // Add title and table
  doc.setFontSize(12);
  doc.text(`Title: ${proposalData.title || ""}`, 20, 40);
  const headers = [["Product", "Quantity", "Discount", "Total"]];
  const tableData = proposalData.products.map((product) => [
    product.name || "",
    product.quantity || 0,
    `${proposalData.grandTotalCurrency}${product.discount || 0}`,
    `${proposalData.grandTotalCurrency}${product.total || 0}`,
  ]);
  doc.autoTable({ head: headers, body: tableData, startY: 60, theme: "grid" });

  // Convert to Blob and prepare FormData
  const pdfBlob = doc.output("blob");
  const formData = new FormData();
  formData.append("doc", pdfBlob, filename);

  try {
    // Send to server and receive the URL
    const response = await axios.post(
      "http://localhost:3000/upload/doc",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${authToken}`,
        },
      }
    );

    // Return a Map with the filename and URL
    if (response.data && response.data.url) {
      console.log("file uploaded", filename, response.data.url);
      return new Map([[filename, response.data.url]]);
    }
  } catch (error) {
    console.error("Error uploading PDF:", error);
  }
};
