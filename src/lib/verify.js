const VALID_CODES = {
  "HLX-9982-GHK": {
    productName: "GHK-Cu 100mg (Copper Peptide)",
    batchNumber: "HLX-2026-B08",
    mfgDate: "2026-02-10",
    expDate: "2028-02-09",
    purity: "99.8%",
    status: "Authentic",
    testReportUrl: "#",
  },
  "HLX-1024-PURE": {
    productName: "Healix Pure Bio-Peptide",
    batchNumber: "HLX-2026-B05",
    mfgDate: "2026-01-15",
    expDate: "2028-01-14",
    purity: "100%",
    status: "Authentic",
    testReportUrl: "#",
  },
};

/**
 * Verifies a product serial/batch code.
 * @param {string} code
 * @returns {Promise<Object>}
 */
export async function verifyProductCode(code) {
  await new Promise((resolve) => setTimeout(resolve, 800));

  const cleanCode = code.trim().toUpperCase();

  if (VALID_CODES[cleanCode]) {
    return {
      success: true,
      data: VALID_CODES[cleanCode],
    };
  }

  return {
    success: false,
    message: "Invalid or unregistered batch/serial code. Please check your packaging label.",
  };
}