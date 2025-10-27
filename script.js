const yearInput = document.getElementById("year");
yearInput.placeholder = `1900 - ${new Date().getFullYear()}`


// Displays copy dialogue box on hover and copies numerals on click
// For if a user wants to copy numerals
const copyFinishedNumeral = () => {
  const copyDialogue = document.getElementById("copyText");
  const convertedNumber = document.getElementById("convertedNumber");


  convertedNumber.addEventListener("mouseover", () => {
    console.log(convertedNumber.innerText)
    if(convertedNumber.innerText !== "-") {
    convertedNumber.style.cursor = "copy";
    copyDialogue.style.display = "block";
    }
  });



 convertedNumber.addEventListener("mouseleave", () => {
    copyDialogue.style.display = "none";

   convertedNumber.addEventListener("click", () => {
      if (convertedNumber.innerText !== "-") {
        navigator.clipboard.writeText(convertedNumber.innerText);
    }
      if (convertedNumber.innerText != "-") {
        navigator.clipboard.writeText(convertedNumber.innerText);
      } else {
      }
    });
  });
};

copyFinishedNumeral();

// Limits the length of year input field & validates year input
// Guards against invalid or unexpected input
const dateValidator = (e) => {
  const input = e.target;
  const maxLength = 4;
  const minValue = parseInt(input.getAttribute("min"));
  const maxValue = new Date().getFullYear();

  if (input.value.length > maxLength) {
    input.value = input.value.slice(0, maxLength);
  }
  if (input.value.length == maxLength) {
    if (input.value < minValue || input.value > maxValue) {
      console.log(maxValue);
      alert(`Please Enter Valid Date: 1900 - ${new Date().getFullYear()}`);
      input.value = "";
    }
  }
};



// Checks if input fields are filled in on submission
// Guards against invalid or unexpected input
const formValidator = () => {
  const form = document.getElementById("myForm");
  const inputs = form.querySelectorAll("input, select");
  for (let i = 0; i < inputs.length; i++) {
    if (!inputs[i].value) {
      alert("Please fill in all fields.");
      return false;
    }
  }
  return true;
};

// Retrieves date from user input
const getDate = () => {
  const formData = new FormData(document.getElementById("myForm"));
  const data = {};
  formData.forEach((value, key) => {
    data[key] = value;
  });
  if (data.separator == "none") {
      data.separator = "";
  };
  return data;
};


const onSubmit = () => {
  const submitBtn = document.getElementById("submit");
 
  submitBtn.addEventListener("click" , (e) =>{
  e.preventDefault(); 
  const label = document.getElementById("separatorLabel");
  if (formValidator()) {
      getDate();
      label.innerHTML = "Change Delimiter";
      writeNumerals(getDate());
    }
  })
};

onSubmit()

// Converts numbers into Roman Numerals using user input
const NumeralConverter = (input) => {
  const romanNumbers = new Map([
    [1000, "M"],
    [900, "CM"],
    [500, "D"],
    [400, "CD"],
    [100, "C"],
    [90, "XC"],
    [50, "L"],
    [40, "XL"],
    [10, "X"],
    [9, "IX"],
    [5, "V"],
    [4, "IV"],
    [1, "I"],
  ]);

  let convertedNumber = "";

  for (let [numbers, numerals] of [...romanNumbers]) {
    while (input >= numbers) {
      convertedNumber += numerals;
      input -= numbers;
    }
  }
  return convertedNumber;
};

// Gets delimiter onChange
// For choosing delimiter or changing it after submission
const delimiter = () => {
  const delimiterBtn = document.getElementById("separator");

   delimiterBtn.addEventListener("change", (e) => {
    const numeralOutput = document.getElementById("convertedNumber").innerText;
    const delimiterSpace = document.querySelectorAll(".inputDelim");
    let chosenDelimiter = e.target.value;
    delimiterSpace.forEach((space) => {
      if (chosenDelimiter === "none") {
        chosenDelimiter = "";
      }
      space.innerText = chosenDelimiter;
    });

    if (numeralOutput != "-") {
      const date = getDate();
      writeNumerals(date, chosenDelimiter);
    }
  });
};

delimiter();


// Takes data from getDate and uses NumeralConverter to convert and output numerals
const writeNumerals = (date) => {  
  const numberOutput = document.getElementById("birthDateNumber");
  const convertedNumber = document.getElementById("convertedNumber");
  const dateDelimiter = date.separator;

  const arabicNumber = `
    ${date.day} ${dateDelimiter}
    ${date.month} ${dateDelimiter}
    ${date.year}`;

  const conversion = `
    ${NumeralConverter(date.day)} ${dateDelimiter}
    ${NumeralConverter(date.month)} ${dateDelimiter}
    ${NumeralConverter(date.year)}`;

  convertedNumber.innerHTML = conversion;
  numberOutput.innerHTML = arabicNumber;
};

// Reloads page
const resetPage = () => {
const resetBtn = document.getElementById("resetButton")
    resetBtn.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.reload();
    });
};

resetPage();