const fortunes: string[] = [
    "You will discover a hidden talent.",
    "A warm surprise awaits you.",
    "Trust your instincts — they’re right.",
    "Today is a good day to start something new.",
    "Someone is thinking of you fondly.",
    "Your kindness will be returned tenfold.",
    "A magical opportunity is near.",
    "You are stronger than you realize.",
    "A small joy will brighten your day.",
    "Your question will be answered in dreams.",
    // Add up to 50 messages here...
  ];
  
  const drawButton = document.getElementById("drawButton") as HTMLButtonElement;
  const fortuneDisplay = document.getElementById("fortuneDisplay") as HTMLDivElement;
  const questionInput = document.getElementById("questionInput") as HTMLInputElement;
  
  drawButton.addEventListener("click", () => {
    const question = questionInput.value.trim();
    if (!question) {
      alert("Please ask a question first!");
      return;
    }
  
    const randomIndex = Math.floor(Math.random() * fortunes.length);
    const fortune = fortunes[randomIndex];
  
    fortuneDisplay.textContent = `"${fortune}"`;
    fortuneDisplay.classList.remove("hidden");
    
  });
  