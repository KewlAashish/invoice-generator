function addTrip() {
  const div = document.createElement("div");
  div.className = "tripRow";
  div.innerHTML = `
    <input type="date" class="tripDate" />
    <input type="text" placeholder="Description" class="tripDesc" />
    <input type="number" placeholder="Amount" class="tripAmt" />
  `;
  document.getElementById("tripInputs").appendChild(div);
}

function generateInvoice() {
  // Output fields
  const out = {
    billNo: document.getElementById("outBillNo"),
    date: document.getElementById("outInvoiceDate"),
    carUsedBy: document.getElementById("outCarUsedBy"),
    dateOfUse: document.getElementById("outDateOfUse"),
    carNo: document.getElementById("outCarNo"),
    clientName: document.getElementById("outClientName"),
    totalCell: document.getElementById("tableTotal"),
    amountInWords: document.getElementById("amountInWords"),
    tableBody: document.getElementById("tripTableRows"),
  };

  // Input fields
  out.billNo.innerText = document.getElementById("billNo").value;
  out.date.innerText = document.getElementById("invoiceDate").value;
  out.carUsedBy.innerText = document.getElementById("carUsedBy").value;
  out.dateOfUse.innerText = document.getElementById("dateOfUse").value;
  out.carNo.innerText = document.getElementById("carNo").value;
  out.clientName.innerText = document.getElementById("clientName").value;

  // Clear previous table rows
  out.tableBody.innerHTML = "";

  let total = 0;

  const rows = document.querySelectorAll(".tripRow");
  rows.forEach(row => {
    const date = row.querySelector(".tripDate")?.value;
    const desc = row.querySelector(".tripDesc")?.value.trim();
    const amt = parseFloat(row.querySelector(".tripAmt")?.value || 0);

    if (date && desc && amt > 0) {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${date}</td>
        <td>${desc}</td>
        <td style="text-align:right;">₹${amt.toFixed(2)}</td>
      `;
      out.tableBody.appendChild(tr);
      total += amt;
    }
  });

  out.totalCell.innerText = `₹${total.toFixed(2)}`;
  out.amountInWords.innerText = total > 0
    ? `INR ${convertNumberToWords(total)} Only`
    : "";
}

function convertNumberToWords(amount) {
  const a = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine',
             'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen',
             'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
  const b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

  function inWords(num) {
    if ((num = num.toString()).length > 9) return 'overflow';
    const n = ('000000000' + num).slice(-9).match(/(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})/);
    if (!n) return '';
    let str = '';
    str += (n[1] != 0) ? (a[+n[1]] || `${b[n[1][0]]} ${a[n[1][1]]}`) + ' Crore ' : '';
    str += (n[2] != 0) ? (a[+n[2]] || `${b[n[2][0]]} ${a[n[2][1]]}`) + ' Lakh ' : '';
    str += (n[3] != 0) ? (a[+n[3]] || `${b[n[3][0]]} ${a[n[3][1]]}`) + ' Thousand ' : '';
    str += (n[4] != 0) ? (a[+n[4]] || `${b[n[4][0]]} ${a[n[4][1]]}`) + ' Hundred ' : '';
    str += (n[5] != 0) ? (str !== '' ? 'and ' : '') +
                          (a[+n[5]] || `${b[n[5][0]]} ${a[n[5][1]]}`) + ' ' : '';
    return str.trim();
  }

  return inWords(amount);
}
