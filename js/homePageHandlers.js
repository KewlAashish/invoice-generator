const tbody = document.getElementById("tripTableRows");
tbody.innerHTML = "";
let total = 0;

for (let i = 0; i < descs.length; i++) {
  const desc = descs[i].value;
  const amt = parseFloat(amts[i].value || 0);
  const date = dates[i].value;

  if (desc && amt && date) {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${date}</td>
      <td>${desc}</td>
      <td style="text-align:right;">₹${amt.toFixed(2)}</td>
    `;
    tbody.appendChild(row);
    total += amt;
  }
}

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
  document.getElementById("outBillNo").innerText = document.getElementById("billNo").value;
  document.getElementById("outInvoiceDate").innerText = document.getElementById("invoiceDate").value;
  document.getElementById("outCarUsedBy").innerText = document.getElementById("carUsedBy").value;
  document.getElementById("outDateOfUse").innerText = document.getElementById("dateOfUse").value;
  document.getElementById("outCarNo").innerText = document.getElementById("carNo").value;

  const descs = document.querySelectorAll('.tripDesc');
  const amts = document.querySelectorAll('.tripAmt');
  const dates = document.querySelectorAll('.tripDate');

  const tbody = document.getElementById("tripTableRows");
  tbody.innerHTML = "";

  let total = 0;

  for (let i = 0; i < descs.length; i++) {
    const desc = descs[i].value;
    const amt = parseFloat(amts[i].value || 0);
    const date = dates[i].value;

    if (desc && amt && date) {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${date}</td>
        <td>${desc}</td>
        <td style="text-align:right;">₹${amt.toFixed(2)}</td>
      `;
      tbody.appendChild(row);
      total += amt;
    }
  }

    document.getElementById("tableTotal").innerText = `₹${total.toFixed(2)}`;
    document.getElementById("amountInWords").innerText = `INR ${convertNumberToWords(total)} Only`;
    document.getElementById("outClientName").innerText = document.getElementById("clientName").value;
}

function convertNumberToWords(amount) {
  const a = [
    '', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine',
    'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen',
    'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'
  ];
  const b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

  function inWords(num) {
    if ((num = num.toString()).length > 9) return 'overflow';
    let n = ('000000000' + num).substr(-9).match(/(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})/);
    if (!n) return; let str = '';
    str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + ' Crore ' : '';
    str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + ' Lakh ' : '';
    str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + ' Thousand ' : '';
    str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + ' Hundred ' : '';
    str += (n[5] != 0) ? ((str != '') ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) + ' ' : '';
    return str.trim();
  }

  return inWords(amount);
}
