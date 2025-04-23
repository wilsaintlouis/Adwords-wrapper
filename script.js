function wrapKeywords() {
    // Get input and options
    const input = document.getElementById("inputKeywords").value.split("\n");
    const toLowercase = document.getElementById("toLowercase").checked;
    const removeUrls = document.getElementById("removeUrls").checked;

    // Process keywords
    let broad = [], modifiedBroad = [], phrase = [], exact = [];
    input.forEach(keyword => {
      if (!keyword.trim()) return; // Skip empty lines

      // Apply options
      if (toLowercase) keyword = keyword.toLowerCase();
      if (removeUrls) keyword = keyword.replace(/(https?:\/\/[^\s]+)/g, "").trim();

      // Skip if keyword is empty after processing
      if (!keyword) return;

      // Format into match types
      broad.push(keyword);
      modifiedBroad.push(keyword.split(" ").map(word => `+${word}`).join(" "));
      phrase.push(`"${keyword}"`);
      exact.push(`[${keyword}]`);
    });

    // Update input line count
    const inputLines = broad.length;
    document.getElementById("inputLines").innerText = inputLines;

    // Output 1: Broad, +Modified +Broad, "Phrase" & [Exact] Match
    const output1 = [...broad, ...modifiedBroad, ...phrase, ...exact];
    document.getElementById("output1").innerText = output1.join("\n");
    document.getElementById("outputLines1").innerText = output1.length;

    // Output 2: +Modified +Broad, "Phrase" & [Exact] Match
    const output2 = [...modifiedBroad, ...phrase, ...exact];
    document.getElementById("output2").innerText = output2.join("\n");
    document.getElementById("outputLines2").innerText = output2.length;

    // Output 3: Broad, "Phrase" & [Exact] Match
    const output3 = [...broad, ...phrase, ...exact];
    document.getElementById("output3").innerText = output3.join("\n");
    document.getElementById("outputLines3").innerText = output3.length;

    // Output 4: "Phrase" & [Exact] Match
    const output4 = [...phrase, ...exact];
    document.getElementById("output4").innerText = output4.join("\n");
    document.getElementById("outputLines4").innerText = output4.length;

    // Output 5: +Modified +Broad Match
    const output5 = [...modifiedBroad];
    document.getElementById("output5").innerText = output5.join("\n");
    document.getElementById("outputLines5").innerText = output5.length;

    // Output 6: "Phrase Match"
    const output6 = [...phrase];
    document.getElementById("output6").innerText = output6.join("\n");
    document.getElementById("outputLines6").innerText = output6.length;
  }

  function copyToClipboard(elementId) {
    const text = document.getElementById(elementId).innerText;
    navigator.clipboard.writeText(text).then(() => {
      alert("Copied to clipboard!");
    }).catch(err => {
      alert("Failed to copy: " + err);
    });
  }

  // Update input line count on input change
  document.getElementById("inputKeywords").addEventListener("input", function() {
    const lines = this.value.split("\n").filter(line => line.trim()).length;
    document.getElementById("inputLines").innerText = lines;
  });