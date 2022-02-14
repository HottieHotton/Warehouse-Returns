const $requestForm = document.querySelector("#requestForm");
const $submitButton = document.querySelector("#submit");
const $reasonInput = document.getElementById("reason-input");
var reason;

const handleRequestFormSubmit = (event) => {
  event.preventDefault();

  const customer_name = $requestForm.querySelector('[name="customer_name"]').value;
  const customer_address = $requestForm.querySelector('[name="customer_address"]').value;
  const customer_phone = $requestForm.querySelector('[name="customer_phone"]').value;
  const customer_email = $requestForm.querySelector('[name="customer_email"]').value;
  const part_number = $requestForm.querySelector('[name="part_number"]').value;
  const quantity = parseInt($requestForm.querySelector('[name="quantity"]').value);
  const customerNotes = $requestForm.querySelector('[name="notes"]').value;
  const string = "Customer Notes - ";
  let notes = string.concat(customerNotes);
  var request_date = dayjs().format("YYYY-MM-DD");
  const status = "yellow"
  const requestObject = {
    customer_name,
    customer_address,
    customer_phone,
    customer_email,
    part_number,
    quantity,
    reason,
    notes,
    request_date,
    status,
  };
  fetch("http://localhost:3001/api/return", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestObject),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      alert("Error: " + response.statusText);
    })
    .then((postResponse) => {
      console.log(postResponse);
      alert("Thank you for submitting a request!");
      document.getElementById("customerName").value = "";
      document.getElementById("customerAddress").value = "";
      document.getElementById("customerPhone").value = "";
      document.getElementById("customerEmail").value = "";
      document.getElementById("partNumber").value = "";
      document.getElementById("quantity").value = "";
      document.getElementById("notes").value = "";
      document.getElementById("reason-input").value = "";
    });
};

const getReasons = () =>
  fetch("/api/reason", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

const renderReasonList = async (reasons) => {
  let jsonReasons = await reasons.json();
  let reasonListItems = [];
  jsonReasons.forEach((reason) => {
    const li = reason.name;
    reasonListItems.push(li);
  });
  const reasonHTML = reasonListItems.map((reasonText, i) => {
      return `<option value="${i + 1}">${reasonText}</option>`;
    }
  );
  reasonHTML.unshift(`<option>Choose Reason</option>`);
  $reasonInput.innerHTML = reasonHTML.join("");
};

const getAndRenderReasons = () => getReasons().then(renderReasonList);

getAndRenderReasons();

$reasonInput.onchange = function () {
  reason = document.getElementById("reason-input").value;
};

$requestForm.addEventListener("submit", handleRequestFormSubmit);
