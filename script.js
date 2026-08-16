const langBtn = document.getElementById("langBtn");

let hindi = false;

function setLanguage(isHindi) {
    hindi = isHindi;

    document.documentElement.lang = hindi ? "hi" : "en";

    document.querySelectorAll("[data-en]").forEach(function (element) {
        element.textContent = hindi
            ? element.getAttribute("data-hi")
            : element.getAttribute("data-en");
    });

    if (langBtn) {
        langBtn.textContent = hindi ? "English" : "हिन्दी";
    }
}

if (langBtn) {
    langBtn.addEventListener("click", function () {
        setLanguage(!hindi);
    });
}

setLanguage(false);


// ===============================
// EMI CALCULATOR
// ===============================

const amountInput = document.getElementById("amount");
const rateInput = document.getElementById("rate");
const yearsInput = document.getElementById("years");

const emiDisplay = document.getElementById("emi");
const summaryDisplay = document.getElementById("summary");

function formatINR(number) {
    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0
    }).format(number);
}

function calculateEMI() {

    if (!amountInput || !rateInput || !yearsInput || !emiDisplay) {
        return;
    }

    const principal = Number(amountInput.value) || 0;
    const annualRate = Number(rateInput.value) || 0;
    const years = Number(yearsInput.value) || 1;

    const months = years * 12;
    const monthlyRate = annualRate / 12 / 100;

    let emi;

    if (monthlyRate === 0) {
        emi = principal / months;
    } else {
        emi =
            principal *
            monthlyRate *
            Math.pow(1 + monthlyRate, months) /
            (Math.pow(1 + monthlyRate, months) - 1);
    }

    emiDisplay.textContent = formatINR(emi);

    if (summaryDisplay) {
        summaryDisplay.textContent =
            "For " +
            formatINR(principal) +
            " at " +
            annualRate +
            "% for " +
            years +
            " years";
    }
}

const calculateButton = document.getElementById("calc");

if (calculateButton) {
    calculateButton.addEventListener("click", calculateEMI);
}

[amountInput, rateInput, yearsInput].forEach(function (input) {
    if (input) {
        input.addEventListener("input", calculateEMI);
    }
});

calculateEMI();


// ===============================
// WHATSAPP ENQUIRY FORM
// ===============================

const enquiryForm = document.getElementById("form");

if (enquiryForm) {

    enquiryForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const loanType = document.getElementById("type").value;
        const requirement =
            document.getElementById("need").value.trim() ||
            "Not specified";

        const message =
`Hello Nirbhay Singh,

I want to enquire about a loan.

Name: ${name}
Mobile: ${phone}
Loan Type: ${loanType}
Approximate Requirement: ₹${requirement}

Please guide me regarding eligibility and required documents.`;

        const whatsappURL =
            "https://wa.me/917722988226?text=" +
            encodeURIComponent(message);

        window.open(whatsappURL, "_blank");
    });
}
